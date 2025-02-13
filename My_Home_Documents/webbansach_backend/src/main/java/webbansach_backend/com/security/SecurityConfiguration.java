package webbansach_backend.com.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import webbansach_backend.com.filter.JwtFilter;
import webbansach_backend.com.service.UserService;

import java.lang.reflect.Array;
import java.util.Arrays;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private JwtFilter jwtFilter;

    //Dùng để mã hóa mật khẩu trước khi lưu vào database.
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //  công cụ xác thực dùng để lấy thông tin người dùng từ database.
    @Bean
    @Autowired
    public DaoAuthenticationProvider authenticationProvider(UserService userService){
        // tạo công cụ giúp xác thực người dùng
        DaoAuthenticationProvider dap = new DaoAuthenticationProvider();
        // cấu hình thông tin
        dap.setUserDetailsService(userService); // tìm kiếm user
        dap.setPasswordEncoder(passwordEncoder()); // Sử dụng BCryptPasswordEncoder để kiểm tra mật khẩu.
        return dap; // kiểm tra đối tượng có quyền gi
    }
    // PHÂN QUYỀN: Dùng để cấu hình quyền truy cập API.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UserService userService) throws Exception {
        // PHÂN QUYỀN
        http.authorizeHttpRequests(

                config -> config
                        .requestMatchers(HttpMethod.GET, EndPoint.PUBLIC_GET_ENDPOINS).permitAll()
                        .requestMatchers(HttpMethod.POST, EndPoint.PUBLIC_POST_ENDPOINS).permitAll()
                        .requestMatchers(HttpMethod.GET, EndPoint.ADMIN_GET_ENDPOINS).hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, EndPoint.ADMIN_POST_ENDPOINS).hasAuthority("ADMIN")

        );
        //
        http.cors(cors -> {
            cors.configurationSource(request -> {
               CorsConfiguration corsConfig = new CorsConfiguration();
               corsConfig.addAllowedOrigin(EndPoint.front_end_host);
               corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
               corsConfig.addAllowedHeader("*");
               return corsConfig;
            });
        });

        //
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        //
        http.sessionManagement(
                (session)
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        

        // Bật authentication provider
        http.authenticationProvider(authenticationProvider(userService));

        // Bật Basic Authentication trong Spring Security.
        http.httpBasic(Customizer.withDefaults());

        //
        http.csrf(csrf-> csrf.disable());
        return http.build();
    };

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}





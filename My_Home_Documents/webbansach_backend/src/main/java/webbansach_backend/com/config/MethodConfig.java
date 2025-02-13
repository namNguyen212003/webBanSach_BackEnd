package webbansach_backend.com.config;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import webbansach_backend.com.entity.NguoiDung;
import webbansach_backend.com.entity.TheLoai;
@Configuration
public class MethodConfig implements RepositoryRestConfigurer {
    // cho phep truy cap den 1 nguon nao do
    private String url = "http://localhost:3000/"; // chi co url ms dc truy cap len fronEnd
    @Autowired
    private EntityManager entityManager;
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // cho phép frontEnd gọi tới BackEnd để xác định truy cập phương thức nào (/**: la all)
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));
        // config.exposeIdsFor(TheLoai.class);

        cors.addMapping("/**")
                .allowedOrigins(url)
                .allowedMethods("GET", "POST", "PUT", "DELETE");
//        // Chặn các phuong thuc
//        HttpMethod[] chanCacPhuongThuc = {
//                HttpMethod.POST,
//                HttpMethod.PUT,
//                HttpMethod.PATCH,
//                HttpMethod.DELETE
//        };
//        // export thêm id, cho xem tat ca id cua cac table
//        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));
//        // export them id, chi dc xem the-loai
//        config.exposeIdsFor(TheLoai.class);
//        // chặn phuong thuc trong The-loai
//        chanHttpMethods(TheLoai.class, config, chanCacPhuongThuc);
//
//        // chặn các method delete
//        HttpMethod[] phuongThucDelete = {
//                HttpMethod.DELETE
//        };
//        chanHttpMethods(NguoiDung.class, config, phuongThucDelete);
    }
    // dùng để chặn method: post
    // disable: là chặn, enable : là bật
    private void chanHttpMethods(Class c ,
                                 RepositoryRestConfiguration config,
                                 HttpMethod[] methods) {
        config.getExposureConfiguration() // lấy cấu hình hiển thị cách các endpoint REST (dựa trên repository) hoạt động, bao gồm việc bật hoặc tắt các phương thức HTTP.
                .forDomainType(c) // Chỉ định rằng cấu hình này sẽ được áp dụng cho thực thể được chỉ định bởi
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(methods)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(methods)));
    }
}

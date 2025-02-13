package webbansach_backend.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import webbansach_backend.com.entity.NguoiDung;
import webbansach_backend.com.security.JwtResponse;
import webbansach_backend.com.security.LoginRequest;
import webbansach_backend.com.service.handle.JwtService;
import webbansach_backend.com.service.handle.TaiKhoanService;
import webbansach_backend.com.service.UserService;

import org.springframework.security.core.AuthenticationException;
//import javax.naming.AuthenticationException;
//import java.net.Authenticator;

@RestController
//@CrossOrigin(origins = "http://localhost:3000") // cho phép yêu cầu từ http://localhost:3000
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "*")

@RequestMapping("/tai-khoan")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    // Định nghĩa API POST /tai-khoan/dang-ky để đăng ký
    @PostMapping("/dang-ky")
    public ResponseEntity<?> dangKyNguoiDung(@Validated @RequestBody NguoiDung nguoiDung) {
        ResponseEntity<?> response = taiKhoanService.dangKyNguoiDung(nguoiDung);
        return response;
    }

    // kich hoat tai khoan nguoi dung = get (de nguoi dung click luon) or post it dung
    @GetMapping("/kich-hoat")
    public ResponseEntity<?> kichHoatTaiKhoan(@RequestParam String email, @RequestParam String maKichHoat) {
        ResponseEntity<?> response = taiKhoanService.kichHoatTaiKhoan(email, maKichHoat);
        return response;
    }

    // Định nghĩa API POST /tai-khoan/dang-nhap để đăng nhập
    @PostMapping("/dang-nhap")
    public ResponseEntity<?> dangNhap(@RequestBody LoginRequest loginRequest) {
        // Xác thực người dùng bằng tên đăng nhập và mat khau
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
                    );

            System.out.println("auth: " + authentication.getPrincipal());
            // Nếu xác thực thành công, thì tạo token JWT
            if (authentication.isAuthenticated()) {
                final String jwt = jwtService.generateJwtToken(loginRequest.getUsername());
                return ResponseEntity.ok(new JwtResponse(jwt));
            }

            // Xác thực không thành công, trả về lỗi hoặc thông báo
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Tên đăng nhập hoặc mật khẩu không chính xác ");
        }
        return ResponseEntity.badRequest().body("Xác thực không thành công");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> my_info() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        NguoiDung nguoiDung = userService.findByUsername(name);
        return ResponseEntity.ok().body(nguoiDung);
    }
}

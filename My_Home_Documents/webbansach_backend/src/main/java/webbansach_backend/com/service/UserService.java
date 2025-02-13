package webbansach_backend.com.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import webbansach_backend.com.entity.NguoiDung;

public interface UserService extends UserDetailsService {
    NguoiDung findByUsername(String tenDangNhap);

//    NguoiDung findById(int maNguoiDung);
}

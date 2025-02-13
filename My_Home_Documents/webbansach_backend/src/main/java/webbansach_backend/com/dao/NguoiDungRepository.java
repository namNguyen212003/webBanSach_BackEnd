package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.HinhThucThanhToan;
import webbansach_backend.com.entity.NguoiDung;

@RepositoryRestResource(path = "nguoi-dung")
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    boolean existsByTenDangNhap(String tenDangNhap);
    boolean existsByEmail(String email);

    // để tìm kiếm 1 người dùng thông qua tên đăng nhập
    NguoiDung findByTenDangNhap(String tenDangNhap);

    NguoiDung findByEmail(String email);

}

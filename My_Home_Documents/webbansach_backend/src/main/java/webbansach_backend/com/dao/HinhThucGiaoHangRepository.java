package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.HinhAnh;
import webbansach_backend.com.entity.HinhThucGiaoHang;

@Repository
public interface HinhThucGiaoHangRepository extends JpaRepository<HinhThucGiaoHang, Integer> {
    
}

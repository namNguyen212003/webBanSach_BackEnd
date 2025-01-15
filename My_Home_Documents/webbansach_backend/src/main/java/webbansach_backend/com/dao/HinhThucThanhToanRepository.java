package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.HinhThucGiaoHang;
import webbansach_backend.com.entity.HinhThucThanhToan;

@Repository
public interface HinhThucThanhToanRepository extends JpaRepository<HinhThucThanhToan, Integer> {
    
}

package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.DonHang;
import webbansach_backend.com.entity.HinhAnh;

@Repository
public interface HinhAnhRepository extends JpaRepository<HinhAnh, Integer> {
    
}

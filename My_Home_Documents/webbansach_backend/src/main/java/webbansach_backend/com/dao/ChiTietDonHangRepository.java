package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.ChiTietDonHang;

@Repository
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, Long> {

}

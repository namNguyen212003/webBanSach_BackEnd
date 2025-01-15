package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.HinhThucThanhToan;
import webbansach_backend.com.entity.NguoiDung;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    
}

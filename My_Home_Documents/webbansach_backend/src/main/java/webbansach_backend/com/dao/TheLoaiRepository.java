package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.SuDanhGia;
import webbansach_backend.com.entity.TheLoai;

@Repository
public interface TheLoaiRepository extends JpaRepository<TheLoai, Integer> {
    
}

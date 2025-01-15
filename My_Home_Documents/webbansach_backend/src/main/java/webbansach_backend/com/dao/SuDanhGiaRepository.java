package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.SachYeuThich;
import webbansach_backend.com.entity.SuDanhGia;

@Repository
public interface SuDanhGiaRepository extends JpaRepository<SuDanhGia, Integer> {
    
}

package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.Sach;
import webbansach_backend.com.entity.SachYeuThich;

@Repository
public interface SachYeuThichRepository extends JpaRepository<SachYeuThich, Integer> {
    
}

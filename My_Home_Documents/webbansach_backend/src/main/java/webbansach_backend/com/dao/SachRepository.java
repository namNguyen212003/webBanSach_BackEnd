package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.Quyen;
import webbansach_backend.com.entity.Sach;

@Repository
public interface SachRepository extends JpaRepository<Sach, Integer> {
    
}

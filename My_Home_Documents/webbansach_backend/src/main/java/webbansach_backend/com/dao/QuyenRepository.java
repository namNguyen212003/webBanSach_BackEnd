package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.Quyen;

@Repository
public interface QuyenRepository extends JpaRepository<Quyen, Integer> {
    
}

package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.Quyen;

@RepositoryRestResource(path = "quyen")
public interface QuyenRepository extends JpaRepository<Quyen, Integer> {
    public Quyen findByTenQuyen(String tenQuyen);
}

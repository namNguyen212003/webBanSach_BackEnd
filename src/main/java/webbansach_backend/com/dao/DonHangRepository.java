package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import webbansach_backend.com.entity.ChiTietDonHang;
import webbansach_backend.com.entity.DonHang;

@RepositoryRestResource(path = "don-hang")
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {

}

package webbansach_backend.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import webbansach_backend.com.entity.ChiTietDonHang;

@RepositoryRestResource(path = "chi-tiet-don-hang") //ko nên path ởđây, nên tạo controller có CRUD
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, Long> {

}

package webbansach_backend.com.service.handle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import webbansach_backend.com.dao.NguoiDungRepository;
import webbansach_backend.com.dao.QuyenRepository;
import webbansach_backend.com.entity.NguoiDung;
import webbansach_backend.com.entity.Quyen;
import webbansach_backend.com.service.UserService;

import java.util.Collection;
import java.util.stream.Collectors;

// dùng để thực hiện xác thực người dùng
@Service
public class UseServiceImpl implements UserService {
    private NguoiDungRepository nguoiDungRepository;
    private QuyenRepository quyenRepository;

    @Autowired
    public UseServiceImpl(NguoiDungRepository nguoiDungRepository, QuyenRepository quyenRepository) {
        this.nguoiDungRepository = nguoiDungRepository;
        this.quyenRepository = quyenRepository;
    }

    @Override
    public NguoiDung findByUsername(String tenDangNhap) {
        return nguoiDungRepository.findByTenDangNhap(tenDangNhap);
    }

//    @Override
//    public NguoiDung findById(int maNguoiDung) {
//        return nguoiDungRepository.findById(maNguoiDung).orElseThrow(null);
//    }

    // để spring boot hiểu được đối tượng user của chúng ta là thằng nào.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        NguoiDung nguoiDung = nguoiDungRepository.findByTenDangNhap(username);
        if(nguoiDung == null) {
            throw new UsernameNotFoundException("Tai khoan khong ton tai");
        }
        User user = new User(
                nguoiDung.getTenDangNhap(),
                nguoiDung.getMatKhau(),
                rolesToAuthorities(nguoiDung.getDanhSachQuyen()));
        return user;
    }

    private Collection<? extends GrantedAuthority> rolesToAuthorities(Collection<Quyen> quyens) {
        return quyens.stream()
                .map(quyen -> new SimpleGrantedAuthority(quyen.getTenQuyen()))
                .collect(Collectors.toList());
    };

}

package webbansach_backend.com.service.handle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import webbansach_backend.com.dao.NguoiDungRepository;
import webbansach_backend.com.entity.NguoiDung;
import webbansach_backend.com.entity.ThongBao;
import webbansach_backend.com.service.EmailService;

import java.util.UUID;

@Service
public class TaiKhoanService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

//    @Bean
//    public BCryptPasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private EmailService emailService;

    public ResponseEntity<?> dangKyNguoiDung(NguoiDung nguoiDung){
        // Kiểm tra tên đăng nhập đã tồn tại chưa?
        if(nguoiDungRepository.existsByTenDangNhap(nguoiDung.getTenDangNhap())){
            return ResponseEntity.badRequest().body(new ThongBao("Tên đăng nhập đã tồn tại."));
        }

        // Kiểm tra email đã tồn tại chưa?
        if(nguoiDungRepository.existsByEmail(nguoiDung.getTenDangNhap())){
            return ResponseEntity.badRequest().body(new ThongBao("Email đã tồn tại."));
        }

        // Mã hóa mật khẩu
        String enCryptPassword = passwordEncoder.encode(nguoiDung.getMatKhau());
        nguoiDung.setMatKhau(enCryptPassword);

        // gan va gui thong tin kich hoat
        nguoiDung.setMaKichHoat(taoMaKichHoat());
        nguoiDung.setDaKichHoat(false);

        // lưu người dùng vào CSDL
        NguoiDung nguoiDung_daDangKy = nguoiDungRepository.save(nguoiDung);

        // gui email cho nguoi dung de ho kich hoat
        guiEmailKichHoat(nguoiDung.getEmail(), nguoiDung.getMaKichHoat());

        return ResponseEntity.ok("Đăng ký thành công ");

    }

    private String taoMaKichHoat(){
        return UUID.randomUUID().toString(); // tao day ma ngau nhien
    }

    private void guiEmailKichHoat(String email, String maKichHoat){
        String subject = "Kich hoat tai khoan cua ban tai webBanSach";
        String text = "Vui long su dung ma sau de kich hoat tai khoan <"+email+">: <html><body><br/><h1>"+maKichHoat+"</h1></body></html>";
        emailService.sendMessage("namman212003@gmail.com" , email, subject, text);
    }

    // kich hoat tai khoan nguoi dung
    public ResponseEntity<?> kichHoatTaiKhoan(String email, String maKichHoat){
        // tim nguoi dung theo dia chi email
        NguoiDung nguoiDung = nguoiDungRepository.findByEmail(email);

        if(nguoiDung == null){
            return ResponseEntity.badRequest().body(new ThongBao("Nguoi dung khong ton tai"));
        }

        if(nguoiDung.isDaKichHoat()){
            return ResponseEntity.badRequest().body(new ThongBao("Tai khoan da duoc kich hoat"));
        }

        if(maKichHoat.equals(nguoiDung.getMaKichHoat())){
            nguoiDung.setDaKichHoat(true);
            nguoiDungRepository.save(nguoiDung);
            return ResponseEntity.ok("Kich hoat tai khoan thanh cong");
        }else{
            return ResponseEntity.badRequest().body(new ThongBao("Ma kich hoat khong chinh xac"));
        }
    }

}

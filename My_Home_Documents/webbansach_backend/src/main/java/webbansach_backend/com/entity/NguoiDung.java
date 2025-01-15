package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "nguoi_dung")
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nguoi_dung")
    private int maNguoiDung;

    @Column(name = "ho_dem", length = 255)
    private String hoDem;

    @Column(name = "ten", length = 255)
    private String ten;

    @Column(name = "ten_dang_nhap", length = 255)
    private String tenDangNhap;

    @Column(name = "mat_khau", length = 512)
    private String matKhau;

    @Column(name = "gioi_tinh")
    private char gioiTinh;

    @Column(name = "email")
    private String email;

    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "dia_chi_mua_hang")
    private String diaChiMuaHang;

    @Column(name = "dia_chi_giao_hang")
    private String diaChiGiaoHang;

    // quan he 1-n
    @OneToMany(mappedBy = "nguoiDung",
            fetch = FetchType.LAZY, cascade = {
                    CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH
            })
    private List<SuDanhGia> danhSachSuDanhGia;//nguoi dung tham gia su danh gia nao?

    // quan he 1-n
    @OneToMany(mappedBy = "nguoiDung", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    private List<SachYeuThich> danhSachSachYeuThich; // nguoi dung yeu thich sach nao?

    // quan he n-n
    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinTable(
            name = "nguoidung_quyen", //cai chung cua 2 bang
            joinColumns = @JoinColumn(name="ma_nguoi_dung"),
            inverseJoinColumns = @JoinColumn(name = "ma_quyen")
    )
    private List<Quyen> danhSachQuyen; // nguoi dung co nhung quyen nao?

    // quan he 1-n
    @OneToMany(mappedBy = "nguoiDung",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    private List<DonHang> danhSachDonHang; // nguoi dung dang co Don hang nao
}

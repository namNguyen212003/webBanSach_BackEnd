package webbansach_backend.com.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "sach")
public class Sach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ma_sach")
    private int maSach;

    @Column(name="ten_sach", length = 256)
    private String tenSach;

    @Column(name="ten_tac_gia", length = 256)
    private String tenTacGia;

    @Column(name="isbn", length = 256)
    private String ISBN;

    @Column(name="mo_ta", columnDefinition = "text")
    private String moTa;

    @Column(name="gia_niem_yet")
    private double giaNiemYet;

    @Column(name="gia_ban")
    private double giaBan;

    @Column(name="so_luong")
    private int soLuong;

    @Column(name="trung_binh_xep_hang")
    private double trungBinhXepHang;

    // quan he n-n
    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinTable(
            name = "sach_theloai", //cai chung cua 2 bang
            joinColumns = @JoinColumn(name="ma_sach"),
            inverseJoinColumns = @JoinColumn(name = "ma_the_loai")
    )
    List<TheLoai> danhSachTheLoai; //n-n


    // quan he 1-n
    @OneToMany(mappedBy = "sach",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
            })
    List<HinhAnh> danhSachHinhAnh; //1-n


    // quan he 1-n
    @OneToMany(mappedBy = "sach",
            fetch = FetchType.LAZY,cascade = CascadeType.ALL
    )
    List<SuDanhGia> danhSachSuDanhGia;


    // quan he 1-n
    @OneToMany(mappedBy = "sach",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH
            })
    List<ChiTietDonHang> danhSachChiTietDonHang; // sach duoc nguoi ta mua nhieu lan

    // quan he 1-n
    @OneToMany(mappedBy = "sach",
            fetch = FetchType.LAZY, cascade = CascadeType.ALL
    )
    List<SachYeuThich> danhSachYeuThich;

}

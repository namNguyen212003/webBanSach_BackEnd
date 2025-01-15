package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "don_hang")
public class DonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_don_hang")
    private int maDonHang;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "dia_chi_mua_hang", length = 512)
    private String diaChiMuaHang;

    @Column(name = "dia_chi_nhan_hang", length = 512)
    private String diaChiNhanHang;

    @Column(name = "tong_tien_san_pham")
    private double tongTienSanPham;

    @Column(name = "chi_phi_giao_hang")
    private double chiPhiGiaoHang;

    @Column(name = "chi_phi_thanh_toan")
    private double chiPhiThanhToan;

    @Column(name = "tong_tien")
    private double tongTien;

    // quan he 1-n (vì khi xóa đơn hàng thì chi tiet don hang cũng bị xóa)
    @OneToMany(mappedBy = "donHang", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ChiTietDonHang> danhSachChiTietDonHang; // ben trong gio hang co gi?

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung; // ai la nguoi mua gio hang?

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_hinh_thuc_thanh_toan")
    private HinhThucThanhToan hinhThucThanhToan;

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_hinh_thuc_giao_hang")
    private HinhThucGiaoHang hinhThucGiaoHang;

}

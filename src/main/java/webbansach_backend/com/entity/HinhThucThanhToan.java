package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "hinh_thuc_thanh_toan")
public class HinhThucThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_thuc_thanh_toan")
    private int maHinhThucThanhToan;
    @Column(name = "ten_hinh_thuc_thanh_toan")
    private String tenHinhThucThanhToan;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "chi_phi_thanh_toan")
    private double chiPhiThanhToan;

    // quan he 1-n
    @OneToMany(mappedBy = "hinhThucThanhToan",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
            })
    private List<DonHang> danhSachDonHang; // danh sách đơn hàng có nhiều đơn hng
}

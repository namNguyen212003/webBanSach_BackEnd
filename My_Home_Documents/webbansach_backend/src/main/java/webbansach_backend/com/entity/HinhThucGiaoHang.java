package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "hinh_thuc_giao_hang")
public class HinhThucGiaoHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_thuc_giao_hang")
    private int maHinhThucGiaoHang;
    @Column(name = "ten_hinh_thuc_giao_hang")
    private String tenHinhThucGiaoHang;
    @Column(name = "mo_ta")
    private String moTa;
    @Column(name = "chi_phi_giao_hang")
    private double chiPhiGiaoHang;

    // quan he 1-n
    @OneToMany(mappedBy = "hinhThucGiaoHang", fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
            })
    private List<DonHang> danhSachDonHang; // danh sách đơn hàng có nhiều đơn hng
}

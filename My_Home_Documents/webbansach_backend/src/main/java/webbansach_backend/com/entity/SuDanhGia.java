package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "su_danh_gia")
public class SuDanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_danh_gia")
    private long maDanhGia;

    @Column(name = "diem_xep_hang")
    private float diemXepHang;

    @Column(name = "nhan_xet")
    private String nhanXet;

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_sach", nullable = false)
    private Sach sach; // danh gia cuon sach nao?

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung;

}

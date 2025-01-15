package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "sach_yeu_thich")
public class SachYeuThich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_sach_yeu_thich")
    private int maSachYeuThich;

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_sach", nullable = false)
    private Sach sach;

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_nguoi_dung", nullable = false)
    private NguoiDung nguoiDung; // nguoi dung nao yeu thich quyen sach nao?

}

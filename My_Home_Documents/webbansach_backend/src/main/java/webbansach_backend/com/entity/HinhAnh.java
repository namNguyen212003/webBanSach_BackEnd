package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "hinh_anh")
public class HinhAnh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_hinh_anh")
    private int maHinhAnh;

    @Column(name = "ten_hinh_anh", length = 256)
    private String tenHinhAnh;

    @Column(name = "la_icon") //tyni int
    private boolean laIcon;

    @Column(name = "duong_dan")
    private String duongDan;

    @Column(name = "du_lieu_anh")
    @Lob
    private String duLieuAnh; // hoac luu duoi dang Blod khi luu dung luong anh lon

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinColumn(name = "ma_sach", nullable = false) // bat buoc xac dinh anh nay la cua cuon sach nao
    private Sach sach; // rat nhieu hinh anh do thuoc ve cuon sach

}

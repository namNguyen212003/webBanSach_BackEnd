package webbansach_backend.com.entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chi_tiet_don_hang")
    private long chiTietDonHang;

    @Column(name = "so_luong")
    private int soLuong; // chi tiet gio hang nay no ban so luong bao nhieu?

    @Column(name = "gia_ban")
    private double giaBan;

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_sach", nullable = false)
    private Sach sach; // chi tiet gio hang nay no ban sach nao?

    // quan he n-1
    @ManyToOne( cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE
    })
    @JoinColumn(name = "ma_don_hang", nullable = false)
    private DonHang donHang;
}

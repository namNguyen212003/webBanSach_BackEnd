package webbansach_backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "quyen")
@Data
public class Quyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_quyen")
    private int maQuyen;

    @Column(name = "ten_quyen")
    private String tenQuyen;

    // quan he n-n
    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH
    })
    @JoinTable(
            name = "nguoidung_quyen", //cai chung cua 2 bang
            joinColumns = @JoinColumn(name="ma_quyen"),
            inverseJoinColumns = @JoinColumn(name = "ma_nguoi_dung")
    )
    private List<NguoiDung> danhSachNguoiDung; //(quan he n-n) người dùng 1 - n quyền, quyền 1 - n nguoi dung


}

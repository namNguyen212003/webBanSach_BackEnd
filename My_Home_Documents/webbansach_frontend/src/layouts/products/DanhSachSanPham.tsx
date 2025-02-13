import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./component/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import PhanTrang from "../utils/PhanTrang";

interface DanhSachSanPhamProps {
  tuKhoaTimKiem: string;
  maTheLoai: number;
}

function DanhSachSanPham({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) {
  // su dung useState de lay thong tin tu API da viet
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setdangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);
  const [trangHienTai, setTrangHienTai] = useState(1); // sét trang hiện tại là 1
  const [tongSoTrang, setTongSoTrang] = useState(0); // sét tổng trang hiện tại là 1
  const [tongSoSach, setSoSach] = useState(0); // sét số sách.. tạm thời chưa đụng

  useEffect(
    () => {
      if (tuKhoaTimKiem === "" && maTheLoai == 0) {
        layToanBoSach(trangHienTai - 1)
          .then((kq) => {
            setDanhSachQuyenSach(kq.ketQua);
            setTongSoTrang(kq.tongSoTrang);
            setdangTaiDuLieu(false);
          })
          .catch((error) => {
            setdangTaiDuLieu(false);
            setBaoLoi(error.message);
          });
      } else {
        timKiemSach(tuKhoaTimKiem, maTheLoai)
          .then((kq) => {
            setDanhSachQuyenSach(kq.ketQua);
            setTongSoTrang(kq.tongSoTrang);
            setdangTaiDuLieu(false);
          })
          .catch((error) => {
            setdangTaiDuLieu(false);
            setBaoLoi(error.message);
          });
      }
    },
    [trangHienTai, tuKhoaTimKiem, maTheLoai] // chỉ gọi 1 lần
  );

  const phanTrang = (trang: number) => setTrangHienTai(trang);

  if (dangTaiDuLieu) {
    return (
      <div>
        <h1>Dang tai du lieu</h1>
      </div>
    );
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gap loi: {baoLoi}</h1>
      </div>
    );
  }

  if (danhSachQuyenSach.length === 0) {
    return (
      <div className="container">
        <div className="d-flex align-items-center justity-content-center">
          <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
        </div>
      </div>
    );
  }

  // nếu không dính 2 điều kiện trên thì trả về
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        {danhSachQuyenSach.map((sach) => (
          <SachProps key={sach.maSach} sach={sach} />
        ))}
      </div>
      <PhanTrang
        trangHienTai={trangHienTai}
        tongSoTrang={tongSoTrang}
        phanTrang={phanTrang}
      ></PhanTrang>
    </div>
  );
}

export default DanhSachSanPham;

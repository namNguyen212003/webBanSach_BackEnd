import React, { useEffect, useState } from "react";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { HinhAnhModel } from "../../../models/HinhAnhModel";
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPham {
  maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {
  const maSach: number = props.maSach;

  const [danhSachAnh, setdanhSachAnh] = useState<HinhAnhModel[]>([]); // su dung useState để lấy thông tin từ API đã viêt ra

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  const [hinhAnhDangChon, setHinhAnhDangChon] = useState(danhSachAnh[0]);

  const chonAnh = (hinhAnh: HinhAnhModel) => {
    setHinhAnhDangChon(hinhAnh);
  };

  useEffect(
    () => {
      layToanBoAnhCuaMotSach(maSach)
        .then((hinhAnhData) => {
          //1 la thanh cong (then)
          setdanhSachAnh(hinhAnhData);
          setDangTaiDuLieu(false);
        })
        .catch((error) => {
          setBaoLoi(error.message);
          setDangTaiDuLieu(false);
        }); // 2 là lỗi
    }
  );

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

  return (
    <div className="col">
      <div>
        <img src={hinhAnhDangChon.duLieuAnh} />
      </div>
      <div>
        <Carousel showArrows={true} showThumbs={false}>
          {danhSachAnh.map((hinhAnh, index) => (
            <div key={index} onClick={() => chonAnh(hinhAnh)}>
              <img src={hinhAnh.duLieuAnh} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HinhAnhSanPham;

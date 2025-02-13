import React, { useEffect, useState } from "react";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { HinhAnhModel } from "../../../models/HinhAnhModel";
import { Carousel } from "react-responsive-carousel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";

interface DanhGiaSanPham {
  maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {
  const maSach: number = props.maSach;

  const [danhSachDanhGia, setdanhSachDanhGia] = useState<DanhGiaModel[]>([]); // su dung useState để lấy thông tin từ API đã viêt ra

  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(
    () => {
      layToanBoDanhGiaCuaMotSach(maSach).then(danhSach => {
          //1 la thanh cong (then)
          setdanhSachDanhGia(danhSach);
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
    <div className="row">
        {
            danhSachDanhGia.map((danhGia,index)=>(
                <div>
                    <div>
                        <h3>{danhGia.diemXepHang}</h3>
                    </div>
                    <div>
                        <p>{danhGia.nhanXet}</p>
                    </div>

                </div>
            ))
        }
    </div>
  );
};

export default DanhGiaSanPham;

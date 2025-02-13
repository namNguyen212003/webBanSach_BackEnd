import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { HinhAnhModel } from "../../../models/HinhAnhModel";
import { lay1AnhCuaMotSach } from "../../../api/HinhAnhAPI";

interface CarouselItemInterface {
  sach: SachModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
  const maSach: number = props.sach.maSach;
  const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(() => {
    lay1AnhCuaMotSach(maSach)
      .then((hinhAnhData) => {
        setDanhSachAnh(hinhAnhData);
        setDangTaiDuLieu(false);
      })
      .catch((error) => {
        setDangTaiDuLieu(false);
        setBaoLoi(error.message);
      });
  }, []);

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
  let duLieuAnh: string = "";
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = danhSachAnh[0].duLieuAnh;
  }
  return (
    <div className="row align-items-center">
      <div className="col-6 text-center">
        <img src={duLieuAnh} className="float-end" style={{ width: "200px" }} />
      </div>
      <div className="col-2 float-start">
        <h5>{props.sach.tenSach}</h5>
        <p>{props.sach.moTa}</p>
      </div>
    </div>
  );
};

export default CarouselItem;

import React, { useEffect, useState } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import SachModel from "../../../models/SachModel";
import {
  lay1AnhCuaMotSach,
  layToanBoAnhCuaMotSach,
} from "../../../api/HinhAnhAPI";
import { HinhAnhModel } from "../../../models/HinhAnhModel";
import { Link } from "react-router-dom";

interface SachPropsInterface {
  sach: SachModel;
}

// React.FC xác định đây là một functional component trong React.
// SachProps là kiểu của prop mà component nhận vào.=> Chua thong tin SachProps
const SachProps: React.FC<SachPropsInterface> = (props) => {
  // props là cầu nối là cầu nối truyền từ bên kia sang
  const maSach: number = props.sach.maSach;

  const [danhSachAnh, setdanhSachAnh] = useState<HinhAnhModel[]>([]); // su dung useState để lấy thông tin từ API đã viêt ra
  const [dangTaiDuLieu, setdangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(
    () => {
      lay1AnhCuaMotSach(maSach)
        .then((hinhAnhData) => {
          setdanhSachAnh(hinhAnhData);
          setdangTaiDuLieu(false);
        })
        .catch((error) => {
          setdangTaiDuLieu(false);
          setBaoLoi(error.message);
        });
    },
    [] // chi goi 1 lan
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

  // let duLieuAnh: string = "https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg";

  let duLieuAnh: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
  if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
    duLieuAnh = danhSachAnh[0].duLieuAnh;
  }

  return (
    //1. hiển thị hình ảnh src
    <div className="col-md-3 mt-2">
      <div className="card" >
        <Link to={`/sach/${props.sach.maSach}`}>  
            <img
                src={duLieuAnh}
                className="card-img-top"
                alt={props.sach.tenSach}
                style={{ height: "300px" }}
            />
        </Link>
        {/*2. hiển thị giá,*/}
        <div className="card-body">
          <Link to={`/sach/${props.sach.maSach}`} style={{textDecoration:'none', color:"Black"}}>  
            <h5 className="card-title">{props.sach.tenSach}</h5>
            </Link>
          <p className="card-text">{props.sach.moTa}</p>

          <div className="price">
            <span className="original-price">
              <del>{props.sach.giaNiemYet}</del>
            </span>
            <span className="discounted-price">
              <strong>{props.sach.giaBan}</strong>
            </span>
          </div>

          {/* 3. hiển thị icon trái tim, giỏ hàng */}
          <div className="row mt-2" role="group">
            <div className="col-6 d-flex justify-content-start">
              <a className="btn btn-secondary btn-block">
                <i style={{ fontSize: "25px" }}>
                  <FaRegHeart />
                </i>
              </a>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button className="btn btn-danger btn-block">
                <i style={{ fontSize: "25px" }}>
                  <PiShoppingCartFill />
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SachProps;

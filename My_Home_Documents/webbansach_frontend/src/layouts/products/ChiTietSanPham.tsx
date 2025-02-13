import React, { useEffect, useState } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./component/HinhAnhSanPham";
import DanhGiaSanPham from "./component/DanhGiaSanPham";

const ChiTietSanPham: React.FC = () => {
  // lấy mã sách từ url ra
  const { maSach } = useParams();
  //
  let maSachNumber = 0;
  try {
    maSachNumber = parseInt(maSach + "");
    if (Number.isNaN(maSachNumber)) maSachNumber = 0;
  } catch (error) {
    maSachNumber = 0;
    console.error("Error: ", error);
  }
  // khai báo
  const [sach, setSach] = useState<SachModel | null>(null);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(
    () => {
      laySachTheoMaSach(maSachNumber)
        .then(
          (sach) => {
          setSach(sach);
          setDangTaiDuLieu(false);
        })
        .catch((error) => {
          setBaoLoi(error.message);
          setDangTaiDuLieu(false);
        }); // 2 là lỗi
    },
    [maSach] // khi mã sách thay đổi thì trong useEffect được cập nhật lại
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

  //nếu sách ko tồn tại
  if (!sach) {
    return (
      <div>
        <h1>Sách không tồn tại.</h1>
      </div>
    );
  }

  return (
    <div className="container text-start" style={{fontSize:20}}>
      <div className="row mt-4 mb-4 ">
        <div className="col-4">
          <HinhAnhSanPham maSach={maSachNumber}></HinhAnhSanPham>
        </div>
        <div className="col-8">
          <div className="row" style={{fontSize:20}}>
            <div className="col-8" >
              <h1>{sach.tenSach}</h1>
              <h4>{sach.trungBinhXepHang}</h4>
              <h4>{sach.giaBan}</h4>
              <hr></hr>
                <h4>
                  {/* lấy mô tả bằng code html trên mạng */}
                    <div style={{fontSize:15}} dangerouslySetInnerHTML={{__html:(sach.moTa+'')}}/> 
                
                </h4>
              <hr></hr>

            </div>
            <div className="col-4">PHẦN ĐẶT HÀNG</div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <DanhGiaSanPham maSach={maSachNumber}></DanhGiaSanPham>
      </div>
    </div>
  );
};

export default ChiTietSanPham;

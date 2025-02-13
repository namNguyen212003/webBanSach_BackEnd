import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { lay3SachMoiNhat } from "../../../api/SachAPI";
import CarouselItem from "./CarouselItem";
// import { error } from "console";

const Carousel: React.FC = () => {
  // lay sach
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
  const [dangTaiDuLieu, setdangTaiDuLieu] = useState(true);
  const [baoLoi, setBaoLoi] = useState(null);

  useEffect(() => {
    lay3SachMoiNhat()
      .then((kq) => {
        console.log("ket qua: " + kq);

        setDanhSachQuyenSach(kq.ketQua);
        setdangTaiDuLieu(false);
      })
      .catch((error) => {
        console.error("LỗiAPI:", error); // Kiểm tra lỗi

        setdangTaiDuLieu(false);
        setBaoLoi(error.message);
      });
  }, []);

  if (dangTaiDuLieu) {
    return <div>{<h1>Dang tai du lieu</h1>}</div>;
  }

  if (baoLoi) {
    return (
      <div>
        <h1>Gap loi: {baoLoi}</h1>
      </div>
    );
  }

  // const [dangTai]

  return (
    <div id="carouselExampleCaptions" className="carousel carousel-dark slide">
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <CarouselItem key={0} sach={danhSachQuyenSach[0]}></CarouselItem>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <CarouselItem key={1} sach={danhSachQuyenSach[1]}></CarouselItem>
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <CarouselItem key={2} sach={danhSachQuyenSach[2]}></CarouselItem>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;

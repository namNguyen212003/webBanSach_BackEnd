import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";
// them 1 quyen sach moi, ta se truyen jwt len serve nhu the nao?

const SachForm: React.FC<{}> = () => {
  const [sach, setSach] = useState({
    maSach: 0,
    tenSach: "",
    giaBan: 0,
    giaNiemYet: 0,
    moTa: "",
    soLuong: 0,
    tenTacGia: "",
    isbn: "",
    trungBinhXepHang: 0,
  });

  const handleSubmit = (event: FormEvent) => {
    // xu lys gui sach len server
    event.preventDefault();

    // lay token de xem nguoi dung da dang nhap chua? neu roi thi cho phep gui di
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/sach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization' : `Bearer ${token}`
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(sach),
    }).then((response) => {
      if (response.ok) {
        alert("Da them thanh cong!");
        setSach({
          maSach: 0,
          tenSach: "",
          giaBan: 0,
          giaNiemYet: 0,
          moTa: "",
          soLuong: 0,
          tenTacGia: "",
          isbn: "",
          trungBinhXepHang: 0,
        });
      } else {
        alert("Gap loi trong qua trinh them sach!");
      }
    });
  };

  return (
    <div className="container row d-flex text-left aleftlign-items-center justify-content-center mt-3">
      <h1>THEM SACH</h1>
      <div className="col-6">
        <form onSubmit={handleSubmit} className="form">
          <input type="hidden" id="maSach" value={sach.tenSach} />

          <label htmlFor="tenSach">Ten sach</label>
          <input
            className="form-control"
            type="text"
            value={sach.tenSach}
            onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
            required //bat buoc nhap form nay moi submit duoc
          />

          <label htmlFor="giaBan">Gia ban</label>
          <input
            className="form-control"
            type="number"
            value={sach.giaBan}
            onChange={(e) => {
              const value = e.target.value;
              setSach({
                ...sach,
                giaBan: value === "" ? 0 : parseFloat(value),
              });
            }}
            required //bat buoc nhap form nay moi submit duoc
          />

          <label htmlFor="giaNiemYet">Gia niem yet</label>
          <input
            className="form-control"
            type="number"
            value={sach.giaNiemYet}
            onChange={(e) => {
              const value = e.target.value;
              setSach({
                ...sach,
                giaNiemYet: value === "" ? 0 : parseFloat(value),
              });
            }}
            required //bat buoc nhap form nay moi submit duoc
          />

          <label htmlFor="soLuong">So luong</label>
          <input
            className="form-control"
            type="number"
            value={sach.soLuong}
            onChange={(e) => {
              const value = e.target.value;
              setSach({ ...sach, soLuong: value === "" ? 0 : parseInt(value) });
            }}
            required //bat buoc nhap form nay moi submit duoc
          />

          <label htmlFor="tenTacGia">Ten tac gia</label>
          <input
            className="form-control"
            type="text"
            value={sach.tenTacGia}
            onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
            required //bat buoc nhap form nay moi submit duoc
          />

          <label htmlFor="moTa">Mo ta</label>
          <input
            className="form-control"
            type="text"
            value={sach.moTa}
            onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
            required //bat buoc nhap form nay moi submit duoc
          />

          <label htmlFor="isbn">ISBN</label>
          <input
            className="form-control"
            type="text"
            value={sach.isbn}
            onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
            required //bat buoc nhap form nay moi submit duoc
          />

          <button type="submit" className="btn btn-sucess mt-2">
            Luu
          </button>
        </form>
      </div>
    </div>
  );
};

const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm_Admin;

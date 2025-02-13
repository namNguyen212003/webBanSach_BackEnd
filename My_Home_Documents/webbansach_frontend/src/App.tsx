import React, { useState } from "react";
import "./App.css";
import Footer from "./layouts/Footer";
import HomePage from "./layouts/homePage/Homepage";
import Navbar from "./layouts/header-footer/Navbar";
import DanhSachSanPham from "./layouts/products/DanhSachSanPham";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/ChiTietSanPham";
import DangKyNguoiDung from "./layouts/user/DangKyNguoiDung";
import DangNhap from "./layouts/user/DangNhap";
import TestDangNhap from "./layouts/user/TestDangNhap";
import SachForm from "./layouts/admin/SachForm";
import KichHoatTaiKhoan from "./layouts/user/KichHoatTaiKhoan";
import SachForm_Admin from "./layouts/admin/SachForm";

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          tuKhoaTimKiem={tuKhoaTimKiem}
          setTuKhoaTimKiem={setTuKhoaTimKiem}
        />
        {/* <HomePage tuKhoaTimKiem={tuKhoaTimKiem}/> */}
        <Routes>
          <Route
            path="/"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/:maTheLoai"
            element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}
          ></Route>
          <Route path="/sach/:maSach" element={<ChiTietSanPham />} />
          <Route path="/dang-ky" element={<DangKyNguoiDung />}></Route>
          {/* <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan/>}></Route> */}

          <Route path="/dang-nhap" element={<DangNhap />}></Route>
          <Route path="/test-dang-nhap" element={<TestDangNhap />}></Route>
          <Route path="/admin/them-sach" element={<SachForm_Admin />}></Route>

          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

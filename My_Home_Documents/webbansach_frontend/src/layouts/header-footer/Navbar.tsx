import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

import "../../css/navbar.css"; // Import file CSS

interface NavbarProps {
  tuKhoaTimKiem: string;
  setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
  // để truyền dữ liệu từ app

  const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
  // khi nhập nội dung
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTuKhoaTamThoi(e.target.value);
  };
  // khi click chuột
  const handleSearch = () => {
    setTuKhoaTimKiem(tuKhoaTamThoi);
  };
  //Kích hoạt hàm tìm kiếm khi nhấn enter
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // sessionStorage.removeItem("token");
    navigate("/dang-nhap");
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">BookStore</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Trang Chủ
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle "
                  to="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thể Loại sách
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li>
                    {" "}
                    <NavLink className="dropdown-item" to="/1">
                      Thể loại 1
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink className="dropdown-item" to="/2">
                      Thể loại 2
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink className="dropdown-item" to="/3">
                      Thể loại 3
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)">
                  Quy định bán hàng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)">
                  Liên hệ
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm kiếm sách"
                onChange={onSearchInputChange}
                onKeyDown={handleKeyPress}
                value={tuKhoaTamThoi}
              />
              <button
                className="btn btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            <ul className="navbar-nav ms-2">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <FaShoppingCart />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <FaRegUser />
                </a>
              </li>
              <div
                className="navbar-nav pl-2 pt-1 d-flex justify-content-center alignt-item-center"
                style={{ color: "white" }}
              >
                <Link
                  className="nav-item logout-css"
                  onClick={handleLogout}
                  to={"/dang-nhap"}
                >
                  Đăng xuất
                </Link>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

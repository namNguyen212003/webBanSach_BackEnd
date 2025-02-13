import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DangNhap = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginRequest = { username: username, password: password };
    // setLoading(true);
    setError("");

    fetch(
      // hàm để gửi đi username và password
      "http://localhost:8080/tai-khoan/dang-nhap", // sẽ gửi đi, các:
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //yêu cầu dữ liệu gửi đi là JSON.
          Authorization: `Bearer ${localStorage.getItem("token")}`, // gửi token từ localStorage (nếu có).
          Accept: "application/json", // yêu cầu server trả về json
        },
        body: JSON.stringify(loginRequest), // body là chứa dữ liệu đăng nhập dưới dạng JSON.
      }
    )
      .then(
        // sau đó
        (response) => {
          if (response.ok) {
            // Nếu phản hồi thành công
            return response.json(); // chuyển đổi response sang JSON.
          } else {
            throw new Error("Đăng nhập thất bại");
          }
        }
      ) // sau đó, Xử lý dữ liệu đăng nhập thành công
      .then((data) => {
        const { jwt } = data; // xử lý đăng nhập thành công, lấy dữ liệu data (Trích xuất token JWT từ phản hồi.)
        localStorage.setItem("token", jwt); // lưu token vào localStorage để sử dụng cho các yêu cầu sau này.
        // ở đấy có thể Điều hướng đến trang admin hay người dùng, hoặc thực hiện các tác vụ sau đăng nhập
        console.log("data:" + data);
        setError("Đăng nhập thành công");

        navigate("/");
      })
      .catch((error) => {
        // xử lý đăng nhập
        console.error("Đăng nhập thất bại: ", error);
        setError(
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu"
        );
      });
  };

  return (
    <div className="container">
      <div className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Đăng Nhập</h1>
        {/* Nơi nhập tên đăng nhập  */}
        <label className="sr-only">Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          className="form-control mb-2"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Nơi nhập mật khẩu  */}
        <label className="sr-only">Mật khẩu</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-2"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* check box lưu mật khẩu */}
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
        {/* thông báo mỗi khi nhấn nút đăng nhập */}
        {error && <div style={{ color: "green" }}> {error} </div>}
      </div>
    </div>
  );
};

export default DangNhap;

// Tóm tắt luồng hoạt động
// 1.Người dùng nhập tên đăng nhập và mật khẩu.
// 2.Nhấn Đăng nhập, handleLogin được gọi.
// 3.Gửi yêu cầu POST đến API /tai-khoan/dang-nhap.
// 4.Nếu đăng nhập thành công:
// Lưu token vào localStorage.
// Hiển thị thông báo "Đăng nhập thành công".
// 5.Nếu đăng nhập thất bại:
// Hiển thị thông báo lỗi.

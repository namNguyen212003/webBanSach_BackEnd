// cài jwt

import { jwtDecode } from "jwt-decode";
import React from "react";
import { useEffect, useState } from "react";

const TestDangNhap = () => {
  //Tạo một state username để lưu tên đăng nhập của người dùng.
  //Ban đầu, username là null vì chưa có thông tin người dùng.
  const [username, setUsername] = useState<String | null>(null);
  // khi người dùng có hành động thì ta load lại bằng useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    // nếu token tồn tại (đẵ từng đăng nhập rồi)
    if (token) {
      const userData = jwtDecode(token); //giải mã
      console.log(userData);
      if (userData) {
        //nếu có dữ liệu
        setUsername(userData.sub + ""); //sub=subject
      }
    }
  }, []);
  fetch("http://localhost:8080/tai-khoan/dang-nhap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(
      // tình huống khác
      (response) => {
        if (response.ok) {
          console.log(response.json());
          return response.json();
        } else {
          throw new Error("Đăng nhập thất bại");
        }
      }
    )
    .then((data) => {
      // xử lý đăng nhập thành công
      const { jwt } = data;
      // lưu token vào localStorage
      localStorage.setItem("token", jwt);
      // ở đấy có thể Điều hướng đến trang admin hay người dùng, hoặc thực hiện các tác vụ sau đăng nhập
    })
    .catch((error) => {
      // xử lý đăng nhập
      console.error("loi: ", error);
    });

  // fetch('http://localhost:8080/tai-khoan/profile',
  //     {
  //         method:'GET',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //     }
  // ).then ( // tình huống khác
  //     (response) => {
  //         if(response.ok){
  //             console.log(response.json())
  //             return response.json();
  //         } else {
  //             throw new Error('Đăng nhập thất bại')
  //         }
  //     }
  // ).then (
  //     (data) => {
  //         // xử lý đăng nhập thành công
  //         const {jwt} = data;
  //         // lưu token vào localStorage
  //         localStorage.setItem('token', jwt);
  //         // ở đấy có thể Điều hướng đến trang admin hay người dùng, hoặc thực hiện các tác vụ sau đăng nhập
  //     }
  // ).catch ((error) => {
  //     // xử lý đăng nhập
  //     console.error("loi: ", error);
  // })

  return <div>{username && <div>Xin chào, {username}</div>}</div>;
};
export default TestDangNhap;

// để chuyển trang import UseNavigate
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";

// dựa trên interface lấy 1 vài thông tin
interface JwtPayload {
  isAdmin: boolean;
  isStaff: boolean;
  isUser: boolean;
}
const RequireAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("Token:" + token);
      //Trong tình huống chưa đăng nhập
      if (!token) {
        navigate("/dang-nhap");
        return;
      } else {
        //giải mã token
        const decodedToken = jwtDecode(token) as JwtPayload;
        console.log(decodedToken);

        //lấy thông tin cụ thể
        const isAdmin = decodedToken.isAdmin;

        //Kiểm tra không phải là admin
        if (!isAdmin) {
          navigate("/dang-nhap");
          return;
        }
      }
      return () => {};
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
  return WithAdminCheck;
};
export default RequireAdmin;

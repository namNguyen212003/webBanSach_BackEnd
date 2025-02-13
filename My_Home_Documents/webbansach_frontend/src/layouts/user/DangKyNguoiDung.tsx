import React, { useState } from "react";

function DangKy(){
    // 
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [hoDem, sethoDem] = useState("");
    const [ten, setTen] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M');

    // các biến báo lỗi
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
    const [thongBao, setThongBao] = useState("");

    // xử lý chọn
    const handleSubmit = async (e: React.FormEvent) => {
        // xóa bất kỳ lỗi trước
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');

        // Tránh click liên tục, khi click xong thì phải chờ xử lý để làm tiếp
        e.preventDefault();

        // kiểm tra điều kiện và gán kết quả vào biến. (kiểm tra thêm 1 lần nữa)
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailDaTonTai(email);
        const isMatKhauValid = !await kiemTraMatKhauDaTonTai(matKhau);
        const isMatKhauLapLaiValid = !await kiemTraMatKhauLapLai(matKhauLapLai);
        
        // kiểm tra tất cả các điều kiện (nếu đã valid)
        if(isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid){
            // gọi đến endPoin bằng post
            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';
                const  response = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        gioiTinh: gioiTinh,
                        daKichHoat: 0,
                        maKichHoat: ""
                    })
                });
                if(response.ok){
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!")
                }else{
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    }

    // hàm KIỂM TRA TÊN ĐĂNG NHẬP đã tồn tại hay chưa?
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
        // end-poin để kiểm tra xem tên tồn tại chưa

        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;
        console.log(url)

        // Gọi API và sét báo lỗi khi gặp lỗi

        try {
            const response = await fetch(url);
            const data = await response.text();
            if(data === "true"){
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập.")
            return false;
        }       

    }

    // Hàm xử lý thay đổi tên đăng nhập
    const handleTenDangNhapChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        // Thay đổi giá trị
        setTenDangNhap(e.target.value); // cho phép người dùng nhập vào ô textBox

        // Kiểm tra
        setErrorTenDangNhap('');
        return kiemTraTenDangNhapDaTonTai(e.target.value)
    }

    

     //////////////////////////////////////////////////////////////


     // hàm KIỂM TRA EMAIL đã tồn tại hay chưa?
     const kiemTraEmailDaTonTai = async (email: string) => {
        // end-poin để kiểm tra xem tên tồn tại chưa

        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;
        console.log(url)

        // Gọi API và sét báo lỗi khi gặp lỗi

        try {
            const response = await fetch(url);
            const data = await response.text();
            if(data === "true"){
                setErrorEmail("Email đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra Email.")
            return false;
        }       

    }

    // Hàm xử lý thay đổi tên đăng nhập
    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        // Thay đổi giá trị
        setEmail(e.target.value); // cho phép người dùng nhập vào ô textBox

        // Kiểm tra
        setErrorEmail('');
        return kiemTraEmailDaTonTai(e.target.value)
    }

    //////////////////////////////////////////////////////////////


     // hàm KIỂM TRA MẬT KHẨU đã tồn tại hay chưa?
     const kiemTraMatKhauDaTonTai = async (matKhau: string) => {
        // mật khẩu: độ dài 8 ký tự trở lên, chứa ít nhất 1 trong những ký tự này () còn lại ký tự khác cũng được.
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if(!passwordRegex.test(matKhau)){
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự trở lên, chứa ít nhất 1 trong những ký tự đặc biệt (!@#$%^&*)");
            return true;
        }else{
            setErrorMatKhau("");
            return false;
        }
    }

    // Hàm xử lý thay đổi tên đăng nhập
    const handleMatKhauChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        // Thay đổi giá trị
        setMatKhau(e.target.value); // cho phép người dùng nhập vào ô textBox

        // Kiểm tra
        setErrorMatKhau('');
        return kiemTraMatKhauDaTonTai(e.target.value)
    }

    //////////////////////////////////////////////////////////////


     // hàm KIỂM TRA MẬT KHẨU LẶP LẠI

     const kiemTraMatKhauLapLai = (matKhauLapLai: string) => {
        if(matKhauLapLai !== matKhau){
            setErrorMatKhauLapLai("Mật khẩu không trùng khớp");
            return true;
        }else{
            setErrorMatKhauLapLai(""); // mật khẩu đã trùng
            return false;
        }
    }

    const handleMatKhauLapLaiChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        // Thay đổi giá trị
        setMatKhauLapLai(e.target.value); // cho phép người dùng nhập vào ô textBox

        // Kiểm tra
        setErrorMatKhauLapLai('');
        return kiemTraMatKhauLapLai(e.target.value)
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form" style={{}}>
                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                        <input 
                            type="text"
                            id="tenDangNhap" 
                            className="form-control"
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange}
                        />
                        <div style={{color:"red"}}>{errorTenDangNhap}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="text"
                            id="email" 
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div style={{color:"red"}}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhau" className="form-label">Mật Khẩu</label>
                        <input 
                            type="text"
                            id="matKhau" 
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange}
                        />
                        <div style={{color:"red"}}>{errorMatKhau}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhauLapLai" className="form-label">Nhập Lại Mật Khẩu</label>
                        <input 
                            type="text"
                            id="matKhauLapLai" 
                            className="form-control"
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLaiChange}
                        />
                        <div style={{color:"red"}}>{errorMatKhauLapLai}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hoDem" className="form-label text-start">Họ đệm</label>
                        <input 
                            type="text"
                            id="hoDem" 
                            className="form-control"
                            value={hoDem}
                            onChange={(e)=>sethoDem(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ten" className="form-label">Tên</label>
                        <input 
                            type="text"
                            id="ten" 
                            className="form-control"
                            value={ten}
                            onChange={(e)=>setTen(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                        <input 
                            type="text"
                            id="soDienThoai" 
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e)=>setSoDienThoai(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <input 
                            type="text"
                            id="gioiTinh" 
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e)=>setGioiTinh(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng ký</button>
                        <div style={{color:"green"}}>{thongBao}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DangKy;
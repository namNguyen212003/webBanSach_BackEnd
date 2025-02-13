import React from "react";

function Banner () {
    return (
        <div className="p-2 mb-2 bg-dark">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h3 className="display-5 fw-bold">
                        CHÀO MỪNG BẠN ĐẾN VỚI BOOKSTORE
                    </h3>
                    <p style={{display:"flex", justifyContent:"flex-start"}}>Nam không bao giờ bỏ cuộc</p>
                    <button className="btn btn-primary btn-lg float-end">Khám phá sách tại BookStore</button>
                </div>
            </div>
        </div>
        

    );
}

export default Banner;
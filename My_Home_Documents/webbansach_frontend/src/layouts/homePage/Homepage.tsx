import React from "react";
import Banner from "./component/Banner";
import Carousel from "./component/Carousel";
// import List from "../products/List";
import DanhSachSanPham from "../products/DanhSachSanPham";
import { useParams } from "react-router-dom";

interface HomePageProps {
    tuKhoaTimKiem: string;
}

function HomePage ({tuKhoaTimKiem}: HomePageProps) {

    const {maTheLoai} = useParams();
    let maTheLoaiNumber = 0;

    try {
        maTheLoaiNumber = parseInt(maTheLoai+''); //NaN
    } catch (error) {
        maTheLoaiNumber = 0;
        console.error('Error: ', error);
    }
    if(Number.isNaN(maTheLoaiNumber)) //neu ko xác định
        maTheLoaiNumber = 0;

    return (
        <div>
            <Banner/>
            <Carousel/>
            <DanhSachSanPham tuKhoaTimKiem = {tuKhoaTimKiem} maTheLoai={maTheLoaiNumber}/>
        </div>
    );
}

export default HomePage;
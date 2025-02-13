import React from "react";
import { myRequest } from "./Request";
import DanhGiaModel from "../models/DanhGiaModel";


async function layDanhGiaCuaMotSach(duongDan: string): Promise<DanhGiaModel[]>{
    const ketQua: DanhGiaModel[] = [];

    // gọi phương thức request
    const response = await myRequest(duongDan);

    // lấy json sách
    const responseData = response._embedded.DanhGias;

    for (const key in responseData) {
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet,
        });
    }
    return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> { // lấy toàn bộ sách, trả về mảng toàn bộ sách
    const duongDan: string = `http://localhost:8080/su-danh-gia/${maSach}/danhSachSuDanhGia`;     // Xac dinh endPoint: localhost: 8080 cua backend
    return layDanhGiaCuaMotSach(duongDan);
}

export async function lay1AnhCuaMotSach(maSach: number): Promise<DanhGiaModel[]> { // lấy toàn bộ sách, trả về mảng toàn bộ sách
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia?sort=maDanhGia,asc&page=0&size=1`;// Xac dinh endPoint: localhost: 8080 cua backend
    return layDanhGiaCuaMotSach(duongDan);
}

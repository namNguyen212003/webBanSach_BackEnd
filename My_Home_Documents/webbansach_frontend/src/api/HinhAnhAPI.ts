import React from "react";
import { myRequest } from "./Request";
import { HinhAnhModel } from "../models/HinhAnhModel";


async function layAnhCuaMotSach(duongDan: string): Promise<HinhAnhModel[]>{
    const ketQua: HinhAnhModel[] = [];
    // gọi phương thức request
    const response = await myRequest(duongDan);
    // lấy json sách
    const responseData = response._embedded.hinhAnhs;
    for (const key in responseData) {
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            duLieuAnh: responseData[key].duLieuAnh,
            duongDan: responseData[key].duongDan,
            laIcon: responseData[key].laIcon
        });
    }
    return ketQua;
}

export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> { // lấy toàn bộ sách, trả về mảng toàn bộ sách
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;     // Xac dinh endPoint: localhost: 8080 cua backend
    return layAnhCuaMotSach(duongDan);
}

export async function lay1AnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> { // lấy toàn bộ sách, trả về mảng toàn bộ sách
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=3`;// Xac dinh endPoint: localhost: 8080 cua backend
    return layAnhCuaMotSach(duongDan);
}

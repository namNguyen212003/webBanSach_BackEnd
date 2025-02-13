import React from "react";
import SachModel from "../models/SachModel";
import { myRequest } from "./Request";

interface KetQuaInterface {
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

export async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];
    // Goi phuong thuc request
    const response = await myRequest(duongDan);
    // lay ra json sách
    const responseData = response?._embedded?.saches;
    // lay thong tin trang
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key]?.maSach,
            tenSach: responseData[key]?.tenSach,
            giaBan: responseData[key]?.giaBan,
            giaNiemYet: responseData[key]?.giaNiemYet,
            moTa: responseData[key]?.moTa,
            soLuong: responseData[key]?.soLuong,
            tenTacGia: responseData[key]?.tenTacGia,
            trungBinhXepHang: responseData[key]?.trungBinhXepHang
        });
    }
    return { ketQua: ketQua, tongSoSach: tongSoTrang, tongSoTrang: tongSoTrang };
}

// Hàm lấy toàn bộ sách theo mã sách giảm dần
export async function layToanBoSach(trangHienTai): Promise<KetQuaInterface> {

    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trangHienTai}`;

    return laySach(duongDan);
}

// Hàm lấy 3 sách mới nhất
export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {

    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&page=0&size=3`;
    console.log("Gọi API lấy 3 sách mới nhất:", duongDan);
    return laySach(duongDan);
}

// Hàm Tìm kiếm sách
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {

    let duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

    console.log("tim kiem sach:", duongDan);
    if (tuKhoaTimKiem !== '' && maTheLoai === 0) { //tức là có dữ liệu
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}`;
    } else if (tuKhoaTimKiem === '' && maTheLoai > 0) { //tức là có dữ liệu
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&maTheLoai=${maTheLoai}`;
    } else if (tuKhoaTimKiem !== '' && maTheLoai > 0) { //tức là có dữ liệu
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&tenSach=${maTheLoai}&tenSach=${tuKhoaTimKiem}`;
    }
    return laySach(duongDan);
}

// Hàm lấy sách theo mã sách (xem chi tiết thông tin sách)
export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {

    const duongDan = `http://localhost:8080/sach/${maSach}`;

    try {
        // gọi phương thức request
        const response = await fetch(duongDan);
        if (!response.ok) {
            throw new Error('Gặp lỗi trong quá trình gọi API lấy sách!')
        }
        // lấy ra json sách
        const sachData = await response.json();

        if (sachData) {
            return {
                maSach: sachData.maSach,
                tenSach: sachData.tenSach,
                giaBan: sachData.giaBan,
                giaNiemYet: sachData.giaNiemYet,
                moTa: sachData.moTa,
                soLuong: sachData.soLuong,
                tenTacGia: sachData.tenTacGia,
                trungBinhXepHang: sachData.trungBinhXepHang,
            }
        } else {
            throw new Error('Sách không tồn tại');
        }
    } catch (error) {
        console.error("Error", error);
        return null; // ✅ Bổ sung return để TypeScript không báo lỗi

    }
}

export default KetQuaInterface;
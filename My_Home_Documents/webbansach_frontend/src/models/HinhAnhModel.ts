export class HinhAnhModel {
    maHinhAnh: number;
    tenHinhAnh?: string;
    duLieuAnh?: string;
    duongDan?: string;
    laIcon?: Boolean;

    constructor(
        maHinhAnh: number,
        tenHinhAnh: string,
        duLieuAnh: string,
        duongDan: string,
        laIcon: Boolean
    ) {
        this.maHinhAnh = maHinhAnh;
        this.tenHinhAnh = tenHinhAnh;
        this.duLieuAnh = duLieuAnh;
        this.duongDan = duongDan;
        this.laIcon = laIcon;
    }
}


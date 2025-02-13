import React from "react";

interface PhanTrangInterface {
    trangHienTai: number;
    tongSoTrang: number;
    phanTrang: any
}

export const PhanTrang: React.FC<PhanTrangInterface> = (props) => {
    const danhSachTrang: number []= []; // mảng để hiển thị trang

    // giai thuat
    if(props.trangHienTai === 1){
        danhSachTrang.push(props.trangHienTai); //push đẩy phía sau trang hiện tại = 1 luôn
        if(props.tongSoTrang >= props.trangHienTai+1){ //nếu tổng số trang >= trang hiện tại + 1 (2) 
            danhSachTrang.push(props.trangHienTai+1); //thì thêm 1 trang nữa
        }
        if(props.tongSoTrang >= props.trangHienTai+2){ //nếu tổng số trang >= trang hiện tại + 2 (3) (>3)
            danhSachTrang.push(props.trangHienTai+2); //thì thêm 1 trang nữa
        }
    }else if(props.trangHienTai>1){ // ngược lại nếu trang hiện tai > 1
        // trang -2
        if(props.trangHienTai >= 3){
            danhSachTrang.push(props.trangHienTai-2); // 2 trang phía trước
        }
        // trang -1
        if(props.trangHienTai >= 2){
            danhSachTrang.push(props.trangHienTai-1); // thêm 1 trang phía trước
        }
        // bản thân nó
        danhSachTrang.push(props.trangHienTai); //
        // trang + 1
        if(props.tongSoTrang >= props.trangHienTai+1){ // nếu tổng số trang  > trang hiện tại + 1
            danhSachTrang.push(props.trangHienTai+1);
        }
        // trang + 2
        if(props.tongSoTrang > props.trangHienTai+2){ // nếu tổng số trang  > trang hiện tại + 2
            danhSachTrang.push(props.trangHienTai+2);
        }
    }

    return (
        <nav aria-label="">
        <ul className="pagination">
            <li className="page-item" onClick={() => props.phanTrang(1)}>
                <button className="page-link">
                    Trang đầu
                </button> 
            </li>
            
            {
                danhSachTrang.map(trang => (
                    <li className="page-item" key={trang} onClick={() => props.phanTrang(trang)}>
                        <button className={"page-link" + (props.trangHienTai===trang?"active":"")}>
                            {trang}
                        </button> 
                    </li>
                ))
            }
            
            <li className="page-item" onClick={() => props.phanTrang(props.tongSoTrang)}>
                <button className="page-link">
                    Trang cuối
                </button> 
            </li>
        </ul>
        </nav>
    );
};

export default PhanTrang;

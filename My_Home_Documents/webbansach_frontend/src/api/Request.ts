// để trả về dữ liệu json
export async function myRequest (duongDan:string){
    try {
        const response = await fetch(duongDan);    // truy vấn đến đường dẫn lấy thông tin
        if(!response.ok){ // nếu lỗi
            throw new Error(`Không thể truy cập đường dẫn${duongDan}`);
        }
        return response.json(); // trả về dữ liệu trong json
    } catch (error) {
        console.log("ERROR: ", error);
    }
}
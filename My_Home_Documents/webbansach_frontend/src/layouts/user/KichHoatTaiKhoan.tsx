import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KichHoatTaiKhoan() {
    const [email, setEmail] = useState("");
    const [maKichHoat, setMaKichHoat] = useState("");
    const [daKichHoat, setDaKichHoat] = useState("");
    
    useEffect(() => {
        //
        const searchParams = new URLSearchParams(window.location.search);
        const emailParam = searchParams.get("email");
        const maKichHoatParam = searchParams.get("maKichHoat");
        
        if(emailParam && maKichHoatParam){
            setEmail(emailParam);
            setMaKichHoat(maKichHoatParam);
            thucHienKichHoat();
        }

        return () => {
            
        };

    }, []);    
    const thucHienKichHoat = async () => {
        // try {
        //     const url: string = `http://localhost:8080/tai-khoan/kich-hoat?email=${}&maKichHoat=${maKichHoat}`;
        //     const response = await fetch(url,
        //         // method: "GET",
                
        //     );
        // } catch (error) {
            
        // }
    }
    
}

export default KichHoatTaiKhoan; 



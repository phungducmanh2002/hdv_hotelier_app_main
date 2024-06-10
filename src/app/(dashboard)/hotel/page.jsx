'use client'
import ButtonCustom from "@/components/button/button";
import GridListHotel from "@/components/grid/gridListHotel"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"
import UserSession from "@/utils/user"
import { useEffect } from "react";
import { findHotelByIdUser } from "@/modules/user/service";
const listHotel = [
    {"id": 1, "name": "khach san 1", "hoteline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"},
    {"id": 1,"name": "khach san 1", "hotline": "012301230123"}
]
const PageHotel = () => {
    const [hotels, setHotels] = useState([]);
    const router = useRouter();
    const pathname = usePathname();
    const userSession = UserSession.getInstance();
    const user = userSession.getIdUser();
    // setHotels(listHotel);

    useEffect(()=>{
        findHotelByIdUser(user).then((res)=>{
            if (res.code === 200){
                console.log(res.data)
                setHotels(res.data)
            }
           
        })
    }, [])
    const handleClick = () => {
        router.push(`${pathname}/regisHotel`)
    }
    return (
        <>
            <div className="mb-2"> 
                <GridListHotel items={hotels}></GridListHotel>
            </div>
            <div className="flex justify-center">

                <ButtonCustom label="Đăng ký khách sạn" handleClick={handleClick}></ButtonCustom>
            </div>
        </>
    )
}
export default PageHotel
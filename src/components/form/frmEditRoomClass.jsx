
'use client'
import InputText from "../input/inputText";

import ButtonCustom from "../button/button";

import { useEffect, useState } from "react";

import {updateHotelRoomClass } from "@/modules/hotels/service";

import { getRoomClassById } from "@/modules/room-classes/service";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getHotelRoomClassById } from '@/modules/hotel_roomClasses/service';

export default function FrmEditRoomClass({params}){
    const [roomClass, setRoomClass] = useState({
        "roomPrice":""
    });
    const [nameRoomClass, setNameRoomClass] = useState();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        getRoomClassById(params.roomClassId).then((res)=>{
            if (res.code === 200){
                setNameRoomClass(res.data.name)
            }
            
        })
            
    }, [])
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRoomClass({
            ...roomClass,
            [name]: value
        })
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // alert(JSON.stringify(roomClass))
       
        updateHotelRoomClass(params.hotelId, params.roomClassId, roomClass).then((res)=>{
            if (res.code === 200){
                alert(`Cập nhật hạng phòng của khách sạn thành công!`)
                router.push(`${pathname.split('/').slice(0,4).join('/')}`);
            }
            else{
                alert(`Cập nhật hạng phòng của khách sạn thất bại! Vui lòng kiểm tra lại giá nhập`)
            }
        })
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md`}>
                <h1 className="text-2xl mb-2">Tên hạng phòng: {nameRoomClass}</h1>
                <InputText label="Nhập giá thay đổi:" name="roomPrice" type="number" value={roomClass.roomPrice} onChange={handleChange}></InputText>
                <ButtonCustom label="Áp dụng" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
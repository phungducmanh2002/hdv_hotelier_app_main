
'use client'
import { useEffect, useState } from "react";
import InputText from "../input/inputText";
import Combobox from '../combobox';
import ButtonCustom from "../button/button";
import { createRoomForHotel, getRoomClassesByHotel } from "@/modules/hotels/service";
import { usePathname, useRouter } from "next/navigation";
import { getRoomById, updateRoom } from "@/modules/rooms/service";

export default function FrmEditRoom({params}){
    const [newRoom, setNewRoom] = useState({
        'name':'',
        'idHotel':'',
        'idRoomClass':''
    });
    const router = useRouter();
    const pathname = usePathname();
    const [roomClasses, setRoomClasses] = useState([]);
    useEffect(()=>{
        getRoomById(params.roomId).then((res)=>{
            if (res.code === 200){
                newRoom.name = res.data.name;
                
            }
        })
    },[])
    useEffect(()=>{
        getRoomClassesByHotel(params.hotelId).then((res)=>{
            if (res.code === 200){
                setRoomClasses(res.data.map((roomClass)=>({
                    label: roomClass.name,
                    value: roomClass.id
                })))
            }
        })
    }, [])
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewRoom({
            ...newRoom,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        newRoom.idHotel = params.hotelId;
        // alert(JSON.stringify(newRoom))
        updateRoom(params.roomId, newRoom).then((res)=>{
            if (res.code === 200){
                alert(`Phòng ${newRoom.name} cập nhật thành công!`)
                router.push(`${pathname.split('/').slice(0,4).join('/')}`);
            }
            else{
                alert(`Tên phòng ${newRoom.name} đã được áp dụng cho hạng phòng này! Vui lòng chọn tên khác!`)
            }
        })
    }
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4  border-2 rounded-md`}>
                <div className="flex justify-center">
                    <div>Chỉnh sửa phòng</div>
                </div>
                <InputText label="Nhập tên phòng: " name="name" value={newRoom.name} type="text" onChange={handleChange}></InputText>
                <Combobox label="Chọn hạng phòng" name="idRoomClass" value={newRoom.idRoomClass} onChange={handleChange} options={roomClasses}></Combobox>
                <ButtonCustom label="Xác nhận" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}

'use client'
import { useEffect, useState } from "react";
import InputText from "../input/inputText";
import Combobox from '../combobox';
import ButtonCustom from "../button/button";
import { createRoomForHotel, getRoomClassesByHotel } from "@/modules/hotels/service";
import { usePathname, useRouter } from "next/navigation";

export default function FrmEditRoom({params}){
    const [newRoom, setNewRoom] = useState({
        'name':'',
    });
    const router = useRouter();
    const pathname = usePathname();
    const [roomClasses, setRoomClasses] = useState([]);
    const [roomClassId, setRoomClassId] = useState();
    useEffect(()=>{
        getRoomClassesByHotel(params.hotelId).then((res)=>{
            if (res.code === 200){
                setRoomClasses(res.data.map((roomClass)=>({
                    label: roomClass.name,
                    value: roomClass.id
                })))
            }
        })
    },[])
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewRoom({
            ...newRoom,
            [name]: value
        })
    }
    const handleChangeRoomClassId = (e) =>{
        const {name, value} = e.target;
        setRoomClassId(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(newRoom))
        createRoomForHotel(params.hotelId, roomClassId, newRoom).then((res)=>{
            if (res.code === 200){
                if (window.confirm('Thêm hạng phòng mới thành công. Bạn có muốn thêm tiếp?')) {
                    
                }
                else{
                    router.push(`${pathname.split('/').slice(0,4).join('/')}`);
                }
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
                <Combobox label="Chọn hạng phòng" name="roomClass" value={roomClassId} onChange={handleChangeRoomClassId} options={roomClasses}></Combobox>
                <ButtonCustom label="Xác nhận" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
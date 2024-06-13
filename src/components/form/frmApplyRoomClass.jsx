
'use client'
import InputText from "../input/inputText";

import ButtonCustom from "../button/button";

import { useEffect, useState } from "react";
import Combobox from '../combobox';
import { getRoomClassesNotByHotel, applyRoomClass } from "@/modules/hotels/service";

export default function FrmApplyRoomClass({params}){
    const [roomClass, setRoomClass] = useState({
        "roomPrice":""
    });
    const [roomClasses, setRoomClasses] = useState([]);
    const [roomClassSelected, setRoomClassSelected] = useState();
    useEffect(()=>{
        getRoomClassesNotByHotel(params.hotelId).then((res)=>{
            if (res.code === 200){
                setRoomClasses(res.data.map((roomClass)=>({
                    label: roomClass.name,
                    value: roomClass.id
                }
                    
                )))
            }
        })
    },[])
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRoomClass({
            ...roomClass,
            [name]: value
        })
    }
    const handleChangeRoomClassSelected = (e) => {
        const {name, value} = e.target;
        setRoomClassSelected(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // alert(JSON.stringify(roomClass))
       
        applyRoomClass(params.hotelId, roomClassSelected, roomClass).then((res)=>{
            if (res.code == 201){
                if (window.confirm('Áp dụng hạng phòng mới thành công. Bạn có muốn thêm tiếp?')) {
                    newRoomClass.roomPrice = '';
                }
                else{
                    router.push(`${pathname.split('/').slice(0,4).join('/')}`);
                }
            }
        })
    }

    return (
        <div className="flex justify-center">
            
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md`}>
                <div className="flex justify-center mb-2">
                    <div className="text-xl">Áp dụng hạng phòng mới</div>
                </div>
                <Combobox label="Chọn hạng phòng: " name="roomClassSelected" value={roomClassSelected} options={roomClasses} onChange={handleChangeRoomClassSelected}></Combobox>
                <InputText label="Nhập giá" name="roomPrice" type="number" value={roomClass.roomPrice} onChange={handleChange}></InputText>
                <ButtonCustom label="Áp dụng" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}

'use client'
import InputText from "../input/inputText";

import ButtonCustom from "../button/button";

import { useState } from "react";
import Combobox from '../combobox';

export default function FrmApplyRoomClass({params}){
    const [roomClass, setRoomClass] = useState({
        "idHotel":'',
        "idRoomClass":"",
        "roomPrice":''
    });

    const [roomClasses, setRoomClasses] = useState([
        {"value": 1, "label": "single"},
        {"value": 2, "label": "two"},
        {"value": 3, "label": "double"},
        {"value": 4, "label": "twin"},
        {"value": 5, "label": "one bed"},
        {"value": 6, "label": "queen"},
        {"value": 7, "label": "king"},
    ]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRoomClass({
            ...roomClass,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        roomClass.idHotel = params.hotelId;
        alert(JSON.stringify(roomClass))
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md`}>
                <Combobox label="Chọn hàng phòng: " name="idRoomClass" value={roomClass.idRoomClass} options={roomClasses} onChange={handleChange}></Combobox>
                <InputText label="Nhập giá" name="roomPrice" type="number" value={roomClass.roomPrice} onChange={handleChange}></InputText>
                <ButtonCustom label="Áp dụng" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
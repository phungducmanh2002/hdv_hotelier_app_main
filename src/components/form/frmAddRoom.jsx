
'use client'
import { useState } from "react";
import InputText from "../input/inputText";
import Combobox from '../combobox';
import ButtonCustom from "../button/button";

const listRoomClass = [
    {"value": 1, "label": "single"},
    {"value": 2, "label": "two"},
    {"value": 3, "label": "double"},
    {"value": 4, "label": "twin"},
    {"value": 5, "label": "one bed"},
    {"value": 6, "label": "queen"},
    {"value": 7, "label": "king"},
]
export default function FrmAddRoom(){
    const [newRoom, setNewRoom] = useState({
        'name':'',
        'idHotel_roomClass':''
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewRoom({
            ...newRoom,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(newRoom))
    }
    return(
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4  border-2 rounded-md`}>
                <InputText label="Nhập tên phòng: " name="name" value={newRoom.name} type="text" onChange={handleChange}></InputText>
                <Combobox label="Chọn hạng phòng" name="idHotel_roomClass" value={newRoom.idHotel_roomClass} onChange={handleChange} options={listRoomClass}></Combobox>
                <ButtonCustom label="Xác nhận" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
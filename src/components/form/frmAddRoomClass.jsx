
'use client'
import InputText from "../input/inputText";

import ButtonCustom from "../button/button";

import { useState } from "react";
import { createRoomClass } from "@/modules/room-classes/service";
import { usePathname, useRouter } from "next/navigation";

export default function FrmAddRoomClass({params}){
    const router = useRouter();
    const pathname = usePathname();
    const [newRoomClass, setNewRoomClass] = useState({
        "name":'',
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewRoomClass({
            ...newRoomClass,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(newRoomClass))
        createRoomClass(newRoomClass).then((res)=>{
            if (res.code === 201){
                if (window.confirm('Thêm hạng phòng mới thành công. Bạn có muốn thêm tiếp?')) {
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
                <InputText label="Nhập tên hạng phòng: " name="name" value={newRoomClass.name} type="text" onChange={handleChange}></InputText>
                <ButtonCustom label="Xác nhận thêm" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
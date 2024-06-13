'use client'
import { useState } from "react";
import InputText from "../input/inputText";
import Link from "next/link";
import { createAccount } from "@/modules/accounts/service";
import { useRouter } from "next/navigation";
import Combobox from "../combobox";
import RadioButton from "../radioButton";
const genders = [
    {'label': 'Nam', 'value': 1},
    {'label': 'Nữ', 'value': 0}
]
export default function FrmSigup(){
    
    const router = useRouter();
    const [newAccount, setNewAccount] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "gender": "",
        "birthDay": ""
    });
    const [genderSelected,setGenderSelected] = useState();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewAccount({
            ...newAccount,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        newAccount.gender = genderSelected;
        // alert(JSON.stringify(newAccount));

        createAccount(newAccount).then((res)=>{
            if (res.code === 201){
                router.push("/sigin")
                alert("Dang ky thanh cong! Vui long dang nhap")
                localStorage.setItem('idAccount', res.data.idAccount);
                
            }
        })
        
    }
    const handleChangeGender = (value)=>{
        setGenderSelected(value)
    }
    return (
        <div className='h-screen bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            <div className='flex text-xl mb-2'>Đăng ký</div>
            <InputText label="Họ: " name="firstName" value={newAccount.firstName} onChange={handleChange} type="text"></InputText>
            <InputText label="Tên: " name="lastName" value={newAccount.lastName} onChange={handleChange} type="text"></InputText>
            <InputText label="Email: " name="email" value={newAccount.email} onChange={handleChange} type="text"></InputText>
            <InputText label="Mật khẩu: " name="password" value={newAccount.password} onChange={handleChange} type="password"></InputText>
            <RadioButton label="Chọn giới tính: " items={genders} selectedValue={genderSelected} onChange={handleChangeGender}/>
            <InputText label="Ngày sinh: " name="birthDay" value={newAccount.birthDay} onChange={handleChange} type="date"></InputText>
            <Link href="/sigin" className='underline mb-2'>Đăng nhập</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Đăng ký</button>
            </form>
    </div>
    )
}
'use client'
import { createUser } from "@/modules/account/service";
import { useState } from "react"
import InputText from "../input/inputText";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import userSession from "@/utils/user"
export default function FrmCreateUser(){
    const router = useRouter();
    const pathname = usePathname();
    const [newUser, setNewUser] = useState({
        "username":"",
        "idAccount":"",
        "idRole":""
    }
    );
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // role = 2 la tai khoan cua hotelier
        newUser.idRole = 2
        const idAccountlocal = localStorage.getItem('idAccount');
        newUser.idAccount = parseInt(idAccountlocal);
        alert(JSON.stringify(newUser))
        createUser(newUser.idAccount, newUser).then((res)=>{
            if (res === 200){
                router.push("/hotel")
                alert("tao user thanh cong! Chuyen den trang dashboard")
                userSession.setIdUser(res.data.id);
            }
            else{
                alert(`${res.message}`)
            }
           
        })
        
    }
    return (
        <div className='h-screen bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            <div className='flex text-xl mb-2'>Tạo username</div>
            <InputText label="Username: " name="username" value={newUser.username} onChange={handleChange} type="text"></InputText>
            <Link href="/sigin" className='underline mb-2'>Đăng nhập</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Tạo user</button>
            </form>
    </div>
    )
}
'use client'
import { useState } from "react"
import InputText from "../input/inputText";
import Link from "next/link";
import { decodeToken, generateTokenFromAccount } from "@/modules/auth/service";
import { usePathname, useRouter } from "next/navigation";
import UserSession from "@/utils/user";
import { getUsersByAccount } from "@/modules/accounts/service";
export default function FrmSigin(){
    
    const router = useRouter();
    const pathname = usePathname();
    const [account, setAccount] = useState({
        "email":"",
        "password":"",
        "idRole":""
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAccount({
            ...account,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // role = 2 la tai khoan cua hotelier
        account.idRole = 2
        // router.push("/hotel")
        // userSession.setIdUser(1);
       
        generateTokenFromAccount(account).then((res)=>{
            if (res.code === 200){
                // alert(JSON.stringify(res.data))
                
                decodeToken({"token": res.data}).then((res)=>{
                    if (res.code === 200){
                        const {id, idAccount, idRole, username} = res.data
                        // alert(idAccount)
                        alert("đăng nhập thành công! chuyển đến dashboard")
                        const userSession = UserSession.getInstance();
                        userSession.setIdUser(id);
                        router.push("/hotel");
                    }
                })
            }
            else if (res.code === 404){
                localStorage.setItem('idAccount', res.data.id);
                router.push(`${pathname}/createUser`)
            }
            else{
                alert(`${res.message}`)
            }
        })
        // alert(JSON.stringify(account));
    }
    return (
        <div className='h-screen bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            <div className='flex text-xl mb-2'>Welcom back!</div>
            <div className='flex text-sm mb-2'>Log in to manage your accommodation from checking reservations to managing room availability!</div>
            <InputText label="Email: " name="email" value={account.email} onChange={handleChange} type="text"></InputText>
            <InputText label="Password: " name="password" value={account.password} onChange={handleChange} type="password"></InputText>
            <Link href="/sigup" className='underline mb-2'>Đăng ký</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Đăng nhập</button>
            </form>
    </div>
    )
}
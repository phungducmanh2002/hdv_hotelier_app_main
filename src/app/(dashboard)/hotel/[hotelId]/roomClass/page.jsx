'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import FlexibleTable from "@/components/table/table";
import { usePathname } from "next/navigation";
import { getRoomClassesByHotel } from "@/modules/hotels/service";
const headerNames = ["Mã", "Tên hạng phòng", "Đơn giá"]
import Image from "next/image";
export default function PageRoomClass({params}){
    const pathname = usePathname();
    const [reload, setReload] = useState(false);
    useEffect(()=>{
        getRoomClassesByHotel(params.hotelId).then((res)=>{
            if (res.code === 200){
                setRoomClasses(res.data);
            }
        })
    },[])
    const [roomClasses, setRoomClasses] = useState([])
   
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    
    return(
        <>
        <div>
        <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/add`}>+ Thêm hạng phòng mới</Link>
        <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/apply`}>+ Áp dụng hạng phòng</Link>
        <div className="flex justify-center mt-2">
            <h1 className="text-3xl mb-2 mr-2">Danh sách hạng phòng của khách sạn</h1>
            <button onClick={()=>setReload(!reload)}>
                <Image src="/refresh-svgrepo-com.svg" width={20} height={20}></Image>
            </button> 
        </div>
        
        <FlexibleTable data={roomClasses} setData={setRoomClasses} headerNames={headerNames} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
        </div>
        </>
    )
}
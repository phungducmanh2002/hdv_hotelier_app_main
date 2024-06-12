'use client'
import Link from "next/link"
import FlexibleTable from "@/components/table/table"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { getRoomsByHotel } from "@/modules/hotels/service"
import Image from "next/image"
const headerNames = ["Mã", "Tên phòng", "Đơn Giá", "Hạng phòng"]
export default function PageRoom({params}){
  const pathname = usePathname();
    const [rooms, setRooms] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [reload, setReload] = useState(false);
    useEffect(()=>{
      getRoomsByHotel(params.hotelId).then((res)=>{
        if (res.code === 200){
          setRooms(res.data.map((room)=>({
            id: room.id,
            name: room.name,
            roomPrice: room.roomPrice,
            roomClassName: room.roomClassName
          })))
        }
      })
    }, [])
    return(
        <>
            <div>
            <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/add`}>+ Thêm phòng</Link>
            <div className="flex justify-center mt-2">
                <h1 className="text-3xl mb-2 mr-2">Danh sách phòng của khách sạn</h1>
                <button onClick={()=>setReload(!reload)}>
                    <Image src="/refresh-svgrepo-com.svg" width={20} height={20}></Image>
                </button> 
            </div>
            
            <FlexibleTable data={rooms} setData={setRooms} sortConfig={sortConfig} setSortConfig={setSortConfig} headerNames={headerNames}/>
            </div>
        </>
        
    )
}

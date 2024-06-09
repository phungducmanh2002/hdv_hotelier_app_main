'use client'
import Link from "next/link"
import FlexibleTable from "@/components/table/table"
import { useState } from "react"
import { usePathname } from "next/navigation"

const headerNames = ["Mã", "Tên phòng", "Hạng phòng"]
export default function PageRoom(){
  const pathname = usePathname();
    const [rooms, setRooms] = useState([
      {"id": "1", "name": "room1", "idHotel_roomClass":"1"},
      {"id": "1", "name": "room1", "idHotel_roomClass":"1"},
      {"id": "1", "name": "room1", "idHotel_roomClass":"1"},
      {"id": "1", "name": "room1", "idHotel_roomClass":"1"},
      {"id": "1", "name": "room1", "idHotel_roomClass":"1"},
      {"id": "1", "name": "room1", "idHotel_roomClass":"1"},
      {"id": "2", "name": "room2", "idHotel_roomClass":"12"},
      {"id": "2", "name": "room2", "idHotel_roomClass":"12"},
      {"id": "2", "name": "room2", "idHotel_roomClass":"12"},
      {"id": "2", "name": "room2", "idHotel_roomClass":"12"},
      {"id": "2", "name": "room2", "idHotel_roomClass":"12"},
      {"id": "2", "name": "room2", "idHotel_roomClass":"12"}
  ]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
   
    return(
        <>
            <div>
            <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/add`}>+ Thêm phòng</Link>
            <div className="flex justify-center mt-2">
                <h1 className="text-3xl mb-2">Danh sách phòng của khách sạn</h1>
            </div>
            
            <FlexibleTable data={rooms} setData={setRooms} sortConfig={sortConfig} setSortConfig={setSortConfig} headerNames={headerNames}/>
            </div>
        </>
        
    )
}

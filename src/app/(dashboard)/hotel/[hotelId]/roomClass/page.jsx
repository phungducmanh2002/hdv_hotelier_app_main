'use client'
import { useState } from "react";
import Link from "next/link";
import FlexibleTable from "@/components/table/table";
import { usePathname } from "next/navigation";
const headerNames = ["Mã", "Tên hạng phòng"]
export default function PageRoomClass(){
    const pathname = usePathname();
    const [roomClasses, setRoomClasses] = useState([
        {"id": 1, "name": "single"},
        {"id": 4, "name": "single"},
        {"id": 1, "name": "twinr"},
        {"id": 2, "name": "double"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
        {"id": 3, "name": "third"},
    ])
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    
    return(
        <>
        <div>
        <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/add`}>+ Thêm hạng phòng mới</Link>
        <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/apply`}>+ Áp dụng hạng phòng</Link>
        <div className="flex justify-center mt-2">
            <h1 className="text-3xl mb-2">Danh sách hạng phòng của khách sạn</h1>
        </div>
        
        <FlexibleTable data={roomClasses} setData={setRoomClasses} headerNames={headerNames} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
        </div>
        </>
    )
}
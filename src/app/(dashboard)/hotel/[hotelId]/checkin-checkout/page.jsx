'use client'
import FlexibleTable from "@/components/table/table"

import { useState } from "react";
import listBooking from "./listBooking";
const headerNames =["Mã", "Ngày nhận phòng", "Ngày trả phòng", "Ghi chú", "Họ tên người đặt", "Số điện thoại người đặt", "Người duyệt", "Trạng thái"]
export default function PageCheckinCheckout(){
    const [bookings, setBookings] = useState(listBooking                                                                                
    );
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    return (
        <>
            <div className="flex justify-center mt-2">
                <h1 className="text-3xl mb-2">Danh sách hạng phòng của khách sạn</h1>
            </div>
            
            <FlexibleTable data={bookings} setData={setBookings} headerNames={headerNames} sortConfig={sortConfig} setSortConfig={setSortConfig}/>

        </>
    )
}
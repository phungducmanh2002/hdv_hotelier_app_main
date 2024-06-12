'use client'
import FlexibleTable from "@/components/table/table"

import { useEffect, useState } from "react";
import listBooking from "./listBooking";
import { updateStatuBooking } from "@/modules/bookings/booking";
import { getBookingsByHotel } from "@/modules/hotels/service";
import ButtonCustom from "@/components/button/button";
import Link from "next/link";
import Image from "next/image";
const bookingStatus = ["","Chưa thanh toán", "Đã thanh toán","Đã checkin", "Đã checkout","Đã hủy"]
const textConfirmChangeStatus = [
    "",
    "",
    "Xác nhận thanh toán phòng này?",
    "Xác nhận checkin phòng này",
    "Xác nhận checkout phòng này",
    "Xác nhận hủy đặt phòng"
  ]
const headerNames =["Mã", "Ngày nhận phòng", "Ngày trả phòng", "Ghi chú", "Họ tên người đặt", "Số điện thoại người đặt", "Người duyệt", "Trạng thái"]
export default function PageCheckinCheckout({params}){
    const [bookings, setBookings] = useState([]                                                                                
    );
    const [reload, setReload] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    useEffect(()=>{
        getBookingsByHotel(params.hotelId).then((res)=>{
            if (res.code === 200){
                setBookings(res.data)
            }
        })
    },[reload])
    
    const handChangeStatus = (idBooking, statusBooking) => {
        alert(statusBooking);
        if (window.confirm(`${textConfirmChangeStatus[statusBooking]}`)) {
          updateStatuBooking(idBooking, statusBooking).then((res)=>{
            if (res.code === 200){
              alert(`Đã thay đổi phiếu đặt ${idBooking} sang trạng thái ${bookingStatus[statusBooking]}`)
              setReload(!reload);
            }
            else{
              alert(`Thay đổi phiếu đặt ${idBooking} sang trạng thái ${bookingStatus[statusBooking]} thất bại`)
            }
          })
        }
        
      }
    return (
        <>
            
            <div className="flex flex-row justify-center mt-2">
                <h1 className="text-3xl mb-2 mr-2">Danh sách hạng phòng của khách sạn</h1>
                <button onClick={()=>setReload(!reload)}>
                    <Image src="/refresh-svgrepo-com.svg" width={20} height={20}></Image>
                </button> 
            </div>
            
            <FlexibleTable data={bookings} setData={setBookings} headerNames={headerNames} sortConfig={sortConfig} setSortConfig={setSortConfig} handleChangeStatusBooking={handChangeStatus}/>

        </>
    )
}
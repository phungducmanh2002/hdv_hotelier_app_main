'use client'
import { usePathname } from "next/navigation"
import Link from "next/link";
export function HeaderDashboard(){

    const pathname = usePathname().split("/").slice(0,3).join('/');
    return (
        <nav className={`items-center flex justify-start mb-4`}>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`${pathname}`}>Trang chủ</Link>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`${pathname}/roomClass`}>Quản lý hạng phòng</Link>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`${pathname}/room`}>Quản lý phòng</Link> 
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`${pathname}/checkin-checkout`}>Checkin-Checkout</Link> 

                {/* <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`/hotel/${params.hotelId}/bedType`}>Quản lý loại giường</Link> */}

                
        </nav>
    )
}
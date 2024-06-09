import ButtonCustome from "../button/button";
import { usePathname, useRouter } from "next/navigation";
const GridItemHotel = ({hotel}) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = () => {
        router.push(`${pathname}/${hotel.id}`)
    }
    return (
        <>
            <div className="flex justify-between">
                <label>Hình ảnh: </label>
                
            </div>
            <div className="flex justify-between">
                <label>Tên khách sạn: </label>
                <h2>{hotel.name}</h2>
            </div>
            <div className="flex justify-between">
                <label>Liên hệ: </label>
                <h2>{hotel.hotline}</h2>
            </div>
            <button className="border-2 rounde-md"></button>
            <ButtonCustome label="Quản lý khách sạn" handleClick={handleClick}></ButtonCustome>
        </>
    )
}
export default GridItemHotel;
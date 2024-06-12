import FrmUpdateHotel from "@/components/form/frmUpdateHotel"

const PageManageHotel = ({params}) => {
    return(
        <div className="border-2 border-white flex justify-between">
            <div className="w-screen">hinh</div>
            <div className="">
                <FrmUpdateHotel params={params}></FrmUpdateHotel>
            </div>
        </div>
    )
}
export default PageManageHotel
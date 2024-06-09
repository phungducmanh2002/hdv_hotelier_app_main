'use client'
import { useState } from "react"
import InputText from "../input/inputText"

import Combobox from "../combobox"
import ButtonCustom from "../button/button"
export default function FrmRegisHotel(){
    const [newHotel, setNewHotel] = useState({
        name: '',
        description: '',
        hotline: '',
        idUser: '',
        idCommune: ''
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [reload, setReload] = useState(false);

    const handleChangeProvince = (e) => {
        const { name, value } = e.target;
        setProvince(value);
        setReload(!reload);
       
      }
      const handleChangeDistrict = (e) => {
        const { name, value } = e.target;
        setDistrict(value);
        setReload(!reload);
        
      }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewHotel({
            ...newHotel,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra xem các trường đã được điền đầy đủ không
        if (!newHotel.name || !newHotel.idCommune) {
          alert('Vui lòng điền đầy đủ thông tin.');
          return;
        }
        alert(JSON.stringify(newHotel));
        // console.log(typeof(hotelData));
        // hotelData.hotelierId = user;
        // console.log(newHotel);
        // addHotel(hotelData).then((res) => {
        //   if (res.status == 201){
        //     alert("them khach san moi thanh cong")
        //     router.push("/hotel")
        //   }
    
        // })
        
    
        // Gọi hàm onAdd để thêm khách sạn mới
        // onAdd({ name, address, phone });
        // Xóa dữ liệu trong form sau khi thêm thành công
        // setName('');
        // setAddress('');
        // setPhone('');
      };
    return(
        <div className='flex h-screen justify-center items-start'>
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md`}>
                <InputText label="Tên khách sạn" type="text" name="name" value={newHotel.name} onChange={handleChange}></InputText>
                <InputText label="Mô tả" type="text" name="description" value={newHotel.description} onChange={handleChange}></InputText>
                <InputText label="Số điện thoại liên hệ" type="tel" name="hotline" value={newHotel.hotline} onChange={handleChange}></InputText>
                <Combobox options={provinces} label="Chọn tỉnh:" onChange={handleChangeProvince} name="provinceId" />
                <Combobox options={districts} label="Chọn quận:" onChange={handleChangeDistrict} name="districtId" />
                <Combobox options={communes} label="Chọn phường:" onChange={handleChange} name="idCommune" />
                <ButtonCustom label="Lưu đăng ký" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
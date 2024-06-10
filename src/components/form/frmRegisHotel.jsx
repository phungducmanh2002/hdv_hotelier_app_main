'use client'
import { useEffect, useState } from "react"
import InputText from "../input/inputText"
import UserSession from "@/utils/user"
import Combobox from "../combobox"
import ButtonCustom from "../button/button"
import { allProvinces } from "@/modules/province/service"
export default function FrmRegisHotel(){
    const userSession = UserSession.getInstance();
    const user = userSession.getIdUser();
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
    const [imageFile, setImageFile] = useState();
    const [imagePreview, setImagePreview] = useState();

    useEffect(()=>{
      allProvinces().then((res)=>{
        if (res.code === 200){
          setProvinces(res.data.map((province)=>({
            label: province.name,
            value: province.id
          } )));
        }
      })
    });
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
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };
    return(
        <div className='flex h-screen justify-center items-start'>
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md`}>
              <div className="mb-2 flex justify-between">
                <label htmlFor="image">Hình ảnh khách sạn:</label>
                <input className="w-40" type="file" id="image" accept=".png, .jpg" onChange={handleImageChange} required />
              </div>
              {imagePreview && (
                <div className="flex justify-center mb-2">
                  <img className="border-2 rounded-md" src={imagePreview} alt="Hotel Image Preview" style={{ width: '200px', height: '200px' }} />
                </div>
              )}
              <InputText label="Tên khách sạn" type="text" name="name" value={newHotel.name} onChange={handleChange}></InputText>
              <InputText label="Mô tả" type="text" name="description" value={newHotel.description} onChange={handleChange}></InputText>
              <InputText label="Số điện thoại liên hệ" type="tel" name="hotline" value={newHotel.hotline} onChange={handleChange}></InputText>
              <Combobox options={provinces} label="Chọn tỉnh/thành phố:" onChange={handleChangeProvince} name="provinceId" />
              <Combobox options={districts} label="Chọn quận:" onChange={handleChangeDistrict} name="districtId" />
              <Combobox options={communes} label="Chọn phường:" onChange={handleChange} name="idCommune" />
              <ButtonCustom label="Lưu đăng ký" submit={1}></ButtonCustom>
            </form>
        </div>
    )
}
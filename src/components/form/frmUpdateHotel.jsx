'use client'
import { useEffect, useState } from "react"
import InputText from "../input/inputText"
import UserSession from "@/utils/user"
import Combobox from "../combobox"
import ButtonCustom from "../button/button"
import district from '../../../../hdv_location_service_main/data/district.json';
import { allProvinces, getDistrictsByProvince } from "@/modules/provinces/service"
import { getCommuneByDistrict } from "@/modules/districts/service"
import { createHotel, createImageForHotel, getHotelById } from "@/modules/hotels/service"
import { useRouter } from "next/navigation"
export default function FrmUpdateHotel({params}){
    const userSession = UserSession.getInstance();
    const user = userSession.getIdUser();
    const router = useRouter();
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

    useEffect(()=>{
        getHotelById(params.hotelId).then((res)=>{
            if (res.code === 200){
                const data = res.data;
                const {id, name, description, hotline, idUser, idCommune} = res.data
                
                setNewHotel({name, description, hotline, idUser, idCommune})
            }
            
        })
    }, [])
    useEffect(()=>{
      allProvinces().then((res)=>{
        if (res.code === 200){
          setProvinces(res.data.map((province)=>({
            label: province.name,
            value: province.id
          } )));
        }
      })
    },[]);
    useEffect(()=>{
      if (province){
        getDistrictsByProvince(province).then((res)=>{
          if (res.code === 200){
            setDistricts(res.data.map((district)=>({
              label: district.name,
              value: district.id
            } )));
          }
        })
      }
      
    }, [province]);
    useEffect(()=>{
      if (district){
        getCommuneByDistrict(district).then((res)=>{
          if (res.code === 200){
            setCommunes(res.data.map((commune)=>({
              label: commune.name,
              value: commune.id
            } )));
          }
        })
      }
    }, [district]);
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
        newHotel.idUser = user
        return 
        createHotel(newHotel).then((res) => {
          alert(JSON.stringify(res))
          if (res.code === 201){
            alert("them khach san moi thanh cong")
            
            const frmData = new FormData();
            frmData.append('image', imageFile)
            createImageForHotel(res.data.id, frmData).then((res)=>{
              if (res.code === 201){
                alert("them anh cho khach san moi thanh cong")
              }
              else{
                alert("Them anh that bai")
              }
            })
            router.push("/hotel")
          }
          else if (res.code === 500){
            alert("Vui lòng thay đổi tên khách sạn hoặc số ")
            router.push("/hotel")
          }

        })
        
    
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
        <div className='flex justify-start'>
            <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md w-96`}>
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
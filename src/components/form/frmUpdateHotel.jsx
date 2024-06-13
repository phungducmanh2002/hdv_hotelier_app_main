'use client'
import react, { useEffect, useState } from 'react';
import InputText from "../input/inputText"
import UserSession from "@/utils/user"
import Combobox from "../combobox"
import ButtonCustom from "../button/button"
import district from '../../../../hdv_location_service_main/data/district.json';
import { allProvinces, getDistrictsByProvince } from "@/modules/provinces/service"
import { getCommuneByDistrict } from "@/modules/districts/service"
import { changeAvatarHotel, createHotel, createImageForHotel, getHotelById, updateHotel } from "@/modules/hotels/service"
import { useRouter } from "next/navigation"
import { getImagesByHotelId } from '../../modules/hotels/service';
import { getIdImageByHotel } from "@/modules/hotels/service"
import { getImageById } from "@/modules/images/service"
import ImageList from "../imageList"
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
    const [imageFile, setImageFile] = useState();
    const [imagePreview, setImagePreview] = useState(null);
  
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
 
        updateHotel(params.hotelId, newHotel).then((res) => {
          alert(JSON.stringify(res))
          if (res.code === 200){
            alert("cập nhật khach san thanh cong")
            
            
          }
          else if (res.code === 500){
            alert("Vui lòng thay đổi tên khách sạn hoặc số ")
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

   
    useEffect(()=>{
        getIdImageByHotel(params.hotelId).then((res)=>{
            if (res.code == 200){
                getImageById(res.data.id).then((res)=>{
                  
                    setImagePreview(URL.createObjectURL(res));
                    
                })
            }
        })
    }, [reload])
    const handleAddImage = () => {
      const frmData = new FormData();
      frmData.append('image', imageFile)
      createImageForHotel(params.hotelId, frmData).then((res)=>{
        if (res.code === 201){
          alert("thêm ảnh cho khach san thanh cong")
          setReload(!reload);
        }
        else{
          alert("Them anh that bai")
        }
      })
    }
    return(
      <div className="border-2 border-white flex justify-between">

            <div className="w-screen m-2">
              <div className="flex flex-row">
                <div className="mb-2 flex justify-between">
                      <label htmlFor="image">Ảnh đại diện khách sạn:</label>
                      <input className="w-40" type="file" id="image" accept=".png, .jpg" onChange={handleImageChange} title='Chọn ảnh' required />
                  </div>
                  {imagePreview && (
                      <div className="flex justify-center mb-2">
                      <img className="border-2 rounded-md p-2 border-blue-200" src={imagePreview} alt="Hotel Image Preview" style={{ width: '200px', height: '200px' }} />
                      </div>
                  )}
                  <div className='flex flex-col ml-2'>
                    <ButtonCustom label="Lưu ảnh mới" handleClick={handleAddImage}></ButtonCustom>
                  </div>
              
              </div>
              <div>
                  <ImageList hotelId={params.hotelId} reload={reload} setReload={setReload}></ImageList>
                </div>      
            </div>
            <div className="">
            <div className='flex justify-start m-2'>
          
          <form onSubmit={handleSubmit} className={` bg-blue-300 p-4 border-2 rounded-md w-96`}>
            <div className='flex justify-center'>
              <div className='text-xl'>THÔNG TIN KHÁCH SẠN</div>
            </div>
            <InputText label="Tên khách sạn" type="text" name="name" value={newHotel.name} onChange={handleChange}></InputText>
            <InputText label="Mô tả" type="text" name="description" value={newHotel.description} onChange={handleChange}></InputText>
            <InputText label="Số điện thoại liên hệ" type="tel" name="hotline" value={newHotel.hotline} onChange={handleChange}></InputText>
            <Combobox options={provinces} label="Chọn tỉnh/thành phố:" onChange={handleChangeProvince} name="provinceId"/>
            <Combobox options={districts} label="Chọn quận:" onChange={handleChangeDistrict} name="districtId"/>
            <Combobox options={communes} label="Chọn phường:" onChange={handleChange} name="idCommune"/>
            <ButtonCustom label="Lưu thay đổi" submit={1}></ButtonCustom>
          </form>
      </div>
            </div>
        </div>
        
    )
}
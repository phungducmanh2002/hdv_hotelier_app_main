import api_hotel from "@/utils/api_hotel_service"
import api_res from "@/utils/api_res_service"
import api_booking from "@/utils/api_booking_service"
export const createHotel = async (newHotel) => {
    try {
        const response = await api_hotel.post(`/hotels`, newHotel);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};

export const createImageForHotel = async (idHotel, nameImage) => {
    try {
        const response = await api_res.post(`/hotels/${idHotel}/images`, nameImage, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
export const getHotelById = async (idHotel) => {
    try {
        const response = await api_hotel.get(`/hotels/${idHotel}`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};

export const applyRoomClass = async (idHotel, idRoomClass, newRoomClass) => {
    try{
        const response = await api_hotel.post(`/hotels/${idHotel}/room-classes/${idRoomClass}`,newRoomClass);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getRoomClassesNotByHotel = async (idHotel) => {
    try{
        const response = await api_hotel.get(`/hotels/${idHotel}/room-classes?type=not-have`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getRoomClassesByHotel = async (idHotel) => {
    try{
        const response = await api_hotel.get(`/hotels/${idHotel}/room-classes`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const createRoomForHotel = async (idHotel, idRoomClass, newRoom) => {
    try{
        const response = await api_hotel.post(`/hotels/${idHotel}/room-classes/${idRoomClass}/rooms`, newRoom);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getBookingsByHotel = async (idHotel) => {
    try{
        const response = await api_booking.get(`/hotels/${idHotel}/bookings`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getRoomsByHotel = async (idHotel) => {
    try{
        const response = await api_hotel.get(`/hotels/${idHotel}/rooms`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateHotelRoomClass = async (idHotel, idRoomClass, roomClass) => {
    try{
        const response = await api_hotel.put(`/hotels/${idHotel}/room-classes/${idRoomClass}`, roomClass);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getIdImageByHotel = async (idHotel) => {
    try{
        const response = await api_res.get(`/hotels/${idHotel}/avatar?type=0`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const updateHotel = async (idHotel, hotelUpdate) => {
    try{
        const response = await api_hotel.put(`/hotels/${idHotel}`, hotelUpdate);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const changeAvatarHotel = async (idHotel, idImage) => {
    try{
        const response = await api_res.put(`/hotels/${idHotel}/images/${idImage}/set-avatar`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const getImagesByHotelId = async (idHotel) => {
    try{
        const response = await api_res.get(`/hotels/${idHotel}/images`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}

export const deleteImageByHotelId = async (idHotel, idImage) => {
    try{
        const response = await api_res.delete(`/hotels/${idHotel}/images/${idImage}`);
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}
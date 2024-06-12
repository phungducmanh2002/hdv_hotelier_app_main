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
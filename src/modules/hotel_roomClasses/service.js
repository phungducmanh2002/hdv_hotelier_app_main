import api_hotel from "@/utils/api_hotel_service"
export const getHotelRoomClassById = async (idHotelRoomClass) => {
    try {
        const response = await api_hotel.get(`/hotel-room-class/${idHotelRoomClass}`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
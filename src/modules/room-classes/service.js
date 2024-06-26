import api_hotel from "@/utils/api_hotel_service"
export const createRoomClass = async (newRoomClass) => {
    try {
        const response = await api_hotel.post(`/room-classes`, newRoomClass);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
export const getRoomClassById = async (idRoomClass) => {
    try {
        const response = await api_hotel.get(`/room-classes/${idRoomClass}`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
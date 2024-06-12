import api from "@/utils/api_hotel_service"
export const createRoomClass = async (newRoomClass) => {
    try {
        const response = await api.post(`/room-classes`, newRoomClass);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
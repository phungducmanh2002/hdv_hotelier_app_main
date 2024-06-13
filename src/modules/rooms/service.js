import api_hotel from "@/utils/api_hotel_service"
export const getRoomById = async (idRoom) => {
    try {
        const response = await api_hotel.get(`/rooms/${idRoom}`);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
export const updateRoom = async (idRoom, roomUpdate) => {
    try {
        const response = await api_hotel.put(`/rooms/${idRoom}`, roomUpdate);
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
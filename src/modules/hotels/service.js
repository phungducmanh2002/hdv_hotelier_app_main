import api from "@/utils/api_hotel_service"
export const findHotelByIdUser = async (idUser) => {
    try {
        const response = await api.get(`/hotels?idUser=${idUser}`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
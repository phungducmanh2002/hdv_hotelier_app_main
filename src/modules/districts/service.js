import api from "@/utils/api_location_service"
export const getCommuneByDistrict = async (idDistrict) => {
    try {
        const response = await api.get(`/districts/${idDistrict}/communes`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
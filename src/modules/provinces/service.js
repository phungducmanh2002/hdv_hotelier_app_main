import api from "@/utils/api_location_service"
export const allProvinces = async () => {
    try {
        const response = await api.get(`/provinces`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
export const getDistrictsByProvince = async (idProvince) => {
    try {
        const response = await api.get(`/provinces/${idProvince}/districts`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
import api from "@/utils/api_user_service"
export const generateTokenFromAccount = async (account) => {
    try {
        const response = await api.post(`/auth/gen-user-token`, account);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};

export const decodeToken = async (token) => {
    try {
        const response = await api.post(`/auth/decode-token`, token);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
import api from "@/utils/api_user_service"
export const createAccount = async (newAccount) => {
    try {
        const response = await api.post(`/accounts`, newAccount);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
export const createUser = async (idAccount, newUser) => {
    try {
        const response = await api.post(`/accounts/${idAccount}/users`, newUser);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};

export const getUsersByAccount = async (idAccount) => {
    try {
        const response = await api.get(`/accounts/${idAccount}/users`);
        
        return response.data;
    } catch (error) {
        console.error('Call API Error:', error);
        throw error;
    }
    
};
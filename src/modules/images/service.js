// import axios from "axios";
// const baseURL = process.env.NEXT_PUBLIC_RES_SERVICE_API_BASE_URL 
// // ? '' :"http://localhost:8080/res";
// console.log(baseURL)
// const instance = axios.create({ baseURL: baseURL, timeout: 5000, responseType: 'blob'}) // Quan trọng: đảm bảo response type là blob});
import api_res from "@/utils/api_res_service"
export const getImageById = async (idImage) => {
    try{
        const response = await api_res.get(`/images/${idImage}`, { responseType: 'blob' });
        return response.data;
    }
    catch (error){
        console.error('Call API Error:', error);
        throw error;
    }
}
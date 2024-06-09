
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_USER_SERVICE_API_BASE_URL 
// ? '' :"http://localhost:3000";
console.log(baseURL)
const instance = axios.create({ baseURL: baseURL, timeout: 5000, headers: { 'Content-Type': 'application/json' } });
export default instance


import axios from "axios";
import UserSession from "./user";


// const baseURL = process.env.NEXT_PUBLIC_HOTEL_SERVICE_API_BASE_URL 
// // ? '' :"http://localhost:8080/hotel";
// console.log(baseURL)
// const instance = axios.create({ baseURL: baseURL, timeout: 5000, headers: { 'Content-Type': 'application/json' } });

// const userSession = UserSession.getInstance();
// const user = userSession.getUser();
// Thêm một request interceptor

// instance.interceptors.request.use(
//     (config) => {
//       const idUser = user;
//       if (!idUser) {
//         alert("VUi long danh nhap")
//         window.location.href = 'http://localhost:3011/sigin';
        
//         // Chuyển hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
//         return Promise.reject(new Error('User is not authenticated'));
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export default instance;
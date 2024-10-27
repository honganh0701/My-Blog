import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
  });
  
  // Interceptor để tự động thêm token vào header
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Interceptor để xử lý response errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export default api;
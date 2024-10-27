import axios from 'axios';

const API_URL = '/api/auth'; // Chỉ cần path tương đối vì đã có proxy

// Create base instance with base config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add interceptor để tự động thêm token vào header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authApi = {
    signup: async (userData) => {
        try {
            const response = await api.post('/signup', userData);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('No response from server');
            } else {
                throw new Error(error.message);
            }
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            // Robust error handling tương tự signup
            if (error.response) {
                throw error.response.data;
            } else if (error.request) {
                throw new Error('No response from server');
            } else {
                throw new Error(error.message);
            }
        }
    },

    getCurrentUser: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return null;
      
          const response = await api.get('/current-user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return null;
        }
    }

    
};
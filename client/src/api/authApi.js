import axios from 'axios';

const API_URL = '/api/auth'; // Chỉ cần path tương đối vì đã có proxy

// Create base instance with base config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
    }
};
import axios from "axios";

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type' : 'application/json',
    }
});

//thêm interceptor để tự động gắn token v
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch(error) {
        throw error.response.data;
    }
};
 export const getPostById = async (id) => {
    try {
        const response = await api.get(`/posts'/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
 };

 export const createPost = async (postData) => {
    try {
        //formdata de gui file
        const formData = new FormData();
        Object.keys(postData).forEach(key => {
            formdata.append(key, postData[key]);
        });

        const response = await api.post('/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
 };
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
        const response = await api.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
 };

 export const createPost = async (postData) => {
    try {
        const formData = new FormData();
        Object.keys(postData).forEach(key => {
            formData.append(key, postData[key]);
        });

        const response = await api.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server');
        } else {
            throw new Error('Có lỗi xảy ra khi tạo bài viết');
        }
    }
};

export const updatePost = async (id, postData) => {
    try {
        const formData = new FormData();
        Object.keys(postData).forEach(key => {
            formData.append(key, postData[key]);
        });

        const response = await api.put(`/posts/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw new Error('Có lỗi xảy ra khi cập nhật bài viết');
    }
};

export const addComment = async (postId, content) => {
    try {
        const response = await api.post(`/posts/${postId}/comments`, { content });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw new Error('Có lỗi xảy ra khi thêm bình luận');
    }
};
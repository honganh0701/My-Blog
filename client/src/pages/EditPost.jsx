import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { getPostById, updatePost } from '../api/postApi';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null
    });
    const [currentImage, setCurrentImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPostById(id);
                // Kiểm tra quyền sở hữu
                if (post.userId._id !== auth.userId) {
                    navigate('/');
                    return;
                }
                setFormData({
                    title: post.title,
                    content: post.content,
                    image: null
                });
                setCurrentImage(post.image);
            } catch (err) {
                setError('Không thể tải bài viết');
            }
        };
        fetchPost();
    }, [id, auth.userId, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                image: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!formData.title || !formData.content) {
                throw new Error('Vui lòng điền đầy đủ thông tin');
            }

            if (formData.title.length < 4) {
                throw new Error('Tiêu đề phải có ít nhất 4 ký tự');
            }

            if (formData.content.length < 10) {
                throw new Error('Nội dung phải có ít nhất 10 ký tự');
            }

            const response = await updatePost(id, formData);
            navigate(`/post/${response._id}`);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                        minLength={4}
                    />
                </div>

                <div>
                    <label className="block mb-2">Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="6"
                        required
                        minLength={10}
                    />
                </div>

                {currentImage && (
                    <div className="mb-4">
                        <p className="mb-2">Current Image:</p>
                        <img
                            src={`${import.meta.env.VITE_API_URL}/${currentImage}`}
                            alt="Current post"
                            className="max-w-xs rounded"
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-2">New Image (optional):</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 rounded ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                >
                    {loading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
};

export default EditPost;
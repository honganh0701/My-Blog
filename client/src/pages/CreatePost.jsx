import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { createPost } from '../api/postApi';

const CreatePost = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Kiểm tra authentication
    if (!auth) {
        navigate('/login');
        return null;
    }

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
  
          const response = await createPost(formData);
          navigate(`/post/${response._id}`);
      } catch (err) {
          setError(err.message || 'Có lỗi xảy ra');
      } finally {
          setLoading(false);
      }
  };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            
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

                <div>
                    <label className="block mb-2">Image (optional):</label>
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
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
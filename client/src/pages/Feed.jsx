import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { getPosts } from '../api/postApi';

function Feed() {
    const { isAuthenticated } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:5000/';

    // Nếu chưa đăng nhập, redirect về trang login
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-4">Đang tải...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Bài viết mới nhất</h1>
                <Link 
                    to="/post/create" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Tạo bài viết
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                    <Link 
                        to={`/post/${post._id}`} 
                        key={post._id}
                        className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="p-4">
                            {post.image && (
                                <div className="mb-4">
                                    <img 
                                        src={`${API_URL}${post.image}`}
                                        alt={post.title}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                </div>
                            )}
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 line-clamp-3 mb-2">{post.content}</p>
                            <div className="text-sm text-gray-500">
                                <span>{post.userId?.username}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Feed;
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { getPostById } from '../api/postApi';

function PostDetail() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const data = await getPostById(id);
            setPost(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-4">Đang tải...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!post) return <div className="text-center py-4">Không tìm thấy bài viết</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <article className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                
                <div className="mb-4 text-sm text-gray-500">
                    <span>Đăng bởi {post.userId?.username}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>

                {post.image && (
                    <div className="mb-6">
                        <img 
                            src={`${post.image}`}
                            alt={post.title}
                            className="w-full max-h-96 object-cover rounded-lg"
                        />
                    </div>
                )}

                <div className="prose max-w-none">
                    {post.content}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Bình luận</h2>
                    {post.comments?.length > 0 ? (
                        <div className="space-y-4">
                            {post.comments.map((comment) => (
                                <div key={comment._id} className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500 mb-1">
                                        {comment.userId?.username} • {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                                    </div>
                                    <div>{comment.content}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Chưa có bình luận nào</p>
                    )}
                </div>
            </article>
        </div>
    );
}

export default PostDetail;
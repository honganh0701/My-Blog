import React from 'react';

const PostPreview = ({ post }) => {
  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const handleClick = () => {
    window.location.href = `/post/${post._id}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {post.image && (
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={`http://localhost:5000/${post.image}`} 
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {post.shortDescription}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {post.author.profileImage ? (
              <img
                src={`http://localhost:5000/${post.author.profileImage}`}
                alt={post.author.username}
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-300 mr-2" />
            )}
            <span>{post.author.username}</span>
          </div>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
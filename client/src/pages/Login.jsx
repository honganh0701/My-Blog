import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuth } from '../context/AuthProvider';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      
      try {
          const response = await authApi.login(formData);
          // Đảm bảo response chứa cả user và token
          login({
              user: response.user,
              token: response.token
          });
          navigate('/feed');
      } catch (err) {
          setError(err.message || 'Đăng nhập thất bại!');
      } finally {
          setLoading(false);
      }
  };
  
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block mb-2">Mật khẩu</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>
        </div>
    );
}

export default Login;
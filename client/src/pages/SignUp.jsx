import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { authApi } from '../api/authApi.js';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState ({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //handle input change
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
      const response = await authApi.signup(formData);
      console.log('Signup successfull:', response);

      //redirect to login page
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      {error && (
        <div className=''>
          {error}
        </div>
      )}      

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-2'>Username</label>
          <input 
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Email</label>
          <input 
            type = 'email'
            name = 'email'
            value = {formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div className='mb-6'>
          <label className='block mb-2'>Password</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border rounded'
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
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
      </form>
    </div>
  )
}

export default SignUp;
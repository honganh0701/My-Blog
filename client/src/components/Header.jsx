import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Header() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo/Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-blue-600">
              Blog App
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              About
            </Link>

            {auth ? (
              <>
                <Link to="/feed" className="text-gray-600 hover:text-blue-600">
                  Feed
                </Link>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => navigate('/post/create')}
                >
                  Create Post
                </button>
                <div className="relative group">
                  <img
                    src={auth.user?.profileImage || 'images/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

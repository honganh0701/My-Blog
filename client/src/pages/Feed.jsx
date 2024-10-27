import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

function Feed() {
  const { isAuthenticated } = useAuth();

  // Nếu chưa đăng nhập, redirect về trang login
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Feed</h1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>
  );
}

export default Feed;
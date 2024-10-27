import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import PostDetail from "./pages/PostDetail";
import Header from "./components/Header";

// Component Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/feed" 
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } 
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/post-detail" 
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
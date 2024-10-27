import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Headers from "./components/Header";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import PostDetail from "./pages/PostDetail";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";

function App() {
  
  return (
    <AuthProvider>
    <BrowserRouter>
     
       <Headers/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />     
        <Route path="/feed" element={<Feed />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-detail" element={<PostDetail />} />   
        
        <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
      </Routes>
     
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

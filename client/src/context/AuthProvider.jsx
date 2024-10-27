import { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Đọc từ localStorage một cách an toàn
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  const isAuthenticated = () => {
    return !!auth;
  };

  const value = {
    auth,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
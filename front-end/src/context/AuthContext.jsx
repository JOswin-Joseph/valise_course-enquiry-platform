import { createContext, useState, useEffect } from 'react';
import { getUser, getToken, setAuthData, clearAuthData } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const token = getToken();
      const userData = getUser();

      if (token && userData) {
        setUser(userData);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function - stores token and user data
  const login = (token, userData) => {
    setAuthData(token, userData);
    setUser(userData);
  };

  // Logout function - clears all auth data
  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  // Update user data
  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setAuthData(getToken(), newUserData);
    setUser(newUserData);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

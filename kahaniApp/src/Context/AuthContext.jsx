import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Adjust according to your routing library
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../Api/api'; // Assuming these API utilities exist

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = () => {
      // Simulate checking authentication status (e.g., from localStorage or an API)
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        setIsAuthenticated(true);
        // Simulate fetching user info from the token or API
        setUser({ name: 'Alice' }); // Replace with actual user data retrieval logic
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
      toast.success('Registered successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      // Simulate logout (e.g., remove token from localStorage or call an API)
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user,isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

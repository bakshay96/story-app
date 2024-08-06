import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Adjust according to your routing library
import { toast } from 'react-toastify';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const {user} =useSelector((state)=>state.auth);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    // const checkAuthStatus = () => {
    //   // Simulate checking authentication status (e.g., from localStorage or an API)
    //   //const token = localStorage.getItem('token');
    //   if (token) {
    //     setIsAuthenticated(true);
    //     // Simulate fetching user info from the token or API
    //     //({ name: 'Alice' }); // Replace with actual user data retrieval logic
    //   }
    // };

    // checkAuthStatus();
  }, []);

  

  return (
    <AuthContext.Provider value={{isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

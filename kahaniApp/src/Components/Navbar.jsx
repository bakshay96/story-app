import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Assuming you have an auth context/provider
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from  "../assets/Images/brand.png"
import { useDispatch, useSelector } from 'react-redux';
import {existingUser, logout} from "../Redux/Slices/authSlice"

const Navbar = () => {

  const dispatch = useDispatch();
  const { user,token } = useSelector((state) => state.auth);
  console.log("user and token",user,token)
  const [darkMode, setDarkMode] = useState(false);
 
  const handleLogout = () => {
    dispatch(logout(token));
  };
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  useEffect(()=>{
    
    if(!user)
      {
        dispatch(existingUser(token))
      }
     // console.log("navbar effect",token)
      return (()=>{console.log("cleaning effect")})
  },[!user])

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl text-primary dark:text-secondary flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-3" /> {/* Replace with your logo path */}
        Story Creator
      </Link>
      <div className="flex items-center">
        <Link to="/stories" className="mr-4 text-primary dark:text-secondary hover:underline">Stories</Link>
        <Link to="/upload" className="mr-4 text-primary dark:text-secondary hover:underline">Upload File</Link>
        {user ? (
          <>
            <span className="mr-4 text-primary dark:text-secondary">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="mr-4 text-primary dark:text-secondary hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/login" className="mr-4 text-primary dark:text-secondary hover:underline">Get Started</Link>
        )}
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-yellow-500 dark:text-yellow-300">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

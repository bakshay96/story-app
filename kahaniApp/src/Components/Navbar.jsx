import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Assuming you have an auth context/provider
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from  "../assets/Images/brand.png"

const Navbar = () => {

  const {user,isAuthenticated, login, register, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl text-primary dark:text-secondary flex items-center">
        <img src={logo} alt="Logo" className="h-10 mr-3" /> {/* Replace with your logo path */}
        Story Creator
      </Link>
      <div className="flex items-center">
        <Link to="/stories" className="mr-4 text-primary dark:text-secondary hover:underline">Stories</Link>
        {user ? (
          <>
            <span className="mr-4 text-primary dark:text-secondary">Welcome, {user.name}</span>
            <button onClick={logout} className="mr-4 text-primary dark:text-secondary hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/register" className="mr-4 text-primary dark:text-secondary hover:underline">Get Started</Link>
        )}
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-yellow-500 dark:text-yellow-300">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

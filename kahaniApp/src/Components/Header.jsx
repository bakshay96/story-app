import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';


const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  return (
    <header className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
      <h1 className="text-2xl text-primary dark:text-secondary">Story Creator</h1>
      <nav className="flex items-center">
        <Link to="/home" className="mr-4 text-primary dark:text-secondary">Home</Link>
        <button onClick={toggleTheme} className="mr-4 bg-gray-200 dark:bg-gray-700 p-2 rounded">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={handleLogout} className="bg-primary text-white p-2 rounded">Logout</button>
      </nav>
    </header>
  );
};

export default Header;

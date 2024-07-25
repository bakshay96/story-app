import React from 'react';
import logo from  "../assets/Images/brand.png"

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 p-6 text-center flex-auto">
      
      <div className="flex justify-center items-center mb-4">
        <img src={logo} alt="Logo" className="h-12 mr-2 rounded-full" /> {/* Replace with your logo path */}
        <span className="text-lg text-primary dark:text-secondary">Story Creator</span>
      </div>
      <div className="text-gray-700 dark:text-gray-300">
        <p>&copy; 2024 Story Creator. All rights reserved.</p>
        <p>Contact: info@storycreator.com</p>
      </div>
    </footer>
  );
};

export default Footer;

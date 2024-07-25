import React from 'react'

import { Route, Routes } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import Home from '../Components/Home';
import StoriesPage from '../Components/StoriesPage';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Footer from '../Components/Footer';
import LandingPage from '../Components/LandingPage';

export const MainRoutes = () => {
  
    return (
       
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<LandingPage />} />
       
        </Routes>
      </main>
      <Footer />
    </div>
        
      );
}

import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import StoryCard from './StoryCard';
import mockData from '../mockData';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="p-6 bg-background dark:bg-darkBackground">
        <h2 className="text-3xl mb-6 text-primary dark:text-secondary">Recently Added Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

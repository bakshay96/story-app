import React, { useEffect, useState } from 'react';
import mockData from '../mockData'; // Mock data for stories
import HeroSection from './HeroSection';
import CreateStoryModal from './CreateStoryModal';

const Home = () => {
  const [stories, setStories] = useState(mockData);
  const [showAddStoryModel,setShowAddStoryModel]=useState(false);
  const handleAddStoryModel = () => {
    console.log("handle read:")
		setShowAddStoryModel(true);
	};

  return (
    <div className="p-6 bg-background dark:bg-darkBackground min-h-screen">
     
      <HeroSection/>
      <h2 className="text-3xl mb-6 text-primary dark:text-secondary">Ongoing Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="border p-4 rounded bg-white dark:bg-gray-800 shadow">
            <h3 className="text-xl mb-2 text-primary dark:text-secondary">{story.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{story.contributions.join(' ')}</p>
          </div>
        ))}
      </div>
      <button className="bg-green-500 text-white p-3 mt-6 rounded" onClick={handleAddStoryModel}>Start New Story</button>
      {showAddStoryModel && (
				<CreateStoryModal  onClose={() => setShowAddStoryModel(false)} />
			)}
    </div>
  );
};

export default Home;

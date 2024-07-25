import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { saveStory } from '../Api/api'; // Assuming you have an API utility for saving stories

const CreateStoryModal = ({ onClose }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyLine, setStoryLine] = useState('');
  const wordLimit = 280;

  const handleSubmit = async () => {
    if (storyLine.length > wordLimit) {
      toast.error('Story line exceeds the word limit');
      return;
    }

    const storyData = {
      title: storyTitle,
      firstLine: storyLine,
      createdBy: 'user-id', // Replace with actual user ID
      createdAt: new Date().toISOString(),
    };

    try {
      await saveStory(storyData);
      toast.success('Story created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create story');
    }
  };

  return (
    <div className="fixed inset-0 bg-modalBg flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg mb-4 text-primary dark:text-secondary">Create a New Story</h3>
        <input
          type="text"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          placeholder="Story Title"
          className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
        />
        <textarea
          value={storyLine}
          onChange={(e) => setStoryLine(e.target.value)}
          placeholder="Write the first line (up to 280 characters)"
          className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
          maxLength={wordLimit}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{wordLimit - storyLine.length} characters left</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mr-2">Cancel</button>
          <button onClick={handleSubmit} className="bg-primary text-white p-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;

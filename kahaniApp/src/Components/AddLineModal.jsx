import React, { useState } from 'react';

const AddLineModal = ({ story, onClose }) => {
  const [newLine, setNewLine] = useState('');
  const wordLimit = 280;

  const handleSubmit = async () => {
    if (newLine.length > wordLimit) {
      toast.error('Line exceeds the word limit');
      return;
    }

    const updatedStory = {
      ...story,
      lines: [...story.lines, newLine],
      lastEditBy: 'user-id', // Replace with actual user ID
      lastEditAt: new Date().toISOString(),
    };

    try {
      await updateStory(updatedStory); // Assuming updateStory is an API utility for updating stories
      toast.success('Line added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add line');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-modalBg flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg mb-4 text-primary dark:text-secondary">Add a New Line</h3>
        <textarea
          value={newLine}
          onChange={(e) => setNewLine(e.target.value)}
          placeholder="Write the new line (up to 280 characters)"
          className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white"
          maxLength={wordLimit}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{wordLimit - newLine.length} characters left</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mr-2">Cancel</button>
          <button onClick={handleSubmit} className="bg-primary text-white p-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddLineModal;

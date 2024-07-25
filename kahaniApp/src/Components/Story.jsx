import React, { useState } from 'react';

const Story = ({ story }) => {
  const [sentence, setSentence] = useState('');

  const handleContribute = async (e) => {
    e.preventDefault();
    console.log(sentence)
    // Implement contribution API call
  };

  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl">{"My story"}</h3>
      <p> "story contributores"</p>
      <form onSubmit={handleContribute}>
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="border p-2 w-full"
          maxLength="20"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Add Sentence</button>
      </form>
    </div>
  );
};

export default Story;

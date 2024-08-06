const API_URL = 'http://localhost:3000'; // Replace with your API URL

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};


export const fetchStorie = async () => {
  try {
    const response = await fetch('/data/stories.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const stories = await response.json();
    return stories;
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    return [];
  }
};

export const saveStory=async()=>{
  try {
    return "story save"
  } catch (error) {
    return "story not save"
  }
}

    
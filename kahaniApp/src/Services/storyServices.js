// storyService.js

import axios from "axios";

const API_URL = "http://localhost:5050/api/stories";


// Set up axios instance with baseURL
const axiosInstance = axios.create({
	baseURL: API_URL,
});

// const config = {
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 	},
// };

// Function to get all stories
export const getStories = async (token) => {
	const response = await axios.get(`${API_URL}/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	 console.log(response)
	return response.data;
};


// Function to get a specific story by ID
export const getStoryById = async (id, token) => {
	const response = await axios.get(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

// Function to create a new story
export const createStory = async (storyData, token) => {
    console.log(storyData,token)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(`${API_URL}/create`, storyData, config);
	console.log("created story",response)
	return response.data;
};

// Function to update a story
export const updateStory = async (id, text, token) => {
	console.log("user data",id,text,token)
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.patch(`${API_URL}/${id}/contribute`, {text}, config);
	console.log("update story",response.data)
	return response.data;
};

// Function to delete a story
export const deleteStory = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.delete(`${API_URL}/${id}`, config);
	return response.data;
};





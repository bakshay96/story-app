const express = require('express');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const { createStory, getStories, getStory, addContribution, deleteStoryById } = require('./story.controllers');
const StoryRouter = express.Router();

StoryRouter.post('/create', authMiddleware, createStory);
StoryRouter.get('/', authMiddleware, getStories);
StoryRouter.get('/:id', authMiddleware, getStory);
StoryRouter.patch('/:id/contribute', authMiddleware, addContribution);
StoryRouter.delete("/:id",authMiddleware,deleteStoryById)

module.exports ={
    StoryRouter
} 
    

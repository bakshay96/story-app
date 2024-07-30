const express = require('express');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const { createStory, getStories, getStory, addContribution } = require('./story.controllers');
const StoryRouter = express.Router();

StoryRouter.post('/create', authMiddleware, createStory);
StoryRouter.get('/', authMiddleware, getStories);
StoryRouter.get('/:id', authMiddleware, getStory);
StoryRouter.post('/:id/contribute', authMiddleware, addContribution);

module.exports ={
    StoryRouter
} 
    

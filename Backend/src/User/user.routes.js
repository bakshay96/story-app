const express = require('express');
const {getCurrentUser, register, login } = require('./user.controllers');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const UserRouter = express.Router();


UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/me', authMiddleware, getCurrentUser);


module.exports ={
    UserRouter
}

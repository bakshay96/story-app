const express = require('express');
const {getCurrentUser, register, login, getAllUsers } = require('./user.controllers');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const UserRouter = express.Router();


UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/me', authMiddleware, getCurrentUser);
UserRouter.get("/",getAllUsers);


module.exports ={
    UserRouter
}

const express = require('express');
const {getCurrentUser, register, login, getAllUsers, logoutUser } = require('./user.controllers');
const { authMiddleware } = require('../Middlewares/authMiddleware');
const UserRouter = express.Router();


UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/me', authMiddleware, getCurrentUser);
UserRouter.get("/",getAllUsers);
UserRouter.post("/logout",authMiddleware,logoutUser)


module.exports ={
    UserRouter
}

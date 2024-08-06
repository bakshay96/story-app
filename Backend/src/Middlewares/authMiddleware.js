// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { UserModel } = require('../User/user.models');
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
    
    const token = req.header('Authorization')?.split(' ')[1];
    
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("decoded",decoded)
        req.user = await UserModel.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = {authMiddleware};

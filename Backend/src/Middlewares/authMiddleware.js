// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { statusMiddleware } = require('./statusMiddleware');


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return statusMiddleware(401, 'Access denied. No token provided.')(req, res, next);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return statusMiddleware(401, 'Invalid token.')(req, res, next);
    }
};

module.exports = {
    authMiddleware
}
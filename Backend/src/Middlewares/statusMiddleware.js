// middlewares/statusMiddleware.js

const statusMiddleware = (req, res, next) => {
    res.statusMessage = (statusCode, message) => {
        res.status(statusCode).json({ message });
    };
    next();
};

module.exports = {statusMiddleware}

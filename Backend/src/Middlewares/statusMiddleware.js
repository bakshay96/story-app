// middlewares/statusMiddleware.js
const statusMiddleware = (statusCode, message) => {
    return (req, res, next) => {
        res.status(statusCode).json({ status: statusCode, message: message });
    };
};

module.exports = {
    statusMiddleware
}

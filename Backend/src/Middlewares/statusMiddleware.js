// src/Middlewares/statusMiddleware.js
function statusMiddleware(statusCode, message) {
    return (req, res, next) => {
        res.status(statusCode).json({
            status: 'error',
            message
        });
    };
}

module.exports = { statusMiddleware };

// middlewares/responseHandler.js
const responseHandler = (req, res, next) => {
    res.success = (data, message = 'Success') => {
        res.json({
            success: true,
            message,
            data
        });
    };

    res.fail = (message = 'Failure', statusCode = 400) => {
        res.status(statusCode).json({
           
            success: false,
            message
        });
    };

    next();
};

module.exports = {responseHandler};

// middlewares/errorHandler.js

require("dotenv").config();
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log error for debugging purposes
    
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack.replace(/[^\x20-\x7E]/g, '')
    });
};

module.exports = {errorHandler};

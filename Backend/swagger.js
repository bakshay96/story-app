// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Collaborative and Fun Story Creator API',
        version: '1.0.0',
        description: 'API documentation for the Collaborative and Fun Story Creator web application',
    },
    servers: [
        {
            url: 'http://localhost:5050',
            description: 'Development local server-1',
        },
        {
            url:'https://story-app-waqr.onrender.com',
            description:'Development remote server-2'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./src/User/*.js','./src/Story/*.js'], // You can also include other files like models if you use JSDoc for documenting them
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};

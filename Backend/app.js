const express = require("express");
const { connnectDB } = require("./src/Connection/db");
const { uploadRoute } = require("./src/FileUpload/file.routes");
const { UserRouter } = require("./src/User/user.routes");
const { StoryRouter } = require("./src/Story/story.routes");
const { swaggerUi, swaggerSpec } = require('./swagger');
const { responseHandler } = require("./src/Middlewares/reponseHandler");
const { errorHandler } = require("./src/Middlewares/errorHandler");

const cors=require("cors");
require("dotenv").config();
const port=process.env.PORT || 8080;

//create express app
const app=express();

// Middlewares
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(responseHandler);



// Routes
app.get("/",async (req,res)=>{
    res.sendFile(__dirname + "/utils/index.html");
})

app.use('/api/auth', UserRouter);
app.use('/api/stories', StoryRouter);
app.use("/api/upload",uploadRoute)

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Error handling middleware
app.use(errorHandler);

//server 
app.listen(port,async ()=>{
    try {

        console.log("Server is running  on port",port);
        await connnectDB();
        console.log("db connected successfully");
    } catch (error) {
        console.log("Something wen't wrong ")
        return error;
    }
})


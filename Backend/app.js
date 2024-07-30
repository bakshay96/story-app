const express = require("express");
const cors=require("cors");
const { connnectDB } = require("./src/Connection/db");
const { uploadRoute } = require("./src/FileUpload/file.routes");
const { UserRouter } = require("./src/User/user.routes");
const { StoryRouter } = require("./src/Story/story.routes");

//Env config
require("dotenv").config();
const port=process.env.PORT || 8080;

const app=express();
app.use(cors({origin:"*"}));
app.use(express.json());

app.get("/",async (req,res)=>{
    res.sendFile(__dirname + "/utils/index.html");
})

// middleware
app.use('/api/auth', UserRouter);
app.use('/api/stories', StoryRouter);
app.use("/api/upload",uploadRoute)


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


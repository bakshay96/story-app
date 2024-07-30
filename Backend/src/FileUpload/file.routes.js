const { fileUpload } = require("./file.controller");
const multer = require('multer');
const { storage } = require('../Connection/cloudinary');
const express=require("express");

const uploadRoute=express.Router();
const upload = multer({ storage });


uploadRoute.post("/",upload.single('image'),fileUpload)

module.exports={
    uploadRoute
}





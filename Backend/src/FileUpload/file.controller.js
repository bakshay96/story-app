

const {ImageModel} =require("./file.models")
const {cloudinary} = require('../Connection/cloudinary');



const fileUpload=async (req, res) => {
    console.log("file",req.file)
    try {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        const newImage = new ImageModel({
          url: result.secure_url,
          cloudinary_id: result.public_id,
        });
        await newImage.save();
        res.json(newImage);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
};

module.exports ={
    fileUpload
};

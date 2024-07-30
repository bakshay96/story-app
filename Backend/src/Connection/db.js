const mongoose = require("mongoose");
require("dotenv").config();


const connnectDB=async () => {
    try {
        const res=await mongoose.connect(process.env.MONGO_URI);
        console.log("db response HOST",res.connections[0].host);
        console.log("db response PORT",res.connections[0].port);
        console.log("db response name",res.connections[0].name);
        
        
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports={
    connnectDB
}
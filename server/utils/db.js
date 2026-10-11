// const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(URI);
//         console.log('Connection Successful to DB');
//     } catch (error) {
//         console.log('Database Connection Failed');
//         process.exit(0);
//     }
// }

// module.exports = connectDB;


const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Atlas Connected Successfully!");
    } catch (error) {
        console.error("Database connection error in db.js:", error.message);
        throw error; // Isay throw karna zaroori hai taake server.js ka catch chale
    }
};

module.exports = connectDb;
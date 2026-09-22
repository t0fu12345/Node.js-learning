const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI || "mongodb://localhost:27017/practice_db";
        await mongoose.connect(url);
        console.log("MongoDb connected");
    } catch (error) {
        console.error("MongoDb connection error: ", error);
        process.exit(1);
    }
}
module.exports = connectDB;
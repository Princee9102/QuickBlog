import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err.message);
        });
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`, {
            serverSelectionTimeoutMS: 10000,
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        console.error("Server will continue running but database operations will fail.");
        console.error("Please check your MONGODB_URI in .env file.");
    }
};

export default connectDB;
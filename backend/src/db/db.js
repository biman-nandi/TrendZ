import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URI)
        console.log("✅ MongoDB is connected")

    } catch (error) {
        console.log('❌ MongoDB connection failed')
        process.exit(1)
    }
}

export default connectDB
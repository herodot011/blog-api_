import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('MongoDB connect');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
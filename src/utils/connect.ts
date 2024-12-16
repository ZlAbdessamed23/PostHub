import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_atlas_connection_string';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err : any) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

export default connectDB;

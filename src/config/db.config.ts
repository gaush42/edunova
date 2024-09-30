import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connectDB() {
    // Check if the environment variable exists
    const mongoUrl = process.env.MONGO_CONNECTION_URL || 'mongodb://localhost:27017/assignment'
    
    if (!mongoUrl) {
        throw new Error('MONGO_CONNECTION_URL is not defined in the environment variables.');
    }

    // Database connection
    mongoose.connect(mongoUrl, {
    }).then(() => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).catch((err) => {
        console.error('Connection failed ☹️☹️☹️☹️', err);
    });
}

// Export the connectDB function
export default connectDB;
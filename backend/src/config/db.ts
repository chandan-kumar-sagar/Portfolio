import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log(`[SYSTEM] Connecting to MongoDB at: ${connString.replace(/:([^@]+)@/, ':****@')}`);
    
    const conn = await mongoose.connect(connString);
    console.log(`[SYSTEM] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[ERROR] MongoDB connection failed:`, error);
    process.exit(1);
  }
};

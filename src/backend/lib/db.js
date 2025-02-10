/* eslint-disable no-undef */
import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing db connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState;
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};

export default connectDB;

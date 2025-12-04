// src/config/db.js
import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn('[DB] MONGO_URI not set – running without database.');
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('[DB] Connected to MongoDB');
  } catch (err) {
    console.error('[DB] MongoDB connection error:', err.message);
    // For production you might not want to crash; for now, fail fast.
    process.exit(1);
  }
}

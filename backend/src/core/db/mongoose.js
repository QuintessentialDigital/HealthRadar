const mongoose = require("mongoose");
const { mongoUri } = require("../../config/env");

async function connectDB() {
  if (!mongoUri) {
    throw new Error("❌ MONGODB_URI is not set in environment variables");
  }

  await mongoose.connect(mongoUri, { autoIndex: true });
  console.log("🚀 Connected to MongoDB");
}

module.exports = connectDB;


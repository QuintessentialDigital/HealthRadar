// src/modules/identity/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: false });

const User = mongoose.model('User', userSchema);

export default User;

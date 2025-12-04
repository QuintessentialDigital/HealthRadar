// src/modules/subscriptions/subscription.model.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    radarType: {
      type: String,
      required: true,
      enum: ['DENTIST', 'GP'],
    },
    postcode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    radiusMiles: {
      type: Number,
      required: true,
      min: 1,
      max: 200,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.index({ radarType: 1, postcode: 1 });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

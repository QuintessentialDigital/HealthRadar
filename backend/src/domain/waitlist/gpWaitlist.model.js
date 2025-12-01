// backend/src/domain/waitlist/gpWaitlist.model.js
const mongoose = require("mongoose");

const GpWaitlistSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    postcode: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },
    source: { type: String, default: "healthradar-web" }
  },
  {
    timestamps: true,
    collection: "gp_waitlist"
  }
);

// Optional index to avoid many duplicates
GpWaitlistSchema.index({ email: 1, postcode: 1 }, { unique: false });

module.exports = mongoose.model("GpWaitlist", GpWaitlistSchema);

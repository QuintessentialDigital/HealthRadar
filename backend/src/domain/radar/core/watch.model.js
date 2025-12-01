const mongoose = require("mongoose");

const WatchSchema = new mongoose.Schema({
  radarType: { type: String, required: true },
  postcode: { type: String, required: true },
  radiusMiles: { type: Number, default: 25 },
  options: { type: Object, default: {} },
  lastAlertAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("RadarWatch", WatchSchema);


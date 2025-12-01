const mongoose = require("mongoose");

const AlertLogSchema = new mongoose.Schema({
  radarType: String,
  watchId: String,
  summary: String,
  details: Object,
}, { timestamps: true });

module.exports = mongoose.model("RadarAlertLog", AlertLogSchema);


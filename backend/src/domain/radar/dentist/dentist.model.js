const mongoose = require("mongoose");

const DentistPractice = new mongoose.Schema({
  name: String,
  postcode: String,
  phone: String,
  acceptingNew: Boolean
}, { timestamps: true });

module.exports = mongoose.model("DentistPractice", DentistPractice);


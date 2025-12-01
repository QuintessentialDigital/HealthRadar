// Loads environment variables and enforces required ones
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || "",
};


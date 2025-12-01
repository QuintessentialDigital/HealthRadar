const express = require("express");
const connectDB = require("../core/db/mongoose");
const { port } = require("../config/env");

require("../domain/radar/dentist/dentist.radar"); // register radar
require("../domain/radar/gp/gp.radar"); // register GP radar

const indexRoutes = require("../interfaces/http/routes/index.routes");
const radarRoutes = require("../interfaces/http/routes/radar.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api/radar", radarRoutes);

// Start server
connectDB().then(() => {
  app.listen(port, () => console.log(`🚀 HealthRadar API running on port ${port}`));
});


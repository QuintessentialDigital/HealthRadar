const express = require("express");
const cors = require("cors");
const connectDB = require("../core/db/mongoose");
const { port } = require("../config/env");

require("../domain/radar/dentist/dentist.radar"); // register radar
require("../domain/radar/gp/gp.radar"); // register GP radar

const indexRoutes = require("../interfaces/http/routes/index.routes");
const radarRoutes = require("../interfaces/http/routes/radar.routes");
const waitlistRoutes = require("../interfaces/http/routes/waitlist.routes");


const app = express();
app.use(express.json());

// Allow browser frontends to call this API
app.use(
  cors({
    origin: "*", // you can lock this down later to specific domains
  })
);

// Routes
app.use("/", indexRoutes);
app.use("/api/radar", radarRoutes);
app.use("/api/waitlist", waitlistRoutes);  

// Start server
connectDB().then(() => {
  app.listen(port, () => console.log(`🚀 HealthRadar API running on port ${port}`));
});


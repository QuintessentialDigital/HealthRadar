// backend/src/interfaces/http/routes/waitlist.routes.js
const express = require("express");
const router = express.Router();
const { addToGpWaitlist } = require("../../../domain/waitlist/gpWaitlist.service");

// POST /api/waitlist/gp
router.post("/gp", async (req, res) => {
  try {
    const { email, postcode, notes } = req.body;

    const result = await addToGpWaitlist({
      email,
      postcode,
      notes,
      source: "healthradar-web"
    });

    res.status(201).json({
      ok: true,
      radarType: "gp",
      message: "You have been added to the GPRadar waitlist.",
      entry: result
    });
  } catch (err) {
    console.error("Error adding to GP waitlist:", err.message);

    res.status(400).json({
      ok: false,
      error: err.message || "Failed to join GPRadar waitlist"
    });
  }
});

module.exports = router;

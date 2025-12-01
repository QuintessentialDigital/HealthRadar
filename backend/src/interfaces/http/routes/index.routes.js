const express = require("express");
const router = express.Router();

// NOTE: 3x "../" because we're inside src/interfaces/http/routes
const { listRadars } = require("../../../domain/radar/core/radar.registry");

router.get("/", (req, res) => {
  res.json({ ok: true, radars: listRadars() });
});

module.exports = router;

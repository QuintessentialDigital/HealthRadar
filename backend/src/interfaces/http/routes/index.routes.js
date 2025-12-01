const express = require("express");
const router = express.Router();
const { listRadars } = require("../../domain/radar/core/radar.registry");

router.get("/", (req, res) => {
  res.json({ ok: true, radars: listRadars() });
});

module.exports = router;


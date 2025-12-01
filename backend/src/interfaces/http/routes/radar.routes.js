const express = require("express");
const router = express.Router();
const { preview } = require("../../domain/radar/core/radar.service");

router.get("/:type/preview", async (req, res) => {
  const r = await preview(req.params.type, req.query);
  res.json(r);
});

module.exports = router;


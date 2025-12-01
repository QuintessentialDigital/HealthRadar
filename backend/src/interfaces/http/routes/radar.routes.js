const express = require("express");
const router = express.Router();

// NOTE: 3x "../" because this file is in src/interfaces/http/routes
const { preview } = require("../../../domain/radar/core/radar.service");

router.get("/:type/preview", async (req, res, next) => {
  try {
    const result = await preview(req.params.type, req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

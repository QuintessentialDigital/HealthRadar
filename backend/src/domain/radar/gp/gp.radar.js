// backend/src/domain/radar/gp/gp.radar.js
const { registerRadar } = require("../core/radar.registry");

const GPRadar = {
  type: "gp",

  describe() {
    return { name: "GPRadar", type: "gp" };
  },

  async preview({ postcode }) {
    return {
      ok: true,
      message: `Preview working for GP at ${postcode}`
    };
  }
};

// Register this radar at startup
registerRadar("gp", GPRadar);

module.exports = GPRadar;


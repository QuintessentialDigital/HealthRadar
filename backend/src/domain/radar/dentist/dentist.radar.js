const { registerRadar } = require("../core/radar.registry");

const DentistRadar = {
  type: "dentist",
  describe() { return { name: "DentistRadar", type: "dentist" }; },

  async preview({ postcode }) {
    return {
      ok: true,
      message: `Preview working for dentist at ${postcode}`
    };
  }
};

// Register radar in system
registerRadar("dentist", DentistRadar);
module.exports = DentistRadar;


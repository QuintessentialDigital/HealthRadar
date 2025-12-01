const { getRadar } = require("./radar.registry");

async function preview(radarType, params) {
  const radar = getRadar(radarType);
  return radar.preview(params);
}

module.exports = { preview };


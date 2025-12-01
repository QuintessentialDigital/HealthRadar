// Export radar registry — radars will be added here automatically
const registry = {};

function registerRadar(name, radar) {
  registry[name] = radar;
}

function getRadar(name) {
  if (!registry[name]) throw new Error(`Radar not found: ${name}`);
  return registry[name];
}

function listRadars() {
  return Object.keys(registry);
}

module.exports = { registerRadar, getRadar, listRadars, registry };


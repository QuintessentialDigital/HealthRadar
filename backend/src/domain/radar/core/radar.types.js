// Common Radar interface — every radar must follow this
module.exports = {
  // not executable, but defines design pattern for all radars
  RadarInterface: {
    type: "",
    describe() {},
    scanOnce() {},
    evaluateWatch() {},
    preview() {}
  }
};

// backend/src/domain/radar/dentist/dentist.radar.js
const axios = require("axios");
const { registerRadar } = require("../core/radar.registry");

// Base URL of your existing DentistRadar API
const DENTISTRADAR_BASE_URL = "https://www.dentistradar.co.uk";

/**
 * Call the live DentistRadar /api/scan endpoint.
 * This is READ-ONLY and does not change anything in your existing app.
 */
async function callDentistRadarScan(postcode, radiusMiles) {
  const url =
    DENTISTRADAR_BASE_URL +
    "/api/scan?postcode=" +
    encodeURIComponent(postcode) +
    "&radius=" +
    encodeURIComponent(radiusMiles || 25);

  const response = await axios.get(url, { timeout: 10000 });
  return response.data || {};
}

/**
 * Map DentistRadar API response into HealthRadar preview format.
 */
function mapScanToPreview(data, fallbackPostcode, fallbackRadius) {
  const postcode = data.postcode || fallbackPostcode;
  const radiusMiles = data.radiusMiles || fallbackRadius || 25;

  const allPractices = Array.isArray(data.allPractices)
    ? data.allPractices
    : [];

  // You can adjust the filter if you want to show all, not only accepting
  const acceptingPractices = allPractices.filter((p) => p.accepting);

  const matches = acceptingPractices.map((p) => ({
    name: p.name,
    postcode: p.postcode || "",
    distanceText: p.distanceText || "",
    phone: p.phone || "",
    profileUrl: p.profileUrl || "",
    appointmentsUrl: p.appointmentsUrl || "",
    acceptingNew: !!p.accepting,
    childrenOnly: !!p.childOnly,
    notAccepting: !!p.notAccepting
  }));

  return {
    ok: true,
    radarType: "dentist",
    postcode,
    radiusMiles,
    totalMatches: matches.length,
    matches,
    raw: {
      acceptingCount: data.accepting || 0,
      childOnlyCount: data.childOnly || 0,
      notAcceptingCount: data.notAccepting || 0,
      scanned: data.scanned || 0
    }
  };
}

const DentistRadar = {
  type: "dentist",

  describe() {
    return {
      name: "DentistRadar",
      type: "dentist",
      description: "Tracks NHS dentist availability via the live DentistRadar service.",
      supportedOptions: ["acceptingNew", "childrenOnly"]
    };
  },

  /**
   * For now, we rely on the existing DentistRadar scanning.
   * Later, if you want, HealthRadar can have its OWN scanner.
   */
  async scanOnce() {
    // Optional: could call a diagnostic postcode here if you wanted a summary.
    return {
      updatedCount: 0,
      timestamp: new Date().toISOString(),
      note: "Using external DentistRadar scanning."
    };
  },

  /**
   * Evaluate a watch – for now we piggyback on the same logic as preview.
   * Later, you can plug this into cron + RadarWatch for automated alerts.
   */
  async evaluateWatch(watch, scanContext) {
    const { postcode, radiusMiles } = watch;
    const data = await callDentistRadarScan(postcode, radiusMiles);
    const preview = mapScanToPreview(data, postcode, radiusMiles);
    return preview.matches;
  },

  /**
   * Preview handler used by /api/radar/dentist/preview.
   * This is what the HealthRadar API calls today.
   */
  async preview(params) {
    const postcode = params.postcode;
    const radiusMiles = params.radiusMiles || 25;

    if (!postcode) {
      return {
        ok: false,
        radarType: "dentist",
        error: "postcode is required"
      };
    }

    try {
      const data = await callDentistRadarScan(postcode, radiusMiles);
      return mapScanToPreview(data, postcode, radiusMiles);
    } catch (err) {
      console.error("Error calling DentistRadar API:", err.message);
      return {
        ok: false,
        radarType: "dentist",
        postcode,
        radiusMiles,
        error: "Failed to fetch data from DentistRadar"
      };
    }
  }
};

// Register this radar in the central registry
registerRadar("dentist", DentistRadar);

module.exports = DentistRadar;

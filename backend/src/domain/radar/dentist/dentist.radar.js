// backend/src/domain/radar/dentist/dentist.radar.js
const axios = require("axios");
const { registerRadar } = require("../core/radar.registry");

// Let the base URL be configurable via env var
// Fallback to https://www.dentistradar.co.uk
const DENTISTRADAR_BASE_URL =
  process.env.DENTISTRADAR_API_BASE || "https://www.dentistradar.co.uk";

/**
 * Call the live DentistRadar /api/scan endpoint (read-only).
 */
async function callDentistRadarScan(postcode, radiusMiles) {
  const url =
    DENTISTRADAR_BASE_URL +
    "/api/scan?postcode=" +
    encodeURIComponent(postcode) +
    "&radius=" +
    encodeURIComponent(radiusMiles || 25);

  console.log("[DentistRadar] Calling:", url);

  const response = await axios.get(url, {
    timeout: 45000,
    // Sometimes APIs expect a User-Agent to not think it's a bot
    headers: {
      "User-Agent": "HealthRadar/1.0 (+server-side)"
    }
  });

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

  async scanOnce() {
    // For now, scanning is done in the existing DentistRadar app.
    return {
      updatedCount: 0,
      timestamp: new Date().toISOString(),
      note: "Using external DentistRadar scanning."
    };
  },

  async evaluateWatch(watch, scanContext) {
    const { postcode, radiusMiles } = watch;
    const data = await callDentistRadarScan(postcode, radiusMiles);
    const preview = mapScanToPreview(data, postcode, radiusMiles);
    return preview.matches;
  },

  async preview(params) {
    const postcode = params.postcode;
    const radiusMiles = params.radiusMiles || params.radius || 25;

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
      // More detailed debug so we can see what’s going wrong
      console.error("Error calling DentistRadar API:", {
        message: err.message,
        code: err.code,
        status: err.response && err.response.status,
        data: err.response && err.response.data
      });

      return {
        ok: false,
        radarType: "dentist",
        postcode,
        radiusMiles,
        error: "Failed to fetch data from DentistRadar",
        debug: {
          message: err.message,
          code: err.code || null,
          status: (err.response && err.response.status) || null
        }
      };
    }
  }
};

// Register this radar in the central registry
registerRadar("dentist", DentistRadar);

module.exports = DentistRadar;

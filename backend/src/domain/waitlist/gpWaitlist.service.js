// backend/src/domain/waitlist/gpWaitlist.service.js
const GpWaitlist = require("./gpWaitlist.model");

async function addToGpWaitlist({ email, postcode, notes, source }) {
  if (!email || !postcode) {
    throw new Error("email and postcode are required");
  }

  const entry = await GpWaitlist.create({
    email,
    postcode,
    notes: notes || "",
    source: source || "healthradar-web"
  });

  return {
    id: entry._id,
    email: entry.email,
    postcode: entry.postcode,
    createdAt: entry.createdAt
  };
}

module.exports = { addToGpWaitlist };

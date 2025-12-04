import { apiGet } from "./api.js";

export function searchDentists(postcode, radiusMiles) {
  return apiGet("/api/radar/dentist", {
    postcode,
    radiusMiles,
  });
}

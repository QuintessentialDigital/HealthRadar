// src/modules/radars/engines/dentistEngine.js
import axios from 'axios';

const baseUrl = process.env.DENTISTRADAR_API_URL;

if (!baseUrl) {
  console.warn(
    '[DentistEngine] DENTISTRADAR_API_URL is not set – dentist search will fail until configured.'
  );
}

export async function searchWithDentistEngine(postcode, radiusMiles) {
  if (!baseUrl) {
    throw new Error('DENTISTRADAR_API_URL is not configured');
  }

  const url = `${baseUrl.replace(/\/$/, '')}/api/search`;

  const params = {
    postcode,
    radiusMiles,
  };

  const response = await axios.get(url, {
    params,
    timeout: 10000,
  });

  // Expecting DentistRadar to return something like:
  // { ok: true, results: [...] }
  return {
    ok: response.data?.ok ?? true,
    radarType: 'DENTIST',
    source: 'DentistRadar',
    results: response.data?.results ?? response.data,
  };
}

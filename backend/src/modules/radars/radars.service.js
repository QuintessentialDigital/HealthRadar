// src/modules/radars/radars.service.js
import { searchWithDentistEngine } from './engines/dentistEngine.js';
// future: import { searchWithGPEngine } from './engines/gpEngine.js';

export async function searchRadar(radarType, { postcode, radiusMiles }) {
  if (!postcode || !radiusMiles) {
    throw new Error('postcode and radiusMiles are required');
  }

  switch (radarType) {
    case 'DENTIST':
      return searchWithDentistEngine(postcode, radiusMiles);

    // case 'GP':
    //   return searchWithGPEngine(postcode, radiusMiles);

    default:
      throw new Error(`Unsupported radarType: ${radarType}`);
  }
}

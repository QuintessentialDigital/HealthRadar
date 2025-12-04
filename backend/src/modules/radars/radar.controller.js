// src/modules/radars/radar.controller.js
import { searchRadar } from './radars.service.js';

export async function searchDentistRadar(req, res, next) {
  try {
    const { postcode, radiusMiles } = req.query;

    if (!postcode || !radiusMiles) {
      return res.status(400).json({
        ok: false,
        error: 'postcode and radiusMiles are required query params',
      });
    }

    const data = await searchRadar('DENTIST', {
      postcode,
      radiusMiles: Number(radiusMiles),
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
}

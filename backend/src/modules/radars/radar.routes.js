// src/modules/radars/radar.routes.js
import express from 'express';
import { searchDentistRadar } from './radar.controller.js';

const router = express.Router();

// GET /api/radar/dentist?postcode=RG41&radiusMiles=25
router.get('/dentist', searchDentistRadar);

// Future: /api/radar/gp, /api/radar/pharmacy, etc.

export default router;

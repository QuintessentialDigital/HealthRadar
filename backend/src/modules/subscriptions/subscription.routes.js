// src/modules/subscriptions/subscription.routes.js
import express from 'express';
import {
  createSubscription,
  listSubscriptionsForEmail,
} from './subscription.controller.js';

const router = express.Router();

// POST /api/subscriptions
router.post('/', createSubscription);

// GET /api/subscriptions?email=...
router.get('/', listSubscriptionsForEmail);

export default router;

// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import healthRoutes from './modules/health/health.routes.js';
import subscriptionRoutes from './modules/subscriptions/subscription.routes.js';
import radarRoutes from './modules/radars/radar.routes.js';

const app = express();

// Trust Render / proxies for rate limiting & HTTPS
app.set('trust proxy', 1);

// Basic security headers
app.use(helmet());

// CORS – allow your web app; fallback to '*'
const allowedOrigin = process.env.WEB_ORIGIN || '*';
app.use(
  cors({
    origin: allowedOrigin,
  })
);

// JSON body parsing
app.use(express.json());

// Logging
app.use(morgan('dev'));

// Simple rate limiting (tweak as you like)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
});
app.use(limiter);

// Health check
app.use('/api/health', healthRoutes);

// Core modules
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/radar', radarRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Not found',
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Error]', err);
  res.status(500).json({
    ok: false,
    error: 'Unexpected server error',
  });
});

export default app;

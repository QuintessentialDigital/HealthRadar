// src/server.js
import { loadEnv } from './config/env.js';
import { connectDb } from './config/db.js';
import app from './app.js';

loadEnv();

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`[API] HealthRadar API listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('[API] Failed to start server:', err);
  process.exit(1);
});

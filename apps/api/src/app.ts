import express from 'express';
import cors from 'cors';
import type { HealthResponse } from '@zenair/shared';

/**
 * Фабрика Express-приложения. Отдельно от запуска сервера (index.ts),
 * чтобы тесты могли поднять приложение без реального прослушивания порта.
 */
export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    const body: HealthResponse = { status: 'ok', service: 'api' };
    res.json(body);
  });

  return app;
}

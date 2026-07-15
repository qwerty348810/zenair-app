import { z } from 'zod';

/**
 * Общая схема ответа /health. Заглушка Этапа 0 — показывает, что одна и та же
 * Zod-схема доступна и на бэке (валидирует ответ), и на фронте (типизирует данные).
 * На Этапе 1 сюда придут схемы логина/регистрации.
 */
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.string(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

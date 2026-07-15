import { describe, it, expect } from 'vitest';
import { healthResponseSchema } from './index';

describe('healthResponseSchema', () => {
  it('принимает валидный ответ', () => {
    expect(healthResponseSchema.parse({ status: 'ok', service: 'api' })).toEqual({
      status: 'ok',
      service: 'api',
    });
  });

  it('отклоняет неверный status', () => {
    expect(() => healthResponseSchema.parse({ status: 'fail', service: 'api' })).toThrow();
  });
});

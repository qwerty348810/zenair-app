import { test, expect } from '@playwright/test';

test('главная страница открывается и показывает заголовок', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /ZenAir КП/i })).toBeVisible();
});

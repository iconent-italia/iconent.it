import { test, expect } from '@playwright/test';

test('flagship renders with name and noindex', async ({ page }) => {
  await page.goto('/concept/tony-effe/');
  await expect(page.locator('h1')).toContainText('TONY');
  const robots = await page.locator('meta[name="robots"]').getAttribute('content');
  expect(robots).toMatch(/noindex/);
});

test('unknown artist 404s', async ({ page }) => {
  const res = await page.goto('/concept/nobody/');
  expect(res?.status()).toBe(404);
});

import { test, expect } from '@playwright/test';

test.describe('GngProgress E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/progress');
  });

  test('should render progress bars', async ({ page }) => {
    const progressBars = page.locator('gng-progress-bar');
    await expect(progressBars.first()).toBeVisible();
  });

  test('should render determinate progress bar', async ({ page }) => {
    const determinateBar = page.locator('gng-progress-bar').first();
    await expect(determinateBar).toBeVisible();
  });

  test('should show progress value percentage', async ({ page }) => {
    const progressLabel = page.locator('text=1. Determinate').first();
    await expect(progressLabel).toBeVisible();
  });

  test('should render indeterminate progress bar', async ({ page }) => {
    const indeterminateBar = page.locator('gng-progress-bar[mode="indeterminate"]');
    await expect(indeterminateBar).toBeVisible();
  });

  test('should render buffer progress bar', async ({ page }) => {
    const bufferBar = page.locator('gng-progress-bar[mode="buffer"]');
    await expect(bufferBar).toBeVisible();
  });

  test('should show buffer label', async ({ page }) => {
    const bufferLabel = page.locator('text=3. Buffer').first();
    await expect(bufferLabel).toBeVisible();
  });

  test('should render query progress bar', async ({ page }) => {
    const queryBar = page.locator('gng-progress-bar[color="warn"]');
    await expect(queryBar).toBeVisible();
  });

  test('should show query mode label', async ({ page }) => {
    const queryLabel = page.locator('text=4. Query').first();
    await expect(queryLabel).toBeVisible();
  });

  test('should render progress bar with primary color', async ({ page }) => {
    const primaryBar = page.locator('gng-progress-bar[color="primary"]');
    await expect(primaryBar.first()).toBeVisible();
  });

  test('should render progress bar with accent color', async ({ page }) => {
    const accentBar = page.locator('gng-progress-bar[color="accent"]');
    await expect(accentBar).toBeVisible();
  });

  test('should render progress bar with warn color', async ({ page }) => {
    const warnBar = page.locator('gng-progress-bar[color="warn"]');
    await expect(warnBar).toBeVisible();
  });

  test('should display progress section header', async ({ page }) => {
    const header = page.getByRole('main').getByRole('heading', { name: 'Progress', exact: true });
    await expect(header).toBeVisible();
  });

  test('should have 4 progress bars', async ({ page }) => {
    const progressBars = page.locator('gng-progress-bar');
    await expect(progressBars).toHaveCount(4);
  });
});
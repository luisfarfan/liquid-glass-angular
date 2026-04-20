import { test, expect } from '@playwright/test';

test.describe('GngModal E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/modals');
  });

  test('should render modal trigger buttons', async ({ page }) => {
    await expect(page.getByText('Cinema (Default)')).toBeVisible();
    await expect(page.getByText('Glass Crystallize')).toBeVisible();
    await expect(page.getByText('Zoom Focus')).toBeVisible();
  });

  test('should open modal on cinema button click', async ({ page }) => {
    await page.getByText('Cinema (Default)').click();
    const modal = page.locator('.gng-modal-container').first();
    await expect(modal).toBeVisible({ timeout: 3000 });
  });

  test('should close modal on backdrop click', async ({ page }) => {
    await page.getByText('Cinema (Default)').click();
    const modal = page.locator('.gng-modal-container').first();
    await expect(modal).toBeVisible({ timeout: 3000 });
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });

  test('should open modal with glass animation', async ({ page }) => {
    await page.getByText('Glass Crystallize').click();
    const modal = page.locator('.gng-modal-container').first();
    await expect(modal).toBeVisible({ timeout: 3000 });
  });

  test('should open stacked workstation config modal', async ({ page }) => {
    await page.getByText('Abrir Workstation Config').click();
    const modal = page.locator('.gng-modal-container').first();
    await expect(modal).toBeVisible({ timeout: 3000 });
  });
});

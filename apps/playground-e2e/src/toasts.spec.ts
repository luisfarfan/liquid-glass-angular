import { test, expect } from '@playwright/test';

test.describe('GngToast E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/toasts');
  });

  test('should render toast trigger buttons', async ({ page }) => {
    await expect(page.getByText('Show Success')).toBeVisible();
    await expect(page.getByText('Show Error')).toBeVisible();
    await expect(page.getByText('Show Info')).toBeVisible();
    await expect(page.getByText('Custom (Long Duration)')).toBeVisible();
  });

  test('should show success toast on button click', async ({ page }) => {
    await page.getByText('Show Success').click();
    const toast = page.locator('gng-toast, .gng-toast').first();
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test('should show toast with success message', async ({ page }) => {
    await page.getByText('Show Success').click();
    await expect(page.getByText('Operación Exitosa')).toBeVisible({ timeout: 3000 });
  });

  test('should show error toast on button click', async ({ page }) => {
    await page.getByText('Show Error').click();
    await expect(page.getByText('Error Crítico')).toBeVisible({ timeout: 3000 });
  });

  test('should show info toast on button click', async ({ page }) => {
    await page.getByText('Show Info').click();
    const toast = page.locator('gng-toast, .gng-toast').first();
    await expect(toast).toBeVisible({ timeout: 3000 });
  });

  test('should render positioning buttons', async ({ page }) => {
    const positionBtns = page.locator('[title="Top Left"], [title="Top Right"], [title="Bottom Center"]');
    const count = await positionBtns.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show toast at top-right position', async ({ page }) => {
    await page.locator('[title="Top Right"]').click();
    const toast = page.locator('gng-toast, .gng-toast').first();
    await expect(toast).toBeVisible({ timeout: 3000 });
  });
});

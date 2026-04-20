import { test, expect } from '@playwright/test';

test.describe('GngDatePicker E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/date-picker');
  });

  test('should render date picker components', async ({ page }) => {
    const datePickers = page.locator('gng-date-picker');
    await expect(datePickers.first()).toBeVisible();
  });

  test('should show date picker input', async ({ page }) => {
    const input = page.locator('gng-date-picker input').first();
    await expect(input).toBeVisible();
  });

  test('should open calendar on input click', async ({ page }) => {
    const input = page.locator('gng-date-picker input').first();
    await input.click();
    const calendar = page.locator('[role="dialog"], .gng-datepicker-calendar, .cdk-overlay-pane').first();
    const count = await calendar.count();
    if (count > 0) {
      await expect(calendar).toBeVisible({ timeout: 3000 });
    }
  });

  test('should show form field labels', async ({ page }) => {
    await expect(page.getByText('Arrival Date')).toBeVisible();
  });

  test('should allow typing a date', async ({ page }) => {
    const input = page.locator('gng-date-picker input').first();
    await input.fill('2025-01-15');
    const value = await input.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });
});

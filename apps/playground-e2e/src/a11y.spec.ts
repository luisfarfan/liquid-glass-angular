import { test, expect } from '@playwright/test';

test.describe('GngA11y E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/a11y');
  });

  test('should render disabled button', async ({ page }) => {
    const disabledBtn = page.locator('button[gng-button][disabled]');
    await expect(disabledBtn).toBeVisible();
    await expect(disabledBtn).toHaveAttribute('disabled');
  });

  test('should render disabled input', async ({ page }) => {
    const disabledInput = page.locator('gng-input input[disabled]').first();
    await expect(disabledInput).toBeVisible();
    await expect(disabledInput).toBeDisabled();
  });

  test('should show checked toggle with label position before', async ({ page }) => {
    const toggle = page.locator('gng-toggle[labelposition="before"][aria-checked="true"]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toContainText('Status: Active');
  });

  test('should show checked checkbox with label position before', async ({ page }) => {
    const checkbox = page.locator('gng-checkbox[labelposition="before"][aria-checked="true"]');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toContainText('I Agree');
  });

  test('should not be focusable disabled button via keyboard', async ({ page }) => {
    const disabledBtn = page.locator('button[gng-button][disabled]');
    await page.keyboard.press('Tab');
    await expect(disabledBtn).not.toBeFocused();
  });

  test('should display a11y section header', async ({ page }) => {
    const header = page.locator('h3:has-text("Production Hardening")');
    await expect(header).toBeVisible();
  });

  test('should render all four a11y component cards', async ({ page }) => {
    const cards = page.locator('.bg-glass.border-glass-border');
    await expect(cards).toHaveCount(4);
  });
});
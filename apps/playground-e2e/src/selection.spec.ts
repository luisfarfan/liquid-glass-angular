import { test, expect } from '@playwright/test';

test.describe('GngToggle & GngCheckbox E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/selection');
  });

  test('should render toggle switches', async ({ page }) => {
    const toggles = page.locator('gng-toggle');
    await expect(toggles.first()).toBeVisible();
  });

  test('should show a pre-checked toggle', async ({ page }) => {
    const checkedToggle = page.locator('gng-toggle[aria-checked="true"]').first();
    await expect(checkedToggle).toBeVisible();
  });

  test('should toggle on click', async ({ page }) => {
    const uncheckedToggle = page.locator('gng-toggle').nth(1);
    await expect(uncheckedToggle).toHaveAttribute('aria-checked', 'false');
    await uncheckedToggle.click();
    await expect(uncheckedToggle).toHaveAttribute('aria-checked', 'true');
  });

  test('should not toggle disabled toggle', async ({ page }) => {
    const disabledToggle = page.locator('gng-toggle[aria-disabled="true"]');
    await expect(disabledToggle).toBeVisible();
    await disabledToggle.click({ force: true });
    await expect(disabledToggle).toHaveAttribute('aria-checked', 'false');
  });

  test('should render small size toggle', async ({ page }) => {
    const smToggle = page.locator('gng-toggle[size="sm"]');
    await expect(smToggle).toBeVisible();
  });

  test('should render checkboxes', async ({ page }) => {
    const checkboxes = page.locator('gng-checkbox');
    await expect(checkboxes.first()).toBeVisible();
  });

  test('should show a pre-checked checkbox', async ({ page }) => {
    const checkedCheckbox = page.locator('gng-checkbox[aria-checked="true"]').first();
    await expect(checkedCheckbox).toBeVisible();
  });

  test('should show indeterminate checkbox', async ({ page }) => {
    const indeterminateCheckbox = page.locator('gng-checkbox[aria-checked="mixed"]');
    await expect(indeterminateCheckbox).toBeVisible();
  });

  test('should show disabled checkbox', async ({ page }) => {
    const disabledCheckbox = page.locator('gng-checkbox[aria-disabled="true"]');
    await expect(disabledCheckbox).toBeVisible();
  });

  test('should toggle checkbox on click', async ({ page }) => {
    const uncheckedCheckbox = page.locator('gng-checkbox').nth(1);
    await expect(uncheckedCheckbox).toHaveAttribute('aria-checked', 'false');
    await uncheckedCheckbox.click();
    await expect(uncheckedCheckbox).toHaveAttribute('aria-checked', 'true');
  });
});

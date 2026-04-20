import { test, expect } from '@playwright/test';

test.describe('GngRadio E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/radio');
  });

  test('should render radio group', async ({ page }) => {
    const radioGroup = page.locator('gng-radio-group');
    await expect(radioGroup).toBeVisible();
  });

  test('should render radio buttons', async ({ page }) => {
    const radioButtons = page.locator('gng-radio-button');
    await expect(radioButtons).toHaveCount(4);
  });

  test('should show opt1 as pre-selected', async ({ page }) => {
    const opt1 = page.locator('gng-radio-button[value="opt1"]');
    await expect(opt1).toBeVisible();
    await expect(opt1).toHaveAttribute('aria-checked', 'true');
  });

  test('should select radio on click', async ({ page }) => {
    const opt2 = page.locator('gng-radio-button[value="opt2"]');
    await opt2.click();
    await expect(opt2).toHaveAttribute('aria-checked', 'true');

    const opt1 = page.locator('gng-radio-button[value="opt1"]');
    await expect(opt1).toHaveAttribute('aria-checked', 'false');
  });

  test('should show disabled radio button', async ({ page }) => {
    const disabledRadio = page.locator('gng-radio-button.is-disabled');
    await expect(disabledRadio).toBeVisible();
    await expect(disabledRadio).toHaveAttribute('aria-disabled', 'true');
  });

  test('should not select disabled radio on click', async ({ page }) => {
    const disabledRadio = page.locator('gng-radio-button.is-disabled');
    await disabledRadio.click({ force: true });
    await expect(disabledRadio).toHaveAttribute('aria-checked', 'false');
  });

  test('should render label text for each radio button', async ({ page }) => {
    await expect(page.locator('gng-radio-button[value="opt1"]')).toContainText('Option One');
    await expect(page.locator('gng-radio-button[value="opt2"]')).toContainText('Option Two');
    await expect(page.locator('gng-radio-button[value="opt3"]')).toContainText('Option Three');
  });
});

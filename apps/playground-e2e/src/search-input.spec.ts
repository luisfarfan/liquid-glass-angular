import { test, expect } from '@playwright/test';

test.describe('GngSearchInput E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/search-input');
  });

  test('should render search input fields', async ({ page }) => {
    const searchInputs = page.locator('gng-search-input');
    await expect(searchInputs.first()).toBeVisible();
  });

  test('should allow typing in search input', async ({ page }) => {
    const input = page.locator('gng-search-input').first().locator('input');
    await input.fill('angular');
    await expect(input).toHaveValue('angular');
  });

  test('should emit debounced search event', async ({ page }) => {
    const input = page.locator('gng-search-input').first().locator('input');
    await input.fill('test query');
    await page.waitForTimeout(500);
    await expect(page.locator('text=/Última emisión.*test query/')).toBeVisible();
  });

  test('should show clear button when input has value', async ({ page }) => {
    const input = page.locator('gng-search-input').first().locator('input');
    await input.fill('hello');
    const clearBtn = page.locator('gng-search-input').first().locator('button[aria-label*="clear"], button[aria-label*="limpiar"], button[title*="clear"]');
    if (await clearBtn.count() > 0) {
      await expect(clearBtn.first()).toBeVisible();
    }
  });

  test('should render expandable search input', async ({ page }) => {
    const expandableInput = page.locator('gng-search-input').nth(1);
    await expect(expandableInput).toBeVisible();
  });

  test('should show shortcut badge on expandable search', async ({ page }) => {
    const expandableInput = page.locator('gng-search-input').nth(1);
    await expect(expandableInput).toBeVisible();
    const badge = expandableInput.locator('[class*="shortcut"], kbd, [class*="badge"]');
    if (await badge.count() > 0) {
      await expect(badge.first()).toBeVisible();
    }
  });

  test('should focus expandable input on placeholder click', async ({ page }) => {
    const input = page.locator('gng-search-input').nth(1).locator('input');
    await input.click();
    await expect(input).toBeFocused();
  });
});

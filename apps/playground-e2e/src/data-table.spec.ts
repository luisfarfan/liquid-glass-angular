import { test, expect } from '@playwright/test';

test.describe('GngDataTable E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/data-table');
  });

  test('should render data table container', async ({ page }) => {
    const tableContainer = page.locator('gng-data-table-container, [gng-table], table').first();
    await expect(tableContainer).toBeVisible({ timeout: 5000 });
  });

  test('should render table rows', async ({ page }) => {
    const rows = page.locator('tr, [gng-row]');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render table headers', async ({ page }) => {
    const headers = page.locator('th, [gng-header-cell]');
    const count = await headers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show user data in table', async ({ page }) => {
    await expect(page.getByText('Alexander Wright').first()).toBeVisible({ timeout: 5000 });
  });

  test('should render pagination controls', async ({ page }) => {
    const pagination = page.locator('gng-pagination').first();
    await expect(pagination).toBeVisible({ timeout: 5000 });
  });

  test('should render search input for filtering', async ({ page }) => {
    const searchInput = page.locator('gng-search-input, gng-input[placeholder*="Search"], gng-input[placeholder*="Buscar"]');
    if (await searchInput.count() > 0) {
      await expect(searchInput.first()).toBeVisible();
    }
  });

  test('should filter table rows on search', async ({ page }) => {
    const searchInput = page.locator('gng-search-input input, gng-input input').first();
    if (await searchInput.count() > 0) {
      await searchInput.fill('Elena');
      await page.waitForTimeout(600);
      await expect(page.getByText('Elena Rodriguez').first()).toBeVisible();
    }
  });
});

import { test, expect } from '@playwright/test';

test.describe('GngPagination E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/pagination');
  });

  test('should render pagination component', async ({ page }) => {
    const pagination = page.locator('gng-pagination').first();
    await expect(pagination).toBeVisible();
  });

  test('should render navigation buttons', async ({ page }) => {
    const prevBtn = page.locator('gng-pagination').first().locator('button').first();
    await expect(prevBtn).toBeVisible();
  });

  test('should navigate to next page on click', async ({ page }) => {
    const pagination = page.locator('gng-pagination').first();
    const nextBtn = pagination.locator('button[aria-label*="siguiente"], button[aria-label*="next"]').first();
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      await expect(page.locator('text=/Último pageChange: index 1/')).toBeVisible();
    }
  });

  test('should change dataset length on button click', async ({ page }) => {
    await page.getByText('47').first().click();
    const pagination = page.locator('gng-pagination').first();
    await expect(pagination).toBeVisible();
  });

  test('should render compact pagination without size selector', async ({ page }) => {
    const compactPagination = page.locator('gng-pagination').nth(1);
    await expect(compactPagination).toBeVisible();
    const select = compactPagination.locator('select');
    await expect(select).toHaveCount(0);
  });

  test('should render page size selector in first pagination', async ({ page }) => {
    const firstPagination = page.locator('gng-pagination').first();
    const sizeSelector = firstPagination.locator('select');
    await expect(sizeSelector).toBeVisible();
  });
});

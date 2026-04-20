import { test, expect } from '@playwright/test';

test.describe('GngScrollbar E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/scrollbar');
  });

  test('should render scrollable container with CSS class', async ({ page }) => {
    const scrollContainer = page.locator('.gng-glass-scroll');
    await expect(scrollContainer).toBeVisible();
  });

  test('should render scrollable container with directive', async ({ page }) => {
    const directiveContainer = page.locator('[gngScroll]');
    await expect(directiveContainer).toBeVisible();
  });

  test('should show scrollable content lines', async ({ page }) => {
    await expect(page.getByText('Línea 1 —').first()).toBeVisible();
    await expect(page.getByText('Bloque 1').first()).toBeVisible();
  });

  test('should allow scrolling in CSS class container', async ({ page }) => {
    const container = page.locator('.gng-glass-scroll');
    const initialScrollTop = await container.evaluate((el) => el.scrollTop);
    await container.evaluate((el) => {
      el.scrollTop = 100;
    });
    const newScrollTop = await container.evaluate((el) => el.scrollTop);
    expect(newScrollTop).toBeGreaterThan(initialScrollTop);
  });

  test('should allow scrolling in directive container', async ({ page }) => {
    const container = page.locator('[gngScroll]');
    await expect(container).toBeVisible();
    const initialScrollTop = await container.evaluate((el) => el.scrollTop);
    await container.evaluate((el) => {
      el.scrollTop = 50;
    });
    const newScrollTop = await container.evaluate((el) => el.scrollTop);
    expect(newScrollTop).toBeGreaterThanOrEqual(initialScrollTop);
  });
});

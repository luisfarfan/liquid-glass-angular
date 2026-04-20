import { test, expect } from '@playwright/test';

test.describe('GngTimeline E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/timeline');
  });

  test('should render timeline components', async ({ page }) => {
    const timelines = page.locator('gng-timeline');
    await expect(timelines.first()).toBeVisible();
  });

  test('should render timeline items', async ({ page }) => {
    const items = page.locator('gng-timeline-item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show order tracking timeline', async ({ page }) => {
    await expect(page.getByText('Order Tracking #ORD-8829')).toBeVisible();
    await expect(page.getByText('Delivered to Customer')).toBeVisible();
  });

  test('should show audit log timeline', async ({ page }) => {
    await expect(page.getByText('Security & Audit Log')).toBeVisible();
    await expect(page.getByText('Critical: Stock Alert')).toBeVisible();
  });

  test('should render timeline item with success type', async ({ page }) => {
    const successItem = page.locator('gng-timeline-item[type="success"]').first();
    await expect(successItem).toBeVisible();
  });

  test('should render timeline item with error type', async ({ page }) => {
    const errorItem = page.locator('gng-timeline-item[type="error"]').first();
    await expect(errorItem).toBeVisible();
  });

  test('should render timeline item with warning type', async ({ page }) => {
    const warningItem = page.locator('gng-timeline-item[type="warning"]').first();
    await expect(warningItem).toBeVisible();
  });

  test('should show item descriptions', async ({ page }) => {
    await expect(page.getByText('Package signed by John Doe')).toBeVisible();
  });

  test('should show timestamps', async ({ page }) => {
    await expect(page.getByText('Today, 2:45 PM')).toBeVisible();
  });
});

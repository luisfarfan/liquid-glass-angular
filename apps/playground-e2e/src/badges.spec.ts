import { test, expect } from '@playwright/test';

test.describe('GngBadge & GngTag E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/badges');
  });

  test('should render numeric badges', async ({ page }) => {
    const badges = page.locator('gng-badge');
    await expect(badges.first()).toBeVisible();
  });

  test('should display badge value', async ({ page }) => {
    const badge5 = page.locator('gng-badge .gng-badge-indicator.has-value').first();
    await expect(badge5).toBeVisible();
    await expect(badge5).toContainText('5');
  });

  test('should display badge with 99+ value', async ({ page }) => {
    const badge99 = page.locator('gng-badge .gng-badge-indicator.has-value').filter({ hasText: '99+' });
    await expect(badge99).toBeVisible();
  });

  test('should render dot badges', async ({ page }) => {
    const dotBadges = page.locator('gng-badge .gng-badge-wrapper.is-dot');
    await expect(dotBadges.first()).toBeVisible();
  });

  test('should render tags with glass style', async ({ page }) => {
    const tags = page.locator('gng-tag');
    await expect(tags.first()).toBeVisible();
  });

  test('should render tag variants', async ({ page }) => {
    await expect(page.locator('gng-tag[variant="success"]').first()).toBeVisible();
    await expect(page.locator('gng-tag[variant="warning"]').first()).toBeVisible();
    await expect(page.locator('gng-tag[variant="error"]').first()).toBeVisible();
    await expect(page.locator('gng-tag[variant="info"]').first()).toBeVisible();
    await expect(page.locator('gng-tag[variant="primary"]').first()).toBeVisible();
    await expect(page.locator('gng-tag[variant="neutral"]').first()).toBeVisible();
  });

  test('should render tag with text content', async ({ page }) => {
    const onlineTag = page.locator('gng-tag[variant="success"]').first();
    await expect(onlineTag).toContainText('Online');
  });

  test('should render solid style tags', async ({ page }) => {
    const solidTags = page.locator('gng-tag[style="solid"]');
    await expect(solidTags.first()).toBeVisible();
  });
});

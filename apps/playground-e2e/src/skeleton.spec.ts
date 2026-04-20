import { test, expect } from '@playwright/test';

test.describe('GngSkeleton E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/skeleton');
  });

  test('should render skeleton elements', async ({ page }) => {
    const skeletons = page.locator('gng-skeleton');
    const count = await skeletons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render circle skeleton', async ({ page }) => {
    const circleSkeleton = page.locator('gng-skeleton[type="circle"]').first();
    await expect(circleSkeleton).toBeVisible();
  });

  test('should render rect skeleton', async ({ page }) => {
    const rectSkeleton = page.locator('gng-skeleton[type="rect"]').first();
    await expect(rectSkeleton).toBeVisible();
  });

  test('should render text skeleton', async ({ page }) => {
    const textSkeleton = page.locator('gng-skeleton[type="text"]').first();
    await expect(textSkeleton).toBeVisible();
  });

  test('should have aria-hidden on skeletons', async ({ page }) => {
    const skeleton = page.locator('gng-skeleton').first();
    await expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  });

  test('should apply width styles', async ({ page }) => {
    const fullWidthSkeleton = page.locator('gng-skeleton[width="100%"]').first();
    await expect(fullWidthSkeleton).toBeVisible();
  });
});

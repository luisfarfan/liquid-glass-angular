import { test, expect } from '@playwright/test';

test.describe('GngAvatar E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/avatar');
  });

  test('should render avatars in all sizes', async ({ page }) => {
    const smAvatar = page.locator('gng-avatar[size="sm"]');
    const mdAvatar = page.locator('gng-avatar[size="md"]');
    const lgAvatar = page.locator('gng-avatar[size="lg"]').first();
    const xlAvatar = page.locator('gng-avatar[size="xl"]').first();

    await expect(smAvatar).toBeVisible();
    await expect(mdAvatar).toBeVisible();
    await expect(lgAvatar).toBeVisible();
    await expect(xlAvatar).toBeVisible();
  });

  test('should show initials for avatars without image', async ({ page }) => {
    const smAvatar = page.locator('gng-avatar[size="sm"]');
    await expect(smAvatar).toContainText('SM');
  });

  test('should render avatar with status indicator', async ({ page }) => {
    const onlineAvatar = page.locator('gng-avatar:has(.gng-avatar__status--online)');
    await expect(onlineAvatar).toBeVisible();

    const busyAvatar = page.locator('gng-avatar:has(.gng-avatar__status--busy)');
    await expect(busyAvatar).toBeVisible();

    const offlineAvatar = page.locator('gng-avatar:has(.gng-avatar__status--offline)');
    await expect(offlineAvatar).toBeVisible();
  });

  test('should show loading skeleton initially', async ({ page }) => {
    const loadingAvatar = page.locator('gng-avatar[name="Cargando demo"]');
    await expect(loadingAvatar).toBeVisible();
  });

  test('should toggle loading state via button', async ({ page }) => {
    const toggleBtn = page.getByText('Toggle loading');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
  });
});

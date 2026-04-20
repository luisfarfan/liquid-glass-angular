import { test, expect } from '@playwright/test';

test.describe('GngTabs E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/tabs');
  });

  test('should render underline tabs', async ({ page }) => {
    const underlineTabs = page.locator('gng-tabs[variant="underline"]').first();
    await expect(underlineTabs).toBeVisible();
  });

  test('should render pill tabs', async ({ page }) => {
    const pillTabs = page.locator('gng-tabs[variant="pill"]').first();
    await expect(pillTabs).toBeVisible();
  });

  test('should show first tab as active by default', async ({ page }) => {
    const firstTabContent = page.getByText('System Overview');
    await expect(firstTabContent).toBeVisible();
  });

  test('should switch tab content on click', async ({ page }) => {
    const securityTab = page.locator('gng-tabs[variant="underline"]').first()
      .locator('button, [role="tab"]').filter({ hasText: 'Security' });
    await securityTab.click();

    await expect(page.getByText('Security Protocols')).toBeVisible();
    await expect(page.getByText('System Overview')).not.toBeVisible();
  });

  test('should not switch to disabled tab', async ({ page }) => {
    const hardwareTab = page.locator('gng-tabs[variant="underline"]').first()
      .locator('button.gng-tab-trigger').filter({ hasText: 'Hardware' });
    await expect(hardwareTab).toBeVisible();
    await expect(hardwareTab).toHaveClass(/is-disabled/);
  });

  test('should render pill tab labels', async ({ page }) => {
    const pillTabs = page.locator('gng-tabs[variant="pill"]').first();
    await expect(pillTabs).toContainText('Monthly');
    await expect(pillTabs).toContainText('Yearly');
    await expect(pillTabs).toContainText('Lifetime');
  });

  test('should switch pill tab content', async ({ page }) => {
    const yearlyTab = page.locator('gng-tabs[variant="pill"]').first()
      .locator('button, [role="tab"]').filter({ hasText: 'Yearly' });
    await yearlyTab.click();
    await expect(page.getByText('$119.99')).toBeVisible();
  });
});

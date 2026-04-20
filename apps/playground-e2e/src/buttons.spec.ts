import { test, expect } from '@playwright/test';

test.describe('GngButton E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/buttons');
  });

  test('should render various button variants', async ({ page }) => {
    // Check for primary button
    const primaryBtn = page.locator('button[gng-button].gng-btn-primary').first();
    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toContainText(/Primary/i);

    // Check for secondary button
    const secondaryBtn = page.locator('button[gng-button].gng-btn-secondary').first();
    await expect(secondaryBtn).toBeVisible();
  });

  test('should show ripple effect on click', async ({ page }) => {
    const button = page.locator('button[gng-button]').first();
    
    // Click and hold or just click to trigger ripple
    await button.click();
    
    const rippleContainer = button.locator('.gng-ripple-container');
    await expect(rippleContainer).toBeAttached();
    
    const ripple = rippleContainer.locator('.gng-glass-ripple');
    await expect(ripple).toBeAttached();
  });

  test('should be disabled when the disabled attribute is present', async ({ page }) => {
    // We expect at least one disabled button in the demo page
    const disabledBtn = page.locator('button[gng-button][disabled]').first();
    await expect(disabledBtn).toBeDisabled();
    await expect(disabledBtn).toHaveClass(/opacity-50/);
    await expect(disabledBtn).toHaveClass(/pointer-events-none/);
  });

  test('should show loading spinner when in loading state', async ({ page }) => {
    // Assuming there is a button with isLoading set to true in the demo
    const loadingBtn = page.locator('button[gng-button][aria-busy="true"]').first();
    if (await loadingBtn.count() > 0) {
      await expect(loadingBtn.locator('.gng-loading-spinner')).toBeVisible();
      const content = loadingBtn.locator('.relative.z-10');
      await expect(content).toHaveClass(/opacity-0/);
    }
  });
});

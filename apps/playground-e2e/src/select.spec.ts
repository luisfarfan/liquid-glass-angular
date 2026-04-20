import { test, expect } from '@playwright/test';

test.describe('GngSelect E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Correct path as per app.routes.ts
    await page.goto('/demos/select');
  });

  test('should select an option in single select', async ({ page }) => {
    const field = page.locator('gng-form-field', { hasText: 'Plan de Suscripción' });
    const select = field.locator('gng-select');
    const trigger = select.locator('.gng-select-trigger');

    await trigger.click();
    
    const panel = page.locator('.gng-select-panel');
    await expect(panel).toBeVisible();

    const option = page.locator('gng-option').filter({ hasText: 'Free - $0/mo' }).first();
    await option.click();

    await expect(panel).not.toBeVisible();
    await expect(trigger).toContainText('Free - $0/mo');
  });

  test('should support multi-selection', async ({ page }) => {
    const field = page.locator('gng-form-field', { hasText: 'Tecnologías Favoritas' });
    const select = field.locator('gng-select');
    const trigger = select.locator('.gng-select-trigger');

    await trigger.click();
    
    const reactOpt = page.locator('gng-option').filter({ hasText: 'React' }).first();
    const tsOpt = page.locator('gng-option').filter({ hasText: 'TypeScript' }).first();

    await reactOpt.click();
    await tsOpt.click();

    const tags = select.locator('.gng-crystal');
    await expect(tags).toHaveCount(3); // Angular (default) + React + TypeScript
  });

  test('should filter options via search', async ({ page }) => {
    const field = page.locator('gng-form-field', { hasText: 'Tecnologías Favoritas' });
    const select = field.locator('gng-select');
    const trigger = select.locator('.gng-select-trigger');

    await trigger.click();
    
    const searchInput = page.locator('.gng-select-search-input');
    await searchInput.fill('Rust');

    const visibleOption = page.locator('gng-option:visible');
    await expect(visibleOption).toHaveCount(1);
    await expect(visibleOption).toContainText('Rust');
  });
});

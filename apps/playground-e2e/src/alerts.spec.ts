import { test, expect } from '@playwright/test';

test.describe('GngAlert E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/alerts');
  });

  test('should render all four semantic variant alerts', async ({ page }) => {
    const alerts = page.locator('gng-alert');
    await expect(alerts).toHaveCount(await alerts.count());

    const infoAlert = page.locator('gng-alert[variant="info"]').first();
    await expect(infoAlert).toBeVisible();

    const successAlert = page.locator('gng-alert[variant="success"]').first();
    await expect(successAlert).toBeVisible();

    const warningAlert = page.locator('gng-alert[variant="warning"]').first();
    await expect(warningAlert).toBeVisible();

    const errorAlert = page.locator('gng-alert[variant="error"]').first();
    await expect(errorAlert).toBeVisible();
  });

  test('should render alert title', async ({ page }) => {
    const infoAlert = page.locator('gng-alert[variant="info"]').first();
    await expect(infoAlert).toContainText('Información del Sistema');
  });

  test('should render alert body content', async ({ page }) => {
    const successAlert = page.locator('gng-alert[variant="success"]').first();
    await expect(successAlert).toContainText('Los datos del cliente');
  });

  test('should show close button on closable alert', async ({ page }) => {
    const closeBtn = page.locator('.gng-alert-close').first();
    await expect(closeBtn).toBeVisible();
  });

  test('should dismiss closable alert on close click', async ({ page }) => {
    const closableAlert = page.locator('gng-alert:has(.gng-alert-close)').first();
    await expect(closableAlert).toBeVisible();

    await page.locator('.gng-alert-close').first().click();

    await expect(closableAlert).not.toBeVisible();
  });

  test('should show reiniciar button after dismissing alert', async ({ page }) => {
    await page.locator('.gng-alert-close').first().click();

    const reiniciar = page.getByText('Reiniciar Alerta');
    await expect(reiniciar).toBeVisible();
  });

  test('should restore alert after clicking reiniciar', async ({ page }) => {
    await page.locator('.gng-alert-close').first().click();
    await page.getByText('Reiniciar Alerta').click();

    const closeBtn = page.locator('.gng-alert-close').first();
    await expect(closeBtn).toBeVisible();
  });

  test('should render alerts without title (inline style)', async ({ page }) => {
    const inlineAlert = page.locator('section').last().locator('gng-alert').first();
    await expect(inlineAlert).toBeVisible();
    await expect(inlineAlert).toContainText('mensaje corto');
  });
});

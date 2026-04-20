import { test, expect } from '@playwright/test';

test.describe('GngCharts & GngKpiCard E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/charts');
  });

  test('should render standard trend kpi cards', async ({ page }) => {
    const kpiCards = page.locator('gng-kpi-card');
    await expect(kpiCards.first()).toBeVisible();
  });

  test('should display kpi card with label', async ({ page }) => {
    const labelKpi = page.locator('gng-kpi-card:has-text("Ventas Netas")');
    await expect(labelKpi).toBeVisible();
  });

  test('should display kpi card with value and prefix', async ({ page }) => {
    const valueKpi = page.locator('gng-kpi-card:has-text("45,210")');
    await expect(valueKpi).toBeVisible();
  });

  test('should show trend value indicator', async ({ page }) => {
    const trendKpi = page.locator('gng-kpi-card:has-text("12.5%")');
    await expect(trendKpi).toBeVisible();
  });

  test('should render minimal variant kpi cards', async ({ page }) => {
    const minimalCards = page.locator('gng-kpi-card[variant="minimal"]');
    await expect(minimalCards.first()).toBeVisible();
  });

  test('should render progress variant kpi cards', async ({ page }) => {
    const progressCards = page.locator('gng-kpi-card[variant="progress"]');
    await expect(progressCards.first()).toBeVisible();
  });

  test('should render status variant kpi cards', async ({ page }) => {
    const statusCards = page.locator('gng-kpi-card[variant="status"]');
    await expect(statusCards.first()).toBeVisible();
  });

  test('should render kpi card with icon', async ({ page }) => {
    const iconKpi = page.locator('gng-kpi-card i.ri-bubble-chart-line');
    await expect(iconKpi).toBeVisible();
  });

  test('should render timeline component', async ({ page }) => {
    const timeline = page.locator('gng-timeline');
    await expect(timeline).toBeVisible();
  });

  test('should render timeline items', async ({ page }) => {
    const timelineItems = page.locator('gng-timeline-item');
    await expect(timelineItems).toHaveCount(4);
  });

  test('should show timeline item with success type', async ({ page }) => {
    const successItem = page.locator('gng-timeline-item[type="success"]');
    await expect(successItem).toBeVisible();
    await expect(successItem).toContainText('Nueva orden procesada');
  });

  test('should show timeline item with error type', async ({ page }) => {
    const errorItem = page.locator('gng-timeline-item[type="error"]');
    await expect(errorItem).toBeVisible();
    await expect(errorItem).toContainText('Alerta de seguridad');
  });

  test('should show timeline item with info type', async ({ page }) => {
    const infoItem = page.locator('gng-timeline-item[type="info"]');
    await expect(infoItem).toBeVisible();
    await expect(infoItem).toContainText('Actualización del sistema');
  });

  test('should show timeline item with warning type', async ({ page }) => {
    const warningItem = page.locator('gng-timeline-item[type="warning"]');
    await expect(warningItem).toBeVisible();
    await expect(warningItem).toContainText('Mantenimiento programado');
  });

  test('should display kpi card with negative trend value', async ({ page }) => {
    const negativeTrend = page.locator('gng-kpi-card .gng-kpi-trend.is-negative').first();
    await expect(negativeTrend).toBeVisible();
  });

  test('should display kpi card with current and target value for progress variant', async ({ page }) => {
    const progressKpi = page.locator('gng-kpi-card[variant="progress"]:has-text("Sales Goal")');
    await expect(progressKpi).toBeVisible();
    await expect(progressKpi).toContainText('75,000');
  });
});
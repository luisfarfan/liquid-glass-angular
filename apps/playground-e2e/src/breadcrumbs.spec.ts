import { test, expect } from '@playwright/test';

test.describe('GngBreadcrumbs E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/breadcrumbs');
  });

  test('should render breadcrumbs component', async ({ page }) => {
    const breadcrumbs = page.locator('gng-breadcrumbs');
    await expect(breadcrumbs.first()).toBeVisible();
  });

  test('should show breadcrumb items', async ({ page }) => {
    await expect(page.getByText('Inicio')).toBeVisible();
    await expect(page.getByText('Componentes')).toBeVisible();
    await expect(page.getByText('Breadcrumbs').first()).toBeVisible();
  });

  test('should render nav with aria-label', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Migas de demostración"]');
    await expect(nav).toBeVisible();
  });

  test('should render breadcrumbs with custom separator', async ({ page }) => {
    const separatorNav = page.locator('nav[aria-label="Ejemplo con separador chevron"]');
    await expect(separatorNav).toBeVisible();
    await expect(separatorNav).toContainText('›');
  });

  test('should render long label breadcrumb', async ({ page }) => {
    const separatorNav = page.locator('nav[aria-label="Ejemplo con separador chevron"]');
    await expect(separatorNav).toContainText('Catálogo');
  });

  test('should toggle long label on button click', async ({ page }) => {
    const toggleBtn = page.getByText('Alternar etiqueta larga');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(page.getByText('Producto corto')).toBeVisible();
    await toggleBtn.click();
    await expect(page.getByText('Producto corto')).not.toBeVisible();
  });

  test('should render linked breadcrumb items', async ({ page }) => {
    const link = page.locator('gng-breadcrumbs').first().locator('a').first();
    await expect(link).toBeVisible();
  });
});

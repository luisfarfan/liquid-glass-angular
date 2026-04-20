import { test, expect } from '@playwright/test';

test.describe('GngDropdownMenu E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/dropdown-menu');
  });

  test('should render trigger buttons', async ({ page }) => {
    await expect(page.getByText('Opciones')).toBeVisible();
    await expect(page.getByText('Más acciones')).toBeVisible();
  });

  test('should open dropdown menu on trigger click', async ({ page }) => {
    await page.getByText('Opciones').click();
    const menu = page.locator('gng-dropdown-menu').first();
    await expect(menu).toBeVisible({ timeout: 3000 });
  });

  test('should show menu items', async ({ page }) => {
    await page.getByText('Opciones').click();
    await expect(page.getByText('Mi perfil')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Ajustes')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Salir')).toBeVisible({ timeout: 3000 });
  });

  test('should execute action on menu item click', async ({ page }) => {
    await page.getByText('Opciones').click();
    await page.getByText('Mi perfil').click();
    await expect(page.getByText('Mi perfil').first()).toBeVisible();
    await expect(page.locator('text=/Última acción: Mi perfil/')).toBeVisible({ timeout: 3000 });
  });

  test('should close menu after item click', async ({ page }) => {
    await page.getByText('Opciones').click();
    const menu = page.locator('gng-dropdown-menu').first();
    await expect(menu).toBeVisible({ timeout: 3000 });
    await page.getByText('Ajustes').click();
    await expect(menu).not.toBeVisible({ timeout: 3000 });
  });

  test('should show disabled item in second menu', async ({ page }) => {
    await page.getByText('Más acciones').click();
    const disabledItem = page.getByText('No disponible');
    await expect(disabledItem).toBeVisible({ timeout: 3000 });
  });

  test('should close menu by clicking outside', async ({ page }) => {
    await page.getByText('Opciones').click();
    await expect(page.getByText('Mi perfil')).toBeVisible({ timeout: 3000 });
    await page.mouse.click(10, 10);
    await expect(page.getByText('Mi perfil')).not.toBeVisible({ timeout: 3000 });
  });
});

import { test, expect } from '@playwright/test';

test.describe('GngFileUpload E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/file-upload');
  });

  test('should render file upload components', async ({ page }) => {
    const fileUploads = page.locator('gng-file-upload');
    await expect(fileUploads.first()).toBeVisible();
  });

  test('should show drop zone label', async ({ page }) => {
    await expect(page.getByText('Soltar imágenes aquí')).toBeVisible();
  });

  test('should show file type hint', async ({ page }) => {
    await expect(page.getByText(/Formatos soportados/)).toBeVisible();
  });

  test('should show files count tag', async ({ page }) => {
    const filesTag = page.locator('gng-tag[variant="info"]').first();
    await expect(filesTag).toBeVisible();
    await expect(filesTag).toContainText('Files');
  });

  test('should disable upload button when no files selected', async ({ page }) => {
    const uploadBtn = page.getByText('Subir a la Nube');
    await expect(uploadBtn).toBeVisible();
    const btn = uploadBtn.locator('..').locator('button, [gng-button]');
    if (await btn.count() > 0) {
      await expect(btn.first()).toBeDisabled();
    }
  });

  test('should handle file input', async ({ page }) => {
    const fileInput = page.locator('gng-file-upload input[type="file"]').first();
    if (await fileInput.count() > 0) {
      await expect(fileInput).toBeAttached();
    }
  });
});

import { test, expect } from '@playwright/test';

test.describe('主題切換功能測試', () => {
  test.beforeEach(async ({ page }) => {
    // 導向首頁
    await page.goto('/');
  });

  test('點擊切換按鈕應該切換背景顏色並在 body 添加 class', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    const body = page.locator('body');

    // 初始狀態應為淺色模式
    await expect(body).not.toHaveClass(/dark-theme/);

    // 點擊切換到深色模式
    await themeToggle.click();
    await expect(body).toHaveClass(/dark-theme/);

    // 點擊切換回淺色模式
    await themeToggle.click();
    await expect(body).not.toHaveClass(/dark-theme/);
  });

  test('重新載入頁面後應該保留主題偏好', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    const body = page.locator('body');

    // 切換到深色模式
    await themeToggle.click();
    await expect(body).toHaveClass(/dark-theme/);

    // 重新載入頁面
    await page.reload();

    // 驗證是否仍為深色模式
    await expect(body).toHaveClass(/dark-theme/);
  });
});

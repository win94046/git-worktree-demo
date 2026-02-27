import { test, expect } from '@playwright/test';

test.describe('Cookie Consent', () => {
  test.beforeEach(async ({ page }) => {
    // 進入首頁
    await page.goto('/');
  });

  test('首次進入頁面應在底部看到彈窗', async ({ page }) => {
    // 等待 1.5 秒讓彈窗出現 (元件內有 1秒延遲)
    await page.waitForTimeout(1500);
    const popup = page.locator('#cookie-consent-popup');
    await expect(popup).toBeVisible();
  });

  test('點擊「我同意」後彈窗由畫面中消失', async ({ page }) => {
    await page.waitForTimeout(1500);
    const popup = page.locator('#cookie-consent-popup');
    const acceptBtn = page.locator('#accept-cookie-btn');
    
    await acceptBtn.click();
    await expect(popup).not.toBeVisible();

    // 檢查 localStorage
    const consent = await page.evaluate(() => localStorage.getItem('cookie-consent-accepted'));
    expect(consent).toBe('true');
  });

  test('重新整理頁面後，若已同意則不應再次出現', async ({ page }) => {
    // 先同意
    await page.waitForTimeout(1500);
    await page.locator('#accept-cookie-btn').click();
    
    // 重新整理
    await page.reload();
    await page.waitForTimeout(1500); // 等待可能出現的延遲
    
    const popup = page.locator('#cookie-consent-popup');
    await expect(popup).not.toBeVisible();
  });
});

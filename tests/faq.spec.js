import { test, expect } from '@playwright/test';

test.describe('FAQ Section', () => {
    test.beforeEach(async ({ page }) => {
        // 假設開發伺服器在 3002 埠位執行
        await page.goto('http://localhost:3002');
    });

    test('應該顯示 FAQ 標題', async ({ page }) => {
        const title = page.locator('#faq-title');
        await expect(title).toBeVisible();
        await expect(title).toHaveText('有任何疑問嗎？');
    });

    test('預設應折疊所有問題，點擊後展開', async ({ page }) => {
        const firstQuestion = page.locator('.faq__question').first();
        const firstAnswer = page.locator('.faq__answer-wrapper').first();

        // 檢查初始狀態：答案的高度應為 0 且不可見（或不透明度為 0）
        // 這裡透過 style 屬性檢查
        await expect(firstAnswer).toHaveCSS('max-height', '0px');

        // 點擊問題
        await firstQuestion.click();

        // 檢查展開狀態：高度不應為 0
        // 等待動畫
        await page.waitForTimeout(500);
        const maxHeight = await firstAnswer.evaluate(el => el.style.maxHeight);
        expect(maxHeight).not.toBe('0px');
    });

    test('展開一個問題後，點擊另一個應能正常運作', async ({ page }) => {
        const questions = page.locator('.faq__question');
        const answers = page.locator('.faq__answer-wrapper');

        // 點擊第一個
        await questions.nth(0).click();
        await page.waitForTimeout(500);
        
        // 點擊第二個
        await questions.nth(1).click();
        await page.waitForTimeout(500);

        // 第一個應該收合，第二個應該展開 (依據本實作一次只開一個)
        await expect(answers.nth(0)).toHaveCSS('max-height', '0px');
        const maxHeight = await answers.nth(1).evaluate(el => el.style.maxHeight);
        expect(maxHeight).not.toBe('0px');
    });
});

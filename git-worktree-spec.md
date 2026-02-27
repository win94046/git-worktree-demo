# Feature Spec: FAQ Section

> 此文件由 Git Worktree Design Skill 自動產生，供 AI Agent 作為開發指引。

## 分支資訊

| 項目 | 值 |
|------|-----|
| 分支名稱 | `feature/faq-section` |
| 基於分支 | `master` |
| Worktree 路徑 | `C:/gitWorkTree/git-worktree-demo-faq` |
| 建立時間 | `2026-02-27` |

## 目標
新增常見 QA 問答區，具備手風琴（Accordion）式收合功能。

## 實作範圍
- [x] 建立 `src/data/faqData.js` 存放問答資料。
- [x] 建立 `src/components/FAQ.jsx` 元件。
- [x] 將 `FAQ` 元件整合至 `App.jsx`。
- [x] 實作 Playwright 測試腳本 `tests/faq.spec.js`。

## 驗收標準
- 預設折疊所有問題，僅顯示問題標題。
- 點擊標題後展開對應內容。
- 自動化測試通過。

## 技術約束
- 符合現有元件風格。

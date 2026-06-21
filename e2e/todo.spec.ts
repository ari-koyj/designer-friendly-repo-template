import { expect, test } from '@playwright/test'

/**
 * Todo のハッピーパス（追加 → 完了トグル → 削除）を実ブラウザで通す E2E。
 * 既存データと衝突しないよう、毎回ユニークな title を使い、最後に削除して後始末する。
 */
test('Todo を追加し、完了にして、削除できる', async ({ page }) => {
  const title = `E2Eタスク-${Date.now()}`

  await page.goto('/')

  // 追加
  await page.getByLabel('やることを入力').fill(title)
  await page.getByRole('button', { name: '追加' }).click()

  const item = page.getByTestId('todo-item').filter({ hasText: title })
  await expect(item).toBeVisible()

  // 完了トグル（サーバー反映後に再取得され checked になるのを待つ）
  const checkbox = item.getByLabel(`${title} を完了にする`)
  await checkbox.click()
  await expect(checkbox).toBeChecked()

  // 削除
  await item.getByRole('button', { name: `${title} を削除` }).click()
  await expect(page.getByTestId('todo-item').filter({ hasText: title })).toHaveCount(0)
})

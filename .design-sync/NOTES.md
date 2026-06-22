# design-sync NOTES

## Re-sync risks

- MatterDetail / MatterList は `@/lib/db/schema` の `Matter` 型に依存。スキーマ変更時は story fixtures も更新が必要。
- Storybook は `@storybook/nextjs-vite` v10 + Vite v8 + Next.js v16。toolchain upgrade 後は sb-reference の再ビルドが必要。
- globals.css の `@theme` トークン変更時はプレビューの色が変わるため re-sync が必要。

## Known fixes (first sync 2026-06-22)

- `.storybook/preview.tsx` のバックグラウンドカラーをダークテールから Wine & Beige (#f2f1ec) へ修正済み。

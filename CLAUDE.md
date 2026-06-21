# TDD (テスト駆動開発) ルール

## 基本原則

- **テスト哲学に必ず従うこと**: `.claude/rules/testing/test-philosophy.md` を必ず参照すること
- **テストサンプルに必ず従うこと**: `.claude/rules/testing/test-case-example.md` を必ず参照し、ドキュメンテーションを意識すること
- **実装は skills と agnets を活用すること** `.claude/skills/tdd-workflow/SKILL.md`を参照するこ

# アーキテクチャのルール

design as code を実現するためのアーキテクチャを実現すること

1. デザイナーが純粋な UI コンポーネントだけを扱えるように、UI 層とドメイン層は厳密に分離すること
2. ビジネスロジックは api 配下の hono で書くこと
3. next.js では サーバーの処理を書かずに `features/hook` に関数化し hono の api を利用すること
4. page.tsx に直接 UI を実装せずに `feature/ui` 配下に viewmodel 的にコンポーネントを作ること
5. UI は atmos 単位で作成し、`shared` 配下に作成すること
6. atmos 以上の Molecules, Organism, Templetes, Page でデザインする場合は shared を組み合わせて `features/ui` にコンポーネントを作ること
7. `share/ui` と `features/ui` また Page 単位で storybook でカタログ化すること

## アーキテクチャのイメージ

```
app/                          # Next.js: ルーティング / ページ合成のみ
├── users/
│   └── page.tsx              # hooks を呼び、UI に props を渡す
└── api/                      # Hono API
    └── routes/
        └── users.route.ts
features/
└── users/
    ├── ui/                   # 純粋な UI。Storybook 対象
    │   └── UserList/
    │       ├── UserList.tsx
    │       ├── UserList.stories.tsx
    │       └── index.ts
    └── hooks/                # Hono API 呼び出し
        └── useUsers.ts
lib/
└── hono-client.ts            # Hono client
shared/
├── ui/                       # 共通 UI
└── styles/                   # tokens / globals
```

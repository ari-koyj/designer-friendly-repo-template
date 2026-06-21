# design as code を実現するためのテンプレート

UI 層と domain 層を完全に分離し、デザイナーとエンジニアの領域を明確にしている。
また、next.js は router と UI の役割に限定しており、ビジネスロジックは hono で行う。

## セットアップ

```bash
bun i
bun dev
bun storybook
```

## 運用方法

### デザイナー

1. claude design でデザイン
2. Share > Send To > Claude code で生成されたプロンプトを claude code に貼る
3. claude が UI 実装と storybook を実装する
4. design-sync コマンドで claude design と同期

### エンジニア

5. cc-sdd で仕様を作成
6. 1 タスクずつ TDD していく
7. e2e を書く
8. デプロイ

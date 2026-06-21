# design-sync NOTES — design-work

Storybook shape. 6 storied components (Button, Checkbox, TextInput, TodoForm, TodoItem, TodoList),
14 stories total. React 19, Tailwind v4, Storybook `@storybook/nextjs-vite`.
This repo IS the DS's own source repo (a Next.js app) — there is no published `dist/`, so the bundle is
built directly from `cfg.entry = .design-sync/ds-entry.ts` (a hand-written re-export barrel). `--node-modules`
is the repo-root `node_modules` (has react/react-dom).

## Build learnings

- `[GENERAL]` **CSS comes from the storybook build, not a dist sidecar.** No `_ds_bundle.css` exists in
  source (Tailwind v4 is compiled by Next at app-build time). The converter's `[CSS_FROM_STORYBOOK]`
  catch-all scrapes the compiled CSS out of `.design-sync/sb-reference` (`assets/iframe-*.css`, ~8KB).
  → Consequence: `.design-sync/sb-reference` MUST be rebuilt (`buildCmd`) whenever components or
  `shared/styles/globals.css` change, BEFORE the driver — otherwise the shipped CSS is stale or misses
  utilities a new component uses. The §7 driver flow already rebuilds it; don't skip it.
- `[GENERAL]` **Tailwind v4 emits only utilities actually used.** The static `_ds_bundle.css` contains
  exactly the classes the 6 components reference (+ theme vars in `:root`). Utilities no component uses
  are absent — e.g. `rounded-card` is NOT in the CSS even though `--radius-card` is defined as a token,
  because nothing uses `rounded-card`. The design agent gets this static CSS (Tailwind is not re-run at
  design time), so only pre-compiled utilities + `var(--*)` tokens resolve. This drives conventions.md.
- No provider/decorator wrapping is needed. Components are pure (props-only); design tokens live in
  `:root` via the stylesheet. `cfg.provider` is unset and should stay unset.
- No custom fonts — theme `--font-sans` is the default system stack; no `[FONT_MISSING]`.

## Component-specific

- `Checkbox`: validate flags `[RENDER_THIN]` ("mounts paint nothing"). Benign — it's a 20px native
  checkbox that legitimately paints little; it renders identically to storybook on both Unchecked/Checked.
  Graded `match` (exhaustively, since it carried a warning). Do NOT author an owned preview to "fix" the
  thinness — that would diverge from the real component. If you want a richer CARD only, an owned preview
  could compose a label, but fidelity is already correct.

## Re-sync risks (watch-list for the next run)

- **Stale sb-reference → stale/missing CSS.** The single biggest risk here. Rebuild sb-reference whenever
  source changed; `[REFERENCE_STALE?]` in the capture log means you forgot.
- **New utility classes.** If a future component uses a token-utility not previously compiled (e.g. the
  first use of `rounded-card`), it only reaches the shipped CSS via a fresh sb-reference build. Re-grade
  any component whose story changed.
- **Grades are all image-judged `match` from the first full sync** (no anchor existed — prior run created
  the project but never uploaded `_ds_sync.json`). All 14 stories were judged from images, none
  sibling-trusted. Story caps not hit (max 4 stories/component).
- **Recovery note:** on 2026-06-21 the working tree's `.design-sync/` dir had been deleted; `config.json`
  and `ds-entry.ts` were restored from git HEAD. The three committed `*.log` files under `.design-sync/`
  are junk and should be removed from tracking (they're transient build logs).

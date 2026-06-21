# design-work — design system conventions

Pure React components (props-only, no domain logic). All compiled components are on
`window.DesignWork.*`: `Button`, `Checkbox`, `TextInput`, `TodoForm`, `TodoList`, `TodoItem`.

## Setup — no provider needed

There is **no ThemeProvider or root wrapper**. Design tokens are global CSS custom properties
defined on `:root` by the stylesheet, so components are styled the moment `styles.css` is loaded.
Just render the components; do not wrap them in any context.

## Styling idiom — Tailwind v4 utilities backed by design tokens

Style with utility classes whose values come from the design tokens below. The shipped stylesheet is
**static and pre-compiled** (Tailwind is not re-run at design time), so two things always resolve:
(1) the utility classes the library already uses, and (2) the `var(--token)` custom properties — use
these in `style={{}}` for any layout glue beyond the shipped utilities. Do **not** invent Tailwind
utilities outside the set below (e.g. `bg-blue-500`, `mt-4`, `rounded-card`) — they are not in the static
CSS and render unstyled.

Design tokens (CSS variables, always available via `var(--…)`):

| Token | Value | Utility that ships |
|---|---|---|
| `--color-surface` | `#06100f` | `bg-surface` |
| `--color-surface-muted` | `#0e1c1a` | `bg-surface-muted` |
| `--color-border` | `#1d322f` | `border-border` (with `border`) |
| `--color-foreground` | `#e3fff7` | `text-foreground` |
| `--color-foreground-muted` | `#76a39a` | `text-foreground-muted` |
| `--color-primary` | `#00ffc6` | `bg-primary`, `text-primary`, `accent-primary` |
| `--color-primary-foreground` | `#03130f` | `text-primary-foreground` |
| `--color-danger` | `#ff5a52` | `bg-danger` |
| `--radius-control` | `0.5rem` | `rounded-control` |
| `--spacing-control` | `0.625rem` | `py-control` |

Layout/typography utilities that ship and are safe to reuse: `flex`, `inline-flex`, `flex-col`,
`flex-1`, `items-center`, `justify-center`, `gap-2`, `gap-3`, `gap-6`, `w-full`, `max-w-xl`, `mx-auto`,
`p-6`, `px-3`, `px-4`, `py-8`, `text-sm`, `text-2xl`, `text-center`, `font-medium`, `font-bold`,
`line-through`, `truncate`, `transition`, `cursor-pointer`, `outline-none`.

## Where the truth lives

Read these bound files before styling: `styles.css` (and its `@import` of `_ds_bundle.css`, which holds
the `:root` tokens and every compiled utility), and each component's `*.prompt.md` / `*.d.ts` under
`components/<group>/<Name>/` for its real props.

## Idiomatic example

```tsx
// A small add-todo card: DS components for controls, shipped utilities + tokens for glue.
<div className="flex flex-col gap-6 p-6 rounded-control bg-surface border border-border max-w-xl mx-auto">
  <h2 className="text-2xl font-bold text-foreground">やること</h2>
  <DesignWork.TodoForm onSubmit={(title) => add(title)} />
  <DesignWork.TodoList todos={todos} onToggle={toggle} onDelete={remove} />
  <DesignWork.Button variant="danger" onClick={clearAll}>すべて削除</DesignWork.Button>
</div>
```

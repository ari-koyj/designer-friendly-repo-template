# design-work — Design Conventions

## Theme: Wine & Beige

This design system uses a **Wine & Beige** palette for a Japanese legal matter management system (次期基幹システム).

### Key Colors

| Token | Value | Usage |
|---|---|---|
| `primary` | `#690a08` | Primary actions, checked state, active links |
| `surface-muted` | `#f2f1ec` | Page background (beige) |
| `surface` | `#ffffff` | Card / panel background |
| `sidebar` | `#303030` | Left sidebar background |
| `foreground` | `#1c1c1c` | Body text |
| `foreground-muted` | `#433e3b` | Secondary text |
| `border` | `#c6bdbd` | Default border |
| `error` | `#b62613` | Danger actions, 差戻し status |
| `success` | `#67c23a` | 承認済 status |
| `warning` | `#e6a23c` | 申請中 status |

### Border Radius

- `--radius-control`: `4px` — inputs, buttons
- `--radius-card`: `6px` — cards, panels

### Typography

Font stack: Noto Sans JP (Japanese) + Inter (Latin), `-apple-system` fallback.

## Component Groups

| Group | Components |
|---|---|
| `ui` | Button, Checkbox, TextInput, StatusTag |
| `todos` | TodoForm, TodoItem, TodoList |
| `pages` | TodoPageView |
| `matters` | MatterList, MatterDetail |

## Usage Notes

- **Button variants**: `primary` (wine-red fill), `default` (bordered), `text` (no border), `danger` (red fill)
- **StatusTag**: Maps matter lifecycle — `Draft` → `申請中` → `承認済` (or `差戻し`) → `Closed`
- **MatterList / MatterDetail**: Wide layout — design at ≥960px width. Both use `cardMode: column`.
- **Checkbox**: Always pair with a `<label>` for accessibility and visual context.
- **TextInput**: Controlled (`value` + `onChange`). Supports `type="date"` for date fields.

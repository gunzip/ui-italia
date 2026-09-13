# Migration from `mui-italia` to `ui-italia`

> **Agent-oriented** document: deterministic steps, explicit mapping, no ambiguity. An agent should be able to apply it file by file and verify the result.
>
> Status: **in progress**. Primitives, blocks and assets are ported; the mappings below grow alongside the port.

## 0. Agent protocol

1. Find the touchpoints: `grep -rn "@mui/material\|@mui/lab\|@mui/x-date-pickers\|MIButton\|MIIconButton\|MIChip"` (exclude `node_modules`).
2. Migrate **one component at a time**, never more than one type per commit.
3. Replace the MUI imports with imports from `ui-italia/*`.
4. Remove the style props (`sx`, `style`) and replace them with **semantic** Tailwind classes (`bg-primary`, `text-muted-foreground`, …). Never hard-coded colors.
5. Apply the prop mapping from the component table (below).
6. If the component still uses the old name for compatibility, keep `ui-italia-compat` until the file migration is complete, then remove the import.
7. Verify: `pnpm --filter <app> typecheck` and, if the file has a story, `pnpm --filter ui-italia exec vitest --project storybook run`.
8. Do not introduce wrappers: prefer idiomatic composition and variants.

## 1. Imports and packages

| Before                                   | After                                                         |
| ---------------------------------------- | ------------------------------------------------------------- |
| `import { Button } from '@mui/material'` | `import { Button } from 'ui-italia/components/button'`        |
| `import { theme } from 'mui-italia'`     | tokens in `ui-italia/globals.css` (no `ThemeProvider`)        |
| `import { italia } from 'mui-italia'`    | `bg-italia-500`, `text-italia-700`, … (token `italia-50…900`) |
| `<ThemeProvider theme={theme}>`          | removed                                                       |
| `sx={{ ... }}`                           | semantic Tailwind classes                                     |

`ui-italia` is not headless: components are copied into the codebase via the shadcn registry. You can also import them from the package, but the idiomatic way is to install them:

```bash
pnpm dlx shadcn@latest add @ui-italia/button @ui-italia/theme
```

## 2. Token mapping

| MUI / `mui-italia`                                                             | `ui-italia`                                                                                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `theme.palette.primary.main` (`#0073E6`)                                       | `bg-primary`, `text-primary`, `border-primary`                                                                               |
| `theme.palette.text.primary` (`#17324D`)                                       | `text-foreground`                                                                                                            |
| `theme.palette.text.secondary` (`#5C6F82`)                                     | `text-muted-foreground`                                                                                                      |
| `theme.palette.background.default` (`#F2F2F2`)                                 | `bg-muted`                                                                                                                   |
| `theme.palette.background.paper`                                               | `bg-card` / `bg-background`                                                                                                  |
| `theme.palette.secondary.main` (`#00C5CA`)                                     | `bg-secondary text-secondary-foreground`                                                                                     |
| `theme.palette.error.*`                                                        | `text-destructive`, `bg-destructive/10`, `text-success-strong`… `*-muted` and `*-strong` also exist for success/warning/info |
| `theme.palette.divider` (`#E3E7EB`)                                            | `border-border`                                                                                                              |
| `theme.spacing(n)` (8px)                                                       | `p-{2n}` (Tailwind 4px grid): `spacing(3)=24px` → `p-6`                                                                      |
| `theme.shape.radius.8`                                                         | `rounded-lg`                                                                                                                 |
| `theme.typography.h1…h6`, `body1`, `body2`, `caption`, `monospace`, `overline` | `text-h1…text-h6`, `text-body-lg`, `text-body`, `text-caption`, `text-mono`, `text-overline`                                 |
| `theme.palette.italia[i]`                                                      | `bg-italia-{50…900}` / `text-italia-*`                                                                                       |
| focus ring MUI                                                                 | `focus-ring` utility (or `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`)                |

## 3. Components

| Old                                          | New                                                   | Status       |
| -------------------------------------------- | ----------------------------------------------------- | ------------ |
| `MIButton` / `ButtonNaked`                   | `Button`                                              | ✅ available |
| `MIIconButton`                               | `Button size="icon*"`                                 | ✅ available |
| `MIChip`                                     | `Badge`                                               | ✅ available |
| `MIAlert`                                    | `Alert`                                               | ✅ available |
| `MIBreadcrumbs`                              | `Breadcrumb`                                          | ✅ available |
| `MISpinner`                                  | `Spinner`                                             | ✅ available |
| `MISnackbar`                                 | `Sonner` (`toast()`)                                  | ✅ available |
| `MITooltip`                                  | `Tooltip`                                             | ✅ available |
| `MIPaper`                                    | `Card`                                                | ✅ available |
| `MIBoxedModule`                              | `BoxedModule` (block)                                 | ✅ available |
| `Tag` / `TagGroup`                           | `Tag` / `TagGroup`                                    | ✅ available |
| `Autocomplete`                               | `Combobox`                                            | ✅ available |
| `Link` (`@mui/material`)                     | `Link`                                                | ✅ available |
| `MIStepper`                                  | `Stepper` (block)                                     | ✅ available |
| `MIWizard`                                   | `Wizard` (block)                                      | ✅ available |
| `MITimeline`                                 | `Timeline` (block)                                    | ✅ available |
| `MISpidSelectOIDialog`                       | `SpidSelectOIDialog`                                  | ✅ available |
| `Footer` / `HeaderAccount` / `HeaderProduct` | `Footer` / `HeaderAccount` / `HeaderProduct` (blocks) | ✅ available |

> The ⏳ rows become ✅ as components get ported. Do not migrate a component that is not yet ✅: wait for the port or contribute.

### Blocks and compositions

The application-level compositions live in `ui-italia/blocks` (imported as
`ui-italia/blocks/<name>`); the registry item names are prefixed with `block-`
(e.g. `@ui-italia/block-footer`).

| `mui-italia`                                                                       | `ui-italia` block                                                                  |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `MIBoxedModule`                                                                    | `BoxedModule`                                                                      |
| `MITimeline` / `TimelineNotification`                                              | `Timeline` / `TimelineItem`                                                        |
| `MIStepper`                                                                        | `Stepper`                                                                          |
| `MIWizard`                                                                         | `Wizard`                                                                           |
| `MISpidSelectOIDialog`                                                             | `SpidSelectOIDialog`                                                               |
| `Tag` / `TagGroup`                                                                 | `Tag` / `TagGroup`                                                                 |
| `Footer` / `FooterLegal` / `FooterCheckout` / `FooterPostLogin` / `FooterPreLogin` | `Footer` / `FooterLegal` / `FooterCheckout` / `FooterPostLogin` / `FooterPreLogin` |
| `HeaderAccount`                                                                    | `HeaderAccount`                                                                    |
| `HeaderProduct`                                                                    | `HeaderProduct`                                                                    |
| `AccountDropdown`                                                                  | `AccountDropdown`                                                                  |
| `Banner` / `EnvironmentBanner`                                                     | `Banner` / `EnvironmentBanner`                                                     |
| `Hero` / `Infoblock` / `HorizontalNav` / `LangSwitch` / `Showcase`                 | same names                                                                         |
| `PartyAccountItem` / `PartyAccountItemButton` / `PartyAvatar`                      | same names                                                                         |
| `PartySwitch` / `ProductSwitch` / `ProductAvatar`                                  | `PartySwitch` / `ProductSwitch` / `ProductAvatar`                                  |
| `ProfileItem`                                                                      | `ProfileItem`                                                                      |
| `SingleFileInput`                                                                  | `SingleFileInput`                                                                  |
| `TOSAgreement`                                                                     | `TOSAgreement`                                                                     |
| `Walkthrough`                                                                      | `Walkthrough`                                                                      |
| `CopyToClipboardButton`                                                            | `CopyToClipboardButton`                                                            |

```tsx
// Before
import { MIBoxedModule } from "mui-italia"
;<MIBoxedModule title="Titolo" loading={false}>
  {content}
</MIBoxedModule>

// After
import { BoxedModule, BoxedModuleTitle } from "ui-italia/blocks/boxed-module"
;<BoxedModule icon={<InfoIcon />} action={<Button>Entra</Button>}>
  <BoxedModuleTitle>Titolo</BoxedModuleTitle>
  {content}
</BoxedModule>
```

### `Link` → `Link`

```tsx
import { Link } from "ui-italia/components/link"

;<Link href="/area-personale" underline="always">
  Area personale
</Link>
```

`underline` accepts `always` (default, MUI parity), `hover`, `none`. The focus
ring follows the MUI pattern: `outline 2px`, offset 4px, radius 8px.

### `MIButton` → `Button`

**Before**

```tsx
import { MIButton } from "mui-italia"

;<MIButton
  variant="contained"
  color="primary"
  size="medium"
  startIcon={<SaveIcon />}
  onClick={save}
>
  Save
</MIButton>
```

**After**

```tsx
import { Button } from "ui-italia/components/button"

;<Button variant="default" size="default" onClick={save}>
  <SaveIcon data-icon="inline-start" />
  Save
</Button>
```

**Prop mapping**

| `MIButton`                            | `Button`                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| `variant="contained"`                 | `variant="default"`                                                                     |
| `variant="outlined"`                  | `variant="outline"`                                                                     |
| `variant="text"`                      | `variant="ghost"`                                                                       |
| `color="error"`                       | `variant="destructive"`                                                                 |
| `size="small" \| "medium" \| "large"` | `size="sm" \| "default" \| "lg"`                                                        |
| `startIcon`                           | child with `data-icon="inline-start"`                                                   |
| `endIcon`                             | child with `data-icon="inline-end"`                                                     |
| `href`                                | `<a className={buttonVariants(...)}>` (not `render={<a/>}`, it would override the role) |
| `fullWidth`                           | `className="w-full"`                                                                    |
| `isLoading`                           | `disabled` + `aria-busy` (or `Spinner` when available)                                  |
| `sx`                                  | semantic Tailwind classes                                                               |

> There is an **optional shim** `ui-italia-compat` that accepts the old props and names: `MIButton`, `MIChip`, `MIAlert`, `MIPaper`, `MISnackbar`, `MIBreadcrumbs`. Use it only during the transition:
>
> ```tsx
> import { MIButton, MIChip, MIAlert } from "ui-italia-compat"
> ```
>
> It must be removed once migration is complete.

### Alert / Banner → `Alert`

| `mui-italia`         | `Alert` (`variant`) |
| -------------------- | ------------------- |
| `severity="error"`   | `destructive`       |
| `severity="success"` | `success`           |
| `severity="warning"` | `warning`           |
| `severity="info"`    | `info`              |
| neutral              | `default`           |

The colored left border (4px) is in the component; compose with `AlertTitle` / `AlertDescription` / `AlertAction`. Use `appearance="standard"` for the tinted MUI `standard` look (icon `#0E0F13`); the default `appearance="outlined"` keeps the white surface + elevation.

### Chip / Tag → `Badge` / `Tag`

`MIChip` maps to `Badge` (pill, 40px radius):

| `mui-italia`                                  | `Badge` (`variant`)            |
| --------------------------------------------- | ------------------------------ |
| `MIChip color="default"`                      | `primary`                      |
| `MIChip color="highlight"`                    | `highlight`                    |
| `MIChip color="error"`                        | `destructive`                  |
| `MIChip color="neutral"`                      | `neutral`                      |
| `MIChip color="success" / "info" / "warning"` | `success` / `info` / `warning` |
| `MIChip variant="outlined"`                   | `outline`                      |
| `MIChip variant="outlined" color="error"`     | `outline-destructive`          |
| `MIChip onDelete`                             | `onDelete` + `deleteAriaLabel` |
| `MIChip avatar`                               | `avatar`                       |

`Tag` / `TagGroup` (uppercase status label, truncation) are available as a
separate block: `ui-italia/blocks/tag`.

### TextField → `Input` + `Label` + `Field`

`Input` is 48px tall, radius 6px, focus ring 2px. Always associate a `Label` (or the registry `Field`) and use `aria-invalid` for the error state.

## 4. Verification

```bash
# types
pnpm --filter <app> typecheck

# story + a11y (WCAG 2.2 AA, a11y addon in error mode)
pnpm --filter ui-italia exec vitest --project storybook run

# visual regression self-hosted
pnpm --filter ui-italia test:visual
```

Acceptance criteria for migrating a component:

- [ ] no leftover `@mui/*` or `mui-italia` import in the file;
- [ ] no `sx`/`style` props;
- [ ] colors only via semantic tokens;
- [ ] typecheck green;
- [ ] story (if present) green, including the a11y checks.

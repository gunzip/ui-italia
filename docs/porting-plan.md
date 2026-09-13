# Porting plan — `mui-italia` → shadcn/ui + Base UI

> Status: **draft for review**. Planning document, not yet execution.
> References analyzed: mui-italia (branch `develop`), [shadcn/ui](https://ui.shadcn.com/docs/installation), [Base UI](https://base-ui.com), [Storybook AI setup](https://storybook.js.org/docs/ai/setup).

---

## 1. Goals and non-goals

### Goals

- Recreate the design system on **shadcn/ui with Base UI**, **Tailwind CSS v4**, **Storybook 10.6+** and **React 19**.
- **Visual parity** with mui-italia, achieved however through **idiomatic constructs** shadcn/Base UI (no MUI-style "workarounds").
- Maximum DX: predictable APIs, composition, strict types, zero style props, ref forwarding, `cn` for class merging.
- **WCAG 2.2 AA** accessibility verified by an automated gate (not just manual).
- Distributable as a **shadcn registry** (and npm package) for adoption by apps.

### Non-goals (v1)

- Full automatic codemod: migration is supported by an **agent-oriented guide** + an **optional compatibility shim** (see §11.1), not by a complete codemod.
- Visual redesign: parity with mui-italia is the requirement, not a restyle.
- Dedicated Storybook hosting / documentation portal (Fumadocs, Nextra…) beyond Storybook itself.
- Internal i18n: as today, labels remain props (no i18n library).

---

## 2. Decisions made

| Topic           | Choice                                                                        |
| --------------- | ----------------------------------------------------------------------------- |
| Architecture    | Monorepo: `packages/ui` + `apps/*`                                            |
| Scope           | **Complete** (~47 components + illustrations + icons + assets) in one v1      |
| Design language | **1:1** visual parity with Italia tokens, idiomatic shadcn/Base UI constructs |
| API / naming    | Idiomatic shadcn (`Button`, `Card`, `Alert`…), no `MI*` prefixes              |
| Stack           | Vite + React 19 + TypeScript + pnpm                                           |
| Form / date     | React Hook Form + Zod + `react-day-picker`                                    |
| Quality         | WCAG 2.2 AA + automated gate (a11y addon + test)                              |
| AI tooling      | Storybook MCP + componentsManifest, shadcn skill, shadcn MCP, opencode config |
| Package         | `ui-italia`                                                                   |
| Registry        | hosted on **GitHub Pages** (`@ui-italia`)                                     |
| RTL             | **Not supported**, like mui-italia → LTR-only                                 |
| Browser target  | Like mui-italia: evergreen, last 2 versions, no IE                            |
| Dark mode       | Yes, 1:1 port of `darkTheme`                                                  |
| Illustrations   | In `packages/ui` with dedicated entrypoint + registry items (see §7.4)        |
| Migration       | Agent-oriented guide + optional `ui-italia-compat` shim (see §11.1)           |
| Visual test     | **Self-hosted** with Playwright (no vendor) — see §15.1                       |

---

## 3. Version matrix (verified)

| Package                                 | Target version | Notes                                                         |
| --------------------------------------- | -------------- | ------------------------------------------------------------- |
| `shadcn` (CLI)                          | `4.21.0`       | `init -b base -p nova`                                        |
| `storybook` / `@storybook/react-vite`   | `10.6.0`       | Agentic setup + MCP addon                                     |
| `@storybook/addon-mcp`                  | `10.6.0`       | `features.componentsManifest: true`                           |
| `@base-ui/react`                        | `1.8.0`        | ✅ stable (the old `@base-ui-components/react` is superseded) |
| `tailwindcss` / `@tailwindcss/vite`     | `4.x`          | CSS-first config via `@theme`                                 |
| `react` / `react-dom`                   | `19.2.x`       |                                                               |
| `vite`                                  | `8.x`          |                                                               |
| `typescript`                            | `~6`           |                                                               |
| `eslint`                                | `10.x`         | flat config                                                   |
| `vitest` + `@vitest/browser-playwright` | `5.x`          | Storybook Test, Chromium browser                              |
| `@playwright/test`                      | `1.6x`         | Self-hosted visual regression (Chromium)                      |
| `react-hook-form` / `zod`               | latest         | to be added in W3                                             |
| `react-day-picker`                      | latest         | via `calendar` / `date-picker` registry                       |
| `lucide-react`                          | `1.x`          | icon library of the `nova` preset                             |
| `cn`                                    | `0.3.0`        | replaces `clsx` + `tailwind-merge`                            |
| `pnpm`                                  | `10.x`         | workspace + Turborepo                                         |
| Node                                    | 24             | `engines >= 20`                                               |

> Current mui-italia baseline: React 18, MUI 5, Emotion, Storybook 10.3.5, yarn 3.6.4, Vitest 3, Chromatic.

---

## 4. Monorepo architecture

```
.
├── apps/
│   └── playground/                 # Real integration Vite app (E2E + a11y end-to-end)
├── packages/
│   ├── ui/                         # ui-italia — components, tokens, styles, registry, Storybook
│   │   ├── src/
│   │   │   ├── components/         # button.tsx + button.stories.tsx (colocated stories)
│   │   │   ├── foundations/        # design-token stories (colors, typography, radius, focus)
│   │   │   ├── blocks/             # compositions (Header, Footer, Wizard, Timeline, ...)
│   │   │   ├── illustrations/      # React SVGs ported 1:1
│   │   │   ├── icons/              # custom Italia icons
│   │   │   ├── styles/globals.css  # Tailwind v4 + Italia tokens (theme source of truth)
│   │   │   └── lib/utils.ts        # cn()
│   │   ├── .storybook/             # Storybook 10.6 config + MCP addon
│   │   ├── tests/visual/           # self-hosted visual regression (Playwright) + baselines
│   │   ├── playwright.config.ts
│   │   ├── registry.json           # shadcn registry definition
│   │   ├── public/r/               # registry build output (gitignored)
│   │   └── components.json
│   └── compat/                     # ui-italia-compat — optional shim (temporary)
├── docs/
│   ├── porting-plan.md             # this document
│   ├── migration-from-mui-italia.md
│   └── adr/                        # architectural decisions
├── .github/workflows/              # ci.yml (quality+visual) + pages.yml (deploy)
├── package.json                    # workspace root + script turbo
├── pnpm-workspace.yaml
└── turbo.json
```

**Naming choices**

- Package: `ui-italia` (import `ui-italia/components/button`, `ui-italia/lib/utils`).
- Registry: namespace `@ui-italia` → `npx shadcn@latest add @ui-italia/button`.
- Storybook lives in `packages/ui` (stories colocated with the components: the library owns its own documentation and tests).
- `apps/playground` consumes `ui-italia` the way a real app would: it serves to catch integration issues that isolated stories do not see.

### Bootstrap — status: **done**

```bash
# 1. Monorepo shadcn (Base UI + preset Nova/Lucide + Vite)
pnpm dlx shadcn@latest init --monorepo -t vite -b base -p nova -y -n sb-bootstrap
#    -> then moved to the repo root

# 2. Rename workspaces: packages/ui -> ui-italia, apps/web -> apps/playground
#    (done: components.json, package.json, tsconfig, aliases updated)

# 3. Storybook 10.6 inside packages/ui (agentic setup)
pnpm dlx storybook@latest init --type react --builder vite --features docs test a11y ai --agent

# 4. Addon MCP + manifest (installato da --features ai)
#    .storybook/main.ts -> features: { componentsManifest: true }   ✅
#    .storybook/preview.tsx -> import globals.css + a11y test: 'error'   ✅

# 5. MCP in opencode
opencode mcp add storybook --global --url "http://localhost:6006/mcp"   ✅
pnpm dlx shadcn@latest mcp init --client opencode                       ✅ (root opencode.json + packages/ui/opencode.json)

# 6. Skill shadcn
npx skills@latest add shadcn/ui -y                                      ✅ (shadcn + migrate-radix-to-base)
```

### Verification already passed

- `pnpm --filter ui-italia typecheck` → OK
- `pnpm --filter ui-italia exec vitest --project storybook run` → **7/7** stories green (including a11y `test: 'error'`)
- `shadcn` MCP connected; `storybook` MCP configured (connects at dev server startup)

---

## 5. Theming strategy (visual parity, idiomatic)

Single source of truth: `packages/ui/src/styles/globals.css` with `@import "tailwindcss"` + `@theme` block (Italia tokens) + shadcn semantic variables in `:root` and `.dark`. shadcn components use **only** semantic tokens: by changing the tokens, the entire system takes on the Italia identity without per-component overrides.

### 5.1 Palette → semantic variables mapping

> ⚠️ **Aggiornamento (F1 del refactoring parity)**: il reference è ora `themeNext`, non la palette legacy.
> I valori correnti e la mappa per-componente sono in [`parity-spec.md`](./parity-spec.md).
> La tabella sottostante documenta il porting iniziale (palette legacy) e va considerata storica.

| shadcn semantic token  | Value from mui-italia            | Notes                                          |
| ---------------------- | -------------------------------- | ---------------------------------------------- |
| `--background`         | `#FFFFFF` (`background.paper`)   |                                                |
| `--muted`              | `#F2F2F2` (`background.default`) |                                                |
| `--foreground`         | `#17324D` (`text.primary`)       |                                                |
| `--muted-foreground`   | `#5C6F82` (`text.secondary`)     |                                                |
| `--primary`            | `#0073E6`                        | hover `#0055AA`, dark `#0062C3`, 100 `#C4DCF5` |
| `--primary-foreground` | `#FFFFFF`                        |                                                |
| `--secondary`          | `#00C5CA`                        | hover/dark `#00A7AC`                           |
| `--accent`             | `#E3F2FD` (`italia[50]`)         |                                                |
| `--destructive`        | `#D85757` (error.dark)           | backgrounds `#FFE0E0`, text `#761F1F`          |
| `--success`            | `#5CA85A` (success.dark)         | backgrounds `#E1F4E1`, text `#224021`          |
| `--warning`            | `#D9AD3C` (warning.dark)         | backgrounds `#FFF5DA`, text `#614C15`          |
| `--info`               | `#5BB0D5` (info.dark)            | backgrounds `#E1F5FE`, text `#215C76`          |
| `--border`             | `#E3E7EB` (`divider`)            |                                                |
| `--ring`               | `#0073E6`                        | focus 2px, offset 2–4px, radius 8px            |
| `--radius`             | `8px`                            | card/modal; buttons stay at 4px (see 5.3)      |
| `--brand`              | `#0066CC`                        | additional brand                               |
| `--european-union`     | `#264CA4`                        | additional brand                               |
| `--italia-*`           | `italia` scale 50→900            | exposed as an accessory token                  |

**Non-standard extensions** (`--success`, `--warning`, `--info`, `--brand`, `--european-union`, `--italia-*`): documented as additive tokens, not present in shadcn default. Needed for parity.

> ⚠️ **Contrast**: the Italy "status" colors (`#00C5CA`, `#6CC66A`, `#FFCB46`, `#FE6666`) do not reach AA when used as **text** on white. In the ports they are used as **icon/border/background**, and for text the `700/850` variants already present in the palette are used. This constraint is encoded in the a11y gate.

### 5.2 Typography

Font: **Titillium Web** (sans) + **DM Mono** (mono), via `@fontsource` (Vite), as today.

| MUI variant        | Tailwind v4 token     | Size / weight             |
| ------------------ | --------------------- | ------------------------- |
| `headline`         | `text-headline`       | 58px / 700 / lh 1.1       |
| `h1`               | `text-h1`             | 42 → 50px (`sm`) / 700    |
| `h2`               | `text-h2`             | 36 → 44px / 700           |
| `h3`               | `text-h3`             | 32 → 38px / 700           |
| `h4`               | `text-h4`             | 28 → 32px / 700           |
| `h5`               | `text-h5`             | 24 → 28px / 600           |
| `h6`               | `text-h6`             | 22 → 24px / 600           |
| `body1`            | `text-body-lg`        | 18px / 400 / lh 1.5       |
| `body2`            | `text-body`           | 16px / 400 / lh 1.4       |
| `caption`          | `text-caption`        | 14px / 400                |
| `caption-semibold` | `text-caption-strong` | 14px / 600                |
| `monospaced`       | `font-mono text-mono` | 16px / 400                |
| `overline`         | `text-overline`       | 14px / 700 / tracking 1px |

### 5.3 Spacing, radius, shadows, focus

- **Spacing**: MUI 8px base → Tailwind 4px grid. `spacing(n) = n * 8px = Tailwind * (2n)`. E.g. MUI `spacing(3)=24px` → `p-6`. Conversion table in `docs/`.
- **Radius**: `--radius: 8px` (Card/Paper). Buttons 4px (like `shape.borderRadius`). Tag/chip 6px/999. Focus ring radius 8px.
- **Shadows**: 3 elevations (`elevation-4`, `elevation-8/16`, `elevation-16`) with `#002B55` at alpha 10/5/10%, ported as utilities/custom properties. The default Tailwind scale is not used.
- **Focus ring** (AA requirement + consistency): `outline: 2px solid var(--ring); outline-offset: 2px (4px for links); border-radius: 8px`. Implemented with a reused `focus-ring` utility, not with scattered overrides.
- **Breakpoints**: `sm 640 / md 900 / lg 1200 / xl 1536 / 2xl 1920` via `@theme --breakpoint-*`.
- **Dark mode**: port of `darkTheme` (primary `#3DA2FF`, paper `#252525`) as a `.dark` block.
- **RTL**: **not supported**, like mui-italia (Bootstrap Italia is LTR). `rtl: false` in `components.json`; logical properties are still used where they cost nothing.
- **Browser target**: like mui-italia there is no browserslist → evergreen baseline (last 2 versions, `not dead`, no IE). Cross-browser is covered by visual tests, not by a build matrix.

### 5.4 Button variants mapping

| mui-italia                  | shadcn/Base UI                                          |
| --------------------------- | ------------------------------------------------------- |
| `contained` primary         | `variant="default"`                                     |
| `outlined` primary/error    | `variant="outline"` + `text-destructive` for error      |
| `text`                      | `variant="ghost"`                                       |
| `naked` (ButtonNaked)       | `variant="link"`                                        |
| loader `skeleton`/`spinner` | prop `loading` + `<Spinner data-icon="inline-start" />` |
| size `small/medium/large`   | `size="sm/default/lg"` (40/48/56px)                     |

---

## 6. API principles (DX + idiomaticity + a11y)

1. **Composition, not configuration**: `Card`/`CardHeader`/`CardContent`, `Field`/`FieldLabel`/`FieldError`. No monolithic props that replace composition.
2. **Base UI idioms**: the `render` prop is used for polymorphism (e.g. `<Button render={<a href="…" />}>`); for links, `buttonVariants` + `<a>` is used to avoid forcing `role="button"` (documented shadcn rule).
3. **cva for variants** (`variant`, `size`) and semantic classes; `cn()` for merging; never `sx`/`style` as a public API.
4. **`data-slot`** on every part for predictable styling/extensions.
5. **Ref forwarding** everywhere and extended `React.ComponentProps<"button">` types — no opaque wrappers.
6. **Controlled/uncontrolled** like Base UI: when the primitive supports it, both modes are exposed.
7. **Form**: `Field` + RHF (`Controller`/`register`) + Zod (`zodResolver`). No custom "form-aware" components that duplicate state.
8. **a11y by default**: labels always associated, `aria-describedby` for errors/hints, visible focus, target ≥ 24px, correct roles/`aria-*`, motion respected (`prefers-reduced-motion`).
9. **No workarounds**: if a mui-italia visual requirement needs a trick, prefer extending a token or composing the primitives over adding fragile overrides.

---

## 7. Component inventory and mapping

Strategy legend: **copy** = shadcn component from the registry, themed; **extend** = shadcn component + variant/extension; **block** = new composition on top of the primitives; **asset** = 1:1 SVG port.

### 7.1 `MI*` components (wrappers)

| mui-italia             | Target                            | Strategy    | Port notes                                                                               |
| ---------------------- | --------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `MIButton`             | `Button`                          | copy/extend | `loading`, `startIcon`/`endIcon` → `data-icon`; error/contrasted colors as variants      |
| `ButtonNaked`          | `Button variant="link/ghost"`     | copy        | removes the duplicated component                                                         |
| `MIIconButton`         | `Button size="icon-*"`            | copy        |                                                                                          |
| `MIChip`               | `Badge`                           | extend      | color variants (default/primary/info/error/success/warning) + avatar + delete            |
| `MIAlert`              | `Alert`                           | extend      | 4px left border, title, actions; `outlined`/`standard`                                   |
| `MIBreadcrumbs`        | `Breadcrumb`                      | copy        | separator, `aria-current="page"`                                                         |
| `MISnackbar`           | `Sonner` (Toast)                  | copy        | default shadcn toast = Sonner; `toast()` API                                             |
| `MISpinner`            | `Spinner`                         | copy        |                                                                                          |
| `MIPaper`              | `Card`                            | copy        | radius 8, elevation                                                                      |
| `MIBoxedModule`        | `Card`                            | block       | composed with header/title/content/skeleton                                              |
| `MITooltip`            | `Tooltip`                         | copy        | background `#455B71`, arrow, delay                                                       |
| `MIStepper`            | —                                 | **block**   | accessible vertical/horizontal stepper (semantic `ol`); does not exist in shadcn/Base UI |
| `MIWizard`             | `Stepper` + `Dialog/Sheet`        | **block**   | step orchestration + validation                                                          |
| `MITimeline`           | —                                 | **block**   | semantic list, dot/connector                                                             |
| `TimelineNotification` | —                                 | **block**   | timeline + content + separator                                                           |
| `MISpidSelectOIDialog` | `Dialog` + `RadioGroup`/`Command` | block       | IdP list, error state                                                                    |
| `Autocomplete`         | `Combobox` (+ `Command`)          | extend      | single/multi (chips), async, empty state, "create new entry"                             |

### 7.2 Application compositions

| mui-italia                                                                         | Target                                               | Strategy    | Notes                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------- | -------------------------------------------- |
| `AccountDropdown`                                                                  | `DropdownMenu` + `Avatar`                            | block       |                                              |
| `HeaderAccount`                                                                    | `Sheet` + `DropdownMenu` + `Avatar`                  | block       | responsive header                            |
| `HeaderProduct`                                                                    | `NavigationMenu` + `Select`/`DropdownMenu` + `Badge` | block       | party/product switch                         |
| `Footer` / `FooterLegal` / `FooterCheckout` / `FooterPostLogin` / `FooterPreLogin` | —                                                    | block       | 5 variants, data via props                   |
| `HorizontalNav`                                                                    | `Tabs`/`NavigationMenu`                              | block       |                                              |
| `LangSwitch`                                                                       | `Select`/`DropdownMenu`                              | block       |                                              |
| `Hero`                                                                             | —                                                    | block       |                                              |
| `Infoblock`                                                                        | —                                                    | block       | decorative patterns (SVG)                    |
| `Showcase`                                                                         | —                                                    | block       | showcase                                     |
| `Walkthrough`                                                                      | `Popover`/`Dialog` + step                            | block       | guided tour                                  |
| `Banner`                                                                           | `Alert`                                              | extend      | Primary/Secondary/Tertiary layout            |
| `EnvironmentBanner`                                                                | `Alert`                                              | extend      |                                              |
| `PartyAccountItem` / `PartyAccountItemButton`                                      | `Item` + `Avatar`                                    | block       |                                              |
| `PartyAvatar` / `ProductAvatar`                                                    | `Avatar`                                             | copy/extend | initials fallback                            |
| `PartySwitch` / `ProductSwitch`                                                    | `Combobox`/`DropdownMenu`                            | block       |                                              |
| `ProfileItem`                                                                      | `Item`/`DropdownMenu` item                           | block       |                                              |
| `TOSAgreement`                                                                     | `Checkbox` + `Field`                                 | block       |                                              |
| `CodeInput`                                                                        | `InputOTP`                                           | extend      | alphanumeric/format support                  |
| `SingleFileInput`                                                                  | `Input` + `Field` + `Button`                         | block       | drag&drop, file validation                   |
| `CopyToClipboardButton`                                                            | `Button` + hook + Toast                              | block       |                                              |
| `Tag` / `TagGroup`                                                                 | `Badge` / `ToggleGroup`                              | extend      | truncate+tooltip, wrap, icon-only, uppercase |

### 7.3 MUI primitives demonstrated in the stories

`Table` (`Table`/`Data Table`), `Pagination`, `Select`, `Switch`, `Menu` (`Dropdown Menu`), `TextField` (`Input`/`Field`), `Typography`, `Card`, `Badge`, `Backdrop` (`Dialog` overlay), `Sidenav` (`Sidebar`/`Sheet`), `DesktopDatePicker` (`Calendar`/`Date Picker` + `react-day-picker`), `Accordion`, `Slider`, `Progress`, `Separator`, `Avatar`, `Tabs`, `Popover`, `Tooltip`, `Sheet`, `Drawer`.

> All available in the shadcn Base UI registry; they **only** need to be themed with the Italia tokens + stories + a11y tests.

### 7.4 Assets, icons, illustrations

- `src/assets/*` (brand/IO logos, NextGenerationEU, CGN) → 1:1 port, registry item of type `registry:component`/file.
- `src/icons/*` (~14 custom icons: Cie, Spid, PN, Interop, Threads, YouTube, Medium, CheckIban) → 1:1 port as React SVG, exposed as a registry item.
- `src/illustrations/*` (~90) → 1:1 port. **Decision**: they stay in `packages/ui` but with a **dedicated entrypoint** (`ui-italia/illustrations/*` via a separate export map), so importing a single illustration does not pull in the others. Registry: item `@ui-italia/illustrations` (full set) + individual items `@ui-italia/illustration-<name>` for the most used ones. **No separate package**: the overhead is not justified, they stay versioned with the design system.

---

## 8. Storybook

- **Version**: 10.6.x, `@storybook/react-vite`, installed in `packages/ui`.
- **Addon**: `a11y`, `docs`, `links`, `vitest` (Storybook Test), `mcp`.
- **`features.componentsManifest: true`** for the MCP `docs` toolset.
- **MCP**: `@storybook/addon-mcp` → server at `http://localhost:6006/mcp`; registered in opencode (`opencode mcp add storybook --global --url …`). Instructions in `AGENTS.md` (use of `docs-list`/`docs-show` to avoid inventing props, `test-run` for self-healing).
- **Story conventions**:
  - CSF3 (or CSF Next), title per folder, `tags: ['autodocs']` where useful.
  - One story per **state/edge case**, not just the happy path.
  - **Play function** for key flows (form, dropdown, dialog, keyboard).
  - `parameters.a11y` with `test: 'error'` for all stories.
  - **Viewports** aligned with `breakpointsChromaticValues = [375, 640, 900, 1200, 1600]`.
  - Agent-generated stories tagged `ai-generated` until validated.
- **Visual regression**: **self-hosted** with Playwright, **chromium** project (Firefox/WebKit disabled for now) (see §15.1).
- **The Storybook MCP** enables the loop: generate UI → write stories → `test-run` (incl. a11y) → fix → re-test.

---

## 9. Quality and accessibility (WCAG 2.2 AA + gate)

### Automated (blocking in CI)

- `@storybook/addon-a11y` (axe) on **every** story, `test: 'error'`.
- **Storybook Test + Vitest browser mode** (Playwright): `test-run` on all stories; includes the a11y checks.
- Play functions with assertions on **keyboard navigation**, focus, `aria-*`, roles.
- `eslint-plugin-jsx-a11y`, `eslint-plugin-storybook`, `@testing-library/jest-dom`.
- Contrast tests: status tokens are tested in their real use (icon/border/background or dark variant for text).

### Manual (per-component checklist)

- 2.1.1 keyboard, 2.4.3 focus order, 2.4.11 focus not obscured, 2.4.7/2.4.13 focus visible.
- 1.4.3/1.4.11 text and non-text contrast.
- 2.5.8 target size ≥ 24px, 2.5.7 dragging alternatives.
- 3.3.7 redundant entry, 3.3.8 accessible authentication.
- 4.1.2 name/role/value, `aria-current`, `aria-expanded`, `aria-describedby`.
- `prefers-reduced-motion`, zoom 200%, screen reader spot-check.

---

## 10. Build, tooling, CI

- **Workspace**: pnpm + Turborepo; `build`, `lint`, `typecheck`, `test`, `storybook`, `build-storybook` tasks orchestrated.
- **Code quality**: ESLint (flat config) + Prettier + `tsc --noEmit`; Husky + lint-staged; optional Commitlint.
- **Versioning**: Changesets; `ui-italia` publishable to npm.
- **Registry**: `registry.json` → `shadcn build` → `public/r/*.json`, published on **GitHub Pages** (`https://gunzip.github.io/ui-italia/r/{name}.json`) and referenced in `components.json`:
  ```json
  {
    "registries": {
      "@ui-italia": "https://gunzip.github.io/ui-italia/r/{name}.json"
    }
  }
  ```
- **CI (GitHub Actions)**: lint → typecheck → Vitest browser + a11y → package build → Storybook build → Playwright visual (Chromium) → publish registry.
- **Quality gate**: CI fails if a story has a11y violations or if a play test fails.

---

## 11. Distribution and adoption

1. **shadcn registry** (primary): consumers install the components into their own codebase:
   ```bash
   npx shadcn@latest add @ui-italia/button @ui-italia/field @ui-italia/tag
   ```
   Advantages: full code ownership, no lock-in, shadcn DX.
2. **npm package `ui-italia`** (optional/complementary) for those who prefer package imports.
3. **Registry hosting**: repo's **GitHub Pages** (`https://gunzip.github.io/ui-italia/r/{name}.json`), generated by `shadcn build` in CI.
4. **Coexistence with mui-italia**: both installable.

### 11.1 Migration from mui-italia

- **Agent-oriented guide** in `docs/migration-from-mui-italia.md` (+ MDX version inside Storybook): deterministic component→component mapping, props table (old → new), tokens, and **find&replace / codemod-like snippets** that an agent can apply unambiguously. Each entry has "before/after" and breaking-change notes.
- **Optional compatibility shim** `ui-italia-compat` (separate workspace in the monorepo, **not** published to the registry): re-exports the MUI names (`MIButton`, `MIChip`, …) as thin adapters over `ui-italia`, with deprecated legacy props (`@deprecated` + dev warning). It enables incremental migration and must be removed at the end of the migration.

---

## 12. Risks and mitigations

| Risk                                                      | Impact                        | Mitigation                                                                               |
| --------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| Base UI was in preview: **superseded**                    | Low                           | `@base-ui/react@1.8.0` is stable; the version pin remains anyway                         |
| Storybook MCP / manifest in preview                       | API may change                | Isolated addon; fallback to `shadcn docs` + shadcn skill                                 |
| Italia palette contrast on text                           | AA violations                 | Use of 700/850 variants for text; automated a11y gate                                    |
| Wide scope (~47 components + ~90 illustrations)           | Timeline/longevity            | Single scope but ordered work batches (W0–W7), definition of done per component          |
| Very recent toolchain (Vite 8, TS 6, ESLint 10, Vitest 5) | Plugins/rules not yet aligned | Pinned versions; incremental updates                                                     |
| DX loss vs shadcn upstream                                | Maintenance                   | Zero forks of the primitives: themes/variants only; updates via CLI + diff               |
| Self-hosted visual regression                             | Baseline maintenance          | Baselines in git, `test:visual:update` to update them; Playwright report as review in CI |

---

## 13. Execution order (a single v1 release)

Even with the complete scope, the order reduces risk:

1. **W0 — Bootstrap**: monorepo, workspace rename, tooling (eslint/prettier/ts/CI), Storybook + MCP, shadcn skill, `@ui-italia` registry.
2. **W1 — Design tokens**: `globals.css` (@theme), palette, typography, spacing, radius, shadows, focus, dark mode; "Foundations" stories.
3. **W2 — Core primitives**: Button, Badge, Alert, Card, Input/Field, Label, Checkbox/Radio/Switch, Select, Combobox, Dialog/Sheet/Drawer, Tooltip/Popover, Tabs, Table, Pagination, Spinner, Skeleton, Breadcrumb, Avatar, Progress, Separator…
4. **W3 — Form**: FieldGroup, RHF+Zod, Calendar/Date Picker, InputOTP (CodeInput), SingleFileInput, TOSAgreement.
5. **W4 — Remaining `MI*` components**: Stepper, Wizard, Timeline/Notification, SpidSelectOIDialog, BoxedModule, Snackbar(Toast), Tag/TagGroup, AutoComplete.
6. **W5 — Compositions**: Header Account/Product, Footer (5), Hero, Infoblock, Banner, Party*/Product*, LangSwitch, ProfileItem, HorizontalNav, Walkthrough, Showcase, AccountDropdown.
7. **W6 — Assets, icons, illustrations**: 1:1 port + registry items.
8. **W7 — Docs, a11y, registry, release**: complete stories, green a11y gate, `shadcn build`, publish, migration guide from mui-italia.

Each workstream closes with: story + test + green a11y + docs + registry item.

---

## 14. Definition of Done (per component)

- [ ] Idiomatic shadcn/Base UI API, strict types, ref forwarding, `data-slot`.
- [ ] Themed with semantic tokens **only** (no hard-coded colors).
- [ ] Stories for all variants/states + edge cases; design system viewports.
- [ ] Play functions on key flows.
- [ ] `@storybook/addon-a11y` green (`test: 'error'`).
- [ ] Unit/browser tests green; keyboard nav verified.
- [ ] Documentation (autodocs + optional MDX) and `registry.json`.
- [ ] Included in the package/registry build.

---

## 15. Final decisions

| #   | Question         | Decision                                                                  |
| --- | ---------------- | ------------------------------------------------------------------------- |
| 1   | npm name/scope   | `ui-italia`                                                               |
| 2   | Registry hosting | **GitHub Pages**                                                          |
| 3   | Visual testing   | **Self-hosted** with Playwright (**Chromium** for now), no vendor — §15.1 |
| 4   | Illustrations    | In `packages/ui` with dedicated entrypoint + registry items (see §7.4)    |
| 5   | RTL              | **Not supported**, like mui-italia (LTR-only)                             |
| 6   | Browser target   | Like mui-italia: evergreen, last 2 versions, no IE (no browserslist)      |
| 7   | Dark mode        | Yes, 1:1 port of `darkTheme`                                              |
| 8   | Migration        | Agent-oriented guide + optional `ui-italia-compat` shim (see §11.1)       |

### 15.1 Visual testing: self-hosted (no vendor)

**Decision**: no external vendor. Visual regression is self-hosted with **Playwright** (`@playwright/test`), with baselines tracked in git.

- `packages/ui/playwright.config.ts`: **chromium** project (`webServer` that starts Storybook). Firefox/WebKit are commented out: they will be re-enabled by regenerating the baselines on Linux.
- `packages/ui/tests/visual/stories.spec.ts`: enumerates `/index.json`, opens every story and uses `toHaveScreenshot`.
- **Per-platform baselines** (Playwright default): the **Linux** ones (CI) are authoritative, committed in `packages/ui/tests/visual/__screenshots__`; macOS/Windows baselines stay local and gitignored.
- Commands: `pnpm --filter ui-italia test:visual` (comparison) and `test:visual:update` (local regeneration).
- Linux baseline update: **Update visual baselines** workflow (`workflow_dispatch` + weekly), which regenerates and commits.
- CI: the `visual` job is **blocking** on the Linux baselines; on failure it uploads the Playwright report.

**Why** (vs hosted vendor): **$0** cost, no data leaving the perimeter, no lock-in. **Cost**: no proprietary UI review — review happens on the Playwright HTML report and the baselines are ours. Multi-browser (Firefox/WebKit) is already set up and can be re-enabled when needed.

**Alternatives evaluated**: Lost Pixel / reg-suit / BackstopJS (they add a UI review but more maintenance); Playwright is enough for now.

---

## 16. Proposed next step

**W0 and W1 completed.** Done: rename to `ui-italia` (no references to the organization), `@ui-italia` registry + GitHub Pages, CI/quality gate, hooks, self-hosted visual test, migration guide + `ui-italia-compat` shim; Italia tokens in `globals.css` (light + dark, typography, spacing, radius, elevations, focus) + Foundations stories, `Button` aligned.

Next: **W2 — core primitives almost complete.** Imported from the Base UI registry all the primitives (`button`, `alert`, `badge`, `card`, `input`, `textarea`, `label`, `field`, `input-group`, `checkbox`, `radio-group`, `switch`, `select`, `native-select`, `combobox`, `command`, `separator`, `skeleton`, `spinner`, `tabs`, `tooltip`, `popover`, `dialog`, `alert-dialog`, `sheet`, `drawer`, `dropdown-menu`, `context-menu`, `menubar`, `navigation-menu`, `pagination`, `breadcrumb`, `avatar`, `progress`, `scroll-area`, `slider`, `toggle`, `toggle-group`, `table`, `calendar`, `collapsible`, `accordion`, `aspect-ratio`, `button-group`, `empty`, `hover-card`, `item`, `kbd`, `marker`, `resizable`, `sonner`, `carousel`, `chart`, `sidebar`, `bubble`, `direction`) with **54 story files** and a green a11y gate (**214 tests**, 56 files).

Italia fine-tuning done: Alert (4px left border + status variants), Input/Textarea (48px, radius 6px, focus 2px), Card (radius 8px + elevation), Tooltip (`#455B71`), Badge (status variants), modal overlays and button hover tokenized; real fixes to `slider` (single thumb for scalar value) and removal of hard-coded colors.

Remaining in W2: per-component registry items (today the registry exposes `theme`/`utils`/`button`) and spot visual polish; then **W3** (RHF+Zod, date picker), **W4/W5** (blocks: Stepper, Wizard, Timeline, Header/Footer, Party/Product…), remaining **W4** and **W6** (illustrations/icons/assets).

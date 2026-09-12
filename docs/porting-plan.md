# Piano di porting — `mui-italia` → shadcn/ui + Base UI

> Stato: **draft per review**. Documento di pianificazione, non ancora esecuzione.
> Riferimenti analizzati: mui-italia (branch `develop`), [shadcn/ui](https://ui.shadcn.com/docs/installation), [Base UI](https://base-ui.com), [Storybook AI setup](https://storybook.js.org/docs/ai/setup).

---

## 1. Obiettivi e non-obiettivi

### Obiettivi

- Ricreare il design system su **shadcn/ui con Base UI**, **Tailwind CSS v4**, **Storybook 10.6+** e **React 19**.
- **Parità visiva** con mui-italia ottenuta però con **costrutti idiomatici** shadcn/Base UI (niente "workaround" MUI-style).
- DX massima: API prevedibili, composizione, tipi stretti, zero prop di stile, ref forwarding, `cn` per il merge delle classi.
- Accessibilità **WCAG 2.2 AA** verificata da un gate automatico (non solo manuale).
- Distribuibile come **registry shadcn** (e pacchetto npm) per l'adozione da parte delle app.

### Non-obiettivi (v1)

- Codemod automatico totale: la migrazione è supportata da una **guida agent-oriented** + uno **shim di compatibilità opzionale** (vedi §11.1), non da un codemod completo.
- Ridisegno grafico: la parità con mui-italia è il requisito, non un restyle.
- Storybook hosting dedicato / portale documentazione (Fumadocs, Nextra…) oltre a Storybook stesso.
- i18n interna: come oggi, le label restano props (nessuna libreria i18n).

---

## 2. Decisioni prese

| Tema            | Scelta                                                                        |
| --------------- | ----------------------------------------------------------------------------- |
| Architettura    | Monorepo: `packages/ui` + `apps/*`                                            |
| Scope           | **Completo** (~47 componenti + illustrazioni + icone + asset) in una v1       |
| Design language | Parità visiva con token Italia **1:1**, costrutti idiomatici shadcn/Base UI   |
| API / naming    | Idiomatico shadcn (`Button`, `Card`, `Alert`…), niente prefissi `MI*`         |
| Stack           | Vite + React 19 + TypeScript + pnpm                                           |
| Form / date     | React Hook Form + Zod + `react-day-picker`                                    |
| Qualità         | WCAG 2.2 AA + gate automatico (a11y addon + test)                             |
| Tooling AI      | Storybook MCP + componentsManifest, skill shadcn, shadcn MCP, config opencode |
| Pacchetto       | `ui-italia`                                                                   |
| Registry        | ospitato su **GitHub Pages** (`@ui-italia`)                                   |
| RTL             | **Non supportato**, come mui-italia → LTR-only                                |
| Browser target  | Come mui-italia: evergreen, ultime 2 versioni, no IE                          |
| Dark mode       | Sì, port 1:1 di `darkTheme`                                                   |
| Illustrazioni   | In `packages/ui` con entrypoint dedicato + registry items (vedi §7.4)         |
| Migrazione      | Guida agent-oriented + shim opzionale `ui-italia-compat` (vedi §11.1)         |
| Visual test     | **Self-hosted** con Playwright (nessun vendor) — vedi §15.1                   |

---

## 3. Matrice versioni (verificata)

| Pacchetto                               | Versione target | Note                                                           |
| --------------------------------------- | --------------- | -------------------------------------------------------------- |
| `shadcn` (CLI)                          | `4.21.0`        | `init -b base -p nova`                                         |
| `storybook` / `@storybook/react-vite`   | `10.6.0`        | Agentic setup + addon MCP                                      |
| `@storybook/addon-mcp`                  | `10.6.0`        | `features.componentsManifest: true`                            |
| `@base-ui/react`                        | `1.8.0`         | ✅ stabile (il vecchio `@base-ui-components/react` è superato) |
| `tailwindcss` / `@tailwindcss/vite`     | `4.x`           | CSS-first config via `@theme`                                  |
| `react` / `react-dom`                   | `19.2.x`        |                                                                |
| `vite`                                  | `8.x`           |                                                                |
| `typescript`                            | `~6`            |                                                                |
| `eslint`                                | `10.x`          | flat config                                                    |
| `vitest` + `@vitest/browser-playwright` | `5.x`           | Storybook Test, browser Chromium                               |
| `@playwright/test`                      | `1.6x`          | Visual regression self-hosted (Chromium/Firefox/WebKit)        |
| `react-hook-form` / `zod`               | ultime          | da aggiungere in W3                                            |
| `react-day-picker`                      | ultima          | via registry `calendar` / `date-picker`                        |
| `lucide-react`                          | `1.x`           | icon library del preset `nova`                                 |
| `cn`                                    | `0.3.0`         | sostituisce `clsx` + `tailwind-merge`                          |
| `pnpm`                                  | `10.x`          | workspace + Turborepo                                          |
| Node                                    | 24              | `engines >= 20`                                                |

> Baseline attuale mui-italia: React 18, MUI 5, Emotion, Storybook 10.3.5, yarn 3.6.4, Vitest 3, Chromatic.

---

## 4. Architettura del monorepo

```
.
├── apps/
│   └── playground/                 # App Vite di integrazione reale (E2E + a11y end-to-end)
├── packages/
│   ├── ui/                         # ui-italia — componenti, token, stili, registry, Storybook
│   │   ├── src/
│   │   │   ├── components/         # button.tsx + button.stories.tsx (story colocalizzate)
│   │   │   ├── foundations/        # story dei design token (colori, tipografia, radius, focus)
│   │   │   ├── blocks/             # composizioni (Header, Footer, Wizard, Timeline, ...)
│   │   │   ├── illustrations/      # SVG React portati 1:1
│   │   │   ├── icons/              # icone custom Italia
│   │   │   ├── styles/globals.css  # Tailwind v4 + token Italia (fonte di verità del tema)
│   │   │   └── lib/utils.ts        # cn()
│   │   ├── .storybook/             # config Storybook 10.6 + addon MCP
│   │   ├── tests/visual/           # visual regression self-hosted (Playwright) + baseline
│   │   ├── playwright.config.ts
│   │   ├── registry.json           # definizione registry shadcn
│   │   ├── public/r/               # registry build output (gitignored)
│   │   └── components.json
│   └── compat/                     # ui-italia-compat — shim opzionale (temporaneo)
├── docs/
│   ├── porting-plan.md             # questo documento
│   ├── migration-from-mui-italia.md
│   └── adr/                        # decisioni architetturali
├── .github/workflows/              # ci.yml (quality+visual) + pages.yml (deploy)
├── package.json                    # workspace root + script turbo
├── pnpm-workspace.yaml
└── turbo.json
```

**Scelte di naming**

- Pacchetto: `ui-italia` (import `ui-italia/components/button`, `ui-italia/lib/utils`).
- Registry: namespace `@ui-italia` → `npx shadcn@latest add @ui-italia/button`.
- Storybook vive in `packages/ui` (story colocalizzate con i componenti: la libreria possiede la propria documentazione e i propri test).
- `apps/playground` consuma `ui-italia` come farebbe un'app reale: serve a intercettare problemi di integrazione che le story isolate non vedono.

### Bootstrap — stato: **eseguito**

```bash
# 1. Monorepo shadcn (Base UI + preset Nova/Lucide + Vite)
pnpm dlx shadcn@latest init --monorepo -t vite -b base -p nova -y -n sb-bootstrap
#    -> poi spostato nella radice del repo

# 2. Rinomina workspace: packages/ui -> ui-italia, apps/web -> apps/playground
#    (fatto: components.json, package.json, tsconfig, alias aggiornati)

# 3. Storybook 10.6 dentro packages/ui (agentic setup)
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

### Verifica già passata

- `pnpm --filter ui-italia typecheck` → OK
- `pnpm --filter ui-italia exec vitest --project storybook run` → **7/7** story verdi (incluso a11y `test: 'error'`)
- MCP `shadcn` connesso; MCP `storybook` configurato (si connette all'avvio del dev server)

---

## 5. Strategia di theming (parità visiva, idiomatica)

Fonte di verità unica: `packages/ui/src/styles/globals.css` con `@import "tailwindcss"` + blocco `@theme` (token Italia) + variabili semantiche shadcn in `:root` e `.dark`. I componenti shadcn usano **solo** token semantici: cambiando i token, l'intero sistema assume l'identità Italia senza override per-componente.

### 5.1 Mapping palette → variabili semantiche

| Token semantico shadcn | Valore da mui-italia             | Note                                           |
| ---------------------- | -------------------------------- | ---------------------------------------------- |
| `--background`         | `#FFFFFF` (`background.paper`)   |                                                |
| `--muted`              | `#F2F2F2` (`background.default`) |                                                |
| `--foreground`         | `#17324D` (`text.primary`)       |                                                |
| `--muted-foreground`   | `#5C6F82` (`text.secondary`)     |                                                |
| `--primary`            | `#0073E6`                        | hover `#0055AA`, dark `#0062C3`, 100 `#C4DCF5` |
| `--primary-foreground` | `#FFFFFF`                        |                                                |
| `--secondary`          | `#00C5CA`                        | hover/dark `#00A7AC`                           |
| `--accent`             | `#E3F2FD` (`italia[50]`)         |                                                |
| `--destructive`        | `#D85757` (error.dark)           | sfondi `#FFE0E0`, testo `#761F1F`              |
| `--success`            | `#5CA85A` (success.dark)         | sfondi `#E1F4E1`, testo `#224021`              |
| `--warning`            | `#D9AD3C` (warning.dark)         | sfondi `#FFF5DA`, testo `#614C15`              |
| `--info`               | `#5BB0D5` (info.dark)            | sfondi `#E1F5FE`, testo `#215C76`              |
| `--border`             | `#E3E7EB` (`divider`)            |                                                |
| `--ring`               | `#0073E6`                        | focus 2px, offset 2–4px, radius 8px            |
| `--radius`             | `8px`                            | card/modal; i bottoni restano a 4px (vedi 5.3) |
| `--brand`              | `#0066CC`                        | brand aggiuntivo                               |
| `--european-union`     | `#264CA4`                        | brand aggiuntivo                               |
| `--italia-*`           | scalala `italia` 50→900          | esposta come token accessorio                  |

**Estensioni non-standard** (`--success`, `--warning`, `--info`, `--brand`, `--european-union`, `--italia-*`): documentate come token additivi, non presente in shadcn default. Necessarie per parità.

> ⚠️ **Contrasto**: i colori "stato" Italy (`#00C5CA`, `#6CC66A`, `#FFCB46`, `#FE6666`) non raggiungono AA se usati come **testo** su bianco. Nei port si usano come **icona/bordo/sfondo**, e per il testo si usano le varianti `700/850` già presenti in palette. Questo vincolo è codificato nel gate a11y.

### 5.2 Tipografia

Font: **Titillium Web** (sans) + **DM Mono** (mono), via `@fontsource` (Vite), come oggi.

| Variante MUI       | Token Tailwind v4     | Dimensione / peso         |
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

### 5.3 Spaziature, radius, ombre, focus

- **Spacing**: base 8px MUI → griglia Tailwind 4px. `spacing(n) = n * 8px = Tailwind * (2n)`. Es. MUI `spacing(3)=24px` → `p-6`. Tabella di conversione in `docs/`.
- **Radius**: `--radius: 8px` (Card/Paper). Bottoni 4px (come `shape.borderRadius`). Tag/chip 6px/999. Focus ring radius 8px.
- **Ombre**: 3 elevazioni (`elevation-4`, `elevation-8/16`, `elevation-16`) con `#002B55` in alpha 10/5/10%, portate come utility/custom properties. Non si usa la scala default Tailwind.
- **Focus ring** (requisito AA + coerenza): `outline: 2px solid var(--ring); outline-offset: 2px (4px per link); border-radius: 8px`. Implementato con una utility `focus-ring` riusata, non con override sparsi.
- **Breakpoints**: `sm 640 / md 900 / lg 1200 / xl 1536 / 2xl 1920` via `@theme --breakpoint-*`.
- **Dark mode**: port del `darkTheme` (primary `#3DA2FF`, paper `#252525`) come blocco `.dark`.
- **RTL**: **non supportato**, come mui-italia (Bootstrap Italia è LTR). `rtl: false` in `components.json`; si usano comunque proprietà logiche dove non costa nulla.
- **Browser target**: come mui-italia non esiste una browserslist → baseline evergreen (ultime 2 versioni, `not dead`, no IE). Il cross-browser è coperto dai visual test, non da una matrice di build.

### 5.4 Mappatura varianti bottoni

| mui-italia                  | shadcn/Base UI                                          |
| --------------------------- | ------------------------------------------------------- |
| `contained` primary         | `variant="default"`                                     |
| `outlined` primary/error    | `variant="outline"` + `text-destructive` per error      |
| `text`                      | `variant="ghost"`                                       |
| `naked` (ButtonNaked)       | `variant="link"`                                        |
| loader `skeleton`/`spinner` | prop `loading` + `<Spinner data-icon="inline-start" />` |
| size `small/medium/large`   | `size="sm/default/lg"` (40/48/56px)                     |

---

## 6. Principi di API (DX + idiomaticità + a11y)

1. **Composizione, non configurazione**: `Card`/`CardHeader`/`CardContent`, `Field`/`FieldLabel`/`FieldError`. Niente prop monolitiche che sostituiscono la composizione.
2. **Base UI idioms**: si usa il prop `render` per il polimorfismo (es. `<Button render={<a href="…" />}>`); per i link si usa `buttonVariants` + `<a>` per non forzare `role="button"` (regola documentata shadcn).
3. **cva per le varianti** (`variant`, `size`) e classi semantiche; `cn()` per il merge; mai `sx`/`style` come API pubblica.
4. **`data-slot`** su ogni parte per styling/estensioni prevedibili.
5. **Ref forwarding** ovunque e tipi `React.ComponentProps<"button">` estesi — nessun wrapper opaco.
6. **Controllato/non controllato** come Base UI: quando il primitivo lo prevede, si espongono entrambe le modalità.
7. **Form**: `Field` + RHF (`Controller`/`register`) + Zod (`zodResolver`). Niente componenti "form-aware" custom che duplicano lo stato.
8. **a11y by default**: label sempre associate, `aria-describedby` per errori/hint, focus visibile, target ≥ 24px, ruoli/`aria-*` corretti, motion rispettato (`prefers-reduced-motion`).
9. **Niente workaround**: se un requisito visivo di mui-italia richiede un trucco, si preferisce estendere un token o comporre i primitivi, non aggiungere override fragili.

---

## 7. Inventario e mapping componenti

Legenda strategia: **copy** = componente shadcn del registry, tematizzato; **extend** = componente shadcn + variante/estensione; **block** = composizione nuova sopra i primitivi; **asset** = port 1:1 dell'SVG.

### 7.1 Componenti `MI*` (wrapper)

| mui-italia             | Target                            | Strategia   | Note di port                                                                             |
| ---------------------- | --------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `MIButton`             | `Button`                          | copy/extend | `loading`, `startIcon`/`endIcon` → `data-icon`; colori error/contrasted come varianti    |
| `ButtonNaked`          | `Button variant="link/ghost"`     | copy        | elimina il componente duplicato                                                          |
| `MIIconButton`         | `Button size="icon-*"`            | copy        |                                                                                          |
| `MIChip`               | `Badge`                           | extend      | varianti colore (default/primary/info/error/success/warning) + avatar + delete           |
| `MIAlert`              | `Alert`                           | extend      | bordo sinistro 4px, titolo, azioni; `outlined`/`standard`                                |
| `MIBreadcrumbs`        | `Breadcrumb`                      | copy        | separatore, `aria-current="page"`                                                        |
| `MISnackbar`           | `Sonner` (Toast)                  | copy        | default shadcn toast = Sonner; API `toast()`                                             |
| `MISpinner`            | `Spinner`                         | copy        |                                                                                          |
| `MIPaper`              | `Card`                            | copy        | radius 8, elevation                                                                      |
| `MIBoxedModule`        | `Card`                            | block       | composto con header/title/content/skeleton                                               |
| `MITooltip`            | `Tooltip`                         | copy        | sfondo `#455B71`, arrow, delay                                                           |
| `MIStepper`            | —                                 | **block**   | stepper verticale/orizzontale accessibile (`ol` semantico); non esiste in shadcn/Base UI |
| `MIWizard`             | `Stepper` + `Dialog/Sheet`        | **block**   | orchestrazione step + validazione                                                        |
| `MITimeline`           | —                                 | **block**   | lista semantica, dot/connettore                                                          |
| `TimelineNotification` | —                                 | **block**   | timeline + contenuto + separatore                                                        |
| `MISpidSelectOIDialog` | `Dialog` + `RadioGroup`/`Command` | block       | lista IdP, stato errore                                                                  |
| `Autocomplete`         | `Combobox` (+ `Command`)          | extend      | single/multi (chips), async, empty state, "crea nuova voce"                              |

### 7.2 Composizioni applicative

| mui-italia                                                                         | Target                                               | Strategia   | Note                                          |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------- | --------------------------------------------- |
| `AccountDropdown`                                                                  | `DropdownMenu` + `Avatar`                            | block       |                                               |
| `HeaderAccount`                                                                    | `Sheet` + `DropdownMenu` + `Avatar`                  | block       | header responsive                             |
| `HeaderProduct`                                                                    | `NavigationMenu` + `Select`/`DropdownMenu` + `Badge` | block       | party/product switch                          |
| `Footer` / `FooterLegal` / `FooterCheckout` / `FooterPostLogin` / `FooterPreLogin` | —                                                    | block       | 5 varianti, dati via props                    |
| `HorizontalNav`                                                                    | `Tabs`/`NavigationMenu`                              | block       |                                               |
| `LangSwitch`                                                                       | `Select`/`DropdownMenu`                              | block       |                                               |
| `Hero`                                                                             | —                                                    | block       |                                               |
| `Infoblock`                                                                        | —                                                    | block       | pattern decorativi (SVG)                      |
| `Showcase`                                                                         | —                                                    | block       | vetrina                                       |
| `Walkthrough`                                                                      | `Popover`/`Dialog` + step                            | block       | tour guidato                                  |
| `Banner`                                                                           | `Alert`                                              | extend      | layout Primary/Secondary/Tertiary             |
| `EnvironmentBanner`                                                                | `Alert`                                              | extend      |                                               |
| `PartyAccountItem` / `PartyAccountItemButton`                                      | `Item` + `Avatar`                                    | block       |                                               |
| `PartyAvatar` / `ProductAvatar`                                                    | `Avatar`                                             | copy/extend | fallback iniziali                             |
| `PartySwitch` / `ProductSwitch`                                                    | `Combobox`/`DropdownMenu`                            | block       |                                               |
| `ProfileItem`                                                                      | `Item`/`DropdownMenu` item                           | block       |                                               |
| `TOSAgreement`                                                                     | `Checkbox` + `Field`                                 | block       |                                               |
| `CodeInput`                                                                        | `InputOTP`                                           | extend      | supporto alfanumerico/format                  |
| `SingleFileInput`                                                                  | `Input` + `Field` + `Button`                         | block       | drag&drop, validazione file                   |
| `CopyToClipboardButton`                                                            | `Button` + hook + Toast                              | block       |                                               |
| `Tag` / `TagGroup`                                                                 | `Badge` / `ToggleGroup`                              | extend      | truncate+tooltip, wrap, solo-icona, uppercase |

### 7.3 Primitive MUI dimostrate nelle story

`Table` (`Table`/`Data Table`), `Pagination`, `Select`, `Switch`, `Menu` (`Dropdown Menu`), `TextField` (`Input`/`Field`), `Typography`, `Card`, `Badge`, `Backdrop` (`Dialog` overlay), `Sidenav` (`Sidebar`/`Sheet`), `DesktopDatePicker` (`Calendar`/`Date Picker` + `react-day-picker`), `Accordion`, `Slider`, `Progress`, `Separator`, `Avatar`, `Tabs`, `Popover`, `Tooltip`, `Sheet`, `Drawer`.

> Tutti disponibili nel registry Base UI shadcn; vanno **solo** tematizzati con i token Italia + story + test a11y.

### 7.4 Asset, icone, illustrazioni

- `src/assets/*` (loghi brand/IO, NextGenerationEU, CGN) → port 1:1, registry item tipo `registry:component`/file.
- `src/icons/*` (~14 icone custom: Cie, Spid, PN, Interop, Threads, YouTube, Medium, CheckIban) → port 1:1 come SVG React, esposte come registry item.
- `src/illustrations/*` (~90) → port 1:1. **Decisione**: restano in `packages/ui` ma con **entrypoint dedicato** (`ui-italia/illustrations/*` tramite export map separato), così l'import di una singola illustrazione non trascina le altre. Registry: item `@ui-italia/illustrations` (set completo) + item individuali `@ui-italia/illustration-<name>` per le più usate. **Niente pacchetto separato**: l'overhead non è giustificato, restano versionate col design system.

---

## 8. Storybook

- **Versione**: 10.6.x, `@storybook/react-vite`, installato in `packages/ui`.
- **Addon**: `a11y`, `docs`, `links`, `vitest` (Storybook Test), `mcp`.
- **`features.componentsManifest: true`** per il toolset `docs` dell'MCP.
- **MCP**: `@storybook/addon-mcp` → server su `http://localhost:6006/mcp`; registrato in opencode (`opencode mcp add storybook --global --url …`). Istruzioni in `AGENTS.md` (uso di `docs-list`/`docs-show` per non inventare props, `test-run` per il self-healing).
- **Convenzioni story**:
  - CSF3 (o CSF Next), titolo per cartella, `tags: ['autodocs']` dove utile.
  - Una story per **stato/edge case**, non solo l'happy path.
  - **Play function** per i flussi chiave (form, dropdown, dialog, keyboard).
  - `parameters.a11y` con `test: 'error'` per tutte le story.
  - **Viewport** allineati a `breakpointsChromaticValues = [375, 640, 900, 1200, 1600]`.
  - Story generate dall'agente taggate `ai-generated` finché non validate.
- **Visual regression**: **self-hosted** con Playwright, projects chromium + firefox + webkit (vedi §15.1).
- **Il MCP di Storybook** abilita il loop: genera UI → scrive story → `test-run` (incl. a11y) → fix → ri-test.

---

## 9. Qualità e accessibilità (WCAG 2.2 AA + gate)

### Automatico (bloccante in CI)

- `@storybook/addon-a11y` (axe) su **ogni** story, `test: 'error'`.
- **Storybook Test + Vitest browser mode** (Playwright): `test-run` su tutte le story; include i check a11y.
- Play function con assert su **keyboard navigation**, focus, `aria-*`, ruoli.
- `eslint-plugin-jsx-a11y`, `eslint-plugin-storybook`, `@testing-library/jest-dom`.
- Test di contrasto: i token stato sono testati nel loro uso reale (icona/bordo/sfondo o variante scura per testo).

### Manuale (checklist per componente)

- 2.1.1 keyboard, 2.4.3 focus order, 2.4.11 focus not obscured, 2.4.7/2.4.13 focus visible.
- 1.4.3/1.4.11 contrasto testo e non-testo.
- 2.5.8 target size ≥ 24px, 2.5.7 dragging alternatives.
- 3.3.7 redundant entry, 3.3.8 accessible authentication.
- 4.1.2 name/role/value, `aria-current`, `aria-expanded`, `aria-describedby`.
- `prefers-reduced-motion`, zoom 200%, screen reader spot-check.

---

## 10. Build, tooling, CI

- **Workspace**: pnpm + Turborepo; task `build`, `lint`, `typecheck`, `test`, `storybook`, `build-storybook` orchestrati.
- **Qualità codice**: ESLint (flat config) + Prettier + `tsc --noEmit`; Husky + lint-staged; Commitlint opzionale.
- **Versioning**: Changesets; `ui-italia` pubblicabile su npm.
- **Registry**: `registry.json` → `shadcn build` → `public/r/*.json`, pubblicato su **GitHub Pages** (`https://gunzip.github.io/ui-italia/r/{name}.json`) e referenziato in `components.json`:
  ```json
  {
    "registries": {
      "@ui-italia": "https://gunzip.github.io/ui-italia/r/{name}.json"
    }
  }
  ```
- **CI (GitHub Actions)**: lint → typecheck → Vitest browser + a11y → build pacchetto → build Storybook → Playwright visual (multi-browser) → publish registry.
- **Quality gate**: la CI fallisce se una story ha violazioni a11y o se un test play fallisce.

---

## 11. Distribuzione e adozione

1. **Registry shadcn** (primario): i consumer installano i componenti nel proprio codebase:
   ```bash
   npx shadcn@latest add @ui-italia/button @ui-italia/field @ui-italia/tag
   ```
   Vantaggi: piena ownership del codice, nessun lock-in, DX shadcn.
2. **Pacchetto npm `ui-italia`** (opzionale/complementare) per chi preferisce import da pacchetto.
3. **Registry hosting**: **GitHub Pages** del repo (`https://gunzip.github.io/ui-italia/r/{name}.json`), generato da `shadcn build` in CI.
4. **Coesistenza con mui-italia**: entrambi installabili.

### 11.1 Migrazione da mui-italia

- **Guida agent-oriented** in `docs/migration-from-mui-italia.md` (+ versione MDX dentro Storybook): mapping deterministico componente→componente, tabella props (vecchia → nuova), token, e **snippet find&replace / codemod-like** che un agente può applicare senza ambiguità. Ogni voce ha "prima/dopo" e note di breaking change.
- **Shim di compatibilità opzionale** `ui-italia-compat` (workspace separato nel monorepo, **non** pubblicato nel registry): riesporta i nomi MUI (`MIButton`, `MIChip`, …) come adattatori sottili sopra `ui-italia`, con props legacy deprecate (`@deprecated` + warning in dev). Permette migrazione incrementale e va rimosso a fine migrazione.

---

## 12. Rischi e mitigazioni

| Rischio                                                     | Impatto                            | Mitigazione                                                                                |
| ----------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| Base UI era in preview: **superato**                        | Basso                              | `@base-ui/react@1.8.0` è stabile; resta comunque il pin di versione                        |
| Storybook MCP / manifest in preview                         | API può cambiare                   | Addon isolato; fallback su `shadcn docs` + skill shadcn                                    |
| Contrasto palette Italia su testo                           | Violazioni AA                      | Uso di varianti 700/850 per il testo; gate a11y automatico                                 |
| Scope ampio (~47 componenti + ~90 illustrazioni)            | Tempi/longevità                    | Scope unico ma batch di lavoro ordinati (W0–W7), definition of done per componente         |
| Toolchain molto recente (Vite 8, TS 6, ESLint 10, Vitest 5) | Plugin/regole non ancora allineati | Versioni pinnate; aggiornamenti progressivi                                                |
| Perdita DX vs shadcn upstream                               | Manutenzione                       | Zero fork dei primitivi: solo temi/varianti; aggiornamenti via CLI + diff                  |
| Visual regression self-hosted                               | Manutenzione baseline              | Baseline in git, `test:visual:update` per aggiornarle; report Playwright come review in CI |

---

## 13. Ordine di esecuzione (un'unica release v1)

Anche con scope completo, l'ordine riduce il rischio:

1. **W0 — Bootstrap**: monorepo, rinomina workspace, tooling (eslint/prettier/ts/CI), Storybook + MCP, skill shadcn, registry `@ui-italia`.
2. **W1 — Design token**: `globals.css` (@theme), palette, tipografia, spacing, radius, ombre, focus, dark mode; story "Foundations".
3. **W2 — Primitive core**: Button, Badge, Alert, Card, Input/Field, Label, Checkbox/Radio/Switch, Select, Combobox, Dialog/Sheet/Drawer, Tooltip/Popover, Tabs, Table, Pagination, Spinner, Skeleton, Breadcrumb, Avatar, Progress, Separator…
4. **W3 — Form**: FieldGroup, RHF+Zod, Calendar/Date Picker, InputOTP (CodeInput), SingleFileInput, TOSAgreement.
5. **W4 — Componenti `MI*` residui**: Stepper, Wizard, Timeline/Notification, SpidSelectOIDialog, BoxedModule, Snackbar(Toast), Tag/TagGroup, AutoComplete.
6. **W5 — Composizioni**: Header Account/Product, Footer (5), Hero, Infoblock, Banner, Party*/Product*, LangSwitch, ProfileItem, HorizontalNav, Walkthrough, Showcase, AccountDropdown.
7. **W6 — Asset, icone, illustrazioni**: port 1:1 + registry items.
8. **W7 — Docs, a11y, registry, release**: story complete, gate a11y verde, `shadcn build`, publish, guida migrazione da mui-italia.

Ogni workstream chiude con: story + test + a11y verde + docs + registry item.

---

## 14. Definition of Done (per componente)

- [ ] API idiomatica shadcn/Base UI, tipi stretti, ref forwarding, `data-slot`.
- [ ] Tematizzato **solo** con token semantici (nessun colore hard-coded).
- [ ] Story per tutte le varianti/stati + edge case; viewport del design system.
- [ ] Play function sui flussi chiave.
- [ ] `@storybook/addon-a11y` verde (`test: 'error'`).
- [ ] Test unit/browser verdi; keyboard nav verificata.
- [ ] Documentazione (autodocs + eventuale MDX) e `registry.json`.
- [ ] Incluso nel build del pacchetto/registry.

---

## 15. Decisioni finali

| #   | Domanda          | Decisione                                                                       |
| --- | ---------------- | ------------------------------------------------------------------------------- |
| 1   | Nome/scope npm   | `ui-italia`                                                                     |
| 2   | Hosting registry | **GitHub Pages**                                                                |
| 3   | Visual testing   | **Self-hosted** con Playwright (chromium/firefox/webkit), niente vendor — §15.1 |
| 4   | Illustrazioni    | In `packages/ui` con entrypoint dedicato + registry items (vedi §7.4)           |
| 5   | RTL              | **Non supportato**, come mui-italia (LTR-only)                                  |
| 6   | Browser target   | Come mui-italia: evergreen, ultime 2 versioni, no IE (nessuna browserslist)     |
| 7   | Dark mode        | Sì, port 1:1 di `darkTheme`                                                     |
| 8   | Migrazione       | Guida agent-oriented + shim opzionale `ui-italia-compat` (vedi §11.1)           |

### 15.1 Visual testing: self-hosted (niente vendor)

**Decisione**: nessun fornitore esterno. Il visual regression è self-hosted con **Playwright** (`@playwright/test`), con baseline tracciate in git.

- `packages/ui/playwright.config.ts`: projects **chromium + firefox + webkit** (WebKit ≈ Safari), `webServer` che avvia Storybook in automatico.
- `packages/ui/tests/visual/stories.spec.ts`: enumera `/index.json`, apre ogni story e usa `toHaveScreenshot`.
- **Baseline per piattaforma** (default Playwright): fanno fede quelle **Linux** (CI), committate in `packages/ui/tests/visual/__screenshots__`; le baseline macOS/Windows restano locali e gitignorate.
- Comandi: `pnpm --filter ui-italia test:visual` (confronto) e `test:visual:update` (rigenerazione locale).
- Aggiornamento baseline Linux: workflow **Update visual baselines** (`workflow_dispatch` + settimanale), che rigenera e committa.
- CI: il job `visual` è **bloccante** sulle baseline Linux; su fallimento carica il report Playwright.

**Perché** (vs fornitore hosted): costo **$0**, nessun dato che esce dal perimetro, **multi-browser incluso** (Chromium/Firefox/WebKit), nessun lock-in. **Costo**: niente review UI proprietaria — la review avviene sul report Playwright HTML e le baseline sono nostre.

**Alternative valutate**: Lost Pixel / reg-suit / BackstopJS (aggiungono una review UI ma più manutenzione); Playwright è sufficiente per ora.

---

## 16. Prossimo passo proposto

**W0 e W1 completati.** Fatto: rinomina a `ui-italia` (nessun riferimento all'organizzazione), registry `@ui-italia` + GitHub Pages, CI/quality gate, hooks, visual test self-hosted, guida di migrazione + shim `ui-italia-compat`; token Italia in `globals.css` (light + dark, tipografia, spacing, radius, elevazioni, focus) + story Foundations, `Button` allineato.

Prossimo: **W2 — primitive core** in corso. Importate 23 primitive dal registry Base UI (`alert`, `badge`, `card`, `input`, `textarea`, `label`, `field`, `checkbox`, `radio-group`, `switch`, `select`, `separator`, `skeleton`, `spinner`, `tabs`, `tooltip`, `dialog`, `sheet`, `dropdown-menu`, `avatar`, `progress`, `breadcrumb`) con 19 story e gate a11y verde (**83 test**). Restano: allineamento Italia fine per componente (varianti status, bordi, densità), primitive mancanti (`accordion`, `alert-dialog`, `aspect-ratio`, `carousel`, `chart`, `collapsible`, `combobox`, `command`, `context-menu`, `calendar`/`date-picker`, `drawer`, `empty`, `hover-card`, `input-otp`, `item`, `kbd`, `marker`, `menubar`, `native-select`, `navigation-menu`, `pagination`, `resizable`, `scroll-area`, `sidebar`, `slider`, `sonner`, `table`/`data-table`, `toggle`/`toggle-group`), i blocchi (W4/W5) e illustrazioni/icone (W6).

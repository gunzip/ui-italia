# Parity spec — `ui-italia` ↔ `mui-italia` (`themeNext`)

> Status: **draft for review** — Fase 0 del refactoring. Documento di riferimento, non ancora eseguito.
> Reference congelato: **`themeNext`** di `mui-italia` (branch `develop`).
> Fonti primarie (read-only):
>
> - `mui-italia/src/theme/themeNext.ts` — override per-componente
> - `mui-italia/src/theme/foundations-next/paletteNext.ts` — palette Next
> - `mui-italia/src/theme/foundations-next/foundationNext.ts` — foundation Next
> - `mui-italia/src/theme/theme.ts` + `foundations/palette.ts` + `foundations/foundation.ts` — fallback legacy
> - `mui-italia/src/theme/colors.ts` — ramp colore
> - `mui-italia/src/theme/muiSwitch.ts` — Switch
> - `mui-italia/src/components/**` — stili locali (es. `MIButton/styles.ts`)
> - `mui-italia/src/stories/**` + story colocate — esempi da replicare

---

## 0. Come usare questo documento

1. È **l'oracolo** per il refactoring dei componenti e per i test di parity: ogni valore atteso qui elencato deve essere verificabile via `getComputedStyle` o screenshot.
2. In caso di conflitto tra `themeNext` e `theme`:
   - se `themeNext` **ri-dichiara** l'override → vale `themeNext`;
   - se `themeNext` **non** ri-dichiara un override presente in `theme` (es. `MuiChip`, `MuiStepLabel`, `MuiTimelineDot`) → si adotta `theme.ts` come **intento di design**;
   - se il token non esiste in `paletteNext` (es. `secondary`, `action`, `primary.100`, `primaryAction`, i gradini `100/850`) → vale il valore legacy `palette.ts`/`colors.ts` (vedi §10, decisioni aperte).
3. `themeNext` è **transitorio** (contiene un blocco marcato `TO BE REMOVED`). Questo documento va ri-verificato a ogni release di `mui-italia`.

---

## 1. Decisioni globali

| #   | Decisione       | Valore                                                                                                                                     |
| --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Reference       | `themeNext`: primary `#0B3EE3`, testo `#0E0F13`, surface `#F4F5F8`, `shape.borderRadius: 8`                                                |
| 2   | Colori di stato | i token base `--{status}` = `main` **acceso** (fill/icona/bordo); `--{status}-strong` = `850` per il **testo**; `--{status}-muted` = `100` |
| 3   | A11y            | gate `@storybook/addon-a11y` `test: 'error'` invariato; vietato usare `--{status}` acceso come colore testo su bianco                      |
| 4   | Stile           | solo token semantici + classi/cva idiomatiche shadcn/Base UI; nessun `sx`/`style` pubblico                                                 |
| 5   | Label           | input idiomatico (`Field` + `Label`), label flottante non clonata (deciso: §10.2)                                                          |
| 6   | Storybook       | toggle canvas `italia` (sfondo `#CED8F9` + centratura) + toolbar tema `light/dark/system/next`                                             |
| 7   | Scope           | **full**: primitivi + blocchi/composizioni + assets/icone/illustrazioni                                                                    |

---

## 2. Token di colore

### 2.1 Semantici

| Token ui-italia                              | Valore target         | Origine mui                                                               |
| -------------------------------------------- | --------------------- | ------------------------------------------------------------------------- |
| `--background`                               | `#FFFFFF`             | `palette.background.paper` / `common.white`                               |
| `--foreground`                               | `#0E0F13`             | `paletteNext.text.primary` (`neutral.black`)                              |
| `--card` / `--popover`                       | `#FFFFFF`             | `background.paper`                                                        |
| `--card-foreground` / `--popover-foreground` | `#0E0F13`             | `text.primary`                                                            |
| `--muted`                                    | `#F4F5F8`             | `paletteNext.background.main` (`grey[50]`)                                |
| `--muted-foreground`                         | `#555C70`             | `paletteNext.text.secondary` (`grey[700]`)                                |
| `--text-disabled`                            | `#99A3C1`             | `text.disabled` (`grey[450]`)                                             |
| `--border` / `--divider`                     | `#E8EBF1`             | `paletteNext.divider` (`grey[100]`)                                       |
| `--input` / `--input-border`                 | `#E8EBF1` / `#636B82` | surface controlli / `MuiOutlinedInput.notchedOutline` (`grey[650]`, Next) |
| `--accent`                                   | `#E3F2FD`             | `italia[50]` (invariato)                                                  |
| `--ring`                                     | `#0B3EE3`             | `MuiButton.focusVisible outline` = `primary.main`                         |
| `--overlay` / backdrop                       | `rgba(14,15,19,0.35)` | `paletteNext.backdrop.background` = `alpha(black, .35)`                   |
| `--menu-item`                                | `#17324D`             | `palette.menuItem.background` (invariato; hover `alpha(·, .04)`)          |
| `--tooltip`                                  | `#455B71`             | `MuiTooltip.tooltip` (invariato)                                          |
| `--shadow-color`                             | `#002B55`             | `palette.shadow.main` (invariato)                                         |

### 2.2 Primary / secondary

| Token                                | Valore target | Note                                                           |
| ------------------------------------ | ------------- | -------------------------------------------------------------- |
| `--primary`                          | `#0B3EE3`     | `colors.blue[500]` = `paletteNext.primary.main`                |
| `--primary-light`                    | `#3C65E9`     | `colors.blue[400]` (`primary.light`)                           |
| `--primary-hover` / `--primary-dark` | `#0932B6`     | `colors.blue[600]` (`primary.dark`, hover contained/text)      |
| `--primary-100`                      | `#C4DCF5`     | legacy `palette.primary[100]` — **assente in `paletteNext`**   |
| `--primary-foreground`               | `#FFFFFF`     | `contrastText`                                                 |
| `--secondary`                        | `#00C5CA`     | legacy `palette.secondary.main` — **assente in `paletteNext`** |
| `--secondary-dark`                   | `#00A7AC`     | legacy (`secondary.dark`)                                      |
| `--secondary-foreground`             | `#0E0F13`     | coerente con testo Next (verificare contrasto)                 |

> ⚠️ `paletteNext` non definisce `secondary` né `action`. Senza override, i componenti MUI in modalità Next ricadono sui default MUI. Decisione aperta §10.

### 2.3 Stati

Ruoli: `--{status}` = `main` (fill/icona/bordo) · `--{status}-dark` = hover · `--{status}-light` = variante chiara · `--{status}-muted` = surface `100` · `--{status}-strong` = testo `850` · `--{status}-accent` = alias deprecato di `main` · `--{status}-foreground` = `contrastText`.

| Token       | `main` (fill)              | `-dark` (hover) | `-light`                   | `-muted`  | `-strong` (testo) |
| ----------- | -------------------------- | --------------- | -------------------------- | --------- | ----------------- |
| destructive | `#D13333` (`error[600]`)   | `#A82929`       | `#FF4040` (`error[500]`)   | `#FFE0E0` | `#761F1F` (`850`) |
| success     | `#6CC66A` (`success[500]`) | `#5CA85A`       | `#89D188` (`success[400]`) | `#E1F4E1` | `#224021` (`850`) |
| warning     | `#FFC824` (`warning[500]`) | `#D9AD3C`       | `#FFD56B` (`warning[400]`) | `#FFF5DA` | `#614C15` (`850`) |
| info        | `#6BCFFB` (`info[500]`)    | `#5BB0D5`       | `#89D9FC` (`info[400]`)    | `#E1F5FE` | `#215C76` (`850`) |

`--{status}-foreground` = `#0E0F13` (`contrastText: neutral.black` su tutti gli stati).

### 2.4 Brand e ramp (additivi)

| Token                                                                      | Valore                                | Origine                                          |
| -------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| `--brand`                                                                  | `#0066CC`                             | `palette.pagoPA.main` / `colors.blueitalia[500]` |
| `--eu`                                                                     | `#264CA4`                             | `palette.europeanUnion.main`                     |
| `--indigo`                                                                 | `#3F51B5`                             | `palette.indigo.main`                            |
| `--check-iban`                                                             | `#008CA8`                             | `palette.checkIban.main`                         |
| `--italia-50…900`                                                          | vedi `globals.css`                    | `tokens/colors/italia.ts` (invariato)            |
| ramp `blue/turquoise/blueitalia/info/success/warning/error/purple/neutral` | vedi `mui-italia/src/theme/colors.ts` | usate da `MIButton`, `MIChip`, ecc.              |

---

## 3. Tipografia

Famiglie: **Titillium Web** (sans) · **DM Mono** (mono). `htmlFontSize = 16`, `fontWeightRegular 400`, `Medium 600`, `Bold 700`. `allVariants.color = text.primary`.

| Variant MUI        | Utility ui-italia     | Size / weight / line-height | Extra                        |
| ------------------ | --------------------- | --------------------------- | ---------------------------- |
| `headline`         | `text-headline`       | 58 / 700 / 1.1              |                              |
| `h1`               | `text-h1`             | 42→50 / 700 / 1.1→1.08      | `sm` 640                     |
| `h2`               | `text-h2`             | 36→44 / 700 / 1.1→1.09      | `sm`                         |
| `h3`               | `text-h3`             | 32→38 / 700 / 1.125→1.1     | `sm`                         |
| `h4`               | `text-h4`             | 28→32 / 700 / 1.15→1.125    | `sm`                         |
| `h5`               | `text-h5`             | 24→28 / 600 / 1.15→1.5      | `sm`                         |
| `h6`               | `text-h6`             | 22→24 / 600 / 1.18→1.15     | `sm`                         |
| `sidenav`          | (da aggiungere)       | 18 / 600 / 1.35             |                              |
| `body1`            | `text-body-lg`        | 18 / 400 / 1.5              | ls 0                         |
| `body2`            | `text-body`           | 16 / 400 / 1.4              | ls 0.15                      |
| `button`           | (label controlli)     | / 600 / 1.2                 | `text-transform: none`, ls 0 |
| `caption`          | `text-caption`        | 14 / 400 / 1.4              |                              |
| `caption-semibold` | `text-caption-strong` | 14 / 600 / 1.4              |                              |
| `monospaced`       | `text-mono`           | 16 / 400 / 1.4              | ls 0.15                      |
| `overline`         | `text-overline`       | 14 / 700 / 1.15             | ls 1                         |
| `subtitle1`        | —                     | 16 / 600                    |                              |
| `subtitle2`        | —                     | 14 / 600                    |                              |

> **Gap attuale**: gli utility esistono (`globals.css:297-396`) ma **nessun** componente li usa; 40/56 file usano `text-sm`/`text-xs`. Fase 1 deve mappare i controlli su 16px/600 (menu item, label, select) e 14px per caption.

---

## 4. Geometria

| Aspetto      | Target                                                                   | Origine                                                         |
| ------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Radius base  | `8px`                                                                    | `foundationNext.shape.borderRadius` (legacy 4)                  |
| Radius scale | 4 / 8 / 16 / 24                                                          | `shape.radius`                                                  |
| Spacing unit | `8px` → Tailwind `n × 0.5rem`                                            | `spacing: 8`                                                    |
| Colori ombra | `#002B55` @ 10/5/10%                                                     | `foundationNext.shadows`                                        |
| Elevazioni   | 4, 8, 16                                                                 | `shadowValues`                                                  |
| Focus        | `outline: 2px solid var(--ring)`, offset 4px (2px su button), radius 8px | `focusWidth/focusOffset/focusButtonOffset/focusBorderRadius`    |
| Breakpoints  | `sm 640 / md 900 / lg 1200 / xl 1536 / xxl 1920`                         | `foundation.breakpoints.values` (ui già allineato, manca `xxl`) |
| Backdrop     | `rgba(14,15,19,.35)`                                                     | `paletteNext.backdrop`                                          |

---

## 5. Matrice parity componenti

Legenda gap: 🔴 da fare · 🟡 parziale · 🟢 allineato.

### 5.1 Button

| Aspetto               | Target                                                              | ui-italia                                          | Gap |
| --------------------- | ------------------------------------------------------------------- | -------------------------------------------------- | --- |
| contained bg / bordo  | `#0B3EE3`, bordo `2px solid #0B3EE3`, testo bianco                  | ✅ token `--primary`                               | 🟢  |
| contained hover       | `#0932B6`                                                           | ✅ `hover:bg-primary-hover`                        | 🟢  |
| outlined              | bg trasparente, colore/bordo `#0B3EE3`, bordo 2px                   | ✅                                                 | 🟢  |
| outlined hover        | colore `#0932B6`, bordo `currentColor`                              | ✅ `hover:border-current hover:text-primary-hover` | 🟢  |
| text                  | trasparente, colore `#0B3EE3`, padding 0, h auto, minW auto         | `variant="link"` ✅                                | 🟢  |
| text hover            | `#0932B6`, sfondo trasparente                                       | `link` ✅ / `ghost` usa `--action-hover`           | 🟢  |
| error contained       | bg `#D13333`, bordo 2px, hover `#A82929`                            | ✅ `destructive` (filled)                          | 🟢  |
| error outlined        | bordo/colore `#D13333`, hover `#A82929`, bordo `currentColor`       | ✅ `destructive-outline`                           | 🟢  |
| contrasted (MIButton) | contained: bg bianco, testo `#0B3EE3`; outlined: testo/bordo bianco | assente (variante app-level)                       | 🔴  |
| size small            | h 40, padding 0 20, 14 / 1.25                                       | `sm` h-10 px-5                                     | 🟢  |
| size medium           | h 48, padding 0 24, 16 / 1.25                                       | `default` h-12 px-6                                | 🟢  |
| size large            | h 56, padding 0 24, 18 / 1.2                                        | `lg` h-14 px-6                                     | 🟢  |
| focus                 | outline 2px `#0B3EE3`, offset 2px, radius 8                         | ✅                                                 | 🟢  |
| min target            | 24×24                                                               | ✅ `min-h-6 min-w-6`                               | 🟢  |
| loading               | spinner/skeleton, `aria-busy`                                       | assente                                            | 🔴  |

Fonte: `themeNext.ts` `MuiButton`, `MIButton/styles.ts`, `MIButton/types.ts`.

### 5.2 Input / Field / Label / Textarea

| Aspetto        | Target                                               | ui-italia                            | Gap |
| -------------- | ---------------------------------------------------- | ------------------------------------ | --- |
| peso testo     | `600`                                                | ✅ `font-semibold`                   | 🟢  |
| altezza medium | `56px` (outlined con label)                          | ✅ `h-14`                            | 🟢  |
| radius         | `8px` (`shape.borderRadius`)                         | ✅ `rounded-lg`                      | 🟢  |
| bordo          | `#636B82` (`grey[650]`)                              | `border-input-border` ✅             | 🟢  |
| errore bordo   | `#D13333`                                            | `aria-invalid:border-destructive` ✅ | 🟢  |
| label          | 16 / 600, colore `#555C70`; errore `#D13333`         | Label 16/600 ✅ (colore ereditato)   | 🟡  |
| helper text    | 12 / 600 / 1.25, ls 0.5, `#555C70`; errore `#D13333` | ✅ `FieldDescription` / `FieldError` | 🟢  |
| adornment end  | padding-right 14px                                   | base-nova                            | 🔴  |
| floating label | dentro il bordo (TextField)                          | non presente (deciso §10.2)          | 🟡  |

Fonte: `themeNext.ts` `MuiInput/MuiOutlinedInput/MuiInputLabel/MuiInputAdornment/MuiFormHelperText/MuiInputBase`.

### 5.3 Select / Menu / Dropdown / NavigationMenu

| Aspetto          | Target                                                  | ui-italia                                     | Gap |
| ---------------- | ------------------------------------------------------- | --------------------------------------------- | --- |
| trigger          | h 56, 16 / 600, radius 8, bordo `#636B82`               | ✅ `h-14 text-body font-semibold`             | 🟢  |
| trigger small    | h 40                                                    | ✅ `data-[size=sm]:h-10`                      | 🟢  |
| menu item        | 16 / 600, whiteSpace normal, hover `rgba(23,50,77,.04)` | ✅ `text-body font-semibold` + `action-hover` | 🟢  |
| item selezionato | colore `#0B3EE3` (testo + icone)                        | ✅ `data-selected:text-primary`               | 🟢  |
| icona + testo    | margin-left 8px                                         | base-nova (gap gestito)                       | 🟡  |
| icona trigger    | 24px                                                    | `size-5` (20px)                               | 🟡  |
| popover paper    | shadow elevation-16                                     | ✅ `shadow-elevation-16`                      | 🟢  |
| input group      | h 56                                                    | ✅ `h-14`                                     | 🟢  |

Fonte: `themeNext.ts` `MuiSelect/MuiMenuItem/MuiPopover/MuiListItem*`.

### 5.4 Chip / Badge / Tag

> **Nota**: `MIChip` **non** usa il `MuiChip` del theme — lo sovrascrive con `src/components/MIChip/MIChip.tsx` (ramp `colors`, non `palette`). Questa tabella riflette `MIChip`, non `theme.ts`.

| Aspetto          | Target (`MIChip`)                                              | ui-italia                                | Gap |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------- | --- |
| radius           | `40px`                                                         | `rounded-[40px]` ✅                      | 🟢  |
| label            | 12 / 600 / 1.5, ls 0.5, padding 3×8                            | ✅ `text-xs font-semibold px-2 py-[3px]` | 🟢  |
| filled default   | bg `blue[50]` `#E7ECFC`, testo `blue[850]` `#031344`           | `variant="primary"` ✅                   | 🟢  |
| filled highlight | bg `turquoise[50]` `#DBF9FA`, testo `turquoise[850]` `#003B3D` | `variant="highlight"` ✅                 | 🟢  |
| filled neutral   | testo `#0E0F13`, bg grey MUI                                   | `variant="neutral"` (`bg-muted`) 🟡      | 🟡  |
| filled error     | bg `error[100]` `#FFD9D9`, testo `error[850]` `#5D1313`        | `destructive` = `#FFE0E0`/`#761F1F` 🟡   | 🟡  |
| filled success   | `#E1F4E1` / `#224021`                                          | ✅                                       | 🟢  |
| filled warning   | `#FFF5DA` / `#614C15`                                          | ✅                                       | 🟢  |
| filled info      | `#E1F5FE` / `#225C76`                                          | ✅ `#215C76`                             | 🟢  |
| outlined default | testo/bordo `blue[600]` `#0932B6`                              | `variant="outline-primary"` ✅           | 🟢  |
| outlined neutral | testo/bordo `#0E0F13`                                          | `outline` usa `border-border` 🟡         | 🟡  |
| outlined status  | testo/bordo `{status}[850]` (error `[600]`)                    | non modellato                            | 🔴  |
| delete icon      | colore `blue[500]` `#0B3EE3`, opacity 1                        | assente (Badge senza delete)             | 🔴  |
| avatar           | weight 400                                                     | assente                                  | 🔴  |

Fonte: `src/components/MIChip/MIChip.tsx`.

### 5.5 Alert

### 5.5 Alert

| Aspetto        | Target                                                | ui-italia                                | Gap |
| -------------- | ----------------------------------------------------- | ---------------------------------------- | --- |
| root           | border-left `4px solid`, testo `#0E0F13`, radius 8    | ✅ `border-l-4` + `text-card-foreground` | 🟢  |
| padding        | 8 / 16 (`sm`)                                         | ✅ `px-2 py-2` / `sm:p-4`                | 🟢  |
| icona          | margin-right 8/16, opacity 1                          | ✅ `gap-x-2 sm:gap-x-4`                  | 🟢  |
| standard       | bg `alpha(main,.16)`, bordo main, **icona `#0E0F13`** | non modellato (solo outlined)            | 🔴  |
| outlined       | bg bianco, shadow 4, bordo-left main                  | ✅ `border-l-{status}` + `bg-card`       | 🟢  |
| icona outlined | colore = `main` acceso                                | ✅ `text-{status}` = main (F1)           | 🟢  |
| title          | 16 / 600, ls 0.15                                     | ✅ `text-body font-semibold`             | 🟢  |
| colore warning | `#FFC824`                                             | ✅ (F1)                                  | 🟢  |

Fonte: `themeNext.ts` `MuiAlert/MuiAlertTitle`.

### 5.6 Card

| Aspetto         | Target                                    | ui-italia                        | Gap |
| --------------- | ----------------------------------------- | -------------------------------- | --- |
| radius          | 8                                         | ✅ `rounded-lg`                  | 🟢  |
| content padding | 24                                        | ✅ `--card-spacing:--spacing(6)` | 🟢  |
| actions/footer  | padding 24, top 0, **nessun bordo/fondo** | ✅ `px/pt-0/pb`, no border/bg    | 🟢  |
| titolo          | h6 22–24 / 600                            | ✅ `text-h6`                     | 🟢  |
| testo           | body 16                                   | ✅ `text-body`                   | 🟢  |

Fonte: `themeNext.ts` `MuiCard/MuiCardContent/MuiCardActions`.

### 5.7 Switch

| Aspetto  | Target                                                            | ui-italia                                        | Gap |
| -------- | ----------------------------------------------------------------- | ------------------------------------------------ | --- |
| track    | 42×26, radius 13, bg `#555C70` (off), `#0B3EE3` (on)              | ✅ `42×26`, off `muted-foreground`, on `primary` | 🟢  |
| thumb    | 22×22, checked translate ~16px                                    | ✅ `22×22`, `translate-x-[16px]`                 | 🟢  |
| hover    | halo 8px `rgba(23,50,77,.08)`; checked 10px `rgba(11,62,227,.12)` | ✅ `--action-hover` / `--primary-action-hover`   | 🟢  |
| errore   | track `#A82929`                                                   | — (aria-invalid non emesso)                      | 🟡  |
| disabled | thumb `#E8EBF1`, track opacity .2                                 | `opacity-50`, halo disattivato                   | 🟡  |

Fonte: `muiSwitch.ts`.

### 5.8 Checkbox / Radio

| Aspetto        | Target               | ui-italia                         | Gap |
| -------------- | -------------------- | --------------------------------- | --- |
| box            | 24×24, radius 4      | ✅ `size-6`                       | 🟢  |
| bordo          | scuro (MUI ~60% blk) | ✅ `border-muted-foreground`      | 🟢  |
| colore checked | `#0B3EE3`            | ✅ `data-checked:bg-primary`      | 🟢  |
| focus          | outline 2px offset 4 | ring `ring-3` (pattern base-nova) | 🟡  |

Fonte: default MUI + `focusWidth/focusOffset`; allineare al pattern `MuiButton`.

### 5.9 Tabs

> In `mui-italia` **non esiste** una story Tabs né un override `MuiTabs`: la parity non è richiesta dalla matrice story. Tipografia allineata a 14 / 600 (`text-caption-strong`) per coerenza.

### 5.10 Table

| Aspetto | Target (MUI default)        | ui-italia              | Gap |
| ------- | --------------------------- | ---------------------- | --- |
| cell    | 14px, padding 16            | `text-sm`, `p-2` (8)   | 🔴  |
| head    | weight 600 (`MuiTableHead`) | `font-medium`          | 🟡  |
| footer  | nessun default bordo/fondo  | `border-t bg-muted/50` | 🟡  |

Fonte: `MuiTableHead` + default MUI Table. Nessuna story Table in `mui-italia` (§6).

### 5.11 Tooltip

| Aspetto   | Target                                            | ui-italia                                     | Gap |
| --------- | ------------------------------------------------- | --------------------------------------------- | --- |
| contenuto | 14 / 600, bg `#455B71`, shadow 16, testo centrato | ✅ `text-caption font-semibold`, elevation-16 | 🟢  |
| arrow     | `#455B71`                                         | ✅                                            | 🟢  |

Fonte: `themeNext.ts` `MuiTooltip`.

### 5.12 Dialog / Sheet / Drawer

| Aspetto  | Target                              | ui-italia          | Gap |
| -------- | ----------------------------------- | ------------------ | --- |
| radius   | 8                                   | `rounded-xl` (12)  | 🔴  |
| titolo   | ~20 / 600 (default MUI DialogTitle) | 16 / 500           | 🔴  |
| padding  | default MUI DialogContent 24        | `p-4` (16)         | 🔴  |
| backdrop | `rgba(14,15,19,.35)`                | `--overlay` legacy | 🔴  |
| focus    | outline 2px offset 4                | base-nova          | 🟡  |

Fonte: `themeNext.ts` `MuiBackdrop` + default MUI Dialog.

### 5.13 Snackbar / Toast (Sonner)

| Aspetto | Target                          | ui-italia      | Gap |
| ------- | ------------------------------- | -------------- | --- |
| surface | bg bianco, shadow 4, padding 16 | `--popover`    | 🟡  |
| testo   | 16, `#0E0F13`                   | default Sonner | 🔴  |
| azione  | margin-right 0                  | default        | 🟡  |

Fonte: `themeNext.ts` `MuiSnackbarContent`.

### 5.14 Breadcrumb / Pagination / Link / Skeleton / Stepper / Timeline

| Componente                  | Target                                                                        | Gap |
| --------------------------- | ----------------------------------------------------------------------------- | --- |
| Breadcrumb                  | 16px, colore `#0E0F13`; separatore `#555C70`; svg 20 margin-right 12          | 🔴  |
| Pagination                  | item MUI 32×32, radius 8, focus outline 2 offset 4; `outlined` non supportato | 🔴  |
| Link                        | focus radius 8, outline 2 offset 4; tipografia margin 4 / padding 1           | 🔴  |
| Skeleton                    | bg `#F4F5F8`, radius 4 (`MuiSkeleton` in Next)                                | 🔴  |
| Stepper (`MuiStepLabel`)    | label 14; completed/active 600 (da `theme.ts`, non in Next)                   | 🔴  |
| Timeline (`MuiTimelineDot`) | box-shadow none (da `theme.ts`)                                               | 🔴  |

---

## 6. Matrice story 1:1

Per ogni storia di `mui-italia` va creata la corrispondente in `packages/ui/src/components/*.stories.tsx` con: stessa `title` gerarchica, stessa matrice di stati, copy italiano, `play` per le interazioni.

| Title `mui-italia`                                                                                                                                                                                            | File                                    | Stati da replicare                                                         | Stato ui |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------- | -------- |
| `MUI Components/Inputs/Button`                                                                                                                                                                                | `src/stories/Button.stories.tsx`        | contained/outlined/text, color, size, icon, disabled                       | 🔴       |
| `Components/MIButton`                                                                                                                                                                                         | `src/stories/MIButton.stories.tsx`      | Playground, Variants, Colors, Sizes, Icons, Link, LoadingStates, FullWidth | 🔴       |
| `Components/ButtonNaked`                                                                                                                                                                                      | colocated                               | —                                                                          | 🔴       |
| `MUI Components/Inputs/Text Field`                                                                                                                                                                            | `src/stories/TextField.stories.tsx`     | stati input/label/helper/error/adornment                                   | 🔴       |
| `MUI Components/Inputs/Select`                                                                                                                                                                                | `src/stories/Select.stories.tsx`        | default, con icone, gruppi                                                 | 🔴       |
| `MUI Components/Navigation/Menu`                                                                                                                                                                              | `src/stories/Menu.stories.tsx`          | —                                                                          | 🔴       |
| `Mui Components/Surfaces/Card`                                                                                                                                                                                | `src/stories/Card.stories.tsx`          | Default, Raised, WithMedia                                                 | 🔴       |
| `MUI Components/Data Display/Badge`                                                                                                                                                                           | `src/stories/Badge.stories.tsx`         | —                                                                          | 🔴       |
| `Components/MIChip`                                                                                                                                                                                           | `src/stories/MIChip.stories.tsx`        | colori, variant, avatar/delete                                             | 🔴       |
| `Components/MIAlert`                                                                                                                                                                                          | `src/stories/MIAlert.stories.tsx`       | standard/outlined, 4 stati, title, action                                  | 🔴       |
| `Components/MIBoxedModule`                                                                                                                                                                                    | `src/stories/MIBoxedModule.stories.tsx` | title, content, skeleton                                                   | 🔴       |
| `Components/MIBreadcrumbs`                                                                                                                                                                                    | `src/stories/MIBreadcrumbs.stories.tsx` | —                                                                          | 🔴       |
| `Components/MIPaper`                                                                                                                                                                                          | `src/stories/MIPaper.stories.tsx`       | elevation                                                                  | 🔴       |
| `Components/MISnackbar`                                                                                                                                                                                       | `src/stories/MISnackbar.stories.tsx`    | —                                                                          | 🔴       |
| `Components/MISpinner`                                                                                                                                                                                        | `src/stories/MISpinner.stories.tsx`     | —                                                                          | 🔴       |
| `Components/MIStepper` / `MUI …/Stepper`                                                                                                                                                                      | 2 file                                  | —                                                                          | 🔴       |
| `Components/MITimeline`                                                                                                                                                                                       | `src/stories/MITimeline.stories.tsx`    | —                                                                          | 🔴       |
| `Components/MIWizard`                                                                                                                                                                                         | `src/stories/MIWizard.stories.tsx`      | —                                                                          | 🔴       |
| `Components/MIIconButton` / `MUI …/Icon Button`                                                                                                                                                               | 2 file                                  | —                                                                          | 🔴       |
| `MUI Components/Inputs/Switch`                                                                                                                                                                                | `src/stories/Switch.stories.tsx`        | —                                                                          | 🟡       |
| `MUI Components/Inputs/Icon Button`                                                                                                                                                                           | —                                       | —                                                                          | 🔴       |
| `MUI Components/Navigation/Breadcrumbs`                                                                                                                                                                       | —                                       | —                                                                          | 🔴       |
| `MUI Components/Navigation/Pagination`                                                                                                                                                                        | —                                       | —                                                                          | 🔴       |
| `MUI Components/Data Display/Tooltip`                                                                                                                                                                         | —                                       | —                                                                          | 🟡       |
| `MUI Components/Feedback/Backdrop`                                                                                                                                                                            | —                                       | —                                                                          | 🔴       |
| `MUI Components/Lab/Desktop Date Picker`                                                                                                                                                                      | —                                       | —                                                                          | 🔴       |
| `Foundation/Typography`                                                                                                                                                                                       | —                                       | —                                                                          | 🟡       |
| `Foundation/Colors`, `Foundation/Breakpoints`                                                                                                                                                                 | `.mdx`                                  | —                                                                          | 🟡       |
| `Components/Tag`, `Components/TagGroup`                                                                                                                                                                       | —                                       | —                                                                          | 🔴       |
| `Components/CodeInput`                                                                                                                                                                                        | —                                       | —                                                                          | 🔴       |
| `Components/EnvironmentBanner`, `Components/Banner`                                                                                                                                                           | —                                       | —                                                                          | 🔴       |
| `Components/CopyToClipboardButton`                                                                                                                                                                            | —                                       | —                                                                          | 🔴       |
| `Composition/Sidenav`                                                                                                                                                                                         | —                                       | —                                                                          | 🔴       |
| `Components/Footer (WIP)`                                                                                                                                                                                     | —                                       | —                                                                          | 🔴       |
| `Components/HeaderAccount (WIP)`, `HeaderProduct (WIP)`                                                                                                                                                       | —                                       | —                                                                          | 🔴       |
| `Components/Hero`, `Infoblock`, `HorizontalNav`, `LangSwitch`                                                                                                                                                 | —                                       | —                                                                          | 🔴       |
| `Components/PartyAccountItem`, `PartyAccountItemButton`, `PartyAvatar`, `ProductAvatar`, `ProductSwitch`, `ProfileItem`, `Showcase`, `SingleFileInput`, `TOSAgreement`, `Walkthrough`, `TimelineNotification` | —                                       | —                                                                          | 🔴       |
| Assets / Icons / Illustrations                                                                                                                                                                                | —                                       | —                                                                          | 🔴       |

Components presenti in ui-italia **senza** controparte in mui (story extra): `accordion`, `aspect-ratio`, `carousel`, `chart`, `context-menu`, `hover-card`, `menubar`, `navigation-menu`, `resizable`, `sidebar`, `table`, `tabs` → nessun obbligo di parity.

---

## 7. Inventario catalogo da portare (full scope)

| Gruppo                  | Elementi                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Componenti MI* mancanti | `MIStepper`, `MIWizard`, `MITimeline`/`TimelineNotification`, `MIBoxedModule`, `MISpidSelectOIDialog`, `MISnackbar`, `MIPaper`, `MIChip`, `MIIconButton`, `MIBreadcrumbs`, `Autocomplete`, `Tag`, `TagGroup`, `ButtonNaked`, `CodeInput`, `SingleFileInput`, `CopyToClipboardButton`, `TOSAgreement`                                                                                       |
| Composizioni            | `AccountDropdown`, `Banner` (+ Primary/Secondary/Tertiary), `EnvironmentBanner`, `Footer` + `FooterLegal`/`Checkout`/`PostLogin`/`PreLogin`, `HeaderAccount`, `HeaderProduct`, `Hero`, `HorizontalNav`, `Infoblock` (+ pattern SVG), `LangSwitch`, `PartyAccountItem`, `PartyAccountItemButton`, `PartyAvatar`, `ProductAvatar`, `ProductSwitch`, `ProfileItem`, `Showcase`, `Walkthrough` |
| Assets                  | `FundedByNextGenerationEU`, `LogoIOApp`, `LogoPagoPACompany`, `LogoPagoPAProduct`, `MonogramPagoPACompany`, `logo-cgn.png`                                                                                                                                                                                                                                                                 |
| Icone                   | `CieIcon`, `SpidIcon`, `PNIcon`, `InteropIcon`, `ThreadsIcon`, `YoutubeIcon`, `MediumIcon`, `CheckIbanIcon`                                                                                                                                                                                                                                                                                |
| Illustrazioni           | ~90 SVG 1:1 (entrypoint dedicato `ui-italia/illustrations/*`)                                                                                                                                                                                                                                                                                                                              |
| Registry                | item per **ogni** componente/asset (oggi solo `utils`, `theme`, `button`)                                                                                                                                                                                                                                                                                                                  |

Fonte: `mui-italia/src/components/index.ts`, `src/assets/index.ts`, `src/icons/index.ts`, `src/illustrations/**`.

---

## 8. Verifica e guardrail

1. **`parity.test.ts`** (Vitest browser): per un set di componenti chiave, esegue `getComputedStyle` e verifica i valori di questa spec con tolleranza (rgb esatto, dimensioni ±0.5px). Esempi minimi:
   - Button contained: `background-color = rgb(11,62,227)`, `height = 48px`, `border-width = 2px`.
   - Switch: track `42×26`, thumb `22`.
   - Badge/Tag: `padding = 8px 12px`, `font-size = 14px`, `font-weight = 600`.
   - Alert warning icona: `color = rgb(255,200,36)` (`#FFC824`).
   - Chip info filled: bg `rgb(225,245,254)`, testo `rgb(33,92,118)`.
2. **Visual regression**: baselines Linux in `packages/ui/tests/visual/__screenshots__`, aggiornate via workflow "Update visual baselines".
3. **A11y gate**: `test: 'error'` su tutte le story, `parity.test.ts` non lo sostituisce.
4. **Autodocs**: ogni componente con `tags: ['autodocs']` e descrizioni equivalenti agli MDX mui.
5. **CI**: `lint → typecheck → vitest+a11y → build → storybook build → visual → registry`.

---

## 9. Ordine di esecuzione

1. **F1 Token** — `globals.css` (§2, §3, §4); Foundations stories aggiornate.
2. **F2 Primitive** — §5.1 → 5.13 in ordine di impatto.
3. **F3 Storybook** — toggle canvas + toolbar tema; port story §6.
4. **F4 Catalogo** — §7.
5. **F5 Guardrail** — `parity.test.ts`, aggiornamento `AGENTS.md`/`porting-plan.md`.

Ogni step chiude con: story + a11y verde + parity test + baseline.

---

## 10. Decisioni prese

| #   | Tema                                                                | Decisione                                                                                                                                                   |
| --- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `secondary`/`action`/`primary.100` assenti in `paletteNext`         | `--secondary #00C5CA` + `--secondary-dark #00A7AC` (legacy DS); `--primary-100 #C4DCF5` (= `blueitalia[100]`); hover derivati dal nuovo primary (§2.1/§2.2) |
| 2   | Floating label `TextField`                                          | **non** clonata: `Field` + `Label` idiomatico. Parity su altezza (56px), peso (600) e colori, non sulla meccanica di label flottante                        |
| 3   | `warning` Next `#FFC824` vs legacy `#FFCB46`                        | `#FFC824` (`colors.warning[500]`), come `paletteNext`                                                                                                       |
| 4   | Hover Switch (`action.hover`/`primaryAction.hover`) assenti in Next | intento DS adattato al nuovo primary: `--action-hover: rgb(23 50 77 / 8%)`, `--primary-action-hover: rgb(11 62 227 / 12%)`                                  |
| 5   | `MuiChip`/`MuiStepLabel`/`MuiTimelineDot` non in Next               | si adotta `theme.ts` come intento; per `MuiChip.primary[100]` → `#C4DCF5`                                                                                   |
| 6   | Altezza controlli                                                   | 56px (MUI `medium`): input/select/textarea/combobox                                                                                                         |

### Stato di avanzamento

- **F1 — Token: fatto** (`packages/ui/src/styles/globals.css`, `foundations.stories.tsx`). Light su `themeNext`; dark allineato a `darkTheme` + nuovi token derivati. Build Storybook verde.
- **F2 — Primitive: in corso.** Blocchi 1-4: Button/Card/Badge, Input/Field/Label/Textarea, Select/Combobox/NativeSelect/Menu, Switch/Checkbox/Radio. Blocco 5: **Alert/Tooltip/Tabs** (§5.5/§5.9/§5.11). Restano §5.10, §5.12 → §5.14.
- **F3 — Storybook: da fare** (§6).
- **F4 — Catalogo: da fare** (§7).
- **F5 — Guardrail: da fare** (§8).

---

## 11. Riferimenti

- Piano generale: [`porting-plan.md`](./porting-plan.md)
- Migrazione: [`migration-from-mui-italia.md`](./migration-from-mui-italia.md)
- Convenzioni agente: [`../AGENTS.md`](../AGENTS.md)

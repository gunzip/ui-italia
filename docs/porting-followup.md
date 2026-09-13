# Porting follow-up — completare `mui-italia` → `ui-italia`

> Status: **backlog operativo**. Il porting principale (token, primitivi, catalogo,
> registry, guardrail) è completato e verde in CI. Questo file elenca i task che
> chiudono la parity al 100%.
> Riferimenti: [`parity-spec.md`](./parity-spec.md) (matrice §5 con stati 🟡/🔴),
> [`porting-plan.md`](./porting-plan.md), [`migration-from-mui-italia.md`](./migration-from-mui-italia.md).

Legenda priorità: **P1** = parity visibile/API utente · **P2** = rifinitura · **P3** = nice-to-have.

---

## 1. Componenti — gap puntuali (da `parity-spec.md` §5)

| #    | Componente     | Gap                                                                           | Target (mui-italia)                                            | File `ui-italia`                                                    | Prio |
| ---- | -------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- | ---- |
| 1.1  | Input          | colore label: eredita `foreground` invece di `#555C70`                        | `MuiInputLabel.color = text.secondary`                         | `src/components/label.tsx`, `field.tsx`                             | P2   |
| 1.2  | Input          | padding-right dell'adornment finale                                           | `MuiInputBase.formControl .MuiInputAdornment-positionEnd` 14px | `src/components/input-group.tsx`                                    | P2   |
| 1.3  | Input          | floating label (label dentro il bordo)                                        | `TextField` outlined con label flottante                       | decisione §10.2 parità-spec: **non clonare**; documentare la scelta | P3   |
| 1.4  | Select         | icona trigger 20px vs 24px MUI                                                | `MuiSelect-icon` 24px                                          | `src/components/select.tsx`                                         | P2   |
| 1.5  | Select/Menu    | spazio icona + testo (margin-left 8px)                                        | `MuiSelect`/`MuiMenuItem` `ListItemIcon + Text`                | `src/components/select.tsx`, `dropdown-menu.tsx`                    | P3   |
| 1.6  | Badge/Chip     | `filled error` usa `#FFE0E0/#761F1F` (palette) vs `#FFD9D9/#5D1313` (colors)  | `MIChip` error `colors.error[100]/[850]`                       | `src/components/badge.tsx`                                          | P3   |
| 1.7  | Badge/Chip     | `filled neutral` approssimato (`bg-muted`)                                    | grey MUI del Chip                                              | `src/components/badge.tsx`                                          | P3   |
| 1.8  | Badge/Chip     | `outlined neutral` e `outlined {status}` non modellati                        | `MIChip` outlined (bordo/testo `850`, error `600`)             | `src/components/badge.tsx`                                          | P2   |
| 1.9  | Badge/Chip     | delete icon + avatar                                                          | `MIChip` `onDelete` (icona `blue[500]`), `avatar`              | nuovo `src/blocks/tag.tsx` o `badge.tsx`                            | P2   |
| 1.10 | Alert          | variante `standard` (bg `alpha(main,.16)`, icona `#0E0F13`)                   | `MuiAlert.standard*`                                           | `src/components/alert.tsx`                                          | P2   |
| 1.11 | Switch         | stato errore (track `#A82929`) e disabled (thumb `#E8EBF1`, track opacity .2) | `muiSwitch.ts`                                                 | `src/components/switch.tsx`                                         | P3   |
| 1.12 | Checkbox/Radio | focus con outline 2px offset 4 (pattern MUI) invece del ring                  | `focusWidth`/`focusOffset`                                     | `src/components/checkbox.tsx`, `radio-group.tsx`                    | P3   |
| 1.13 | Dialog/overlay | focus con outline 2px offset 4                                                | pattern MUI                                                    | `src/components/dialog.tsx`                                         | P3   |
| 1.14 | Pagination     | item 48px vs 32px MUI                                                         | `MuiPaginationItem` 32×32                                      | `src/components/pagination.tsx`                                     | P2   |
| 1.15 | Link           | componente `Link` assente (focus/ margin 4 padding 1)                         | `MuiLink`                                                      | nuovo `src/components/link.tsx`                                     | P2   |
| 1.16 | Sonner         | `action` margin-right 0                                                       | `MuiSnackbarContent.action`                                    | `src/components/sonner.tsx`                                         | P3   |

> Nota: `Stepper` e `Timeline` (già segnalati in §5.14) sono stati portati come blocchi
> in `src/blocks/`. `Tabs` non ha controparte mui (nessun override/story).

---

## 1b. Blocco `SpidSelectOIDialog` — gap puntuali

> Oracolo: **`themeNext`** (`parity-spec.md` §5.15). Per il confronto, commutare lo Storybook
> `mui-italia` sul global theme `next`: di default parte con `theme.ts` legacy e mostra
> differenze di generazione (radius/backdrop/primary), non di porting.
> La Fase 1 (bug bloccanti) è stata applicata e verificata via `getComputedStyle`.

| #     | Gap                                                                      | Target (mui, `themeNext`)                                           | File                                             | Prio | Stato |
| ----- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------ | ---- | ----- |
| SP.1  | Logo IDP reso a dimensione naturale (preflight `img { height:auto }`)    | `height 28px`, larghezza auto (~115)                                | `src/blocks/spid-select-dialog.tsx`              | P1   | ✅    |
| SP.2  | Titolo non applicato: `text-h6` scavalcato da `text-xl` di `DialogTitle` | 18 (xs) → 24 (sm) / 700 / lh 1.5                                    | `src/blocks/spid-select-dialog.tsx`              | P1   | ✅    |
| SP.3  | Icona di chiusura color `primary` invece di neutro                       | `#0E0F13`                                                           | `src/blocks/spid-select-dialog.tsx`              | P1   | ✅    |
| SP.4  | Riga IDP: altezza/radius/margine/label                                   | h 60, p 16, radius 8, `mb 8`; ls `normal`                           | `src/blocks/spid-select-dialog.tsx`              | P2   | ✅    |
| SP.5  | Skeleton: righe bordate 60px + barra 240×16                              | `SpidList.tsx` loading                                              | `src/blocks/spid-select-dialog.tsx`              | P2   | ✅    |
| SP.6  | Larghezza responsive + fullscreen mobile                                 | `410px` sm / `600px` lg; fullscreen < `sm`                          | `src/blocks/spid-select-dialog.tsx`              | P1   | ✅    |
| SP.7  | Alert "IDP non disponibile" (MIAlert filled)                             | bg warning[100], bordo warning[500], radius 8                       | `src/components/alert.tsx` (appearance `filled`) | P2   | ✅    |
| SP.8  | Transizione dialogo deterministica                                       | `transitionDuration={0}`                                            | `src/blocks/spid-select-dialog.tsx`              | P3   | —     |
| SP.9  | Shuffle IDP + scroll all'alert                                           | `shuffleList` + `scrollTo({ top: 0 })`                              | `src/blocks/spid-select-dialog.tsx`              | P2   | ✅    |
| SP.10 | Mock e matrice story 1:1                                                 | 12 IDP; + UnavailableIdp/Authorizing/CustomTranslations/Interactive | `src/blocks/spid-select-dialog.stories.tsx`      | P2   | ✅    |
| SP.11 | Contratto di parity (computed-style/visual) verso `mui-italia`           | vs `themeNext`                                                      | `Foundations/Parity guard` + `play` story        | P2   | ✅    |

> Nota Fase 3–4:
>
> - **SP.9 shuffle**: deviazione consapevole — `mui-italia` usa `Math.random` (ordine non
>   riproducibile), ui-italia usa Fisher–Yates con **seed fisso** così le baseline non sono flaky.
>   `scrollTo({ top: 0 })` all'alert invariato.
> - **SP.10**: mock 1:1 (`IDPS_MOCK` 12 + `MOCK_IDP_UNAVAILABLE`) e 7 story mui + 1 extra
>   (`UnavailableIdpSelected`, esercita l'alert). Interazioni con `play` + `userEvent`.
> - **SP.11**: contratto in due punti — asserzioni `Alert filled` in `Foundations/Parity guard` e
>   `play` di geometria/stato nelle story SPID. Verificato con `vitest --project storybook` (337/337).
> - **Extra F3** (emersi durante la verifica): `max-height` + scroll interno desktop
>   (`sm:max-h-[calc(100dvh-4rem)] overflow-y-auto`, come `MuiDialog`) e `tabIndex={0}` sulla regione
>   scrollabile per `scrollable-region-focusable`. Test hook allineati a mui.

> Note Fase 2 (storiche):
>
> - SP.6 usa classi responsive nel blocco (`max-sm:*` fullscreen, `sm/lg` larghezze) senza toccare
>   la primitiva `Dialog`.
> - SP.7 introduce `appearance="filled"` in `alert.tsx` (+ story `Alert/Filled`), il look
>   `MIAlert` (bg `{status}-muted`, bordo `{status}`, icona/testo `{status}-strong`). Resta il caso
>   `MuiAlert.standard` della task 1.10.
> - SP.8 (transizione `transitionDuration={0}`) **rimandata**: richiede modifiche alla primitiva e i
>   test visuali usano già `animations: "disabled"`.
> - ⚠️ **Baseline visuali**: rigenerare le baseline Linux di tutte le story
>   `blocks-spidselectoidialog--*` (7 story), `components-alert--filled` e
>   `foundations-parity-guard--theme-and-components` col workflow **Update visual baselines**.

---

## 2. Catalogo e contenuti

- [ ] **MDX per-componente** (parità con i 14 `mui-italia/src/docs/*.mdx`): `Button`, `Alert`, `Badge/Chip`, `Card`, `Input/TextField`, `Select`, `Snackbar`, `Spinner`, `Stepper`, `Timeline`, `Breadcrumb`, `BoxedModule`, `ProfileItem`, `Tag`. Oggi esiste solo `src/docs/parity.mdx`. — **P1**
- [ ] **Ilustrazioni**: valutare item registry individuali `illustration-<name>` per le più usate (oggi solo bundle `illustrations`). — P3
- [ ] **FooterPreLogin**: ripristinare la **colonna prodotti** (fetch `productsJsonUrl` + `onProductsJsonFetchError`), oggi omessa. — P2
- [ ] **Footer**: icone social brand (linkedin/instagram/twitter) — `lucide-react` v1 non le esporta: valutare SVG inline o `simple-icons`. Oggi sono link testuali. — P2
- [ ] **HeaderAccount/HeaderProduct**: verificare la parità su mobile (Sheet full-screen nell'originale), avatar prodotto e `borderBottom`/`borderColor` opzionali. — P2
- [ ] **Banner**: layout `primary/secondary/tertiary` semplificati — verificare dimensioni/gap e illustrazione di default rispetto a `Banner/layouts/*`. — P2
- [ ] **Walkthrough**: frecce/step `isSequential` e scroll-snap — confronto visivo con l'originale. — P3

---

## 3. Distribuzione

- [ ] **Registry: `registryDependencies` fini.** Oggi ogni item dipende solo da `utils` + `theme`; calcolare le dipendenze reali tra componenti/blocchi (es. `dialog → button`, `combobox → input-group/button`). File: `registry.json` (generato da script) + `public/r/*`. — **P1**
- [ ] **Registry: `target`/cartelle di destinazione** per icone, illustrazioni e assets (evitare collisioni di nome su `index.ts`). — P2
- [ ] **`ui-italia-compat`**: estendere lo shim oltre `MIButton` (es. `MIChip`, `MIAlert`, `MIPaper`, `MISnackbar`, `MIBreadcrumbs`) con prop legacy + warning `@deprecated`. — P2
- [ ] **Package**: valutare `files`/`build` per pubblicazione npm (oggi `private: true`, solo registry + Pages). — P3

---

## 4. Docs e processo

- [x] **Estendere `Foundations/Parity guard`** — ✅ Alert `filled` (`MIAlert`) aggiunto in Fase 3. Restano da aggiungere: Chip info (bg/testo), Pagination (32px), Field (helper/errore). File: `src/foundations/parity.stories.tsx`. — P2
- [ ] **`migration-from-mui-italia.md`**: aggiungere le mappe per i blocchi nuovi (`MIBoxedModule`→`BoxedModule`, `MITimeline`→`Timeline`, `MIWizard`→`Wizard`, `MISpidSelectOIDialog`→`SpidSelectOIDialog`, `Footer`/`Header*`, `Tag`). — **P1**
- [ ] **`AGENTS.md`**: sezione sul catalogo `src/blocks/**` e sugli entrypoint `ui-italia/{components,blocks,illustrations,icons,assets}`. — P2
- [ ] **Storybook**: valutare il titolo gerarchico stile mui (`Components/...`, `MUI Components/...`) per il sorting, e la tab Docs con gli MDX. — P3

---

## 5. Infra / qualità

- [ ] **Baseline visuali**: mantenere il loop (workflow **Update visual baselines** a ogni nuova story). — continuo
- [ ] **`cn` e utility custom**: `cn` (`cn@0.3.0`) non conosce le utility tipografiche custom (`text-h1…h6`, `text-body`, `text-caption`): gli override vanno in conflitto con `text-xl`/`text-sm` e perdono silenziosamente senza `!` (riprodotto su `SpidSelectOIDialog`, §1b SP.2). Valutare `extendTailwindMerge`/config dedicata. — P2
- [x] **Parity contract**: contratto computed-style attivo su `Foundations/Parity guard` (Alert `filled`) + `play` di geometria/stato nelle story `SpidSelectOIDialog`. Gira col gate `vitest --project storybook`. Estendere agli altri blocchi chiave. — P2
- [ ] **Multi-browser**: riabilitare `firefox`/`webkit` nel `playwright.config.ts` rigenerando le baseline Linux. — P3
- [ ] **ESLint**: valutare regole aggiuntive multi-browser/`no-hardcoded-colors` per prevenire regressioni sui token. — P3

---

## 6. Fuori scope / decisioni già prese (non sono task)

- Floating label MUI: **non clonata** (parità visiva via altezza/peso/colori) — `parity-spec.md` §10.2.
- Canvas Storybook `italia` (blu): **opt-in**, default `plain` per non rompere il gate AA.
- Dark mode: derivato da `darkTheme` legacy (nessuna variante dark di `themeNext`).
- `secondary`/`action`/`primary.100` assenti in `paletteNext`: valori derivati/legacy (§10.1).

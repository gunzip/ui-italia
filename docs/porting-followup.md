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

- [ ] **Estendere `Foundations/Parity guard`** ai componenti chiusi dopo: Alert (icona warning `#FFC824`), Chip info (bg/testo), Pagination (32px), Field (helper/errore). File: `src/foundations/parity.stories.tsx`. — P2
- [ ] **`migration-from-mui-italia.md`**: aggiungere le mappe per i blocchi nuovi (`MIBoxedModule`→`BoxedModule`, `MITimeline`→`Timeline`, `MIWizard`→`Wizard`, `MISpidSelectOIDialog`→`SpidSelectOIDialog`, `Footer`/`Header*`, `Tag`). — **P1**
- [ ] **`AGENTS.md`**: sezione sul catalogo `src/blocks/**` e sugli entrypoint `ui-italia/{components,blocks,illustrations,icons,assets}`. — P2
- [ ] **Storybook**: valutare il titolo gerarchico stile mui (`Components/...`, `MUI Components/...`) per il sorting, e la tab Docs con gli MDX. — P3

---

## 5. Infra / qualità

- [ ] **Baseline visuali**: mantenere il loop (workflow **Update visual baselines** a ogni nuova story). — continuo
- [ ] **Multi-browser**: riabilitare `firefox`/`webkit` nel `playwright.config.ts` rigenerando le baseline Linux. — P3
- [ ] **ESLint**: valutare regole aggiuntive multi-browser/`no-hardcoded-colors` per prevenire regressioni sui token. — P3

---

## 6. Fuori scope / decisioni già prese (non sono task)

- Floating label MUI: **non clonata** (parità visiva via altezza/peso/colori) — `parity-spec.md` §10.2.
- Canvas Storybook `italia` (blu): **opt-in**, default `plain` per non rompere il gate AA.
- Dark mode: derivato da `darkTheme` legacy (nessuna variante dark di `themeNext`).
- `secondary`/`action`/`primary.100` assenti in `paletteNext`: valori derivati/legacy (§10.1).

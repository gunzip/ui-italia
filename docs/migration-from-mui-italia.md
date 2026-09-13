# Migrazione da `mui-italia` a `ui-italia`

> Documento **agent-oriented**: passi deterministici, mapping esplicito, nessuna ambiguità. Un agente deve poterlo applicare file per file e verificare il risultato.
>
> Stato: **in evoluzione**. La tabella cresce insieme al port. Oggi è coperto `Button`.

## 0. Protocollo per agenti

1. Individua i punti di contatto: `grep -rn "@mui/material\|@mui/lab\|@mui/x-date-pickers\|MIButton\|MIIconButton\|MIChip"` (escludi `node_modules`).
2. Migra **un componente alla volta**, mai più di un tipo per commit.
3. Sostituisci gli import MUI con gli import da `ui-italia/*`.
4. Rimuovi le prop di stile (`sx`, `style`) e sostituiscile con classi Tailwind **semantiche** (`bg-primary`, `text-muted-foreground`, …). Mai colori hard-coded.
5. Applica il mapping props dalla tabella del componente (sotto).
6. Se il componente usa ancora il vecchio nome per compatibilità, mantieni `ui-italia-compat` finché la migrazione del file non è completa, poi rimuovi l'import.
7. Verifica: `pnpm --filter <app> typecheck` e, se il file ha una story, `pnpm --filter ui-italia exec vitest --project storybook run`.
8. Non introdurre wrapper: preferisci composizione e varianti idiomatiche.

## 1. Import e pacchetti

| Prima                                    | Dopo                                                          |
| ---------------------------------------- | ------------------------------------------------------------- |
| `import { Button } from '@mui/material'` | `import { Button } from 'ui-italia/components/button'`        |
| `import { theme } from 'mui-italia'`     | token in `ui-italia/globals.css` (nessun `ThemeProvider`)     |
| `import { italia } from 'mui-italia'`    | `bg-italia-500`, `text-italia-700`, … (token `italia-50…900`) |
| `<ThemeProvider theme={theme}>`          | rimosso                                                       |
| `sx={{ ... }}`                           | classi Tailwind semantiche                                    |

`ui-italia` non è headless: i componenti sono copiati nel codebase tramite registry shadcn. Puoi anche importarli dal pacchetto, ma il modo idiomatico è installarli:

```bash
pnpm dlx shadcn@latest add @ui-italia/button @ui-italia/theme
```

## 2. Mapping dei token

| MUI / `mui-italia`                                                             | `ui-italia`                                                                                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `theme.palette.primary.main` (`#0073E6`)                                       | `bg-primary`, `text-primary`, `border-primary`                                                                               |
| `theme.palette.text.primary` (`#17324D`)                                       | `text-foreground`                                                                                                            |
| `theme.palette.text.secondary` (`#5C6F82`)                                     | `text-muted-foreground`                                                                                                      |
| `theme.palette.background.default` (`#F2F2F2`)                                 | `bg-muted`                                                                                                                   |
| `theme.palette.background.paper`                                               | `bg-card` / `bg-background`                                                                                                  |
| `theme.palette.secondary.main` (`#00C5CA`)                                     | `bg-secondary text-secondary-foreground`                                                                                     |
| `theme.palette.error.*`                                                        | `text-destructive`, `bg-destructive/10`, `text-success-strong`… esiste anche `*-muted` e `*-strong` per success/warning/info |
| `theme.palette.divider` (`#E3E7EB`)                                            | `border-border`                                                                                                              |
| `theme.spacing(n)` (8px)                                                       | `p-{2n}` (griglia Tailwind 4px): `spacing(3)=24px` → `p-6`                                                                   |
| `theme.shape.radius.8`                                                         | `rounded-lg`                                                                                                                 |
| `theme.typography.h1…h6`, `body1`, `body2`, `caption`, `monospace`, `overline` | `text-h1…text-h6`, `text-body-lg`, `text-body`, `text-caption`, `text-mono`, `text-overline`                                 |
| `theme.palette.italia[i]`                                                      | `bg-italia-{50…900}` / `text-italia-*`                                                                                       |
| focus ring MUI                                                                 | utility `focus-ring` (oppure `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`)            |

## 3. Componenti

| Vecchio                                 | Nuovo                   | Stato          |
| --------------------------------------- | ----------------------- | -------------- |
| `MIButton`                              | `Button`                | ✅ disponibile |
| `MIIconButton`                          | `Button size="icon*"`   | ⏳             |
| `MIChip`                                | `Badge`                 | ⏳             |
| `MIAlert`                               | `Alert`                 | ⏳             |
| `MIBreadcrumbs`                         | `Breadcrumb`            | ⏳             |
| `MISpinner`                             | `Spinner`               | ⏳             |
| `MISnackbar`                            | `Sonner` (`toast()`)    | ⏳             |
| `MITooltip`                             | `Tooltip`               | ⏳             |
| `Tag` / `TagGroup`                      | `Badge` / `ToggleGroup` | ⏳             |
| `Autocomplete`                          | `Combobox`              | ⏳             |
| `MIStepper` / `MIWizard` / `MITimeline` | block                   | ⏳             |

> Le righe ⏳ diventano ✅ man mano che i componenti vengono portati. Non migrare un componente non ancora ✅: aspetta il port o contribuisci.

### `MIButton` → `Button`

**Prima**

```tsx
import { MIButton } from "mui-italia"

;<MIButton
  variant="contained"
  color="primary"
  size="medium"
  startIcon={<SaveIcon />}
  onClick={save}
>
  Salva
</MIButton>
```

**Dopo**

```tsx
import { Button } from "ui-italia/components/button"

;<Button variant="default" size="default" onClick={save}>
  <SaveIcon data-icon="inline-start" />
  Salva
</Button>
```

**Mapping props**

| `MIButton`                            | `Button`                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| `variant="contained"`                 | `variant="default"`                                                                    |
| `variant="outlined"`                  | `variant="outline"`                                                                    |
| `variant="text"`                      | `variant="ghost"`                                                                      |
| `color="error"`                       | `variant="destructive"`                                                                |
| `size="small" \| "medium" \| "large"` | `size="sm" \| "default" \| "lg"`                                                       |
| `startIcon`                           | figlio con `data-icon="inline-start"`                                                  |
| `endIcon`                             | figlio con `data-icon="inline-end"`                                                    |
| `href`                                | `<a className={buttonVariants(...)}>` (non `render={<a/>}`, sovrascriverebbe il ruolo) |
| `fullWidth`                           | `className="w-full"`                                                                   |
| `isLoading`                           | `disabled` + `aria-busy` (oppure `Spinner` quando disponibile)                         |
| `sx`                                  | classi Tailwind semantiche                                                             |

> Esiste uno **shim opzionale** `ui-italia-compat` con `MIButton` che accetta le vecchie props. Usalo solo durante la transizione:
>
> ```tsx
> import { MIButton } from "ui-italia-compat"
> ```
>
> Va rimosso a migrazione completata.

### Alert / Banner → `Alert`

| `mui-italia`         | `Alert` (`variant`) |
| -------------------- | ------------------- |
| `severity="error"`   | `destructive`       |
| `severity="success"` | `success`           |
| `severity="warning"` | `warning`           |
| `severity="info"`    | `info`              |
| neutro               | `default`           |

Il bordo sinistro colorato (4px) e l'ombra sono nel componente; comporre con `AlertTitle` / `AlertDescription` / `AlertAction`.

### Chip / Tag → `Badge`

| `mui-italia`                                 | `Badge` (`variant`)            |
| -------------------------------------------- | ------------------------------ |
| `MIChip color="primary"`                     | `default`                      |
| `MIChip color="secondary"`                   | `secondary`                    |
| `MIChip color="error"`                       | `destructive`                  |
| `Tag variant="success" / "info" / "warning"` | `success` / `info` / `warning` |
| `MIChip variant="outlined"`                  | `outline`                      |

### TextField → `Input` + `Label` + `Field`

`Input` è alto 48px, radius 6px, focus ring 2px. Associa sempre una `Label` (o il `Field` del registry) e usa `aria-invalid` per lo stato errore.

## 4. Verifica

```bash
# tipi
pnpm --filter <app> typecheck

# story + a11y (WCAG 2.2 AA, addon a11y in modalità error)
pnpm --filter ui-italia exec vitest --project storybook run

# visual regression self-hosted
pnpm --filter ui-italia test:visual
```

Criteri di accettazione della migrazione di un componente:

- [ ] nessun import `@mui/*` o `mui-italia` residuo nel file;
- [ ] nessuna prop `sx`/`style`;
- [ ] colori solo tramite token semantici;
- [ ] typecheck verde;
- [ ] story (se presente) verde, incluse le verifiche a11y.

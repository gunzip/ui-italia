# AGENTS.md

## Cosa è questo repo

Design system: porting di `mui-italia` su **shadcn/ui + Base UI**.
Monorepo pnpm + Turborepo.

- `packages/ui` (`ui-italia`) — componenti, token, stili, Storybook, registry shadcn.
- `packages/compat` (`ui-italia-compat`) — shim **opzionale** con i vecchi nomi MUI; temporaneo.
- `apps/playground` — app Vite che consuma `ui-italia` per test di integrazione.
- `docs/porting-plan.md` — **piano di porting**: leggilo prima di modifiche significative.
- `docs/migration-from-mui-italia.md` — guida di migrazione agent-oriented.

## Stack

React 19 · Vite 8 · TypeScript 6 · Tailwind v4 · `@base-ui/react` · shadcn `base-nova`
· Storybook 10.6 · Vitest 5 (browser) · ESLint 10 · pnpm 10.

## Comandi

```bash
pnpm dev                 # playground
pnpm --filter ui-italia storybook      # Storybook su :6006
pnpm --filter ui-italia typecheck
pnpm test                              # Storybook Test + a11y
pnpm --filter ui-italia test:visual    # visual regression (Playwright)
pnpm registry:build
pnpm lint
```

## Convenzioni componenti

- **Idiomatico shadcn/Base UI**, niente wrapper MUI-style, niente prop di stile (`sx`/`style`).
- Styling **solo** con token semantici (`bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`…). **Mai** colori hard-coded: il tema Italia vive in `packages/ui/src/styles/globals.css`.
- Composizione con sotto-componenti (`Card`/`CardHeader`/…), varianti con `cva`, merge classi con `cn` da `cn`, `data-slot` su ogni parte, ref forwarding.
- Base UI: polimorfismo con il prop `render`. Per i link usare `buttonVariants` + `<a>` (non `render={<a/>}` su `Button`).
- Accessibilità **WCAG 2.2 AA obbligatoria**: label associate, focus visibile, ruoli/`aria-*`, target ≥ 24px. Le storie devono passare `@storybook/addon-a11y` (impostato su `test: 'error'`).

## Storybook MCP (`storybook`)

Quando lavori su componenti UI, **usa gli strumenti MCP Storybook** prima di rispondere o agire:

- `docs-list` per l'elenco dei componenti documentati; `docs-show` per props ed esempi.
- **Non inventare mai props**: verifica che siano documentate o presenti in una story.
- `get-storybook-story-instructions` per le convenzioni delle story.
- `test-run` per eseguire i test (incluse le verifiche a11y) e correggere in autonomia.
- Il server richiede Storybook in esecuzione (`pnpm --filter ui-italia storybook` → `http://localhost:6006/mcp`).

## shadcn MCP (`shadcn`)

Usa il MCP `shadcn` per cercare/consultare/installare item dei registry (es. `@shadcn/button`) invece di scrivere markup a mano.

## Documentazione

- Piano: `docs/porting-plan.md`
- shadcn: <https://ui.shadcn.com/docs>
- Base UI: <https://base-ui.com>
- Storybook: <https://storybook.js.org/docs>

## Visual test

Le baseline fanno fede **su Linux (CI)** e sono committate. In locale `pnpm --filter ui-italia test:visual:update` genera baseline per la tua piattaforma (gitignorate). Dopo aver aggiunto/modificato story, lancia il workflow **Update visual baselines** su GitHub per aggiornare quelle Linux, altrimenti il job `visual` della CI fallisce.

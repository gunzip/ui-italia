# ui-italia

Design system: porting di `mui-italia` su **shadcn/ui + Base UI**.
Monorepo pnpm + Turborepo: `packages/ui` (`ui-italia`) + `apps/playground`.

> Piano completo: [`docs/porting-plan.md`](./docs/porting-plan.md).
> Migrazione da mui-italia: [`docs/migration-from-mui-italia.md`](./docs/migration-from-mui-italia.md).
> Convenzioni per agenti: [`AGENTS.md`](./AGENTS.md).

## Requisiti

Node ≥ 20, pnpm 10.

## Comandi

```bash
pnpm install
pnpm dev                                    # app playground
pnpm lint
pnpm typecheck
pnpm test                                   # Storybook Test + a11y (Vitest browser)
pnpm --filter ui-italia storybook           # Storybook su http://localhost:6006
pnpm --filter ui-italia build-storybook
pnpm --filter ui-italia test:visual         # visual regression self-hosted (Playwright)
pnpm --filter ui-italia test:visual:update  # rigenera le baseline (piattaforma locale)
pnpm registry:build                         # registry shadcn -> packages/ui/public/r
```

## Storybook e registry

- Storybook: <https://gunzip.github.io/ui-italia/>
- Registry: <https://gunzip.github.io/ui-italia/r/registry.json>

## Usare i componenti in un'app

Configura il registry in `components.json`:

```json
{
  "registries": {
    "@ui-italia": "https://gunzip.github.io/ui-italia/r/{name}.json"
  }
}
```

Poi installa i componenti nel tuo progetto:

```bash
pnpm dlx shadcn@latest add @ui-italia/theme @ui-italia/button
```

Oppure importali dal pacchetto:

```tsx
import { Button } from "ui-italia/components/button"
import "ui-italia/globals.css"
```

## Aggiungere componenti al monorepo

Esegui la CLI dalla radice (i componenti finiscono in `packages/ui/src/components`):

```bash
pnpm dlx shadcn@latest add <component> -c packages/ui
```

## Visual test

Le baseline fanno fede **su Linux (CI)** e sono committate. In locale `test:visual:update` genera baseline per la tua piattaforma (gitignorate). Dopo aver aggiunto o modificato story, lancia il workflow **Update visual baselines** su GitHub per aggiornare quelle Linux.

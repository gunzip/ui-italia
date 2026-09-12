# brand web design system

Porting di `mui-italia` su **shadcn/ui + Base UI**.
Monorepo pnpm + Turborepo: `packages/ui` (`ui-italia`) + `apps/playground`.

> Piano completo: [`docs/porting-plan.md`](./docs/porting-plan.md).
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
pnpm --filter ui-italia test:visual:update  # rigenera le baseline
pnpm registry:build                         # registry shadcn -> packages/ui/public/r
```

## Aggiungere componenti

Esegui la CLI dalla radice (i componenti finiscono in `packages/ui/src/components`):

```bash
pnpm dlx shadcn@latest add button -c packages/ui
```

## Usare i componenti

```tsx
import { Button } from "ui-italia/components/button"
```

Gli stili (Tailwind v4 + token Italia) vivono in `packages/ui/src/styles/globals.css`:

```tsx
import "ui-italia/globals.css"
```

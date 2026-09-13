# ui-italia

Design system: port of `mui-italia` to **shadcn/ui + Base UI**.
pnpm + Turborepo monorepo: `packages/ui` (`ui-italia`) + `apps/playground`.

> Full plan: [`docs/porting-plan.md`](./docs/porting-plan.md).
> Migration from mui-italia: [`docs/migration-from-mui-italia.md`](./docs/migration-from-mui-italia.md).
> Agent conventions: [`AGENTS.md`](./AGENTS.md).

## Requirements

Node ≥ 20, pnpm 10.

## Commands

```bash
pnpm install
pnpm dev                                    # app playground
pnpm lint
pnpm typecheck
pnpm test                                   # Storybook Test + a11y (Vitest browser)
pnpm --filter ui-italia storybook           # Storybook at http://localhost:6006
pnpm --filter ui-italia build-storybook
pnpm --filter ui-italia test:visual         # visual regression self-hosted (Playwright)
pnpm --filter ui-italia test:visual:update  # regenerate baselines (local platform)
pnpm registry:build                         # registry shadcn -> packages/ui/public/r
```

## Storybook and registry

- Storybook: <https://gunzip.github.io/ui-italia/>
- Registry: <https://gunzip.github.io/ui-italia/r/registry.json>

## Using the components in an app

Configure the registry in `components.json`:

```json
{
  "registries": {
    "@ui-italia": "https://gunzip.github.io/ui-italia/r/{name}.json"
  }
}
```

Then install the components in your project:

```bash
pnpm dlx shadcn@latest add @ui-italia/theme @ui-italia/button
```

Or import them from the package:

```tsx
import { Button } from "ui-italia/components/button"
import "ui-italia/globals.css"
```

## Adding components to the monorepo

Run the CLI from the root (components land in `packages/ui/src/components`):

```bash
pnpm dlx shadcn@latest add <component> -c packages/ui
```

## Visual test

The baselines are authoritative **on Linux (CI)** and are committed. Locally, `test:visual:update` generates baselines for your platform (gitignored). After adding or modifying a story, run the **Update visual baselines** workflow on GitHub to update the Linux ones.

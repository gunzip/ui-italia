# AGENTS.md

## What this repo is

Design system: port of `mui-italia` to **shadcn/ui + Base UI**.
pnpm + Turborepo monorepo.

- `packages/ui` (`ui-italia`) — components, tokens, styles, Storybook, shadcn registry.
- `packages/compat` (`ui-italia-compat`) — **optional** shim with the old MUI names; temporary.
- `apps/playground` — Vite app that consumes `ui-italia` for integration tests.
- `docs/porting-plan.md` — **porting plan**: read it before significant changes.
- `docs/migration-from-mui-italia.md` — agent-oriented migration guide.

## Stack

React 19 · Vite 8 · TypeScript 6 · Tailwind v4 · `@base-ui/react` · shadcn `base-nova`
· Storybook 10.6 · Vitest 5 (browser) · ESLint 10 · pnpm 10.

## Commands

```bash
pnpm dev                 # playground
pnpm --filter ui-italia storybook      # Storybook on :6006
pnpm --filter ui-italia typecheck
pnpm test                              # Storybook Test + a11y
pnpm --filter ui-italia test:visual    # visual regression (Playwright)
pnpm registry:build
pnpm lint
```

## Component conventions

- **Idiomatic shadcn/Base UI**, no MUI-style wrappers, no style props (`sx`/`style`).
- Styling **only** with semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`…). **Never** hard-coded colors: the Italia theme lives in `packages/ui/src/styles/globals.css`.
- Composition with sub-components (`Card`/`CardHeader`/…), variants with `cva`, class merging with `cn` from `cn`, `data-slot` on every part, ref forwarding.
- Base UI: polymorphism with the `render` prop. For links use `buttonVariants` + `<a>` (not `render={<a/>}` on `Button`).
- **WCAG 2.2 AA accessibility is mandatory**: associated labels, visible focus, roles/`aria-*`, targets ≥ 24px. Stories must pass `@storybook/addon-a11y` (set to `test: 'error'`).

## Storybook MCP (`storybook`)

When working on UI components, **use the Storybook MCP tools** before answering or acting:

- `docs-list` for the list of documented components; `docs-show` for props and examples.
- **Never invent props**: verify they are documented or present in a story.
- `get-storybook-story-instructions` for story conventions.
- `test-run` to run the tests (including a11y checks) and fix issues autonomously.
- The server requires Storybook to be running (`pnpm --filter ui-italia storybook` → `http://localhost:6006/mcp`).

## shadcn MCP (`shadcn`)

Use the `shadcn` MCP to search/consult/install registry items (e.g. `@shadcn/button`) instead of writing markup by hand.

## Documentation

- Plan: `docs/porting-plan.md`
- shadcn: <https://ui.shadcn.com/docs>
- Base UI: <https://base-ui.com>
- Storybook: <https://storybook.js.org/docs>

## Required providers

- `TooltipProvider` for tooltips (wrap it once at the root level).
- `<Toaster />` (from `sonner`) for toasts.
- `DirectionProvider` for directional support (optional, LTR by default).

## Visual test

The baselines are authoritative **on Linux (CI)** and are committed. Locally, `pnpm --filter ui-italia test:visual:update` generates baselines for your platform (gitignored). After adding/modifying a story, run the **Update visual baselines** workflow on GitHub to update the Linux ones, otherwise the CI `visual` job fails.

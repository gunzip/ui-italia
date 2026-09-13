#!/usr/bin/env node
/**
 * Regenerates the derived fields of every shadcn registry item:
 *
 * - `dependencies` — the npm packages the item's files actually import.
 * - `registryDependencies` — the sibling items the item imports, plus `theme`.
 * - `target` — the destination folder for the `icons`/`illustrations`/`assets`
 *   groups, so their `index.ts` files do not collide in a consumer app.
 *
 * Hand-authored fields (name, type, description, files[].path/type) are the
 * source of truth and are preserved. The computed fields are always rewritten,
 * so do not edit them by hand: run `pnpm registry:build`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, posix, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const registryPath = join(packageRoot, "registry.json")

/** Matches `import`/`export ... from "pkg"` and side-effect `import "pkg"`. */
const MODULE_RE =
  /(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s+)?["']([^"']+)["']/g

/** Packages provided by the consumer's app (peer deps), never installed. */
const IGNORED_PACKAGES = new Set(["react", "react-dom"])

/**
 * Curated illustrations exposed as individual registry items
 * (`illustration-<kebab>`), each bundling the shared `illustration` helper.
 */
const INDIVIDUAL_ILLUSTRATIONS = [
  "Completed",
  "DataSecurity",
  "EmailValidation",
  "Error",
  "InProgress",
  "Login",
  "MIError",
  "Push",
  "Quick",
]

function kebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
}

function targetGroup(itemName) {
  if (itemName === "icons" || itemName === "assets") return itemName
  if (itemName === "illustrations" || itemName.startsWith("illustration-"))
    return "illustrations"
  return null
}

const registry = JSON.parse(readFileSync(registryPath, "utf8"))

for (const name of INDIVIDUAL_ILLUSTRATIONS) {
  const itemName = `illustration-${kebab(name)}`
  if (registry.items.some((item) => item.name === itemName)) continue
  registry.items.push({
    name: itemName,
    type: "registry:component",
    description: `Italia illustration: ${name}.`,
    files: [
      { path: `src/illustrations/${name}.tsx`, type: "registry:component" },
      {
        path: "src/illustrations/illustration.tsx",
        type: "registry:component",
      },
    ],
  })
}

const itemNames = new Set(registry.items.map((item) => item.name))

/** file path -> set of item names that include it (files can be shared). */
const filesToItems = new Map()
for (const item of registry.items) {
  for (const file of item.files ?? []) {
    if (!filesToItems.has(file.path)) filesToItems.set(file.path, new Set())
    filesToItems.get(file.path).add(item.name)
  }
}

/**
 * Resolves an internal specifier to either a registry item (`item`) or a
 * concrete source file (`file`), so shared files (e.g. `illustrations.tsx`)
 * can be recognised as belonging to the current item.
 */
function resolveInternal(spec, fromFile) {
  if (spec.startsWith("ui-italia/")) {
    const rest = spec.slice("ui-italia/".length)
    if (rest === "lib/utils") return { item: "utils" }
    if (rest === "illustrations" || rest.startsWith("illustrations/"))
      return { item: "illustrations" }
    if (rest === "icons" || rest.startsWith("icons/")) return { item: "icons" }
    if (rest === "assets" || rest.startsWith("assets/"))
      return { item: "assets" }
    if (rest.startsWith("components/"))
      return { item: rest.slice("components/".length) }
    if (rest.startsWith("hooks/")) return { item: rest.slice("hooks/".length) }
    if (rest.startsWith("blocks/"))
      return { item: `block-${rest.slice("blocks/".length)}` }
    return null
  }

  if (spec.startsWith(".")) {
    const base = posix.normalize(posix.join(posix.dirname(fromFile), spec))
    for (const candidate of [
      base,
      `${base}.tsx`,
      `${base}.ts`,
      `${base}/index.tsx`,
      `${base}/index.ts`,
    ]) {
      if (filesToItems.has(candidate)) return { file: candidate }
    }
  }

  return null
}

function packageName(spec) {
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/")
  return spec.split("/")[0]
}

function collectDependencies(item) {
  const npm = new Set()
  const internal = new Set()

  for (const file of item.files ?? []) {
    if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(file.path)) continue
    const fullPath = join(packageRoot, file.path)
    if (!existsSync(fullPath)) continue

    const source = readFileSync(fullPath, "utf8")
    MODULE_RE.lastIndex = 0
    let match
    while ((match = MODULE_RE.exec(source))) {
      const spec = match[1]

      if (spec.startsWith(".") || spec.startsWith("ui-italia/")) {
        const ref = resolveInternal(spec, file.path)
        if (!ref) continue

        if (ref.item) {
          if (ref.item !== item.name && itemNames.has(ref.item)) {
            internal.add(ref.item)
          }
          continue
        }

        const owners = filesToItems.get(ref.file)
        // File included in the current item: internal, no registry dependency.
        if (owners?.has(item.name)) continue

        const candidates = [...(owners ?? [])].filter(
          (name) => name !== item.name && itemNames.has(name)
        )
        // Prefer the aggregate item over the individual illustration items.
        const dep =
          candidates.find((name) => !name.startsWith("illustration-")) ??
          candidates[0]
        if (dep) internal.add(dep)
        continue
      }

      const pkg = packageName(spec)
      if (IGNORED_PACKAGES.has(pkg)) continue
      // `cn` comes from the `utils` item, so depend on it instead of the npm package.
      if (pkg === "cn") {
        if (item.name === "utils") npm.add(pkg)
        else internal.add("utils")
        continue
      }
      npm.add(pkg)
    }
  }

  // Every visual item reads the Italia tokens from the `theme` item.
  if (item.type === "registry:ui" || item.type === "registry:component") {
    internal.add("theme")
  }

  return {
    dependencies: [...npm].sort(),
    registryDependencies: [...internal].sort(),
  }
}

function orderItem(item, { dependencies, registryDependencies }) {
  const next = {
    name: item.name,
    type: item.type,
  }
  if (item.description) next.description = item.description
  if (dependencies.length) next.dependencies = dependencies
  if (registryDependencies.length)
    next.registryDependencies = registryDependencies
  if (item.files) next.files = item.files
  for (const [key, value] of Object.entries(item)) {
    if (key === "dependencies" || key === "registryDependencies") continue
    if (!(key in next)) next[key] = value
  }
  return next
}

registry.items = registry.items.map((item) => {
  const group = targetGroup(item.name)
  if (group) {
    for (const file of item.files ?? []) {
      const relative = posix.relative(`src/${group}`, file.path)
      file.target = `~/components/ui-italia/${group}/${relative}`
    }
  }
  return orderItem(item, collectDependencies(item))
})

const { format } = await import("prettier")
const formatted = await format(JSON.stringify(registry), {
  filepath: registryPath,
})
writeFileSync(registryPath, formatted)

console.log(`✔ registry.json updated — ${registry.items.length} items.`)

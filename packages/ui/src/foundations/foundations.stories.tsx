import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Foundations/Design tokens",
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-16 w-full rounded-md border border-border"
        style={{ backgroundColor: value }}
      />
      <span className="text-caption-strong text-foreground">{name}</span>
      <span className="font-mono text-[0.75rem] text-muted-foreground">
        {value}
      </span>
    </div>
  )
}

const semantic = [
  ["background", "#ffffff"],
  ["foreground", "#17324d"],
  ["primary", "#0073e6"],
  ["primary-foreground", "#ffffff"],
  ["secondary", "#00c5ca"],
  ["secondary-foreground", "#17324d"],
  ["muted", "#f2f2f2"],
  ["muted-foreground", "#5c6f82"],
  ["accent", "#e3f2fd"],
  ["border", "#e3e7eb"],
  ["ring", "#0073e6"],
]

const status = [
  ["destructive", "#b02a2a"],
  ["destructive-muted", "#ffe0e0"],
  ["success", "#2e6b2c"],
  ["success-muted", "#e1f4e1"],
  ["warning", "#7a5c00"],
  ["warning-muted", "#fff5da"],
  ["info", "#17566e"],
  ["info-muted", "#e1f5fe"],
]

const italia = [
  ["italia-50", "#e3f2fd"],
  ["italia-100", "#bbdefb"],
  ["italia-200", "#90caf9"],
  ["italia-300", "#1976d2"],
  ["italia-400", "#42a5f5"],
  ["italia-500", "#0073e6"],
  ["italia-600", "#1e88e5"],
  ["italia-700", "#0059b2"],
  ["italia-800", "#1565c0"],
  ["italia-900", "#0d47a1"],
]

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-foreground">Semantic</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {semantic.map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-foreground">Status</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {status.map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-foreground">Italia</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-10">
          {italia.map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-headline text-foreground">Headline 58</p>
      <p className="text-h1 text-foreground">Heading 1</p>
      <p className="text-h2 text-foreground">Heading 2</p>
      <p className="text-h3 text-foreground">Heading 3</p>
      <p className="text-h4 text-foreground">Heading 4</p>
      <p className="text-h5 text-foreground">Heading 5</p>
      <p className="text-h6 text-foreground">Heading 6</p>
      <p className="text-body-lg text-foreground">
        Body large — 18px. The design system uses Titillium Web for text.
      </p>
      <p className="text-body text-foreground">
        Body — 16px. The design system uses Titillium Web for text.
      </p>
      <p className="text-caption text-muted-foreground">Caption — 14px.</p>
      <p className="text-caption-strong text-foreground">
        Caption semibold — 14px.
      </p>
      <p className="text-overline text-foreground">Overline</p>
      <p className="text-mono text-foreground">
        DM Mono 0123456789 — IBAN IT60X0542811101000000123456
      </p>
    </div>
  ),
}

export const RadiusAndElevation: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-foreground">Radius</h2>
        <div className="flex flex-wrap items-end gap-6">
          {[
            ["sm 4px", "rounded-sm"],
            ["md 6px", "rounded-md"],
            ["lg 8px", "rounded-lg"],
            ["xl 16px", "rounded-xl"],
            ["2xl 24px", "rounded-2xl"],
          ].map(([label, cls]) => (
            <div className="flex flex-col items-center gap-2" key={label}>
              <div
                className={`size-20 border-2 border-primary bg-accent ${cls}`}
              />
              <span className="text-caption text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h4 text-foreground">Elevation</h2>
        <div className="flex flex-wrap gap-8">
          {[
            ["shadow-elevation-4", "shadow-elevation-4"],
            ["shadow-elevation-8", "shadow-elevation-8"],
            ["shadow-elevation-16", "shadow-elevation-16"],
          ].map(([label, cls]) => (
            <div
              className={`flex h-28 w-56 items-center justify-center rounded-lg bg-card text-body text-card-foreground ${cls}`}
              key={label}
            >
              {label}
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}

export const Focus: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-body text-foreground">
        Tab through the elements: the focus ring is 2px with a 2px offset.
      </p>
      <div className="flex flex-wrap gap-4">
        <button className="h-12 focus-ring rounded-sm bg-primary px-6 font-semibold text-primary-foreground">
          Focus me
        </button>
        <button className="h-12 focus-ring rounded-sm border-2 border-primary px-6 font-semibold text-primary">
          Focus me
        </button>
        <a
          className="focus-ring rounded-sm p-1 font-semibold text-primary underline"
          href="#focus"
        >
          Link
        </a>
      </div>
    </div>
  ),
}

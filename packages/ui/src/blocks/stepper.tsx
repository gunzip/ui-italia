import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "cn"

export interface StepperStep {
  label: React.ReactNode
}

export interface StepperLocaleText {
  stepLabel?: (currentStep: number) => string
  stepOfLabel?: (currentStep: number, totalSteps: number) => string
}

interface StepperProps extends React.ComponentProps<"div"> {
  steps: StepperStep[]
  /** Zero-based index of the active step. */
  activeStep: number
  localeText?: StepperLocaleText
}

/**
 * Port of mui-italia `MIStepper`: horizontal numbered stepper on desktop,
 * circular progress on small screens (< lg).
 */
function Stepper({
  steps,
  activeStep,
  localeText,
  className,
  ...props
}: StepperProps) {
  const stepLabel = localeText?.stepLabel ?? ((n: number) => `Step ${n}`)
  const stepOfLabel =
    localeText?.stepOfLabel ??
    ((n: number, total: number) => `${n} of ${total}`)
  const total = steps.length

  return (
    <div data-slot="stepper" className={cn("w-full", className)} {...props}>
      {/* Desktop */}
      <ol role="list" className="hidden w-full lg:flex">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep
          const isActive = index === activeStep
          return (
            <li
              key={index}
              role="listitem"
              aria-current={isActive ? "step" : undefined}
              className="relative flex flex-1 flex-col items-center gap-2 text-center"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-4 right-1/2 left-[-50%] h-px -translate-y-1/2",
                    isActive || isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              ) : null}
              {index < total - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-4 right-[-50%] left-1/2 h-px -translate-y-1/2",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full text-caption font-semibold transition-colors",
                  isCompleted || isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckIcon aria-hidden="true" className="size-4" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "text-caption",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* Mobile */}
      <div className="flex items-center gap-4 lg:hidden">
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={activeStep + 1}
          aria-label={stepOfLabel(activeStep + 1, total)}
          className="relative size-12 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(var(--primary) ${
              ((activeStep + 1) / total) * 100
            }%, var(--border) 0)`,
          }}
        >
          <span className="absolute inset-[3px] flex items-center justify-center rounded-full bg-background text-xs text-foreground">
            {activeStep + 1}/{total}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-caption text-muted-foreground">
            {stepLabel(activeStep + 1)}
          </span>
          <span className="text-caption font-semibold text-foreground">
            {steps[activeStep]?.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export { Stepper }

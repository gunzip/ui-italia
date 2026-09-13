import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "ui-italia/components/button"
import { IllusCompleted } from "ui-italia/illustrations"
import { Stepper, type StepperLocaleText } from "./stepper"

export interface WizardStepProps {
  label?: React.ReactNode
  children: React.ReactNode
}

/** A wizard step; only its `label` is read by `Wizard` (renders its children). */
function WizardStep({ children }: WizardStepProps) {
  return <>{children}</>
}

export interface WizardFeedback {
  title: string
  content?: React.ReactNode
  buttonText: string
  onClick: () => void
  icon?: React.ReactNode
}

interface WizardProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Zero-based index of the active step. */
  activeStep: number
  onStepChange: (step: number) => void
  title: React.ReactNode
  children: React.ReactNode
  onExit?: () => void
  /** Intercepts "next"; call `next()` to advance. */
  onNext?: (next: () => void, step: number) => void
  /** Intercepts "previous"; call `previous()` to go back. */
  onPrevious?: (previous: () => void, step: number) => void
  /** Rendered once `activeStep` is past the last step. */
  feedback?: WizardFeedback
  localeText?: StepperLocaleText & {
    exitButton?: string
    previousButton?: string
    nextButton?: string
  }
}

/**
 * Port of mui-italia `MIWizard`: stepper + step container + navigation, with an
 * optional final feedback screen.
 */
function Wizard({
  activeStep,
  onStepChange,
  title,
  children,
  onExit,
  onNext,
  onPrevious,
  feedback,
  localeText,
  className,
  ...props
}: WizardProps) {
  const exitButton = localeText?.exitButton ?? "Exit"
  const previousButton = localeText?.previousButton ?? "Back"
  const nextButton = localeText?.nextButton ?? "Confirm"

  const items = React.Children.toArray(children)
  const steps = items
    .filter(
      (child): child is React.ReactElement<WizardStepProps> =>
        React.isValidElement(child) && child.type === WizardStep
    )
    .map((child) => ({ label: child.props.label }))

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) onStepChange(step)
  }

  if (activeStep >= items.length && feedback) {
    return (
      <div
        data-slot="wizard-feedback"
        className={cn(
          "flex min-h-[350px] flex-col items-center justify-center px-6 py-12 text-center",
          className
        )}
        {...props}
      >
        {feedback.icon ?? <IllusCompleted size={120} />}
        <h3 className="mt-8 mb-1 text-h4 text-foreground">{feedback.title}</h3>
        {feedback.content ? (
          <p className="mb-2 text-body text-muted-foreground">
            {feedback.content}
          </p>
        ) : null}
        <Button className="mt-4" onClick={feedback.onClick}>
          {feedback.buttonText}
        </Button>
      </div>
    )
  }

  return (
    <div
      data-slot="wizard"
      className={cn("flex flex-col items-center p-6", className)}
      {...props}
    >
      <div className="w-full max-w-4xl">
        <Button variant="link" onClick={onExit}>
          <ArrowLeftIcon data-icon="inline-start" />
          {exitButton}
        </Button>

        <div className="mt-4 mb-6 text-h5 text-foreground">{title}</div>

        {steps.length > 0 ? (
          <Stepper
            steps={steps}
            activeStep={activeStep}
            localeText={localeText}
          />
        ) : null}

        <div className="mt-6 mb-5 rounded-lg border border-border bg-card p-6">
          {items[activeStep]}
        </div>

        <div className="flex flex-col-reverse justify-between gap-4 md:flex-row">
          <Button
            variant="outline"
            onClick={() =>
              onPrevious
                ? onPrevious(() => goToStep(activeStep - 1), activeStep)
                : goToStep(activeStep - 1)
            }
          >
            {previousButton}
          </Button>
          <Button
            onClick={() =>
              onNext
                ? onNext(() => goToStep(activeStep + 1), activeStep)
                : goToStep(activeStep + 1)
            }
          >
            {nextButton}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Wizard, WizardStep }

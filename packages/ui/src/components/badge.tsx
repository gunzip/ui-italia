import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"
import type { ReactNode } from "react"

const badgeVariants = cva(
  "group/badge inline-flex h-auto w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[40px] border border-transparent px-2 py-[3px] text-xs leading-[1.5] font-semibold tracking-[0.5px] whitespace-normal transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
        primary: "bg-primary-50 text-primary-850",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary-dark",
        highlight: "bg-secondary-50 text-secondary-850",
        neutral: "bg-grey-300 text-foreground",
        destructive: "bg-error-100 text-error-850",
        success: "bg-success-muted text-success-strong",
        warning: "bg-warning-muted text-warning-strong",
        info: "bg-info-muted text-info-strong",
        outline:
          "border-foreground text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        "outline-primary": "border-primary-hover text-primary-hover",
        "outline-highlight": "border-secondary-850 text-secondary-850",
        "outline-success": "border-success-strong text-success-strong",
        "outline-warning": "border-warning-strong text-warning-strong",
        "outline-info": "border-info-strong text-info-strong",
        "outline-destructive": "border-destructive text-destructive",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary-text underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeProps = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Leading avatar/icon rendered before the label (`MIChip` `avatar`). */
    avatar?: ReactNode
    /** Renders a delete button after the label (`MIChip` `onDelete`). */
    onDelete?: () => void
    /** Accessible name for the delete button. */
    deleteAriaLabel?: string
  }

function Badge({
  className,
  variant = "default",
  avatar,
  onDelete,
  deleteAriaLabel = "Delete",
  children,
  render,
  ...props
}: BadgeProps) {
  const content = (
    <>
      {avatar ? (
        <span
          data-slot="badge-avatar"
          data-icon="inline-start"
          aria-hidden="true"
          className="flex size-6 shrink-0 items-center justify-center font-normal [&>img]:size-4 [&>img]:rounded-full [&>svg]:size-4!"
        >
          {avatar}
        </span>
      ) : null}
      {children}
      {onDelete ? (
        <button
          type="button"
          data-slot="badge-delete"
          data-icon="inline-end"
          aria-label={deleteAriaLabel}
          onClick={onDelete}
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary outline-none hover:bg-action-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&>svg]:size-3.5!"
        >
          <XIcon aria-hidden="true" />
        </button>
      ) : null}
    </>
  )

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        children: content,
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
export type { BadgeProps }

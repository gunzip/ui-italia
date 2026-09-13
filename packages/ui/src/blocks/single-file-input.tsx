import * as React from "react"
import {
  CircleAlertIcon,
  CloudUploadIcon,
  PaperclipIcon,
  XIcon,
} from "lucide-react"
import { cn } from "cn"

import { Button } from "ui-italia/components/button"
import { Label } from "ui-italia/components/label"
import { Progress } from "ui-italia/components/progress"

export type UploadStatus =
  "IDLE" | "LOADING" | "REJECTED" | "ERROR" | "SELECTED"

export interface SingleFileInputProps {
  value: File | null
  label?: string
  error?: boolean
  accept?: string[]
  loading?: boolean
  vertical?: boolean
  onFileSelected: (file: File) => void
  onFileRemoved?: (file: File) => void
  onFileRejected?: (file: File) => void
  dropzoneLabel: string
  dropzoneButton: string
  loadingLabel?: string
  rejectedLabel?: string
}

function truncateFileName(fileName: string) {
  const lastDot = fileName.lastIndexOf(".")
  if (lastDot <= 0) {
    return fileName.length >= 30 ? `${fileName.slice(0, 30)}...` : fileName
  }
  const name = fileName.slice(0, lastDot)
  const ext = fileName.slice(lastDot)
  return name.length >= 30 ? `${name.slice(0, 30)}...${ext}` : fileName
}

function isAccepted(type: string, accept?: string[]) {
  if (!accept) return true
  return accept.includes(type) || accept.includes(`${type.split("/")[0]}/*`)
}

function getStatus(
  file: File | null,
  loading: boolean,
  error: boolean,
  rejected: boolean
): UploadStatus {
  if (error) return "ERROR"
  if (loading) return "LOADING"
  if (rejected) return "REJECTED"
  if (!file) return "IDLE"
  return "SELECTED"
}

const containerByStatus: Record<UploadStatus, string> = {
  IDLE: "border-dashed border-primary bg-primary/5",
  LOADING: "border border-border bg-card",
  REJECTED: "border-dashed border-destructive bg-destructive/10",
  ERROR: "border-dashed border-destructive bg-destructive/10",
  SELECTED: "border border-primary bg-card px-6",
}

/**
 * Port of mui-italia `SingleFileInput`: drag&drop dropzone with accept
 * validation, loading and selected states.
 */
function SingleFileInput({
  value,
  label,
  error = false,
  accept,
  loading = false,
  vertical = false,
  onFileSelected,
  onFileRemoved,
  onFileRejected,
  dropzoneLabel,
  dropzoneButton,
  loadingLabel = "Caricamento in corso...",
  rejectedLabel,
}: SingleFileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isRejected, setIsRejected] = React.useState(false)
  const inputId = React.useId()

  const status = getStatus(value, loading, error, isRejected && !!rejectedLabel)
  const showDropzone =
    status === "IDLE" || status === "REJECTED" || status === "ERROR"
  const orientation = vertical
    ? "flex-col gap-2.5"
    : "flex-row gap-2.5 max-sm:flex-col max-sm:text-center"

  const pick = () => {
    setIsRejected(false)
    inputRef.current?.click()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return
    if (isAccepted(file.type, accept)) {
      onFileSelected(file)
    } else {
      setIsRejected(true)
      onFileRejected?.(file)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <Label
          htmlFor={inputId}
          className={error ? "text-destructive" : undefined}
        >
          {label}
        </Label>
      ) : null}

      <div
        className={cn(
          "flex min-h-20 w-full items-center justify-center rounded-md p-4",
          containerByStatus[status]
        )}
        onDragOver={(event) => {
          event.preventDefault()
          event.dataTransfer.dropEffect = "copy"
        }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept?.join(",")}
          className="sr-only"
          onChange={handleChange}
        />

        {showDropzone ? (
          <div
            className={cn(
              "flex flex-1 items-center justify-center",
              orientation
            )}
          >
            {status === "REJECTED" ? (
              <>
                <CircleAlertIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-destructive"
                />
                <span className="text-body text-destructive">
                  {rejectedLabel}
                </span>
              </>
            ) : (
              <>
                <CloudUploadIcon
                  aria-hidden="true"
                  className={cn(
                    "size-6 shrink-0",
                    status === "ERROR" ? "text-destructive" : "text-primary"
                  )}
                />
                <span className="text-body text-muted-foreground">
                  {dropzoneLabel}
                </span>
              </>
            )}
            <Button
              variant={
                status === "ERROR" || status === "REJECTED"
                  ? "destructive"
                  : "default"
              }
              size="sm"
              onClick={pick}
            >
              {dropzoneButton}
            </Button>
          </div>
        ) : null}

        {status === "LOADING" ? (
          <div className={cn("flex flex-1 items-center", orientation)}>
            <span className="text-body text-muted-foreground">
              {loadingLabel}
            </span>
            <Progress
              value={null}
              aria-label={loadingLabel}
              className="flex-1"
            />
          </div>
        ) : null}

        {status === "SELECTED" && value ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <PaperclipIcon
                aria-hidden="true"
                className="mr-2 size-5 shrink-0 text-primary"
              />
              <span className="text-body text-primary">
                {truncateFileName(value.name)}
              </span>
              <span className="ml-8 text-body font-semibold text-foreground">
                {(value.size / 1024).toFixed(2)} KB
              </span>
            </div>
            {onFileRemoved ? (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Rimuovi ${value.name}`}
                onClick={() => onFileRemoved(value)}
              >
                <XIcon aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { SingleFileInput }

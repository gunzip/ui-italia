import * as React from "react"
import { TriangleAlertIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Alert, AlertDescription } from "ui-italia/components/alert"
import { Button } from "ui-italia/components/button"
import { Dialog, DialogContent, DialogTitle } from "ui-italia/components/dialog"
import { Skeleton } from "ui-italia/components/skeleton"
import { Spinner } from "ui-italia/components/spinner"
import { IllusMIError } from "ui-italia/illustrations"

/** A SPID Identity Provider as returned by the OneIdentity registry. */
export interface IDP {
  entityID: string
  pointer: string
  status: "OK" | "WARNING" | "DANGER"
  idpSSOEndpoints: Record<string, string>
  certificates: string[]
  friendlyName: string
  active: boolean
}

const SPID_DISPLAY_NAME: Record<string, string> = {
  "https://posteid.poste.it": "Poste ID",
  "https://identity.infocert.it": "InfoCert ID",
  "https://loginspid.aruba.it": "Aruba ID",
  "https://id.lepida.it/idp/shibboleth": "Lepida ID",
  "https://identity.sieltecloud.it": "Sielte ID",
  "https://idp.namirialtsp.com/idp": "Namirial ID",
  "https://login.id.tim.it/affwebservices/public/saml2sso": "TIM id",
  "https://spid.register.it": "SpidItalia",
  "https://id.eht.eu": "Etna ID",
  "https://loginspid.infocamere.it": "ID InfoCamere",
  "https://idp.intesigroup.com": "Intesi Group SPID",
  "https://spid.teamsystem.com/idp": "TeamSystem ID",
  "https://idp.uat.oneid.pagopa.it": "INTERNAL IDP",
}

function getSpidDisplayName(idp: IDP) {
  return SPID_DISPLAY_NAME[idp.entityID] ?? idp.friendlyName
}

/**
 * Fisher–Yates shuffle over a copy of `list` (never mutates the input).
 *
 * The seed is fixed on purpose: the order stays intentionally non-alphabetical
 * (parity with `mui-italia`'s `shuffleList`) but is reproducible, so the visual
 * regression snapshots remain stable.
 */
function shuffleList<T>(list: readonly T[]): T[] {
  const result = [...list]
  let seed = 0x9e3779b9
  for (let i = result.length - 1; i > 0; i--) {
    seed = (seed + 0x6d2b79f5) | 0
    let t = seed
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    const j = ((t ^ (t >>> 14)) >>> 0) % (i + 1)
    const tmp = result[i]
    result[i] = result[j]
    result[j] = tmp
  }
  return result
}

const defaultTranslations = {
  title: "Accedi con SPID",
  closeButtonAriaLabel: "Chiudi",
  unavailableIdpWarning:
    "L'accesso tramite %s non è al momento disponibile, riprova più tardi o entra con un altro Identity Provider",
  error: {
    title: "Non riusciamo a caricare la lista",
    description: "Ti chiediamo di riprovare più tardi.",
    closeButton: "Chiudi",
  },
}

export interface SpidSelectOIDialogProps {
  /** Controls the visibility of the dialog. */
  show: boolean
  idps: IDP[]
  loading: boolean
  /** OneIdentity CDN base URL used to resolve each provider's logo. */
  oneIdentityCdnBaseUrl: string
  /** Forces the error state; also shown automatically when the list is empty. */
  error: boolean
  onClose: () => void
  onSelectIdp: (idp: IDP) => void
  onUnavailableIdpClick?: (idp: IDP) => void
  /** Partial overrides for the default Italian copy. */
  translationsMap?: Partial<typeof defaultTranslations>
}

/**
 * Port of mui-italia `MISpidSelectOIDialog`: SPID Identity Provider picker with
 * loading, error and "provider unavailable" states.
 */
function SpidSelectOIDialog({
  show,
  idps,
  loading,
  oneIdentityCdnBaseUrl,
  error,
  onClose,
  onSelectIdp,
  onUnavailableIdpClick,
  translationsMap,
}: SpidSelectOIDialogProps) {
  const t = { ...defaultTranslations, ...translationsMap }
  const contentRef = React.useRef<HTMLDivElement>(null)
  const shuffledIdps = React.useMemo(() => shuffleList(idps), [idps])
  const [authorizingEntityId, setAuthorizingEntityId] = React.useState<
    string | null
  >(null)
  const [unavailableIdp, setUnavailableIdp] = React.useState<string | null>(
    null
  )

  const hasError = error || (!loading && idps.length === 0)

  React.useEffect(() => {
    if (!show) {
      setAuthorizingEntityId(null)
      setUnavailableIdp(null)
    }
  }, [show])

  const handleClose = () => {
    if (!authorizingEntityId) onClose()
  }

  const handleSelect = (idp: IDP) => {
    if (!idp.active || idp.status !== "OK") {
      setUnavailableIdp(getSpidDisplayName(idp))
      contentRef.current?.scrollTo({ top: 0, behavior: "smooth" })
      onUnavailableIdpClick?.(idp)
      return
    }
    setUnavailableIdp(null)
    setAuthorizingEntityId(idp.entityID)
    onSelectIdp(idp)
  }

  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent
        ref={contentRef}
        tabIndex={0}
        showCloseButton={false}
        className="overflow-y-auto max-sm:inset-0 max-sm:h-dvh max-sm:max-h-none max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:content-start max-sm:rounded-none sm:max-h-[calc(100dvh-4rem)] sm:w-[458px] sm:max-w-[458px] lg:w-[640px] lg:max-w-[640px]"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <DialogTitle
            id="spid-select"
            className="text-[18px] leading-[1.5] font-bold sm:text-[24px]"
          >
            {t.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={t.closeButtonAriaLabel}
            disabled={Boolean(authorizingEntityId)}
            onClick={handleClose}
            className="text-foreground hover:text-foreground"
          >
            <XIcon aria-hidden="true" />
          </Button>
        </div>

        {unavailableIdp ? (
          <Alert
            variant="warning"
            appearance="filled"
            className="mb-4"
            data-testid="spid-select-unavailable-idp-alert"
          >
            <TriangleAlertIcon aria-hidden="true" className="size-6" />
            <AlertDescription>
              {t.unavailableIdpWarning.replace("%s", unavailableIdp)}
            </AlertDescription>
          </Alert>
        ) : null}

        {hasError ? (
          <div
            className="my-16 flex flex-col items-center gap-6 text-center"
            data-testid="spid-select-error-state"
          >
            <IllusMIError size={56} />
            <div>
              <p className="text-h4 font-bold text-foreground">
                {t.error.title}
              </p>
              <p className="text-body text-muted-foreground">
                {t.error.description}
              </p>
            </div>
            <Button
              onClick={handleClose}
              data-testid="spid-select-error-state-close-button"
            >
              {t.error.closeButton}
            </Button>
          </div>
        ) : (
          <ul className="flex flex-col" role="list">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <li key={`skeleton-${index}`} className="mb-2">
                    <div className="border-divider flex h-[60px] w-full items-center rounded-lg border px-4">
                      <Skeleton
                        className="h-4 w-60 rounded-lg"
                        data-testid={`spid-select-skeleton-${index}`}
                      />
                    </div>
                  </li>
                ))
              : shuffledIdps.map((idp) => {
                  const name = getSpidDisplayName(idp)
                  const isAuthorizing = authorizingEntityId === idp.entityID
                  return (
                    <li key={idp.entityID} className="mb-2">
                      <button
                        id={`spid-select-${idp.entityID}`}
                        type="button"
                        aria-label={name}
                        disabled={authorizingEntityId !== null}
                        onClick={() => handleSelect(idp)}
                        className={cn(
                          "border-divider flex h-[60px] w-full items-center justify-between gap-4 rounded-lg border px-4 text-left transition-colors",
                          "hover:bg-action-hover focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        )}
                      >
                        <span className="truncate text-caption font-medium text-muted-foreground uppercase">
                          {name}
                        </span>
                        <span aria-hidden="true" className="shrink-0">
                          {isAuthorizing ? (
                            <Spinner
                              className="size-6"
                              data-testid={`spid-select-${idp.entityID}-loading`}
                            />
                          ) : (
                            <img
                              alt=""
                              className="h-7 w-auto object-contain"
                              data-testid={`spid-select-${idp.entityID}-logo`}
                              src={`${oneIdentityCdnBaseUrl}/assets/idps/${btoa(
                                idp.entityID
                              )}.png`}
                            />
                          )}
                        </span>
                      </button>
                    </li>
                  )
                })}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { SpidSelectOIDialog }

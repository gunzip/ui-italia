import * as React from "react"
import { XIcon } from "lucide-react"
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
      <DialogContent showCloseButton={false} className="sm:max-w-[600px]!">
        <div className="mb-6 flex items-center justify-between gap-4">
          <DialogTitle id="spid-select" className="text-h6 font-bold">
            {t.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={t.closeButtonAriaLabel}
            disabled={Boolean(authorizingEntityId)}
            onClick={handleClose}
          >
            <XIcon aria-hidden="true" />
          </Button>
        </div>

        {unavailableIdp ? (
          <Alert variant="warning" className="mb-4">
            <AlertDescription>
              {t.unavailableIdpWarning.replace("%s", unavailableIdp)}
            </AlertDescription>
          </Alert>
        ) : null}

        {hasError ? (
          <div className="my-8 flex flex-col items-center gap-6 text-center">
            <IllusMIError size={56} />
            <div>
              <p className="text-h4 font-bold text-foreground">
                {t.error.title}
              </p>
              <p className="text-body text-muted-foreground">
                {t.error.description}
              </p>
            </div>
            <Button onClick={handleClose}>{t.error.closeButton}</Button>
          </div>
        ) : (
          <ul className="flex flex-col gap-2" role="list">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <li key={`skeleton-${index}`}>
                    <Skeleton className="h-14 w-full rounded-md" />
                  </li>
                ))
              : idps.map((idp) => {
                  const name = getSpidDisplayName(idp)
                  const isAuthorizing = authorizingEntityId === idp.entityID
                  return (
                    <li key={idp.entityID}>
                      <button
                        type="button"
                        aria-label={name}
                        disabled={authorizingEntityId !== null}
                        onClick={() => handleSelect(idp)}
                        className={cn(
                          "border-divider flex h-14 w-full items-center justify-between gap-4 rounded-md border px-4 text-left transition-colors",
                          "hover:bg-action-hover focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        )}
                      >
                        <span className="truncate text-caption font-medium tracking-[0.5px] text-muted-foreground uppercase">
                          {name}
                        </span>
                        <span aria-hidden="true" className="shrink-0">
                          {isAuthorizing ? (
                            <Spinner className="size-6" />
                          ) : (
                            <img
                              height={28}
                              alt=""
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

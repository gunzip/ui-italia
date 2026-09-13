import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "ui-italia/components/button"

import { SpidSelectOIDialog, type IDP } from "./spid-select-dialog"

const noop = () => {}

/** Same registry as `mui-italia`'s `IDPS_MOCK` (order preserved before shuffling). */
const IDPS_MOCK: IDP[] = (
  [
    ["https://loginspid.infocamere.it", "InfoCamere S.C.p.A."],
    ["https://idp.intesigroup.com", "Intesi Group S.p.A."],
    ["https://loginspid.aruba.it", "ArubaPEC S.p.A."],
    ["https://identity.sieltecloud.it", "Sielte S.p.A."],
    ["https://spid.register.it", "Register.it S.p.A."],
    ["https://spid.teamsystem.com/idp", "TeamSystem s.p.a."],
    ["https://idp.namirialtsp.com/idp", "Namirial"],
    ["https://posteid.poste.it", "Poste Italiane SpA"],
    ["https://identity.infocert.it", "InfoCert S.p.A."],
    ["https://id.eht.eu", "EtnaHitech S.C.p.A."],
    [
      "https://login.id.tim.it/affwebservices/public/saml2sso",
      "TI Trust Technologies srl",
    ],
    ["https://id.lepida.it/idp/shibboleth", "Lepida S.p.A."],
  ] as const
).map(([entityID, friendlyName]) => ({
  entityID,
  pointer: "LATEST_SPID",
  status: "OK" as const,
  idpSSOEndpoints: {},
  certificates: [],
  friendlyName,
  active: true,
}))

/** Same mock as `mui-italia`'s `MOCK_IDP_UNAVAILABLE` (non-`OK` status). */
const UNAVAILABLE_IDP: IDP = {
  entityID: "https://broken.idp.it",
  pointer: "LATEST_SPID",
  status: "WARNING",
  idpSSOEndpoints: {},
  certificates: [],
  friendlyName: "Broken IDP",
  active: true,
}

const meta = {
  title: "Blocks/SpidSelectOIDialog",
  component: SpidSelectOIDialog,
  parameters: {
    layout: "centered",
    docs: {
      // The dialog portals to `document.body`: isolate each doc preview in its
      // own iframe so it does not cover the whole Docs page.
      story: { inline: false, iframeHeight: 600 },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpidSelectOIDialog>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  show: true,
  idps: IDPS_MOCK,
  loading: false,
  oneIdentityCdnBaseUrl: "https://assets.oneid.pagopa.it",
  error: false,
  onClose: noop,
  onSelectIdp: noop,
}

/** Clicks a row without depending on mount timing (Base UI portals after commit). */
const openDialog = (canvasElement: HTMLElement) =>
  within(canvasElement.ownerDocument.body).findByRole("dialog")

export const Default: Story = {
  args: base,
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)

    // Title — 18px on mobile, 24px from `sm`; bold in both (`themeNext`).
    const title = dialog.querySelector(
      "[data-slot=dialog-title]"
    ) as HTMLElement
    const expectedTitle = window.innerWidth >= 640 ? "24px" : "18px"
    await expect(getComputedStyle(title).fontSize).toBe(expectedTitle)
    await expect(getComputedStyle(title).fontWeight).toBe("700")

    // Row — 60px tall, 8px radius (`SpidList.ListItemSx`).
    const row = dialog.querySelector("button[id]") as HTMLElement
    await expect(getComputedStyle(row).height).toBe("60px")
    await expect(getComputedStyle(row).borderRadius).toBe("8px")

    // Logo — constrained to 28px (Tailwind preflight would otherwise expand it).
    const logo = row.querySelector("img") as HTMLImageElement
    await expect(getComputedStyle(logo).height).toBe("28px")
  },
}

export const Loading: Story = {
  args: { ...base, idps: [], loading: true },
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)
    // Skeleton — 240x16 bar inside a bordered 60px row.
    const skeleton = dialog.querySelector(
      "[data-testid=spid-select-skeleton-0]"
    ) as HTMLElement
    await expect(getComputedStyle(skeleton).width).toBe("240px")
    await expect(getComputedStyle(skeleton).height).toBe("16px")
    await expect(
      getComputedStyle(skeleton.parentElement as HTMLElement).height
    ).toBe("60px")
  },
}

export const UnavailableIdp: Story = {
  args: { ...base, idps: [...IDPS_MOCK, UNAVAILABLE_IDP] },
}

export const UnavailableIdpSelected: Story = {
  args: { ...base, idps: [...IDPS_MOCK, UNAVAILABLE_IDP] },
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Broken IDP" })
    )
    const alert = await within(dialog).findByTestId(
      "spid-select-unavailable-idp-alert"
    )
    // `MIAlert` filled look (warning-100 surface, warning-500 border, warning-850 text/icon).
    await expect(getComputedStyle(alert).backgroundColor).toBe(
      "rgb(255, 245, 218)"
    )
    await expect(getComputedStyle(alert).borderTopColor).toBe(
      "rgb(255, 200, 36)"
    )
    const icon = alert.querySelector("svg") as SVGElement
    await expect(getComputedStyle(icon).color).toBe("rgb(97, 76, 21)")
  },
}

export const Authorizing: Story = {
  args: base,
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement)
    await userEvent.click(
      within(dialog).getByRole("button", { name: "ID InfoCamere" })
    )
    // The dialog locks (close button disabled) while the request is in flight.
    await waitFor(() => {
      expect(
        within(dialog).getByRole("button", { name: "Chiudi" })
      ).toBeDisabled()
    })
  },
}

export const CustomTranslations: Story = {
  args: {
    ...base,
    translationsMap: {
      title: "Login with SPID",
      closeButtonAriaLabel: "Close",
    },
  },
}

export const Interactive: Story = {
  args: base,
  render: function RenderWithState(args) {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Accedi con SPID</Button>
        <SpidSelectOIDialog
          {...args}
          show={open}
          onClose={() => setOpen(false)}
        />
      </>
    )
  },
}

export const NoIdpsError: Story = {
  args: { ...base, idps: [], error: true },
}

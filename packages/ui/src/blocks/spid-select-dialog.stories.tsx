import type { Meta, StoryObj } from "@storybook/react-vite"

import { SpidSelectOIDialog, type IDP } from "./spid-select-dialog"

const noop = () => {}

const idps: IDP[] = [
  {
    entityID: "https://posteid.poste.it",
    friendlyName: "Poste ID",
    pointer: "poste",
    status: "OK",
    active: true,
    idpSSOEndpoints: {},
    certificates: [],
  },
  {
    entityID: "https://identity.infocert.it",
    friendlyName: "InfoCert ID",
    pointer: "infocert",
    status: "OK",
    active: true,
    idpSSOEndpoints: {},
    certificates: [],
  },
  {
    entityID: "https://loginspid.aruba.it",
    friendlyName: "Aruba ID",
    pointer: "aruba",
    status: "OK",
    active: true,
    idpSSOEndpoints: {},
    certificates: [],
  },
  {
    entityID: "https://spid.teamsystem.com/idp",
    friendlyName: "TeamSystem ID",
    pointer: "teamsystem",
    status: "WARNING",
    active: true,
    idpSSOEndpoints: {},
    certificates: [],
  },
]

const meta = {
  title: "Blocks/SpidSelectOIDialog",
  component: SpidSelectOIDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SpidSelectOIDialog>

export default meta
type Story = StoryObj<typeof meta>

const base = {
  show: true,
  idps,
  loading: false,
  oneIdentityCdnBaseUrl: "https://assets.uat.oneid.pagopa.it",
  error: false,
  onClose: noop,
  onSelectIdp: noop,
}

export const Default: Story = {
  args: base,
}

export const Loading: Story = {
  args: { ...base, idps: [], loading: true },
}

export const Error: Story = {
  args: { ...base, idps: [], error: true },
}

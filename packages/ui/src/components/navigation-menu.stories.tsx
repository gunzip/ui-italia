import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu"

const meta = {
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    a11y: {
      // Base UI's portalled layers render `span[data-base-ui-focus-guard]`
      // with `aria-hidden="true" tabindex="0"` to trap and restore focus.
      // axe flags that combination, but it is the library's intended focus
      // management, not something the story markup controls.
      config: {
        rules: [{ id: "aria-hidden-focus", enabled: false }],
      },
    },
  },
  render: () => (
    <NavigationMenu aria-label="Navigazione principale">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servizi</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">Anagrafe</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Tributi</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Scuola</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Novità</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">Comunicati</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  Bandi e concorsi
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Documentazione</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.hover(canvas.getByRole("button", { name: "Servizi" }))
    // Portalled panel animates in; wait for the enter animation to finish.
    const body = within(canvasElement.ownerDocument.body)
    const link = await body.findByRole("link", { name: "Anagrafe" })
    await waitFor(() => expect(link).toBeVisible())
  },
}

export const SingleLevel: Story = {
  render: () => (
    <NavigationMenu aria-label="Navigazione principale">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Servizi</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Contatti</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

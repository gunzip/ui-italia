import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox"
import { Label } from "./label"

type Framework = { value: string; label: string }

const frameworks: Framework[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
]

function MultipleCombobox() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      multiple
      items={frameworks}
      defaultValue={[frameworks[0], frameworks[2]]}
    >
      <ComboboxChips ref={anchor} className="w-72">
        <ComboboxValue>
          {(values: Framework[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value.value} showRemove={false}>
                  {value.label}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="Framework selezionati" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Nessun framework trovato.</ComboboxEmpty>
        <ComboboxList aria-label="Suggerimenti">
          {(item: Framework) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const meta = {
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="combobox-framework">Framework</Label>
      <Combobox items={frameworks} defaultValue={frameworks[0]}>
        <ComboboxInput
          showTrigger={false}
          id="combobox-framework"
          className="w-full"
          placeholder="Cerca un framework"
        />
        <ComboboxContent>
          <ComboboxEmpty>Nessun framework trovato.</ComboboxEmpty>
          <ComboboxList aria-label="Suggerimenti">
            {(item: Framework) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("combobox", { name: "Framework" })
    await userEvent.click(input)
    // Portalled listbox animates in; wait for the enter animation first.
    const body = within(canvasElement.ownerDocument.body)
    const option = await body.findByRole("option", { name: "Svelte" })
    await waitFor(() => expect(option).toBeVisible())
    await userEvent.click(option)
    await expect(input).toHaveValue("Svelte")
  },
}

export const WithGroups: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="combobox-grouped">Framework</Label>
      <Combobox>
        <ComboboxInput
          showTrigger={false}
          id="combobox-grouped"
          className="w-full"
          placeholder="Cerca un framework"
        />
        <ComboboxContent>
          <ComboboxList aria-label="Suggerimenti">
            <ComboboxGroup>
              <ComboboxLabel>Frontend</ComboboxLabel>
              <ComboboxItem value="react">React</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
            </ComboboxGroup>
            <ComboboxGroup>
              <ComboboxLabel>Full-stack</ComboboxLabel>
              <ComboboxItem value="svelte">Svelte</ComboboxItem>
              <ComboboxItem value="angular">Angular</ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => <MultipleCombobox />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("combobox", { name: "Framework selezionati" })
    )
    // Portalled listbox animates in; wait for the enter animation first.
    const body = within(canvasElement.ownerDocument.body)
    const option = await body.findByRole("option", { name: "Vue" })
    await waitFor(() => expect(option).toBeVisible())
    await userEvent.click(option)
    await expect(
      canvas.getByText("Vue", { selector: '[data-slot="combobox-chip"]' })
    ).toBeVisible()
  },
}

export const Empty: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="combobox-empty">Framework</Label>
      <Combobox items={[] as Framework[]} defaultOpen>
        <ComboboxInput
          showTrigger={false}
          id="combobox-empty"
          className="w-full"
          placeholder="Cerca un framework"
        />
        <ComboboxContent>
          <ComboboxEmpty>Nessun framework trovato.</ComboboxEmpty>
          <ComboboxList aria-label="Suggerimenti">
            {(item: Framework) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="combobox-disabled">Framework</Label>
      <Combobox items={frameworks} defaultValue={frameworks[0]} disabled>
        <ComboboxInput
          showTrigger={false}
          id="combobox-disabled"
          className="w-full"
          placeholder="Cerca un framework"
        />
        <ComboboxContent>
          <ComboboxList aria-label="Suggerimenti">
            {(item: Framework) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}

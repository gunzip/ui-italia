import type { Meta, StoryObj } from "@storybook/react-vite"

import { LangSwitch } from "./lang-switch"

const meta = {
  title: "Blocks/LangSwitch",
  component: LangSwitch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LangSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Flat: Story = {
  args: {
    currentLangCode: "it",
    languages: { it: "Italiano", en: "English", de: "Deutsch" },
    onLanguageChanged: () => {},
  },
}

export const Nested: Story = {
  args: {
    currentLangCode: "it",
    languages: {
      it: { it: "Italiano", en: "Inglese" },
      en: { it: "Italian", en: "English" },
    },
    onLanguageChanged: () => {},
  },
}

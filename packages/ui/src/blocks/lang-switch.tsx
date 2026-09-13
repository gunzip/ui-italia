import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "ui-italia/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui-italia/components/dropdown-menu"

export type LangCode = "it" | "en" | "de" | "fr" | "sl"

export type LangLabels = Partial<Record<LangCode, string>> & { it: string }

export type Languages =
  (Partial<Record<LangCode, LangLabels>> & { it: LangLabels }) | LangLabels

function isFlatLanguages(languages: Languages): languages is LangLabels {
  return typeof languages.it === "string"
}

interface LangSwitchProps {
  currentLangCode?: LangCode
  languages: Languages
  onLanguageChanged: (newLang: LangCode) => void
}

/**
 * Port of mui-italia `LangSwitch`: language picker supporting a flat labels
 * map or per-language nested labels.
 */
function LangSwitch({
  currentLangCode = "it",
  languages,
  onLanguageChanged,
}: LangSwitchProps) {
  const flat = isFlatLanguages(languages)

  const getLabel = (langCode: LangCode): string => {
    if (flat) return languages[langCode] || languages.it
    const currentLangLabels = languages[currentLangCode] ?? languages.it
    return currentLangLabels[langCode] || languages.it.it
  }

  const codes = Object.keys(languages) as LangCode[]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="link"
            aria-label={`Seleziona lingua: ${getLabel(currentLangCode)}`}
          />
        }
      >
        {getLabel(currentLangCode)}
        <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {codes.map((code) => (
          <DropdownMenuItem
            key={code}
            lang={flat ? code : undefined}
            onClick={() => onLanguageChanged(code)}
          >
            {getLabel(code)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LangSwitch }

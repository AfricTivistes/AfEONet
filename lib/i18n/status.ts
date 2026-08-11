import { useTranslations } from "next-intl"
import type { CivicStatus } from "@/lib/countries"

/**
 * Localized counterparts of `statusLabel` / `statusDescription` from lib/countries.
 * Those two stay as plain functions for non-React callers; anything that renders
 * should use these so French pages don't fall back to the English wording.
 */
export function useStatusLabel() {
  const t = useTranslations("status")
  const tCommon = useTranslations("common")
  return (status: CivicStatus | null) => (status ? t(status) : tCommon("notAssessed"))
}

export function useStatusDescription() {
  const t = useTranslations("status.description")
  return (status: CivicStatus | null) => t(status ?? "unknown")
}

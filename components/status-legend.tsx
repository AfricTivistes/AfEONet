"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { statusClass, type CivicStatus } from "@/lib/countries"

// Canonical order, kept in sync with the CivicStatus enum in lib/countries.ts
// so the legend can never omit a status that the map/dashboard actually use.
const STATUS_ORDER: CivicStatus[] = ["open", "restricted", "obstructed", "repressed", "closed"]

interface StatusLegendProps {
  activeStatus?: CivicStatus | null
  onToggle?: (status: CivicStatus) => void
}

export function StatusLegend({ activeStatus, onToggle }: StatusLegendProps) {
  const t = useTranslations("status")
  const tCommon = useTranslations("common")

  const statuses = [
    ...STATUS_ORDER.map((status) => ({ key: status, status, name: t(status), cls: statusClass(status) })),
    { key: "unknown" as const, status: null, name: tCommon("notAssessed"), cls: statusClass(null) },
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">{t("legendTitle")}</h3>
        <div className="flex flex-wrap gap-3">
          {statuses.map((s) => {
            const interactive = onToggle && s.status !== null
            const isActive = activeStatus === s.status
            const isDimmed = activeStatus != null && !isActive
            const Tag = interactive ? "button" : "div"
            return (
              <Tag
                key={s.key}
                type={interactive ? "button" : undefined}
                aria-pressed={interactive ? isActive : undefined}
                onClick={interactive ? () => onToggle(s.status as CivicStatus) : undefined}
                className={`flex items-center gap-1.5 rounded px-1 -mx-1 transition-opacity ${
                  interactive ? "cursor-pointer hover:bg-secondary/10" : ""
                } ${isActive ? "ring-1 ring-primary" : ""} ${isDimmed ? "opacity-40" : ""}`}
              >
                <div className={`w-4 h-4 rounded-sm ${s.cls}`} />
                <span className="text-xs">{s.name}</span>
              </Tag>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

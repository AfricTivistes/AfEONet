"use client"

import { useMemo } from "react"
import { X } from "lucide-react"
import { ScoreBar } from "@/components/score-bar"
import { assessedCountries, statusFill, statusLabel, type CivicStatus } from "@/lib/countries"

interface CountryRankingsTableProps {
  activeStatus?: CivicStatus | null
  onToggleStatus?: (status: CivicStatus) => void
  onSelect?: (iso2: string) => void
  limit?: number
}

export function CountryRankingsTable({ activeStatus = null, onToggleStatus, onSelect, limit }: CountryRankingsTableProps) {
  const assessed = useMemo(() => assessedCountries().sort((a, b) => (b.composite ?? 0) - (a.composite ?? 0)), [])
  const filtered = useMemo(
    () => (activeStatus ? assessed.filter((c) => c.status === activeStatus) : assessed),
    [assessed, activeStatus],
  )
  const rows = limit != null ? filtered.slice(0, limit) : filtered

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-primary">
          Country Rankings (2025){activeStatus ? ` — ${statusLabel(activeStatus)}` : ""}
        </h2>
        {activeStatus && onToggleStatus && (
          <button
            onClick={() => onToggleStatus(activeStatus)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" /> Clear filter
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="text-left py-2 pr-4 font-medium">#</th>
              <th className="text-left py-2 pr-4 font-medium">Country</th>
              <th className="text-left py-2 pr-4 font-medium">Region</th>
              <th className="text-left py-2 pr-4 font-medium">Status</th>
              <th className="text-left py-2 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr
                key={c.iso2}
                className={`border-b border-primary/5 hover:bg-primary/5 ${onSelect ? "cursor-pointer" : ""}`}
                onClick={onSelect ? () => onSelect(c.iso2) : undefined}
              >
                <td className="py-2 pr-4 text-muted-foreground">{i + 1}</td>
                <td className="py-2 pr-4 font-medium">{c.name}</td>
                <td className="py-2 pr-4 text-muted-foreground">{c.region}</td>
                <td className="py-2 pr-4">
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-xs text-white"
                    style={{ backgroundColor: statusFill(c.status) }}
                  >
                    {statusLabel(c.status)}
                  </span>
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2 min-w-24">
                    <ScoreBar score={c.composite!} />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted-foreground">
                  No countries match this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

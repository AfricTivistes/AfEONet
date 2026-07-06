"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter, Link } from "@/lib/i18n/navigation"
import { useTranslations } from "next-intl"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts"
import { StatusLegend } from "@/components/status-legend"
import { AfricaMap } from "@/components/africa-map"
import { CountrySelector } from "@/components/country-selector"
import { ScoreBar } from "@/components/score-bar"
import { AverageScoresChart } from "@/components/average-scores-chart"
import { CountryRankingsTable } from "@/components/country-rankings-table"
import { DimensionsInfo } from "@/components/dimensions-info"
import { MethodologyInfo } from "@/components/methodology-info"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Globe, GitCompare, X, Shield, Unlock, AlertOctagon, Lock, Ban, LayoutGrid, BookOpen, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  assessedCountries,
  byIso2,
  statusLabel,
  statusFill,
  reportSlug,
  DIMENSION_LABELS,
  DIM_KEYS,
  DIM_SHORT,
  GLOBAL_AVERAGES,
  globalCompositeAverage,
  type Country,
  type CountryDimensions,
  type CivicStatus,
} from "@/lib/countries"

function toDimArray(dims: CountryDimensions, country: string, globalAvg?: boolean) {
  return DIM_KEYS.map((k) => ({
    dim: DIM_SHORT[k],
    fullLabel: DIMENSION_LABELS[k],
    score: dims[k],
    ...(globalAvg ? { global: GLOBAL_AVERAGES[k] } : {}),
  }))
}

function CountryDimensionPanel({ country }: { country: Country }) {
  if (!country.dimensions) return null
  const data = toDimArray(country.dimensions, country.name, true)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h3 className="text-lg font-bold text-primary">{country.name}</h3>
          <p className="text-sm text-muted-foreground">{country.region}</p>
        </div>
        <Badge
          className="ml-auto text-white"
          style={{ backgroundColor: statusFill(country.status) }}
        >
          {statusLabel(country.status)} — {country.composite}/10
        </Badge>
      </div>

      {country.notes && (
        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">{country.notes}</p>
      )}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11 }} />
            <Radar name={country.name} dataKey="score" stroke={statusFill(country.status)} fill={statusFill(country.status)} fillOpacity={0.3} />
            <Radar name="Africa avg." dataKey="global" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} strokeDasharray="4 2" />
            <Legend />
            <Tooltip formatter={(v) => `${v}/10`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {DIM_KEYS.map((k) => (
          <div key={k} className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <div>
              <p className="text-xs font-medium">{DIMENSION_LABELS[k]}</p>
              <ScoreBar score={country.dimensions![k]} />
            </div>
          </div>
        ))}
      </div>

      <Button asChild variant="outline" className="w-full border-primary/20 text-primary">
        <Link href={`/reports/${reportSlug(country)}`}>
          Full Report →
        </Link>
      </Button>
    </div>
  )
}

const STATUS_ICONS: Record<CivicStatus, LucideIcon> = {
  open: Unlock,
  restricted: Shield,
  obstructed: AlertOctagon,
  repressed: Lock,
  closed: Ban,
}

const STATUS_ORDER: CivicStatus[] = ["open", "restricted", "obstructed", "repressed", "closed"]

function SummarySheet({ activeStatus, onToggle }: { activeStatus: CivicStatus | null; onToggle: (status: CivicStatus) => void }) {
  const t = useTranslations("dashboard")
  const assessed = useMemo(() => assessedCountries(), [])
  const total = assessed.length

  // Grouped by each country's actual assessed status — the same canonical
  // CivicStatus enum used by the map and country pages, not a re-derived score band.
  const categories = useMemo(() => {
    const counts = new Map<CivicStatus, number>(STATUS_ORDER.map((s) => [s, 0]))
    for (const c of assessed) {
      if (c.status) counts.set(c.status, (counts.get(c.status) ?? 0) + 1)
    }

    return STATUS_ORDER
      .map((status) => ({
        key: status,
        status,
        label: statusLabel(status),
        icon: STATUS_ICONS[status],
        count: counts.get(status) ?? 0,
        pct: total > 0 ? Math.round(((counts.get(status) ?? 0) / total) * 100) : 0,
      }))
      .filter((cat) => cat.count > 0)
  }, [assessed, total])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-lg font-bold text-primary mb-1">{t("summary")}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t("summaryDesc")} ({total})</p>
        </div>
        <Button asChild variant="outline" size="sm" className="border-primary/20 text-primary text-xs">
          <Link href="/dashboard?view=methodology#scoring">{t("scoring")} →</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeStatus === cat.status
          const isDimmed = activeStatus !== null && !isActive
          return (
            <button
              key={cat.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onToggle(cat.status)}
              className={`bg-secondary/10 rounded-lg p-4 text-center space-y-2 transition-opacity cursor-pointer hover:bg-secondary/20 ${
                isActive ? "ring-2 ring-primary" : ""
              } ${isDimmed ? "opacity-40" : ""}`}
            >
              <div className="flex justify-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: statusFill(cat.status, 30) }}
                >
                  <Icon className="h-5 w-5" style={{ color: statusFill(cat.status) }} />
                </div>
              </div>
              <div className="text-2xl font-bold" style={{ color: statusFill(cat.status) }}>
                {cat.count}
              </div>
              <div className="text-xs text-muted-foreground">
                {cat.pct}% — {cat.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function GlobalView({
  onSelect,
  activeStatus,
  onToggleStatus,
}: {
  onSelect: (iso2: string) => void
  activeStatus: CivicStatus | null
  onToggleStatus: (status: CivicStatus) => void
}) {
  return (
    <div className="space-y-8">
      <SummarySheet activeStatus={activeStatus} onToggle={onToggleStatus} />
      <AverageScoresChart />
      <CountryRankingsTable activeStatus={activeStatus} onToggleStatus={onToggleStatus} onSelect={onSelect} />
    </div>
  )
}

function ComparisonView({ countryA, countryB, onSelectA, onSelectB }: {
  countryA: string | null
  countryB: string | null
  onSelectA: (v: string | null) => void
  onSelectB: (v: string | null) => void
}) {
  const t = useTranslations("comparison")
  const a = countryA ? byIso2(countryA) : null
  const b = countryB ? byIso2(countryB) : null

  const chartData = a?.dimensions && b?.dimensions
    ? DIM_KEYS.map((k) => ({
        dim: DIM_SHORT[k],
        [a.name]: a.dimensions![k],
        [b.name]: b.dimensions![k],
      }))
    : []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">{t("countryA")}</label>
          <CountrySelector value={countryA ?? undefined} onSelect={(v) => onSelectA(v === countryA ? null : v)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">{t("countryB")}</label>
          <CountrySelector value={countryB ?? undefined} onSelect={(v) => onSelectB(v === countryB ? null : v)} />
        </div>
      </div>

      {a && b && a.dimensions && b.dimensions ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {[a, b].map((c) => (
              <div key={c.iso2} className="bg-primary/5 rounded-lg p-4">
                <h3 className="font-bold text-primary">{c.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{c.region}</p>
                <Badge
                  className="text-white text-xs"
                  style={{ backgroundColor: statusFill(c.status) }}
                >
                  {statusLabel(c.status)} — {c.composite}/10
                </Badge>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 60, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="dim" tick={{ fontSize: 11 }} width={60} />
                  <Tooltip formatter={(v) => `${v}/10`} />
                  <Legend />
                  <Bar dataKey={a.name} fill={statusFill(a.status)} radius={[0, 4, 4, 0]} />
                  <Bar dataKey={b.name} fill={statusFill(b.status)} radius={[0, 4, 4, 0]} fillOpacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[a, b].map((c) => (
              <div key={c.iso2} className="space-y-2">
                <h4 className="text-sm font-semibold text-primary">{c.name}</h4>
                {DIM_KEYS.map((k) => (
                  <div key={k}>
                    <p className="text-xs text-muted-foreground">{DIMENSION_LABELS[k]}</p>
                    <ScoreBar score={c.dimensions![k]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {t("selectPrompt")}
        </div>
      )}
    </div>
  )
}

export default function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeTab = searchParams.get("view") ?? "global"
  const selectedCountry = searchParams.get("country")
  const compareCountry = searchParams.get("compare")
  const statusParam = searchParams.get("status")
  const activeStatus: CivicStatus | null = statusParam && (STATUS_ORDER as string[]).includes(statusParam) ? (statusParam as CivicStatus) : null

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.replace(`/dashboard?${params.toString()}`, { scroll: false })
  }

  function setTab(tab: string) { setParam("view", tab) }
  function setCountry(v: string | null) { setParam("country", v) }
  function setCompare(v: string | null) { setParam("compare", v) }
  function toggleStatus(status: CivicStatus) { setParam("status", activeStatus === status ? null : status) }

  const selectedCountryData = selectedCountry ? byIso2(selectedCountry) : null

  const TABS = [
    { id: "global",      label: "Global View",  icon: Globe },
    { id: "comparison",  label: "Comparison",   icon: GitCompare },
    { id: "dimensions",  label: "Dimensions",   icon: LayoutGrid },
    { id: "methodology", label: "Methodology",  icon: BookOpen },
  ]

  const t = useTranslations("dashboard")
  
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-primary-foreground/80 max-w-2xl mt-2">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <div className="container py-8">
        <Alert className="border-none bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>2025 Data</AlertTitle>
          <AlertDescription>
            Scores are estimates from the AfEONet 2025 report. Verify exact values with the AfEONet research team.
          </AlertDescription>
        </Alert>

        {/* Map + sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-1">Civic Space Map</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              {selectedCountryData
                ? <>Selected: <span className="font-medium text-foreground">{selectedCountryData.name}</span> ({selectedCountryData.region})</>
                : "Click a country to see details"}
            </p>
            <AfricaMap selectedIso2={selectedCountry} onSelectCountry={setCountry} statusFilter={activeStatus} />
            <div className="mt-6 bg-secondary/10 p-4 rounded-lg">
              <StatusLegend activeStatus={activeStatus} onToggle={toggleStatus} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            {selectedCountryData?.dimensions ? (
              <CountryDimensionPanel country={selectedCountryData} />
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-primary">Select Country</h2>
                <CountrySelector value={selectedCountry ?? undefined} onSelect={(v) => setCountry(v === selectedCountry ? null : v)} />
                {selectedCountry && (
                  <button
                    onClick={() => setCountry(null)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" /> Clear selection
                  </button>
                )}
                <div className="pt-4 border-t border-primary/10 text-sm text-muted-foreground space-y-1">
                  <p><strong>{assessedCountries().length}</strong> countries assessed</p>
                  <p><strong>{DIM_KEYS.length}</strong> dimensions evaluated</p>
                  <p>Composite avg: <strong>{globalCompositeAverage()}/10</strong></p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden mb-8">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`py-3 px-6 text-center flex-1 flex items-center justify-center gap-2 transition-colors ${
                activeTab === id ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              onClick={() => setTab(id)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "global" && (
          <GlobalView onSelect={setCountry} activeStatus={activeStatus} onToggleStatus={toggleStatus} />
        )}

        {activeTab === "comparison" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <ComparisonView
              countryA={selectedCountry}
              countryB={compareCountry}
              onSelectA={setCountry}
              onSelectB={setCompare}
            />
          </div>
        )}

        {activeTab === "dimensions" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <DimensionsInfo />
          </div>
        )}

        {activeTab === "methodology" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <MethodologyInfo />
          </div>
        )}
      </div>
    </div>
  )
}

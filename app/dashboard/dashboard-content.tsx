"use client"

import { useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell,
} from "recharts"
import { StatusLegend } from "@/components/status-legend"
import { AfricaMap } from "@/components/africa-map"
import { CountrySelector } from "@/components/country-selector"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Globe, GitCompare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  assessedCountries,
  byIso2,
  statusLabel,
  DIMENSION_LABELS,
  GLOBAL_AVERAGES,
  type Country,
  type CountryDimensions,
} from "@/lib/countries"

const STATUS_COLORS: Record<string, string> = {
  open:       "hsl(120 100% 35%)",
  restricted: "hsl(80 80% 40%)",
  narrowed:   "hsl(45 100% 50%)",
  obstructed: "hsl(30 100% 50%)",
  repressed:  "hsl(30 100% 30%)",
  closed:     "hsl(0 100% 50%)",
}

const DIM_KEYS = Object.keys(DIMENSION_LABELS) as (keyof CountryDimensions)[]
const DIM_SHORT: Record<keyof CountryDimensions, string> = {
  regulatory:       "Regulatory",
  administrative:   "Admin.",
  embRelationship:  "EMB",
  security:         "Security",
  dataAccess:       "Data",
  funding:          "Funding",
  dialogue:         "Dialogue",
  perception:       "Perception",
}

function toDimArray(dims: CountryDimensions, country: string, globalAvg?: boolean) {
  return DIM_KEYS.map((k) => ({
    dim: DIM_SHORT[k],
    fullLabel: DIMENSION_LABELS[k],
    score: dims[k],
    ...(globalAvg ? { global: GLOBAL_AVERAGES[k] } : {}),
  }))
}

function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100
  const color = score >= 7 ? "bg-green-500" : score >= 5 ? "bg-yellow-500" : score >= 3 ? "bg-orange-500" : "bg-red-500"
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono w-6 text-right">{score}</span>
    </div>
  )
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
          style={{ backgroundColor: STATUS_COLORS[country.status ?? ""] ?? "#999" }}
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
            <Radar name={country.name} dataKey="score" stroke={STATUS_COLORS[country.status ?? ""] ?? "#888"} fill={STATUS_COLORS[country.status ?? ""] ?? "#888"} fillOpacity={0.3} />
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
        <Link href={`/reports/${country.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-2025`}>
          Full Report →
        </Link>
      </Button>
    </div>
  )
}

function GlobalView({ onSelect }: { onSelect: (iso2: string) => void }) {
  const assessed = useMemo(() => assessedCountries().sort((a, b) => (b.composite ?? 0) - (a.composite ?? 0)), [])

  const globalChartData = DIM_KEYS.map((k) => ({
    dim: DIM_SHORT[k],
    score: GLOBAL_AVERAGES[k],
  }))

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-1">Average Scores — 8 Dimensions (21 countries)</h2>
        <p className="text-sm text-muted-foreground mb-4">Global composite: <strong>5.2/10</strong></p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={globalChartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="dim" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `${v}/10`} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {globalChartData.map((entry) => (
                  <Cell
                    key={entry.dim}
                    fill={entry.score >= 7 ? "hsl(120 100% 35%)" : entry.score >= 5 ? "hsl(45 100% 50%)" : entry.score >= 3 ? "hsl(30 100% 50%)" : "hsl(0 100% 50%)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary mb-4">Country Rankings (2025)</h2>
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
              {assessed.map((c, i) => (
                <tr
                  key={c.iso2}
                  className="border-b border-primary/5 hover:bg-primary/5 cursor-pointer"
                  onClick={() => onSelect(c.iso2)}
                >
                  <td className="py-2 pr-4 text-muted-foreground">{i + 1}</td>
                  <td className="py-2 pr-4 font-medium">{c.name}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{c.region}</td>
                  <td className="py-2 pr-4">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs text-white"
                      style={{ backgroundColor: STATUS_COLORS[c.status ?? ""] ?? "#999" }}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ComparisonView({ countryA, countryB, onSelectA, onSelectB }: {
  countryA: string | null
  countryB: string | null
  onSelectA: (v: string | null) => void
  onSelectB: (v: string | null) => void
}) {
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
          <label className="text-sm font-medium mb-1 block">Country A</label>
          <CountrySelector value={countryA ?? undefined} onSelect={(v) => onSelectA(v === countryA ? null : v)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Country B</label>
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
                  style={{ backgroundColor: STATUS_COLORS[c.status ?? ""] ?? "#999" }}
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
                  <Bar dataKey={a.name} fill={STATUS_COLORS[a.status ?? ""] ?? "#888"} radius={[0, 4, 4, 0]} />
                  <Bar dataKey={b.name} fill={STATUS_COLORS[b.status ?? ""] ?? "#aaa"} radius={[0, 4, 4, 0]} fillOpacity={0.7} />
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
          Select two assessed countries to compare their dimension scores.
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

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.replace(`/dashboard?${params.toString()}`, { scroll: false })
  }

  function setTab(tab: string) { setParam("view", tab) }
  function setCountry(v: string | null) { setParam("country", v) }
  function setCompare(v: string | null) { setParam("compare", v) }

  const selectedCountryData = selectedCountry ? byIso2(selectedCountry) : null

  const TABS = [
    { id: "global",     label: "Global View", icon: Globe },
    { id: "comparison", label: "Comparison",  icon: GitCompare },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tight">Civic Space Dashboard</h1>
          <p className="text-primary-foreground/80 max-w-2xl mt-2">
            2025 AfEONet assessment — 21 countries, 8 dimensions. Source: Abel Eseru, Eyes on the Ballot Watchers.
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
            <AfricaMap selectedIso2={selectedCountry} onSelectCountry={setCountry} />
            <div className="mt-6 bg-secondary/10 p-4 rounded-lg">
              <StatusLegend />
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
                  <p><strong>21</strong> countries assessed</p>
                  <p><strong>8</strong> dimensions evaluated</p>
                  <p>Composite avg: <strong>5.2/10</strong></p>
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

        {activeTab === "global" && <GlobalView onSelect={setCountry} />}

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
      </div>
    </div>
  )
}

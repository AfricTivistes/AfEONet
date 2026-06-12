"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { Card, CardContent } from "@/components/ui/card"
import {
  countries,
  byIsoNum,
  byRegion,
  statusClass,
  statusLabel,
  statusDescription,
  REGIONS,
  type CivicStatus,
} from "@/lib/countries"

// Status fill colors (HSL values matching globals.css)
const STATUS_FILL: Record<CivicStatus | "unknown", string> = {
  open:        "hsl(120 100% 35%)",
  restricted:  "hsl(80 80% 40%)",
  narrowed:    "hsl(45 100% 50%)",
  obstructed:  "hsl(30 100% 50%)",
  repressed:   "hsl(30 100% 30%)",
  closed:      "hsl(0 100% 50%)",
  unknown:     "hsl(220 9% 75%)",
}

const HOVER_FILL: Record<CivicStatus | "unknown", string> = {
  open:        "hsl(120 100% 28%)",
  restricted:  "hsl(80 80% 32%)",
  narrowed:    "hsl(45 100% 40%)",
  obstructed:  "hsl(30 100% 40%)",
  repressed:   "hsl(30 100% 22%)",
  closed:      "hsl(0 100% 40%)",
  unknown:     "hsl(220 9% 60%)",
}

// Numeric ISO IDs that belong to Africa (our 44 mappable countries + others in topo)
const AFRICA_ISO_NUMS = new Set(countries.map((c) => c.isoNum))

function statusKey(status: CivicStatus | null): CivicStatus | "unknown" {
  return status ?? "unknown"
}

interface AfricaMapProps {
  selectedIso2?: string | null
  onSelectCountry?: (iso2: string | null) => void
  onCountryClick?: (iso2: string) => void
}

export function AfricaMap({ selectedIso2: controlledIso2, onSelectCountry, onCountryClick }: AfricaMapProps) {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const [internalSelected, setInternalSelected] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ name: string; status: CivicStatus | null; x: number; y: number } | null>(null)

  const isControlled = controlledIso2 !== undefined
  const selectedIso2 = isControlled ? controlledIso2 : internalSelected

  const handleClick = useCallback(
    (iso2: string | null) => {
      if (onCountryClick && iso2) {
        onCountryClick(iso2)
        return
      }
      if (isControlled) {
        onSelectCountry?.(iso2 === selectedIso2 ? null : iso2)
      } else {
        setInternalSelected((prev) => (prev === iso2 ? null : iso2))
      }
    },
    [isControlled, onSelectCountry, selectedIso2, onCountryClick],
  )

  const selectedCountry = selectedIso2 ? countries.find((c) => c.iso2 === selectedIso2) : null

  return (
    <Card className="w-full border-primary/20 relative">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4 text-primary">Civic Space Status in Africa</h3>

        {/* Interactive choropleth map */}
        <div className="w-full rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900" ref={mapRef}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 380, center: [22, 2] }}
            viewBox="0 0 800 620"
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography="/data/world-110m.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isoNum = String(geo.id)

                  // Hide non-African countries (render as very light background)
                  if (!AFRICA_ISO_NUMS.has(isoNum)) {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(220 20% 92%)"
                        stroke="hsl(220 20% 85%)"
                        strokeWidth={0.5}
                        style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      />
                    )
                  }

                  const country = byIsoNum(isoNum)
                  const key = statusKey(country?.status ?? null)
                  const isSelected = country?.iso2 === selectedIso2

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isSelected ? HOVER_FILL[key] : STATUS_FILL[key]}
                      stroke="white"
                      strokeWidth={0.8}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: HOVER_FILL[key], outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(e) => {
                        if (!country) return
                        const rect = mapRef.current?.getBoundingClientRect()
                        const svgRect = (e.target as SVGElement).getBoundingClientRect()
                        if (rect && svgRect) {
                          setTooltip({
                            name: country.name,
                            status: country.status,
                            x: svgRect.left - rect.left + svgRect.width / 2,
                            y: svgRect.top - rect.top - 10,
                          })
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={() => country && handleClick(country.iso2)}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* Hover tooltip (positioned near cursor) */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm shadow-lg border"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="font-medium">{tooltip.name}</span>
            <span className="opacity-80 ml-2">— {statusLabel(tooltip.status)}</span>
          </div>
        )}

        {/* Selected country detail panel */}
        {selectedCountry && (
          <div className="mt-4 p-4 border rounded-lg bg-background/80">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-md flex-shrink-0 ${statusClass(selectedCountry.status)} flex items-center justify-center font-bold text-lg ${
                  selectedCountry.status === "narrowed" ? "text-black" : "text-white"
                }`}
              >
                {selectedCountry.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-lg text-primary">{selectedCountry.name}</h4>
                <p className="text-xs text-muted-foreground">{selectedCountry.region}</p>
                <div className="flex items-center mt-1">
                  <div className={`w-3 h-3 rounded-full ${statusClass(selectedCountry.status)} mr-2`} />
                  <span className="font-medium text-sm">{statusLabel(selectedCountry.status)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {statusDescription(selectedCountry.status)}
                </p>
                <button
                  className="mt-3 text-xs text-muted-foreground underline hover:text-foreground"
                  onClick={() => handleClick(selectedCountry.iso2)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Region grid fallback (accessible + mobile) */}
        <div className="mt-6 space-y-6">
          {REGIONS.map((region) => (
            <div key={region}>
              <h4 className="font-medium text-primary mb-3 flex items-center text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
                {region}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {byRegion(region).map((country) => (
                  <a
                    key={country.iso2}
                    href={onCountryClick ? `#` : `/dashboard?view=country&country=${country.iso2}`}
                    onClick={(e) => {
                      if (onCountryClick) {
                        e.preventDefault()
                        onCountryClick(country.iso2)
                      }
                    }}
                    className={`${statusClass(country.status)} p-2 rounded-md text-center text-xs font-medium transition-opacity hover:opacity-80 ${
                      selectedIso2 === country.iso2 ? "ring-2 ring-primary ring-offset-1" : ""
                    }`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: country.status === "narrowed" ? "#000" : "#fff",
                    }}
                  >
                    {country.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Comoros, Mauritius and Seychelles are shown in the region grid above (too small for map resolution).
        </p>
      </CardContent>
    </Card>
  )
}
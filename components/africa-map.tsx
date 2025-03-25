"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

// Sample data for demonstration
const countryData: Record<string, { status: string; name: string }> = {
  dz: { status: "narrowed", name: "Algeria" },
  eg: { status: "closed", name: "Egypt" },
  ng: { status: "obstructed", name: "Nigeria" },
  za: { status: "narrowed", name: "South Africa" },
  ke: { status: "repressed", name: "Kenya" },
  gh: { status: "open", name: "Ghana" },
  ci: { status: "repressed", name: "Ivory Coast" },
  cm: { status: "repressed", name: "Cameroon" },
  ml: { status: "closed", name: "Mali" },
  bf: { status: "closed", name: "Burkina Faso" },
  tz: { status: "obstructed", name: "Tanzania" },
  et: { status: "repressed", name: "Ethiopia" },
  cd: { status: "closed", name: "DR Congo" },
  ma: { status: "repressed", name: "Morocco" },
  tn: { status: "narrowed", name: "Tunisia" },
  ug: { status: "repressed", name: "Uganda" },
  rw: { status: "repressed", name: "Rwanda" },
  zw: { status: "repressed", name: "Zimbabwe" },
  mz: { status: "obstructed", name: "Mozambique" },
  sn: { status: "open", name: "Senegal" },
}

// Grouping countries by region for better visual organization
const regions = [
  {
    name: "West Africa",
    countries: ["sn", "gh", "ng", "ci", "ml", "bf"],
  },
  {
    name: "East Africa",
    countries: ["ke", "tz", "et", "ug", "rw"],
  },
  {
    name: "North Africa",
    countries: ["eg", "dz", "ma", "tn"],
  },
  {
    name: "Central Africa",
    countries: ["cm", "cd"],
  },
  {
    name: "Southern Africa",
    countries: ["za", "zw", "mz"],
  },
]

export function AfricaMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Open/free/secure"
      case "narrowed":
        return "Narrowed"
      case "obstructed":
        return "Obstructed"
      case "repressed":
        return "Repressed/threatened"
      case "closed":
        return "Closed"
      default:
        return status
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "open":
        return "Civic space is fully respected and protected"
      case "narrowed":
        return "Civic space is experiencing some restrictions"
      case "obstructed":
        return "Civic space faces significant obstacles"
      case "repressed":
        return "Civic space is severely limited with active threats"
      case "closed":
        return "Civic space is completely closed or non-existent"
      default:
        return ""
    }
  }

  const handleCountryClick = (code: string) => {
    if (code === selectedCountry) {
      setSelectedCountry(null)
    } else {
      setSelectedCountry(code)
    }
  }

  return (
    <Card className="w-full border-primary/20">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4 text-primary">Civic Space Status in Africa</h3>

        <div className="mb-6">
          <div className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-primary">Interactive Map Visualization</p>
                <p className="text-sm text-muted-foreground">Region-based visualization available below</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {regions.map((region) => (
            <div key={region.name}>
              <h4 className="font-medium text-primary mb-3 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                {region.name}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {region.countries.map((code) => {
                  const country = countryData[code]
                  if (!country) return null

                  return (
                    <div
                      key={code}
                      className={`status-${country.status} p-3 rounded-md cursor-pointer text-center ${
                        country.status === "narrowed" ? "text-black" : "text-white"
                      } text-sm font-medium ${selectedCountry === code ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleCountryClick(code)}
                    >
                      {country.name}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedCountry && countryData[selectedCountry] && (
          <div className="mt-8 p-4 border rounded-lg bg-background/80">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-md flex-shrink-0 status-${countryData[selectedCountry].status} flex items-center justify-center text-white font-bold text-lg`}
              >
                {countryData[selectedCountry].name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-lg text-primary">{countryData[selectedCountry].name}</h4>
                <div className="flex items-center mt-1">
                  <div className={`w-3 h-3 rounded-full status-${countryData[selectedCountry].status} mr-2`}></div>
                  <span className="font-medium">{getStatusLabel(countryData[selectedCountry].status)}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {getStatusDescription(countryData[selectedCountry].status)}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Click on another country to see its details or click on this country again to close this panel.
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-6 text-center">
          Note: A detailed interactive SVG map of Africa will be implemented in the final version.
        </p>
      </CardContent>
    </Card>
  )
}


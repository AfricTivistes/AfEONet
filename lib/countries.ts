export type CivicStatus = "open" | "restricted" | "narrowed" | "obstructed" | "repressed" | "closed"
export type Region =
  | "West Africa"
  | "East Africa"
  | "North Africa"
  | "Central Africa"
  | "Southern Africa"

export interface CountryDimensions {
  regulatory: number       // D1: Regulatory Framework
  administrative: number  // D2: Administrative Constraints
  embRelationship: number // D3: EMB Relationship
  security: number        // D4: Security and Well-being
  dataAccess: number      // D5: Access to Electoral Data
  funding: number         // D6: Access to Funding
  dialogue: number        // D7: Dialogue and Consultation
  perception: number      // D8: Perception of Observers
}

export interface Country {
  iso2: string
  iso3: string
  isoNum: string  // ISO 3166-1 numeric, zero-padded string (jointure topojson world-atlas)
  name: string
  region: Region
  status: CivicStatus | null
  composite?: number
  dimensions?: CountryDimensions
  notes?: string
}

export const countries: Country[] = [
  // North Africa
  { iso2: "dz", iso3: "DZA", isoNum: "012", name: "Algeria", region: "North Africa", status: "narrowed" },
  { iso2: "eg", iso3: "EGY", isoNum: "818", name: "Egypt", region: "North Africa", status: "closed" },
  { iso2: "ma", iso3: "MAR", isoNum: "504", name: "Morocco", region: "North Africa", status: "repressed" },
  {
    iso2: "tn", iso3: "TUN", isoNum: "788", name: "Tunisia", region: "North Africa", status: "narrowed",
    composite: 6.5,
    dimensions: { regulatory: 7, administrative: 6, embRelationship: 7, security: 6, dataAccess: 7, funding: 5, dialogue: 7, perception: 6 },
    notes: "Post-revolution transition, dialogue remains open",
  },
  // West Africa
  {
    iso2: "ng", iso3: "NGA", isoNum: "566", name: "Nigeria", region: "West Africa", status: "obstructed",
    composite: 5.5,
    dimensions: { regulatory: 6, administrative: 5, embRelationship: 6, security: 5, dataAccess: 7, funding: 4, dialogue: 6, perception: 5 },
    notes: "IReV present but limited funding and digital transparency",
  },
  {
    iso2: "gh", iso3: "GHA", isoNum: "288", name: "Ghana", region: "West Africa", status: "narrowed",
    composite: 6.5,
    dimensions: { regulatory: 8, administrative: 7, embRelationship: 9, security: 6, dataAccess: 7, funding: 5, dialogue: 8, perception: 8 },
    notes: "Strong EMB-CSO collaboration but heavy reliance on external funding",
  },
  {
    iso2: "ci", iso3: "CIV", isoNum: "384", name: "Côte d'Ivoire", region: "West Africa", status: "obstructed",
    composite: 5.5,
    dimensions: { regulatory: 6, administrative: 5, embRelationship: 6, security: 5, dataAccess: 5, funding: 4, dialogue: 6, perception: 5 },
    notes: "Post-conflict, selective openness",
  },
  {
    iso2: "lr", iso3: "LBR", isoNum: "430", name: "Liberia", region: "West Africa", status: "restricted",
    composite: 7.0,
    dimensions: { regulatory: 7, administrative: 7, embRelationship: 7, security: 6, dataAccess: 7, funding: 6, dialogue: 7, perception: 7 },
    notes: "Post-conflict constraints shaping civic space",
  },
  { iso2: "ml", iso3: "MLI", isoNum: "466", name: "Mali", region: "West Africa", status: "closed" },
  { iso2: "bf", iso3: "BFA", isoNum: "854", name: "Burkina Faso", region: "West Africa", status: "closed" },
  { iso2: "sn", iso3: "SEN", isoNum: "686", name: "Senegal", region: "West Africa", status: "open" },
  { iso2: "sl", iso3: "SLE", isoNum: "694", name: "Sierra Leone", region: "West Africa", status: null },
  { iso2: "ne", iso3: "NER", isoNum: "562", name: "Niger", region: "West Africa", status: null },
  { iso2: "gw", iso3: "GNB", isoNum: "624", name: "Guinea-Bissau", region: "West Africa", status: null },
  { iso2: "gn", iso3: "GIN", isoNum: "324", name: "Guinea", region: "West Africa", status: null },
  { iso2: "tg", iso3: "TGO", isoNum: "768", name: "Togo", region: "West Africa", status: null },
  { iso2: "bj", iso3: "BEN", isoNum: "204", name: "Benin", region: "West Africa", status: null },
  // East Africa
  {
    iso2: "ke", iso3: "KEN", isoNum: "404", name: "Kenya", region: "East Africa", status: "restricted",
    composite: 7.5,
    dimensions: { regulatory: 8, administrative: 7, embRelationship: 8, security: 6, dataAccess: 8, funding: 6, dialogue: 7, perception: 7 },
    notes: "Technology innovation expanding civic space amid political contestation",
  },
  {
    iso2: "tz", iso3: "TZA", isoNum: "834", name: "Tanzania", region: "East Africa", status: "repressed",
    composite: 4.5,
    dimensions: { regulatory: 4, administrative: 4, embRelationship: 5, security: 4, dataAccess: 5, funding: 4, dialogue: 5, perception: 5 },
    notes: "Restrictive accreditation procedures",
  },
  {
    iso2: "et", iso3: "ETH", isoNum: "231", name: "Ethiopia", region: "East Africa", status: "repressed",
    composite: 4.5,
    dimensions: { regulatory: 5, administrative: 4, embRelationship: 5, security: 4, dataAccess: 5, funding: 4, dialogue: 5, perception: 4 },
    notes: "Reforming but constraints persist",
  },
  {
    iso2: "ug", iso3: "UGA", isoNum: "800", name: "Uganda", region: "East Africa", status: "repressed",
    composite: 3.0,
    dimensions: { regulatory: 3, administrative: 3, embRelationship: 4, security: 2, dataAccess: 3, funding: 3, dialogue: 3, perception: 3 },
    notes: "Hostile environment, mass arrests of observers",
  },
  { iso2: "rw", iso3: "RWA", isoNum: "646", name: "Rwanda", region: "East Africa", status: "repressed" },
  {
    iso2: "so", iso3: "SOM", isoNum: "706", name: "Somalia", region: "East Africa", status: "repressed",
    composite: 4.0,
    dimensions: { regulatory: 4, administrative: 4, embRelationship: 5, security: 3, dataAccess: 4, funding: 3, dialogue: 4, perception: 5 },
    notes: "Fragility and external dependence",
  },
  {
    iso2: "ss", iso3: "SSD", isoNum: "728", name: "South Sudan", region: "East Africa", status: "repressed",
    composite: 3.5,
    dimensions: { regulatory: 3, administrative: 3, embRelationship: 4, security: 3, dataAccess: 4, funding: 3, dialogue: 4, perception: 3 },
    notes: "Fragility, hostile environment",
  },
  { iso2: "bi", iso3: "BDI", isoNum: "108", name: "Burundi", region: "East Africa", status: null },
  { iso2: "dj", iso3: "DJI", isoNum: "262", name: "Djibouti", region: "East Africa", status: null },
  { iso2: "er", iso3: "ERI", isoNum: "232", name: "Eritrea", region: "East Africa", status: null },
  // Somaliland (non-ISO recognized territory, assessed in AfEONet 2025 report)
  {
    iso2: "xsl", iso3: "XSL", isoNum: "", name: "Somaliland", region: "East Africa", status: "restricted",
    composite: 8.0,
    dimensions: { regulatory: 8, administrative: 8, embRelationship: 8, security: 7, dataAccess: 8, funding: 7, dialogue: 8, perception: 8 },
    notes: "Non-recognized but functional, progressive civic space",
  },
  // Central Africa
  {
    iso2: "cm", iso3: "CMR", isoNum: "120", name: "Cameroon", region: "Central Africa", status: "obstructed",
    composite: 5.0,
    dimensions: { regulatory: 5, administrative: 4, embRelationship: 5, security: 4, dataAccess: 5, funding: 5, dialogue: 5, perception: 5 },
    notes: "Political filtering of civic space, selective openness",
  },
  { iso2: "cd", iso3: "COD", isoNum: "180", name: "DR Congo", region: "Central Africa", status: "closed" },
  {
    iso2: "td", iso3: "TCD", isoNum: "148", name: "Chad", region: "Central Africa", status: "repressed",
    composite: 3.0,
    dimensions: { regulatory: 3, administrative: 3, embRelationship: 3, security: 2, dataAccess: 3, funding: 2, dialogue: 3, perception: 3 },
    notes: "Military transition, hostile environment",
  },
  { iso2: "ga", iso3: "GAB", isoNum: "266", name: "Gabon", region: "Central Africa", status: null },
  { iso2: "cf", iso3: "CAF", isoNum: "140", name: "Central African Republic", region: "Central Africa", status: null },
  {
    iso2: "cg", iso3: "COG", isoNum: "178", name: "Congo Brazzaville", region: "Central Africa", status: "closed",
    composite: 2.0,
    dimensions: { regulatory: 2, administrative: 2, embRelationship: 2, security: 1, dataAccess: 2, funding: 1, dialogue: 2, perception: 2 },
    notes: "Virtually nonexistent civic space",
  },
  { iso2: "gq", iso3: "GNQ", isoNum: "226", name: "Equatorial Guinea", region: "Central Africa", status: null },
  // Southern Africa
  {
    iso2: "za", iso3: "ZAF", isoNum: "710", name: "South Africa", region: "Southern Africa", status: "restricted",
    composite: 8.0,
    dimensions: { regulatory: 8, administrative: 8, embRelationship: 8, security: 8, dataAccess: 8, funding: 7, dialogue: 8, perception: 8 },
    notes: "Robust civic space confronting sustainability pressures",
  },
  {
    iso2: "zw", iso3: "ZWE", isoNum: "716", name: "Zimbabwe", region: "Southern Africa", status: "repressed",
    composite: 3.0,
    dimensions: { regulatory: 3, administrative: 3, embRelationship: 3, security: 2, dataAccess: 3, funding: 3, dialogue: 3, perception: 3 },
    notes: "Repression, police raids on observer offices",
  },
  { iso2: "mz", iso3: "MOZ", isoNum: "508", name: "Mozambique", region: "Southern Africa", status: "obstructed" },
  {
    iso2: "zm", iso3: "ZMB", isoNum: "894", name: "Zambia", region: "Southern Africa", status: "obstructed",
    composite: 6.0,
    dimensions: { regulatory: 6, administrative: 6, embRelationship: 6, security: 5, dataAccess: 6, funding: 5, dialogue: 6, perception: 6 },
    notes: "Progressive decline, funding challenges",
  },
  {
    iso2: "bw", iso3: "BWA", isoNum: "072", name: "Botswana", region: "Southern Africa", status: "open",
    composite: 9.0,
    dimensions: { regulatory: 9, administrative: 9, embRelationship: 9, security: 9, dataAccess: 9, funding: 8, dialogue: 9, perception: 9 },
    notes: "Open/Free environment, transparent processes",
  },
  { iso2: "na", iso3: "NAM", isoNum: "516", name: "Namibia", region: "Southern Africa", status: null },
  { iso2: "ao", iso3: "AGO", isoNum: "024", name: "Angola", region: "Southern Africa", status: null },
  {
    iso2: "mg", iso3: "MDG", isoNum: "450", name: "Madagascar", region: "Southern Africa", status: "obstructed",
    composite: 5.0,
    dimensions: { regulatory: 5, administrative: 5, embRelationship: 5, security: 4, dataAccess: 5, funding: 4, dialogue: 5, perception: 5 },
    notes: "Political instability, fragile environment",
  },
  { iso2: "ls", iso3: "LSO", isoNum: "426", name: "Lesotho", region: "Southern Africa", status: null },
  { iso2: "km", iso3: "COM", isoNum: "174", name: "Comoros", region: "Southern Africa", status: null },
  { iso2: "mu", iso3: "MUS", isoNum: "480", name: "Mauritius", region: "Southern Africa", status: null },
  { iso2: "mw", iso3: "MWI", isoNum: "454", name: "Malawi", region: "Southern Africa", status: null },
  {
    iso2: "sz", iso3: "SWZ", isoNum: "748", name: "Eswatini", region: "Southern Africa", status: "repressed",
    composite: 4.5,
    dimensions: { regulatory: 4, administrative: 4, embRelationship: 5, security: 4, dataAccess: 5, funding: 4, dialogue: 5, perception: 5 },
    notes: "Public legitimacy amid constrained civic space",
  },
  { iso2: "sc", iso3: "SYC", isoNum: "690", name: "Seychelles", region: "Southern Africa", status: null },
]

export const REGIONS: Region[] = [
  "West Africa",
  "East Africa",
  "North Africa",
  "Central Africa",
  "Southern Africa",
]

export function byRegion(region: Region): Country[] {
  return countries.filter((c) => c.region === region)
}

export function byIso3(iso3: string): Country | undefined {
  return countries.find((c) => c.iso3 === iso3)
}

export function byIso2(iso2: string): Country | undefined {
  return countries.find((c) => c.iso2 === iso2)
}

export function byIsoNum(isoNum: string): Country | undefined {
  return countries.find((c) => c.isoNum === isoNum)
}

export function statusClass(status: CivicStatus | null): string {
  if (!status) return "status-unknown"
  return `status-${status}`
}

export function statusLabel(status: CivicStatus | null): string {
  switch (status) {
    case "open": return "Open"
    case "restricted": return "Restricted"
    case "narrowed": return "Narrowed"
    case "obstructed": return "Obstructed"
    case "repressed": return "Repressed"
    case "closed": return "Closed"
    default: return "Not assessed"
  }
}

export function statusDescription(status: CivicStatus | null): string {
  switch (status) {
    case "open": return "Civic space is fully respected and protected"
    case "restricted": return "Civic space faces some limitations but remains functional"
    case "narrowed": return "Civic space is experiencing increasing restrictions"
    case "obstructed": return "Civic space faces significant obstacles"
    case "repressed": return "Civic space is severely limited with active threats"
    case "closed": return "Civic space is completely closed or non-existent"
    default: return "This country has not yet been assessed"
  }
}

export function statusCounts(): Record<CivicStatus | "unknown", number> {
  const counts: Record<CivicStatus | "unknown", number> = {
    open: 0,
    restricted: 0,
    narrowed: 0,
    obstructed: 0,
    repressed: 0,
    closed: 0,
    unknown: 0,
  }
  for (const c of countries) {
    if (c.status) counts[c.status]++
    else counts.unknown++
  }
  return counts
}

export const DIMENSION_LABELS: Record<keyof CountryDimensions, string> = {
  regulatory: "Regulatory Framework",
  administrative: "Administrative Constraints",
  embRelationship: "EMB Relationship",
  security: "Security & Well-being",
  dataAccess: "Access to Electoral Data",
  funding: "Access to Funding",
  dialogue: "Dialogue & Consultation",
  perception: "Perception of Observers",
}

export const GLOBAL_AVERAGES: CountryDimensions = {
  regulatory: 5.4,
  administrative: 5.1,
  embRelationship: 5.6,
  security: 4.5,
  dataAccess: 5.5,
  funding: 4.4,
  dialogue: 5.5,
  perception: 5.6,
}

export function assessedCountries(): Country[] {
  return countries.filter((c) => c.composite !== undefined)
}

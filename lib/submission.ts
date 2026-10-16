import * as z from "zod"
import { countries, DIM_KEYS, type CountryDimensions } from "./countries"

// Shared by the /submit form (client validation) and /api/submissions (server validation).

export type DimensionKey = keyof CountryDimensions
export type DimensionFieldName = `${DimensionKey}Rating` | `${DimensionKey}Trend` | `${DimensionKey}Context`

export const RATING_VALUES = ["open", "restricted", "obstructed", "repressed", "closed"] as const
export const TREND_VALUES = ["improving", "stable", "deteriorating", "unknown"] as const

// Hidden field real visitors never fill; bots that fill every input get dropped.
export const HONEYPOT_FIELD = "website"

export const countryOptions = countries
  .map(({ iso2, name }) => ({ iso2, name }))
  .sort((a, b) => a.name.localeCompare(b.name))

export function countryName(iso2: string): string | undefined {
  return countries.find((c) => c.iso2 === iso2)?.name
}

function buildDimensionShape(): Record<DimensionFieldName, z.ZodTypeAny> {
  const shape = {} as Record<DimensionFieldName, z.ZodTypeAny>
  for (const key of DIM_KEYS) {
    shape[`${key}Rating`] = z.enum(RATING_VALUES, { message: "Please select a rating" })
    shape[`${key}Trend`] = z.enum(TREND_VALUES, { message: "Please select a trend" })
    shape[`${key}Context`] = z.string().max(5000).optional()
  }
  return shape
}

export function buildDimensionDefaults(): Record<DimensionFieldName, string> {
  const defaults = {} as Record<DimensionFieldName, string>
  for (const key of DIM_KEYS) {
    defaults[`${key}Rating`] = ""
    defaults[`${key}Trend`] = ""
    defaults[`${key}Context`] = ""
  }
  return defaults
}

export const submissionSchema = z.object({
  country: z.string().refine((v) => countryName(v) !== undefined, { message: "Please select a country" }),
  dataEntrant: z.string().trim().min(1, { message: "Please enter your name" }).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please enter a date" }),
  ...buildDimensionShape(),
})

export type SubmissionValues = z.infer<typeof submissionSchema>

// NocoDB column names: D1…D8 follow the dimension order used across the site.
export function toNocoRecord(values: SubmissionValues, locale: string): Record<string, string> {
  const record: Record<string, string> = {
    Country: countryName(values.country) ?? values.country,
    ISO2: values.country,
    Observer: values.dataEntrant,
    Date: values.date,
    Locale: locale,
    "Review Status": "pending",
  }
  DIM_KEYS.forEach((key, i) => {
    const v = values as Record<string, string | undefined>
    record[`D${i + 1} Rating`] = v[`${key}Rating`] ?? ""
    record[`D${i + 1} Trend`] = v[`${key}Trend`] ?? ""
    record[`D${i + 1} Context`] = v[`${key}Context`] ?? ""
  })
  return record
}

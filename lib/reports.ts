import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { byIso2 } from './countries'
import { resolveLocalizedPath, listCanonicalSlugs } from './content-locale'
import type { PublicationCategory } from './publication-categories'

export interface ReportDimensions {
  regulatory?: number
  administrative?: number
  embRelationship?: number
  security?: number
  dataAccess?: number
  funding?: number
  dialogue?: number
  perception?: number
}

export { PUBLICATION_CATEGORIES, type PublicationCategory } from './publication-categories'

export interface Report {
  id: number
  title: string
  date: string
  country: string
  iso2?: string
  region?: string
  status: string
  summary: string
  content?: string
  downloadUrl?: string
  authors?: string[]
  tags?: string[]
  slug: string
  composite?: number
  dimensions?: ReportDimensions
  source?: string
  notes?: string
  category?: PublicationCategory
}

export interface Alert {
  id: string | number
  title: string
  date: string
  country: string
  iso2?: string
  status: string
  description: string
  content?: string
  severity?: string
  region?: string
  alertType?: string
  dimension?: number
  affectedObservers?: number | null
  relatedReport?: string
  tags?: string[]
  slug: string
}

const reportsDirectory = path.join(process.cwd(), 'content/reports')
const alertsDirectory = path.join(process.cwd(), 'content/alerts')

/**
 * lib/countries.ts is the single source of truth for status/composite/dimensions.
 * Report frontmatter duplicates these fields for CMS convenience, but whenever an
 * iso2 match exists, the countries.ts values win to prevent the two from drifting apart.
 */
function withCanonicalCountryData(report: Report): Report {
  if (!report.iso2) return report
  const country = byIso2(report.iso2)
  if (!country) return report
  return {
    ...report,
    status: country.status ?? report.status,
    composite: country.composite ?? report.composite,
    dimensions: country.dimensions ?? report.dimensions,
  }
}

// Ensure directories exist
if (!fs.existsSync(reportsDirectory)) {
  fs.mkdirSync(reportsDirectory, { recursive: true })
}
if (!fs.existsSync(alertsDirectory)) {
  fs.mkdirSync(alertsDirectory, { recursive: true })
}

export async function getReports(locale = 'en'): Promise<Report[]> {
  try {
    const reports = listCanonicalSlugs(reportsDirectory, 'mdx')
      .map((slug) => {
        const filePath = resolveLocalizedPath(reportsDirectory, slug, 'mdx', locale)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return withCanonicalCountryData({
          ...data,
          content,
          slug
        } as Report)
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return reports
  } catch (error) {
    console.error('Error loading reports:', error)
    return []
  }
}

export async function getReport(idOrSlug: string, locale = 'en'): Promise<Report | null> {
  try {
    const reports = await getReports(locale)
    const report = reports.find(r =>
      r.id.toString() === idOrSlug || r.slug === idOrSlug
    )
    return report || null
  } catch (error) {
    console.error('Error loading report:', error)
    return null
  }
}

export async function getAlerts(locale = 'en'): Promise<Alert[]> {
  try {
    const alerts = listCanonicalSlugs(alertsDirectory, 'mdx')
      .map((slug) => {
        const filePath = resolveLocalizedPath(alertsDirectory, slug, 'mdx', locale)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          ...data,
          content,
          slug
        } as Alert
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return alerts
  } catch (error) {
    console.error('Error loading alerts:', error)
    return []
  }
}

export async function getAlert(idOrSlug: string, locale = 'en'): Promise<Alert | null> {
  try {
    const alerts = await getAlerts(locale)
    const alert = alerts.find(a =>
      a.id.toString() === idOrSlug || a.slug === idOrSlug
    )
    return alert || null
  } catch (error) {
    console.error('Error loading alert:', error)
    return null
  }
}

function normalizeCountry(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, "")
}

export async function getRelatedReports(country: string, locale = 'en'): Promise<Report[]> {
  const reports = await getReports(locale)
  const key = normalizeCountry(country)
  return reports.filter((r) => normalizeCountry(r.country) === key)
}

export async function getRelatedAlerts(country: string, locale = 'en'): Promise<Alert[]> {
  const alerts = await getAlerts(locale)
  const key = normalizeCountry(country)
  return alerts.filter((a) => normalizeCountry(a.country) === key)
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Report {
  id: number
  title: string
  date: string
  country: string
  status: string
  summary: string
  content?: string
  downloadUrl?: string
  authors?: string[]
  tags?: string[]
  slug: string
}

export interface Alert {
  id: number
  title: string
  date: string
  country: string
  status: string
  description: string
  content?: string
  severity?: string
  region?: string
  tags?: string[]
  slug: string
}

const reportsDirectory = path.join(process.cwd(), 'content/reports')
const alertsDirectory = path.join(process.cwd(), 'content/alerts')

// Ensure directories exist
if (!fs.existsSync(reportsDirectory)) {
  fs.mkdirSync(reportsDirectory, { recursive: true })
}
if (!fs.existsSync(alertsDirectory)) {
  fs.mkdirSync(alertsDirectory, { recursive: true })
}

export async function getReports(): Promise<Report[]> {
  try {
    const files = fs.readdirSync(reportsDirectory)
    const reports = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(reportsDirectory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const slug = file.replace(/\.mdx?$/, '')
        
        return {
          ...data,
          content,
          slug
        } as Report
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return reports
  } catch (error) {
    console.error('Error loading reports:', error)
    return []
  }
}

export async function getReport(idOrSlug: string): Promise<Report | null> {
  try {
    const reports = await getReports()
    const report = reports.find(r => 
      r.id.toString() === idOrSlug || r.slug === idOrSlug
    )
    return report || null
  } catch (error) {
    console.error('Error loading report:', error)
    return null
  }
}

export async function getAlerts(): Promise<Alert[]> {
  try {
    const files = fs.readdirSync(alertsDirectory)
    const alerts = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(alertsDirectory, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)
        const slug = file.replace(/\.mdx?$/, '')
        
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

export async function getAlert(idOrSlug: string): Promise<Alert | null> {
  try {
    const alerts = await getAlerts()
    const alert = alerts.find(a => 
      a.id.toString() === idOrSlug || a.slug === idOrSlug
    )
    return alert || null
  } catch (error) {
    console.error('Error loading alert:', error)
    return null
  }
}
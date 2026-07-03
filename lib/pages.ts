import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { resolveLocalizedPath, listCanonicalSlugs } from './content-locale'

const pagesDirectory = path.join(process.cwd(), 'content/pages')

export interface HomepageSection {
  title: string
  subtitle?: string
  content?: string
}

export interface PageData {
  id: string
  title: string
  description: string
  content: string
  metadata?: Record<string, unknown>
  hero?: HomepageSection
  mission?: HomepageSection
  features?: HomepageSection
  news?: HomepageSection
  cta?: HomepageSection
  impact?: HomepageSection
}

export async function getPage(id: string, locale = 'en'): Promise<PageData | null> {
  try {
    const fullPath = resolveLocalizedPath(pagesDirectory, id, 'md', locale)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id,
      title: data.title || '',
      description: data.description || '',
      content,
      metadata: data,
      hero: data.hero,
      mission: data.mission,
      features: data.features,
      news: data.news,
      cta: data.cta,
      impact: data.impact
    }
  } catch (error) {
    console.error(`Error reading page ${id}:`, error)
    return null
  }
}

export async function getAllPages(): Promise<string[]> {
  try {
    return listCanonicalSlugs(pagesDirectory, 'md')
  } catch (error) {
    console.error('Error reading pages directory:', error)
    return []
  }
}
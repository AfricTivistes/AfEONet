import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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
  metadata?: Record<string, any>
  hero?: HomepageSection
  mission?: HomepageSection
  features?: HomepageSection
  news?: HomepageSection
  cta?: HomepageSection
  impact?: HomepageSection
}

export async function getPage(id: string): Promise<PageData | null> {
  try {
    const fullPath = path.join(pagesDirectory, `${id}.md`)
    
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
    if (!fs.existsSync(pagesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(pagesDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading pages directory:', error)
    return []
  }
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { resolveLocalizedPath, listCanonicalSlugs } from './content-locale'

const aboutDirectory = path.join(process.cwd(), 'content/about')

export interface AboutSection {
  slug: string
  title: string
  description?: string
  section: string
  order: number
  content: string
}

export async function getAboutSections(locale = 'en'): Promise<AboutSection[]> {
  try {
    const sections = listCanonicalSlugs(aboutDirectory, 'mdx').map((slug) => {
      const filePath = resolveLocalizedPath(aboutDirectory, slug, 'mdx', locale)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description,
        section: data.section || slug,
        order: typeof data.order === 'number' ? data.order : 99,
        content,
      }
    })

    return sections.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error loading about sections:', error)
    return []
  }
}

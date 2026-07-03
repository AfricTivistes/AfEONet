import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'
import { resolveLocalizedPath, listCanonicalSlugs } from './content-locale'

const newsDirectory = path.join(process.cwd(), 'content/news')

export interface NewsArticle {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  country?: string
  featured: boolean
  image: string
  tags: string[]
  content: string
}

function readNewsArticle(slug: string, locale: string): NewsArticle | null {
  const fullPath = resolveLocalizedPath(newsDirectory, slug, 'mdx', locale)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    title: data.title || '',
    description: data.description || '',
    date: data.date ? (data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date)) : '',
    category: data.category || '',
    author: data.author || '',
    country: data.country,
    featured: data.featured || false,
    image: data.image || '/placeholder.svg?height=400&width=600',
    tags: data.tags || [],
  } as NewsArticle
}

export const getAllNewsArticles = cache((locale = 'en'): NewsArticle[] => {
  try {
    if (!fs.existsSync(newsDirectory)) {
      fs.mkdirSync(newsDirectory, { recursive: true })
      return []
    }

    return listCanonicalSlugs(newsDirectory, 'mdx')
      .map((slug) => readNewsArticle(slug, locale))
      .filter((a): a is NewsArticle => a !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading news articles:', error)
    return []
  }
})

export const getNewsArticle = cache((slug: string, locale = 'en'): NewsArticle | null => {
  try {
    return readNewsArticle(slug, locale)
  } catch (error) {
    console.error(`Error reading news article ${slug}:`, error instanceof Error ? error.message : String(error))
    return null
  }
})

export function getFeaturedArticles(locale = 'en'): NewsArticle[] {
  return getAllNewsArticles(locale).filter(article => article.featured)
}

export function getArticlesByCategory(category: string, locale = 'en'): NewsArticle[] {
  return getAllNewsArticles(locale).filter(article => article.category === category)
}

export function getArticlesByTag(tag: string, locale = 'en'): NewsArticle[] {
  return getAllNewsArticles(locale).filter(article => article.tags.includes(tag))
}

export function getNewsByCountry(country: string, locale = 'en'): NewsArticle[] {
  const key = country.toLowerCase().replace(/[^a-z]/g, "")
  return getAllNewsArticles(locale).filter((a) => {
    if (a.country) return a.country.toLowerCase().replace(/[^a-z]/g, "") === key
    return a.tags.some((t) => t.toLowerCase().replace(/[^a-z]/g, "") === key)
  })
}
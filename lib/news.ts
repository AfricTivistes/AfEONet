import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
// import { cache } from 'react' // Temporairement désactivé en développement

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

// Version mise en cache pour améliorer les performances (désactivée temporairement en dev)
export const getAllNewsArticles = ((): NewsArticle[] => {
  try {
    // Créer le répertoire s'il n'existe pas
    if (!fs.existsSync(newsDirectory)) {
      fs.mkdirSync(newsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(newsDirectory)
    const articles = fileNames
      .filter(name => name.endsWith('.mdx'))
      .map((name) => {
        const slug = name.replace(/\.mdx$/, '')
        const fullPath = path.join(newsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        
        const { data, content } = matter(fileContents)
        
        return {
          slug,
          content,
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          category: data.category || '',
          author: data.author || '',
          country: data.country,
          featured: data.featured || false,
          image: data.image || '/placeholder.svg?height=400&width=600',
          tags: data.tags || [],
        } as NewsArticle
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
  } catch (error) {
    console.error('Error reading news articles:', error)
    return []
  }
})

// Version mise en cache pour les articles individuels (désactivée temporairement en dev)
export const getNewsArticle = ((slug: string): NewsArticle | null => {
  try {
    const fullPath = path.join(newsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      content,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || '',
      author: data.author || '',
      country: data.country,
      featured: data.featured || false,
      image: data.image || '/placeholder.svg?height=400&width=600',
      tags: data.tags || [],
    } as NewsArticle
  } catch (error) {
    console.error(`Error reading news article ${slug}:`, error instanceof Error ? error.message : String(error))
    return null
  }
})

export function getFeaturedArticles(): NewsArticle[] {
  return getAllNewsArticles().filter(article => article.featured)
}

export function getArticlesByCategory(category: string): NewsArticle[] {
  return getAllNewsArticles().filter(article => article.category === category)
}

export function getArticlesByTag(tag: string): NewsArticle[] {
  return getAllNewsArticles().filter(article => article.tags.includes(tag))
}
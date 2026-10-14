import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { resolveLocalizedPath } from './content-locale'

const contactDirectory = path.join(process.cwd(), 'content/contact')

export interface FAQItem {
  question: string
  answer: string
}

export interface ContactPageData {
  title: string
  description: string
  hero?: { title?: string; subtitle?: string }
  infoTitle?: string
  intro?: string
  email?: string
  phone?: string
  address?: string
  faqTitle?: string
  faq: FAQItem[]
}

export async function getContactPage(locale = 'en'): Promise<ContactPageData | null> {
  try {
    const fullPath = resolveLocalizedPath(contactDirectory, 'contact', 'md', locale)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const { data } = matter(fs.readFileSync(fullPath, 'utf8'))

    return {
      title: data.title || '',
      description: data.description || '',
      hero: data.hero,
      infoTitle: data.infoTitle,
      intro: data.intro,
      email: data.email,
      phone: data.phone,
      address: data.address,
      faqTitle: data.faqTitle,
      faq: Array.isArray(data.faq) ? data.faq.filter((item: FAQItem) => item?.question) : [],
    }
  } catch (error) {
    console.error('Error reading contact page:', error)
    return null
  }
}

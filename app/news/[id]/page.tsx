import { notFound } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MdxLayout } from "@/components/mdx-layout"
import { getNewsArticle, getAllNewsArticles } from "@/lib/news"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useMDXComponents } from "@/mdx-components"
// import { cache } from "react" // Désactivé temporairement en dev

interface NewsArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const articles = getAllNewsArticles()
  return articles.map((article) => ({
    id: article.slug,
  }))
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  try {
    const { id } = await params
    const article = getNewsArticle(id)
    
    if (!article) {
      return {
        title: "Article Not Found - AfEONet",
        description: "The requested article could not be found."
      }
    }

    return {
      title: `${article.title} - AfEONet`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: article.date,
        authors: [article.author],
        tags: article.tags,
      }
    }
  } catch (err) {
    // Safe error handling for metadata generation
    const safeMessage = err instanceof Error ? err.message : 'Unknown error'
    if (typeof window === 'undefined') {
      console.error(`Error generating metadata for article: ${safeMessage}`)
    }
    return {
      title: "Article Error - AfEONet",
      description: "There was an error loading this article."
    }
  }
}

// Stable markdown rendering using react-markdown (no more stack errors!)
const getCachedMDXContent = async (slug: string, content: string) => {
  // Use react-markdown for reliable rendering without serialization issues
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        // Use custom components for styling
        h1: ({ children }) => <h1 className="text-4xl font-bold text-primary mb-6 mt-0">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold text-primary mb-4 mt-8">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-semibold text-primary mb-3 mt-6">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-semibold text-primary mb-2 mt-4">{children}</h4>,
        p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
        a: ({ href, children }) => {
          if (!href) return <span className="text-secondary underline">{children}</span>
          const isExternal = href.startsWith('http') || href.startsWith('//')
          return (
            <a 
              href={href} 
              className="text-secondary hover:text-secondary/80 underline transition-colors"
              {...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
            >
              {children}
            </a>
          )
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-secondary pl-4 italic text-muted-foreground my-4 bg-secondary/5 py-2">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-muted-foreground">{children}</ol>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
        code: ({ children }) => (
          <code className="text-primary bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-muted border rounded-lg p-4 text-foreground overflow-x-auto mb-4">
            {children}
          </pre>
        ),
        strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
        em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
        hr: () => <hr className="border-border my-8" />,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt || ''}
            className="rounded-lg shadow-sm my-4 max-w-full h-auto"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

async function renderMDXContent(slug: string, content: string) {
  return getCachedMDXContent(slug, content)
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { id } = await params
  const article = getNewsArticle(id)

  if (!article) {
    notFound()
  }

  const mdxContent = await renderMDXContent(article.slug, article.content)

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Navigation */}
      <div className="container py-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/news" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="bg-white dark:bg-slate-900 border-b">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </div>

              {article.country && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {article.country}
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <MdxLayout>
            {mdxContent}
          </MdxLayout>
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="bg-secondary/10 py-12 mt-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6">Related Articles</h3>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Discover more insights from AfEONet's research and monitoring work.
              </p>
              <Button asChild>
                <Link href="/news">View All News</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
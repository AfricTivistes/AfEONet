import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Search, Clock, User, ArrowRight } from "lucide-react"
import { getAllNewsArticles, getFeaturedArticles, type NewsArticle } from "@/lib/news"

// Fonction utilitaire pour calculer le temps de lecture
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readTime = Math.ceil(words / wordsPerMinute)
  return `${readTime} min read`
}

// Fonction pour adapter les articles MDX au format attendu
function adaptArticleData(article: NewsArticle) {
  return {
    ...article,
    id: article.slug,
    excerpt: article.description,
    readTime: calculateReadTime(article.content),
    image: article.image || "/placeholder.svg?height=600&width=800",
  }
}

// Fonction pour obtenir les catégories dynamiquement
function getCategories(articles: NewsArticle[]): string[] {
  const categories = new Set(["All"])
  articles.forEach(article => {
    if (article.category) {
      categories.add(article.category)
    }
  })
  return Array.from(categories)
}

export default function NewsPage() {
  const allArticles = getAllNewsArticles()
  const featuredArticles = allArticles.filter(article => article.featured)
  const categories = getCategories(allArticles)
  
  // Obtenir l'article vedette (le premier featured ou le plus récent)
  const featuredArticle = featuredArticles.length > 0 
    ? adaptArticleData(featuredArticles[0]) 
    : allArticles.length > 0 
    ? adaptArticleData(allArticles[0]) 
    : null
  
  // Articles populaires (featured ou les plus récents)
  const popularArticles = (featuredArticles.length > 1 
    ? featuredArticles.slice(1, 4) 
    : allArticles.slice(0, 3)
  ).map(adaptArticleData)
  
  // Articles récents (les 4 plus récents)
  const recentArticles = allArticles.slice(0, 4).map(adaptArticleData)
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">News & Updates</h1>
              <p className="text-primary-foreground/80 mt-2">
                Stay informed about AfEONet activities, reports, and developments in election observation across Africa.
              </p>
            </div>
            <div className="relative w-full md:w-auto max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                className="pl-10 bg-white/20 border-none text-white placeholder:text-white/60"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="flex flex-col space-y-16">
          {/* Featured Article */}
          {featuredArticle && (
            <section className="bg-secondary/10 p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                  <Image
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary text-primary">{featuredArticle.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary">{featuredArticle.title}</h2>
                  <p className="text-muted-foreground">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                  </div>
                  <Button asChild className="w-fit bg-primary text-white hover:bg-primary/90">
                    <Link href={`/news/${featuredArticle.slug}`}>
                      Read full article <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* Popular Articles */}
          {popularArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-primary mb-8">Popular Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {popularArticles.map((article) => (
                  <div key={article.slug} className="group">
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-secondary text-primary">{article.category}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-secondary transition-colors">
                          <Link href={`/news/${article.slug}`}>{article.title}</Link>
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-primary text-sm font-medium hover:text-primary/80 transition-colors flex items-center"
                      >
                        Read more <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Articles */}
          {recentArticles.length > 0 && (
            <section className="bg-primary/5 py-12 -mx-4 px-4">
              <div className="container">
                <h2 className="text-2xl font-bold text-primary mb-8">Recent Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentArticles.map((article) => (
                    <Link key={article.slug} href={`/news/${article.slug}`} className="group">
                      <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-secondary/80 text-primary text-xs">{article.category}</Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <h3 className="text-base font-medium text-white line-clamp-2 group-hover:text-secondary transition-colors">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Categories */}
          {categories.length > 1 && (
            <section>
              <h2 className="text-2xl font-bold text-primary mb-6">Browse by Category</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <Link
                    key={category}
                    href={`/news/category/${category.toLowerCase()}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      index === 0
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-secondary/20 text-primary hover:bg-secondary/30"
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      {/* Message si aucun article */}
      {allArticles.length === 0 && (
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">No articles available</h2>
          <p className="text-muted-foreground">
            Articles will appear here once they are published.
          </p>
        </div>
      )}
    </div>
  )
}


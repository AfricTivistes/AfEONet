import { Suspense } from "react"
import Image from "next/image"
import { Link } from "@/lib/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { getAllNewsArticles, type NewsArticle } from "@/lib/news"
import { Pagination } from "@/components/pagination"
import { NewsSearch } from "@/components/news-search"

const PER_PAGE = 12

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readTime = Math.ceil(words / wordsPerMinute)
  return `${readTime} min read`
}

function adaptArticleData(article: NewsArticle) {
  return {
    ...article,
    id: article.slug,
    excerpt: article.description,
    readTime: calculateReadTime(article.content),
    image: article.image || "/placeholder.svg?height=600&width=800",
  }
}

const NEWS_CATEGORIES = ["Articles", "Alerts"] as const

function categoryLabel(t: Awaited<ReturnType<typeof getTranslations>>, category: string): string {
  if (category === "Articles") return t("categoryArticles")
  if (category === "Alerts") return t("categoryAlerts")
  return category
}

export default async function NewsPage({
  params: routeParams,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string; category?: string; q?: string }>
}) {
  const { locale } = await routeParams
  const t = await getTranslations({ locale, namespace: "news" })
  const tCommon = await getTranslations({ locale, namespace: "common" })
  const params = await searchParams
  const currentPage = Math.max(1, Number(params?.page) || 1)
  const activeCategory = params?.category && params.category !== "All" ? params.category : null
  const query = params?.q?.trim().toLowerCase() ?? ""

  const allArticlesUnfiltered = getAllNewsArticles(locale)

  const allArticles = allArticlesUnfiltered.filter((article) => {
    if (activeCategory && article.category !== activeCategory) return false
    if (query && !article.title.toLowerCase().includes(query) && !article.description.toLowerCase().includes(query)) return false
    return true
  })

  const featuredArticles = allArticles.filter(article => article.featured)

  const featuredArticle = featuredArticles.length > 0
    ? adaptArticleData(featuredArticles[0])
    : allArticles.length > 0
    ? adaptArticleData(allArticles[0])
    : null

  const totalPages = Math.ceil(allArticles.length / PER_PAGE)
  const start = (currentPage - 1) * PER_PAGE
  const paginatedArticles = allArticles.slice(start, start + PER_PAGE).map(adaptArticleData)

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("heroTitle")}</h1>
              <p className="text-primary-foreground/80 mt-2">
                {t("heroSubtitle")}
              </p>
            </div>
            <Suspense fallback={null}>
              <NewsSearch />
            </Suspense>
          </div>

          {/* Browse by Category */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-primary-foreground/80">{t("browseByCategory")}</span>
            <Link
              href="/news"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-secondary text-primary"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {t("categoryAll")}
            </Link>
            {NEWS_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/news?category=${encodeURIComponent(category)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-secondary text-primary"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {categoryLabel(t, category)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="flex flex-col space-y-16">
          {/* Featured Article — visible only on page 1 */}
          {featuredArticle && currentPage === 1 && (
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
                      {t("readFullArticle")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* All Articles — paginated */}
          {paginatedArticles.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-primary">
                  {currentPage === 1 ? t("allArticles") : `${t("allArticles")} — ${currentPage}`}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {allArticles.length} {t("articlesCount")}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article) => (
                  <div key={article.slug} className="group">
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
                        {tCommon("readMore")} <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseParams={{ category: activeCategory ?? undefined, q: params?.q }}
              />
            </section>
          )}
        </div>
      </div>

      {allArticles.length === 0 && (
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">{t("noArticlesTitle")}</h2>
          <p className="text-muted-foreground">
            {activeCategory || query ? t("noArticlesFiltered") : t("noArticlesEmpty")}
          </p>
        </div>
      )}
    </div>
  )
}

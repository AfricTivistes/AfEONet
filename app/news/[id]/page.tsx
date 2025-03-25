
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Share2, Tag, User } from "lucide-react"

// Données d'exemple pour les articles
const newsArticles = [
  {
    id: 1,
    title: "AfEONet Launches New Civic Space Monitoring Platform",
    excerpt:
      "The African Election Observers Network has launched a new platform to monitor and document the state of civic space for election observers across the continent.",
    content: `
      <p>The African Election Observers Network (AfEONet) is proud to announce the launch of its new Civic Space Monitoring Platform, a comprehensive digital tool designed to track, document, and analyze the state of civic space for election observers across Africa.</p>

      <p>This innovative platform represents a significant step forward in AfEONet's mission to strengthen democratic processes and protect the rights of citizen observers who play a crucial role in ensuring electoral integrity.</p>

      <h2>Key Features of the Platform</h2>

      <p>The new platform offers several groundbreaking features:</p>

      <ul>
        <li>Real-time monitoring of civic space conditions in all African countries</li>
        <li>Interactive maps and visualizations of civic space trends</li>
        <li>Comprehensive database of incidents and restrictions affecting election observers</li>
        <li>Secure reporting mechanism for observers to document challenges and threats</li>
        <li>Resource library with legal frameworks and best practices</li>
      </ul>

      <p>"This platform represents years of collaborative work and research," said the Director of AfEONet. "By providing a centralized system for monitoring civic space, we can better identify patterns of restriction, advocate for observer rights, and ultimately strengthen democratic processes across the continent."</p>

      <h2>Collaborative Development</h2>

      <p>The platform was developed in partnership with leading technology experts and with input from election observer groups across Africa. It incorporates the eight dimensions of civic space that AfEONet has identified as critical for effective election observation.</p>

      <p>The launch event, held virtually with participants from over 30 African countries, included demonstrations of the platform's capabilities and training sessions for focal persons who will be responsible for data collection and verification.</p>

      <h2>Looking Forward</h2>

      <p>In the coming months, AfEONet will conduct regional training workshops to ensure that observer groups across the continent can effectively utilize the platform. The organization also plans to publish quarterly reports based on data collected through the system.</p>

      <p>"We invite all stakeholders in the democratic process—observer groups, electoral management bodies, civil society organizations, and international partners—to engage with this platform and contribute to its development," said the AfEONet Coordinator for Technology and Innovation.</p>

      <p>The platform is now accessible at <a href="https://monitor.afeonet.org">monitor.afeonet.org</a>, with options for secure reporting and data visualization.</p>
    `,
    date: "May 15, 2023",
    author: "AfEONet Team",
    category: "Announcements",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Platform", "Launch", "Monitoring"],
    relatedArticles: [2, 5, 6],
  },
  {
    id: 2,
    title: "Report: Civic Space Deteriorating in Several African Countries",
    excerpt:
      "A new report by AfEONet highlights concerning trends in civic space restrictions for election observers in multiple African countries over the past year.",
    date: "April 22, 2023",
    author: "Research Team",
    category: "Reports",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Report", "Civic Space", "Restrictions"],
  },
  {
    id: 5,
    title: "AfEONet Partners with International Organizations to Strengthen Observer Networks",
    excerpt:
      "New partnerships with international democracy support organizations aim to strengthen the capacity and reach of election observer networks across Africa.",
    date: "February 15, 2023",
    author: "Partnerships Team",
    category: "Partnerships",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Partnerships", "Collaboration", "International"],
  },
  {
    id: 6,
    title: "Technology and Election Observation: New Tools for Democratic Oversight",
    excerpt:
      "AfEONet explores how new technologies are transforming election observation methodologies and enhancing the effectiveness of democratic oversight.",
    date: "January 20, 2023",
    author: "Tech Team",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Technology", "Innovation", "Digital"],
  },
]

async function getData(id: string) {
  const articleId = Number.parseInt(id)
  const article = newsArticles.find((a) => a.id === articleId)
  
  if (!article) {
    return null
  }

  const relatedArticles = article.relatedArticles
    ? article.relatedArticles
        .map((id) => newsArticles.find((a) => a.id === id))
        .filter((a): a is (typeof newsArticles)[0] => a !== undefined)
    : []

  return { article, relatedArticles }
}

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { id } = await params
  const data = await getData(id)

  if (!data) {
    notFound()
  }

  const { article, relatedArticles } = data

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="w-fit">
          <Link href="/news" className="flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to all news
          </Link>
        </Button>

        <div>
          <Badge className="mb-4 bg-secondary text-primary">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" priority />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }} />
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share this article
          </Button>
        </div>

        {relatedArticles.length > 0 && (
          <>
            <Separator className="my-8" />

            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Card
                    key={related.id}
                    className="overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 text-xs bg-secondary text-primary">{related.category}</Badge>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/news/${related.id}`}>{related.title}</Link>
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">{related.date}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

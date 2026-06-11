import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, MapPin, Users, AlertTriangle, Newspaper } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getReport, getRelatedReports, getRelatedAlerts } from "@/lib/reports"
import { getNewsByCountry } from "@/lib/news"
import { DIMENSION_LABELS, statusLabel, type CountryDimensions } from "@/lib/countries"

interface ReportPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ReportPageProps) {
  const { id } = await params
  const report = await getReport(id)
  if (!report) return { title: 'Report Not Found - AfEONet' }
  return { title: `${report.title} - AfEONet`, description: report.summary }
}

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color = score >= 7 ? "bg-green-500" : score >= 5 ? "bg-yellow-500" : score >= 3 ? "bg-orange-500" : "bg-red-500"
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono w-5 text-right text-muted-foreground">{score}</span>
    </div>
  )
}

const DIM_KEYS = Object.keys(DIMENSION_LABELS) as (keyof CountryDimensions)[]

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params
  const report = await getReport(id)

  if (!report) notFound()

  const [relatedAlerts, relatedNews] = await Promise.all([
    getRelatedAlerts(report.country),
    Promise.resolve(getNewsByCountry(report.country)),
  ])

  const otherReports = (await getRelatedReports(report.country)).filter((r) => r.slug !== report.slug)

  const hasDimensions = report.dimensions && Object.keys(report.dimensions).length > 0

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      <div className="border-b bg-white dark:bg-slate-900">
        <div className="container py-4">
          <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
            <Link href="/reports">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Link>
          </Button>
        </div>
      </div>

      <section className="bg-primary py-8 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className={`status-${report.status} w-fit border-none`}>{report.country}</Badge>
              {report.composite && (
                <Badge variant="secondary" className="w-fit">
                  Score: {report.composite}/10 — {statusLabel(report.status as never)}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {report.region ?? report.country}
              </div>
              {report.authors && (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {report.authors.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {/* Dimension scores panel */}
            {hasDimensions && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-primary mb-4">
                  Dimension Scores — {report.country} (2025)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIM_KEYS.map((k) => {
                    const score = report.dimensions?.[k]
                    if (score === undefined) return null
                    return (
                      <div key={k}>
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">{DIMENSION_LABELS[k]}</p>
                        <ScoreBar score={score} />
                      </div>
                    )
                  })}
                </div>
                <Link
                  href={`/dashboard?view=country&country=${report.iso2 ?? ""}`}
                  className="mt-4 inline-block text-sm text-primary hover:underline"
                >
                  View in dashboard →
                </Link>
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <div className="p-8 border-b">
                <h2 className="text-xl font-semibold mb-4 text-primary">Executive Summary</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{report.summary}</p>
              </div>
              <div className="p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => <h1 className="text-2xl font-bold mb-6 text-primary border-b pb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-semibold mb-4 text-primary mt-8">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-medium mb-3 text-primary mt-6">{children}</h3>,
                      p: ({ children }) => <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="mb-4 space-y-2 text-muted-foreground list-disc list-inside">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-4 space-y-2 text-muted-foreground list-decimal list-inside">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
                      strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                    }}
                  >
                    {report.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Related alerts */}
            {relatedAlerts.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Related Alerts — {report.country}
                </h2>
                <div className="space-y-3">
                  {relatedAlerts.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/reports/${a.slug}`}
                      className="block p-3 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <Badge
                          className={`text-xs shrink-0 ${a.severity === "critical" ? "bg-red-500" : a.severity === "high" ? "bg-orange-500" : a.severity === "medium" ? "bg-yellow-500" : "bg-blue-500"} text-white border-none`}
                        >
                          {a.severity}
                        </Badge>
                        <p className="text-sm font-medium">{a.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-0">{a.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related news */}
            {relatedNews.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Newspaper className="h-4 w-4" /> Related News — {report.country}
                </h2>
                <div className="space-y-3">
                  {relatedNews.slice(0, 4).map((n) => (
                    <Link
                      key={n.slug}
                      href={`/news/${n.slug}`}
                      className="block p-3 rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    >
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.date} · {n.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-primary mb-4">Report Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</div>
                  <Badge className={`status-${report.status} border-none mt-1`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                </div>
                {report.composite && (
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Composite Score</div>
                    <div className="font-bold text-primary">{report.composite}/10</div>
                  </div>
                )}
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</div>
                  <div>{new Date(report.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</div>
                  <div>{report.country}</div>
                </div>
                {report.region && (
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Region</div>
                    <div>{report.region}</div>
                  </div>
                )}
                {report.authors && (
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Authors</div>
                    <div>{report.authors.join(', ')}</div>
                  </div>
                )}
                {report.source && (
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Source</div>
                    <div className="text-xs">{report.source}</div>
                  </div>
                )}
              </div>
            </div>

            {report.downloadUrl && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Download</h3>
                <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
                  <a href={report.downloadUrl}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              </div>
            )}

            {report.iso2 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Explore</h3>
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full border-primary/20 text-primary text-sm">
                    <Link href={`/dashboard?view=country&country=${report.iso2}`}>
                      Country Dashboard →
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-primary/20 text-primary text-sm">
                    <Link href={`/dashboard?view=comparison&country=${report.iso2}`}>
                      Compare Countries →
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {otherReports.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Other {report.country} Reports</h3>
                <div className="space-y-2">
                  {otherReports.map((r) => (
                    <Link key={r.slug} href={`/reports/${r.slug}`} className="block text-sm text-primary hover:underline">
                      {r.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {report.tags && report.tags.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-primary mb-3">Browse</h3>
              <div className="space-y-2 text-sm">
                <Link href="/reports" className="block text-primary hover:underline">All Reports →</Link>
                <Link href="/reports#alerts" className="block text-primary hover:underline">All Alerts →</Link>
                <Link href="/dashboard" className="block text-primary hover:underline">Dashboard →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

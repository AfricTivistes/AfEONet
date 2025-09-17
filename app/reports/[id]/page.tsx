import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, MapPin, Users } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getReport } from "@/lib/reports"

interface ReportPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ReportPageProps) {
  const { id } = await params
  const report = await getReport(id)
  
  if (!report) {
    return {
      title: 'Report Not Found - AfEONet',
      description: 'The requested report could not be found.',
    }
  }

  return {
    title: `${report.title} - AfEONet`,
    description: report.summary,
  }
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params
  const report = await getReport(id)

  if (!report) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Header Navigation */}
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

      {/* Report Header */}
      <section className="bg-primary py-8 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <Badge className={`status-${report.status} w-fit border-none`}>
              {report.country}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">{report.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(report.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {report.country}
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

      {/* Report Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              {/* Summary */}
              <div className="p-8 border-b">
                <h2 className="text-xl font-semibold mb-4 text-primary">Executive Summary</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {report.summary}
                </p>
              </div>

              {/* Full Content */}
              <div className="p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold mb-6 text-primary border-b pb-2">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-semibold mb-4 text-primary mt-8">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-lg font-medium mb-3 text-primary mt-6">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="mb-4 text-muted-foreground leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-4 space-y-2 text-muted-foreground list-disc list-inside">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-4 space-y-2 text-muted-foreground list-decimal list-inside">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="mb-1">{children}</li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                          {children}
                        </blockquote>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-primary">{children}</strong>
                      ),
                    }}
                  >
                    {report.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Download Action */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Download Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the full report in PDF format with all appendices and data.
                </p>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              {/* Report Details */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Report Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <Badge className={`status-${report.status} border-none mt-1`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Publication Date</div>
                    <div className="text-sm text-foreground">
                      {new Date(report.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Country/Region</div>
                    <div className="text-sm text-foreground">{report.country}</div>
                  </div>
                  {report.authors && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Authors</div>
                      <div className="text-sm text-foreground">
                        {report.authors.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {report.tags && report.tags.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-primary mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Reports */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Related</h3>
                <div className="space-y-3">
                  <Link 
                    href="/reports"
                    className="block text-sm text-primary hover:underline"
                  >
                    Browse all reports →
                  </Link>
                  <Link 
                    href="/alerts"
                    className="block text-sm text-primary hover:underline"
                  >
                    View recent alerts →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
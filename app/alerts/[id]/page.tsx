import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Calendar, MapPin, AlertTriangle, Info, AlertCircle, XCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getAlert } from "@/lib/reports"

interface AlertPageProps {
  params: Promise<{
    id: string
  }>
}

function getSeverityIcon(severity: string) {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return <XCircle className="h-4 w-4" />
    case 'high':
      return <AlertTriangle className="h-4 w-4" />
    case 'medium':
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Info className="h-4 w-4" />
  }
}

function getSeverityColor(severity: string) {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
    case 'high':
      return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200'
    case 'medium':
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
    default:
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
  }
}

export async function generateMetadata({ params }: AlertPageProps) {
  const { id } = await params
  const alert = await getAlert(id)
  
  if (!alert) {
    return {
      title: 'Alert Not Found - AfEONet',
      description: 'The requested alert could not be found.',
    }
  }

  return {
    title: `${alert.title} - AfEONet Alert`,
    description: alert.description,
  }
}

export default async function AlertPage({ params }: AlertPageProps) {
  const { id } = await params
  const alert = await getAlert(id)

  if (!alert) {
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
              Back to Reports & Alerts
            </Link>
          </Button>
        </div>
      </div>

      {/* Alert Header */}
      <section className="bg-primary py-8 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`status-${alert.status} w-fit border-none`}>
                {alert.country}
              </Badge>
              {alert.severity && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {alert.severity.toUpperCase()} PRIORITY
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{alert.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(alert.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {alert.country}
              </div>
              {alert.region && (
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  {alert.region}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Alert Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Severity Alert */}
              {alert.severity && (
                <Alert className={getSeverityColor(alert.severity)}>
                  {getSeverityIcon(alert.severity)}
                  <AlertTitle className="font-bold">
                    {alert.severity.toUpperCase()} SEVERITY ALERT
                  </AlertTitle>
                  <AlertDescription>
                    {alert.description}
                  </AlertDescription>
                </Alert>
              )}

              {/* Main Content */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8">
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
                      em: ({ children }) => (
                        <em className="italic text-muted-foreground">{children}</em>
                      ),
                    }}
                  >
                    {alert.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Alert Details */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-primary mb-4">Alert Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Severity Level</div>
                    <div className="flex items-center mt-1">
                      {getSeverityIcon(alert.severity || 'low')}
                      <span className="ml-2 text-sm font-medium">
                        {alert.severity?.toUpperCase() || 'LOW'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Civic Space Status</div>
                    <Badge className={`status-${alert.status} border-none mt-1`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Alert Date</div>
                    <div className="text-sm text-foreground">
                      {new Date(alert.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Country/Region</div>
                    <div className="text-sm text-foreground">{alert.country}</div>
                  </div>
                  {alert.region && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Regional Context</div>
                      <div className="text-sm text-foreground">{alert.region}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {alert.tags && alert.tags.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-primary mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {alert.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {alert.severity === 'critical' && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-4">
                    Emergency Support
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    If you are directly affected by this situation, contact our emergency support line.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30"
                  >
                    Contact Emergency Line
                  </Button>
                </div>
              )}

              {/* Related Items */}
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
                    href="/reports?tab=alerts"
                    className="block text-sm text-primary hover:underline"
                  >
                    View all alerts →
                  </Link>
                  <Link 
                    href="/contact"
                    className="block text-sm text-primary hover:underline"
                  >
                    Report an incident →
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
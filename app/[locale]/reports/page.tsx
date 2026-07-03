import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/pages"
import { getReports, getAlerts } from "@/lib/reports"
import { ReportsSearch } from "@/components/reports-search"
import { ReportsTabs } from "./reports-tabs"

const PER_PAGE = 6

export default async function ReportsPage({
  params: routeParams,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ rpage?: string; apage?: string; q?: string }>
}) {
  const { locale } = await routeParams
  const t = await getTranslations({ locale, namespace: "reports" })
  const params = await searchParams
  const reportsPage = Math.max(1, Number(params?.rpage) || 1)
  const alertsPage = Math.max(1, Number(params?.apage) || 1)
  const query = params?.q?.trim().toLowerCase() ?? ""

  const pageData = await getPage('reports', locale)
  const staticContent = pageData?.content || ''
  const allReportsUnfiltered = await getReports(locale)
  const allAlertsUnfiltered = await getAlerts(locale)

  const allReports = query
    ? allReportsUnfiltered.filter((r) => r.title.toLowerCase().includes(query) || r.summary.toLowerCase().includes(query) || r.country.toLowerCase().includes(query))
    : allReportsUnfiltered
  const allAlerts = query
    ? allAlertsUnfiltered.filter((a) => a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query) || a.country.toLowerCase().includes(query))
    : allAlertsUnfiltered

  const totalReportsPages = Math.ceil(allReports.length / PER_PAGE)
  const totalAlertsPages = Math.ceil(allAlerts.length / PER_PAGE)

  const reports = allReports.slice((reportsPage - 1) * PER_PAGE, reportsPage * PER_PAGE)
  const alerts = allAlerts.slice((alertsPage - 1) * PER_PAGE, alertsPage * PER_PAGE)
  
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{t("heroTitle")}</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        {staticContent && (
          <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mb-6 text-primary relative inline-block">
                    {children}
                    <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></span>
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mb-4 text-primary">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-muted-foreground list-disc list-inside">{children}</ul>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
              }}
            >
              {staticContent}
            </ReactMarkdown>
          </div>
        )}
        
        <Alert variant="default" className="border-none bg-yellow-100 dark:bg-yellow-900/20 mb-8 border-yellow-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t("devNoticeTitle")}</AlertTitle>
          <AlertDescription>
            {t("devNotice")}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Suspense fallback={null}>
            <ReportsSearch />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ReportsTabs
            reports={reports}
            alerts={alerts}
            reportsPage={reportsPage}
            alertsPage={alertsPage}
            totalReportsPages={totalReportsPages}
            totalAlertsPages={totalAlertsPages}
            q={params?.q}
          />
        </Suspense>
      </div>
    </div>
  )
}
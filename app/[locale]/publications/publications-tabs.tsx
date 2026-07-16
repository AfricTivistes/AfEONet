"use client"

import { useSearchParams } from "next/navigation"
import { useRouter, Link } from "@/lib/i18n/navigation"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ArrowRight } from "lucide-react"
import { Pagination } from "@/components/pagination"
import type { Report, Alert } from "@/lib/reports"
import { PUBLICATION_CATEGORIES, type PublicationCategory } from "@/lib/publication-categories"

const VALID_TABS = ["publications", "alerts"]
const LEGACY_TAB_ALIAS: Record<string, string> = { reports: "publications" }

interface PublicationsTabsProps {
  reports: Report[]
  alerts: Alert[]
  reportsPage: number
  alertsPage: number
  totalReportsPages: number
  totalAlertsPages: number
  q?: string
  category?: PublicationCategory
}

export function PublicationsTabs({
  reports,
  alerts,
  reportsPage,
  alertsPage,
  totalReportsPages,
  totalAlertsPages,
  q,
  category,
}: PublicationsTabsProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("publications")

  const requestedTab = searchParams.get("tab")
  const normalizedTab = requestedTab ? LEGACY_TAB_ALIAS[requestedTab] ?? requestedTab : undefined
  const activeTab = normalizedTab && VALID_TABS.includes(normalizedTab) ? normalizedTab : "publications"

  function onValueChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.replace(`/publications?${params.toString()}`, { scroll: false })
  }

  function onCategoryChange(value?: PublicationCategory) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "publications")
    if (value) params.set("category", value)
    else params.delete("category")
    params.delete("rpage")
    router.replace(`/publications?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={onValueChange} className="w-full">
      <TabsList className="bg-primary/10 p-1 rounded-lg mb-6">
        <TabsTrigger
          value="publications"
          className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
        >
          {t("tabPublications")}
        </TabsTrigger>
        <TabsTrigger
          value="alerts"
          className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
        >
          {t("tabAlerts")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="publications" className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !category ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            {t("categoryAll")}
          </button>
          {PUBLICATION_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              {t(`category-${c}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <Badge className={`status-${report.status} border-none`}>{report.country}</Badge>
                <span className="text-xs text-muted-foreground">{report.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{report.summary}</p>
              <div className="flex justify-between items-center mt-4">
                {report.downloadUrl ? (
                  <Button variant="outline" size="sm" asChild className="border-primary/20 text-primary hover:bg-primary/10">
                    <a href={report.downloadUrl}>
                      <Download className="mr-2 h-4 w-4" /> PDF
                    </a>
                  </Button>
                ) : <span />}
                <Button size="sm" asChild className="bg-secondary text-primary hover:bg-secondary/90">
                  <Link href={`/publications/${report.id}`}>
                    {t("readReport")} <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={reportsPage}
          totalPages={totalReportsPages}
          pageParam="rpage"
          baseParams={{ tab: "publications", q, category }}
        />
      </TabsContent>

      <TabsContent value="alerts" className="space-y-4">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 status-${alert.status}`}></div>
              <div className="pl-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`status-${alert.status} border-none`}>{alert.country}</Badge>
                  <span className="text-xs text-muted-foreground">{alert.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{alert.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
                <Button size="sm" asChild className="bg-primary text-white hover:bg-primary/90">
                  <Link href={`/alerts/${alert.id}`}>{t("moreDetails")}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={alertsPage}
          totalPages={totalAlertsPages}
          pageParam="apage"
          baseParams={{ tab: "alerts", q }}
        />
      </TabsContent>
    </Tabs>
  )
}

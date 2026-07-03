"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "@/lib/i18n/navigation"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Globe, Users, Shield } from "lucide-react"

const VALID_TABS = ["dimensions", "methodology", "partners"]

export function AboutTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("about")
  const tStatus = useTranslations("status")

  const requestedTab = searchParams.get("tab")
  const activeTab = requestedTab && VALID_TABS.includes(requestedTab) ? requestedTab : "dimensions"

  function onValueChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.replace(`/about?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={onValueChange} className="w-full mb-16">
      <TabsList className="bg-primary/10 p-1 rounded-lg mb-6">
        <TabsTrigger
          value="dimensions"
          className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
        >
          {t("tabDimensions")}
        </TabsTrigger>
        <TabsTrigger
          value="methodology"
          className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
        >
          {t("tabMethodology")}
        </TabsTrigger>
        <TabsTrigger
          value="partners"
          className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
        >
          {t("tabPartners")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dimensions" className="space-y-6">
        <h2 className="text-2xl font-bold text-primary mb-6">{t("dimensionsTitle")}</h2>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4">
          {t("dimensionsContext")}
        </p>
        <p className="mb-6 text-muted-foreground">
          {t("dimensionsIntro")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">1. Regulatory Framework</h3>
            <p className="text-muted-foreground">
              The regulatory framework that protects citizen observers as human rights defenders, including laws and
              institutions governing civil society organizations&apos; operations.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">2. Administrative Constraints</h3>
            <p className="text-muted-foreground">
              Accreditation procedures and other bureaucracies imposed on citizen observers, which were once
              relatively simple but have become more constraining.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">
              3. Relationship with Electoral Management Body
            </h3>
            <p className="text-muted-foreground">
              The quality and nature of the relationship between citizen observer organizations and the electoral
              management body.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">4. Security and Well-being</h3>
            <p className="text-muted-foreground">
              The use of legal and illegal mechanisms that threaten the work of citizen observer organizations,
              their leaders, staff, and volunteers.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">5. Access to Electoral Data</h3>
            <p className="text-muted-foreground">
              The procedures in place to allow citizen observers to access information on electoral management and
              processes.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">6. Access to Funding</h3>
            <p className="text-muted-foreground">
              The freedom of citizen observers to mobilize funding for election observation, the types of funding
              sources available, and whether these sources are open or controlled.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">7. Dialogue and Consultation</h3>
            <p className="text-muted-foreground">
              The platforms available for citizen observers to engage in dialogue with relevant government
              institutions, including the electoral management body, on observation recommendations and electoral
              reforms.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">8. Perception of Observers</h3>
            <p className="text-muted-foreground">
              The perception of the ruling party/regime, opposition political parties, media, and the general public
              on the role of citizen observers in democracy and the credibility of elections.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="methodology">
        <div id="scoring" className="space-y-6 scroll-mt-24">
          <h2 className="text-2xl font-bold text-primary mb-6">{t("methodologyTitle")}</h2>
          <p className="mb-6 text-muted-foreground">
            {t("methodologyIntro")}
          </p>

          <h3 className="text-xl font-semibold text-primary mb-4">{t("colorCodingTitle")}</h3>
          <p className="mb-6 text-muted-foreground">
            {t("colorCodingIntro")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="status-open p-4 rounded-md text-white text-center">
              <p className="font-semibold">{tStatus("open")}</p>
            </div>
            <div className="status-narrowed p-4 rounded-md text-black text-center">
              <p className="font-semibold">{tStatus("narrowed")}</p>
            </div>
            <div className="status-obstructed p-4 rounded-md text-white text-center">
              <p className="font-semibold">{tStatus("obstructed")}</p>
            </div>
            <div className="status-repressed p-4 rounded-md text-white text-center">
              <p className="font-semibold">{tStatus("repressed")}</p>
            </div>
            <div className="status-closed p-4 rounded-md text-white text-center">
              <p className="font-semibold">{tStatus("closed")}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-primary mb-4">{t("dataCollectionTitle")}</h3>
          <p className="text-muted-foreground mb-8">
            {t("dataCollectionText")}
          </p>

          <div className="relative w-full h-[250px] rounded-xl overflow-hidden bg-secondary/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">{t("electionObserversAtWork")}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic border-l-2 border-primary/20 pl-4">
            {t("scoresDocumentNote")}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="partners">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-6">{t("partnersTitle")}</h2>
          <p className="mb-8 text-muted-foreground">
            {t("partnersIntro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">AfricTivistes</h3>
              <p className="text-muted-foreground">
                A pan-African network of bloggers and cyber-activists for democracy.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">WAEON</h3>
              <p className="text-muted-foreground">West African Election Observers Network.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">ESN-SA</h3>
              <p className="text-muted-foreground">Electoral Support Network of Southern Africa.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">E-HORN</h3>
              <p className="text-muted-foreground">East and Horn of Africa Election Observation Network.</p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

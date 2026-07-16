import { getTranslations } from "next-intl/server"
import { DataSubmissionForm } from "@/components/data-submission-form"
import { Card, CardContent } from "@/components/ui/card"
import { DIM_KEYS } from "@/lib/countries"

export default async function SubmitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "submit" })
  const tDim = await getTranslations({ locale, namespace: "dimensions" })
  const tAbout = await getTranslations({ locale, namespace: "about" })

  const dimensions = DIM_KEYS.map((key, i) => ({ key, desc: t(`dim${i + 1}Desc`) }))

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-primary mb-4">{tAbout("dimensionsTitle")}</h3>
                <div className="space-y-4">
                  {dimensions.map(({ key, desc }, i) => (
                    <div key={key}>
                      <h4 className="font-medium text-sm">{i + 1}. {tDim(key)}</h4>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8">
              <DataSubmissionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

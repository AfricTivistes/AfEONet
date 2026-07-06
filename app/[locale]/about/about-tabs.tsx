"use client"

import { useTranslations } from "next-intl"
import { Award, Globe, Users, Shield } from "lucide-react"

export function AboutTabs() {
  const t = useTranslations("about")

  return (
    <div className="w-full mb-16 space-y-6">
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
  )
}

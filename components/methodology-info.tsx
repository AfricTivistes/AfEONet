"use client"

import { useTranslations } from "next-intl"
import { statusFill, type CivicStatus } from "@/lib/countries"

const STATUS_ORDER: CivicStatus[] = ["open", "restricted", "obstructed", "repressed", "closed"]

export function MethodologyInfo() {
  const t = useTranslations("about")
  const tStatus = useTranslations("status")

  return (
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
        {STATUS_ORDER.map((status) => (
          <div
            key={status}
            className="p-4 rounded-md text-center"
            style={{ backgroundColor: statusFill(status), color: status === "obstructed" ? "black" : "white" }}
          >
            <p className="font-semibold">{tStatus(status)}</p>
            <p className="text-xs opacity-80 mt-1">{tStatus(`scoreRange.${status}`)}</p>
          </div>
        ))}
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
  )
}

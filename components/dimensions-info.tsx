"use client"

import { useTranslations } from "next-intl"

export function DimensionsInfo() {
  const t = useTranslations("about")

  return (
    <div className="space-y-6">
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
    </div>
  )
}

"use client"

import { useTranslations } from "next-intl"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer,
} from "recharts"
import { DIM_KEYS, DIM_SHORT, GLOBAL_AVERAGES, globalCompositeAverage, scoreColor, assessedCountries } from "@/lib/countries"

export function AverageScoresChart() {
  const t = useTranslations("dashboard")
  const assessed = assessedCountries()
  const chartData = DIM_KEYS.map((k) => ({
    dim: DIM_SHORT[k],
    score: GLOBAL_AVERAGES[k],
  }))

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-bold text-primary mb-1">
        {t("averageScores")} ({t("countriesCount", { count: assessed.length })})
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {t("globalComposite")}: <strong>{globalCompositeAverage()}/10</strong>
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="dim" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => `${v}/10`} />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.dim} fill={scoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

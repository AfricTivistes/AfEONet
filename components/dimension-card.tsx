import { Info } from "lucide-react"

interface DimensionCardProps {
  title: string
  description: string
  status: "open" | "narrowed" | "obstructed" | "repressed" | "closed"
  trend: "improving" | "stable" | "deteriorating" | "unknown"
  details?: string
}

export function DimensionCard({ title, description, status, trend, details }: DimensionCardProps) {
  const statusLabels = {
    open: "Open",
    narrowed: "Narrowed",
    obstructed: "Obstructed",
    repressed: "Repressed",
    closed: "Closed",
  }

  const trendLabels = {
    improving: "Improving",
    stable: "Stable",
    deteriorating: "Deteriorating",
    unknown: "Unknown",
  }

  const trendColors = {
    improving: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-100",
    stable: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-100",
    deteriorating: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-100",
    unknown: "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-100",
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full status-${status}`}></div>
      <div className="pl-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          <Info className="h-4 w-4 text-muted-foreground">
            <title>{description}</title>
          </Info>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium status-${status} text-white`}
          >
            {statusLabels[status]}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trendColors[trend]}`}
          >
            {trendLabels[trend]}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{details || "No details available."}</p>
      </div>
    </div>
  )
}


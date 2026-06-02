import { Card, CardContent } from "@/components/ui/card"

const statuses = [
  { name: "Open/free/secure",    cls: "status-open" },
  { name: "Narrowed",            cls: "status-narrowed" },
  { name: "Obstructed",          cls: "status-obstructed" },
  { name: "Repressed/threatened",cls: "status-repressed" },
  { name: "Closed",              cls: "status-closed" },
  { name: "Not assessed",        cls: "status-unknown" },
]

export function StatusLegend() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-3">
          {statuses.map((s) => (
            <div key={s.name} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded-sm ${s.cls}`} />
              <span className="text-xs">{s.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


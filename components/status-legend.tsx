import { Card, CardContent } from "@/components/ui/card"

export function StatusLegend() {
  const statuses = [
    {
      name: "Open/free/secure",
      class: "status-open",
      description: "Civic space is fully respected and protected",
    },
    {
      name: "Narrowed",
      class: "status-narrowed",
      description: "Civic space is experiencing some restrictions",
    },
    {
      name: "Obstructed",
      class: "status-obstructed",
      description: "Civic space faces significant obstacles",
    },
    {
      name: "Repressed/threatened",
      class: "status-repressed",
      description: "Civic space is severely limited with active threats",
    },
    {
      name: "Closed",
      class: "status-closed",
      description: "Civic space is completely closed or non-existent",
    },
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <div key={status.name} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm ${status.class}`}></div>
              <span className="text-xs">{status.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


import { scoreColor } from "@/lib/countries"

export function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: scoreColor(score) }} />
      </div>
      <span className="text-xs font-mono w-6 text-right">{score}</span>
    </div>
  )
}

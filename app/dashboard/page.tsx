"use client"

import { Suspense } from "react"
import DashboardContent from "./dashboard-content"

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading dashboard…</div>}>
      <DashboardContent />
    </Suspense>
  )
}

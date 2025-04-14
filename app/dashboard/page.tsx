"use client"

import { useState } from "react"
import Link from "next/link"
import { StatusLegend } from "@/components/status-legend"
import { AfricaMap } from "@/components/africa-map"
import { CountrySelector } from "@/components/country-selector"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Download, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for demonstration
const dimensionsData = [
  {
    id: 1,
    title: "Regulatory Framework",
    description: "Regulatory framework that protects citizen observers as human rights defenders.",
    status: "narrowed" as const,
    trend: "stable" as const,
    details: "Existing laws offer limited protection to citizen observers. Some restrictions persist in practice.",
  },
  {
    id: 2,
    title: "Administrative Constraints",
    description: "Administrative constraints imposed on citizen observers.",
    status: "obstructed" as const,
    trend: "deteriorating" as const,
    details:
      "Accreditation procedures have become more complex and bureaucratic, limiting observers' ability to operate effectively.",
  },
  {
    id: 3,
    title: "Relationship with Electoral Management Body",
    description: "Relationship between citizen observer organizations and the electoral management body.",
    status: "narrowed" as const,
    trend: "improving" as const,
    details: "Communication has improved, but access to certain information remains limited.",
  },
  {
    id: 4,
    title: "Security and Well-being",
    description: "Security and well-being of citizen observers.",
    status: "repressed" as const,
    trend: "deteriorating" as const,
    details: "Threats and intimidation have been reported against observers in several regions.",
  },
  {
    id: 5,
    title: "Access to Electoral Data",
    description: "Access to electoral data and information.",
    status: "obstructed" as const,
    trend: "stable" as const,
    details: "Access to electoral data remains difficult, with significant delays in the publication of information.",
  },
  {
    id: 6,
    title: "Access to Funding",
    description: "Access to funding for citizen observers.",
    status: "repressed" as const,
    trend: "stable" as const,
    details: "Significant restrictions on foreign funding sources limit operational capabilities.",
  },
  {
    id: 7,
    title: "Dialogue and Consultation",
    description: "Dialogue and consultation on post-election monitoring with relevant government institutions.",
    status: "closed" as const,
    trend: "stable" as const,
    details: "Very few platforms exist for constructive dialogue on observation recommendations.",
  },
  {
    id: 8,
    title: "Perception of Observers",
    description: "Perception of citizen observers.",
    status: "narrowed" as const,
    trend: "improving" as const,
    details: "Perception is gradually improving, but disinformation campaigns persist.",
  },
]

export default function DashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("2023")
  const [activeTab, setActiveTab] = useState("dimensions")

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  // Helper function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "deteriorating":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  // Helper function to get trend color class
  const getTrendColorClass = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600 dark:text-green-400"
      case "deteriorating":
        return "text-red-600 dark:text-red-400"
      case "stable":
        return "text-blue-600 dark:text-blue-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Civic Space Dashboard</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              Explore data on the state of civic space for election observers in Africa.
            </p>
            <div className="mt-2">
              <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
                <Link href="/submit">Submit New Data</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <Alert
          variant="default"
          className="border-none bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 mb-8"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            The data presented is for demonstration purposes only. The platform is in development phase.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4">Civic Space Map</h2>
            <p className="text-muted-foreground mb-6">Overview of the state of civic space in Africa</p>
            <div className="w-full mb-4">
              <AfricaMap />
            </div>
            <div className="mt-6 bg-secondary/10 p-4 rounded-lg">
              <StatusLegend />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary mb-4">Filters</h2>
            <p className="text-muted-foreground mb-6">Refine the displayed data</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Country</label>
                <CountrySelector onSelect={handleCountrySelect} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Year</label>
                <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Dimension</label>
                <Select>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="All dimensions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All dimensions</SelectItem>
                    <SelectItem value="1">Regulatory Framework</SelectItem>
                    <SelectItem value="2">Administrative Constraints</SelectItem>
                    <SelectItem value="3">Relationship with Electoral Management Body</SelectItem>
                    <SelectItem value="4">Security and Well-being</SelectItem>
                    <SelectItem value="5">Access to Electoral Data</SelectItem>
                    <SelectItem value="6">Access to Funding</SelectItem>
                    <SelectItem value="7">Dialogue and Consultation</SelectItem>
                    <SelectItem value="8">Perception of Observers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90 mt-2">
                <Filter className="mr-2 h-4 w-4" /> Apply filters
              </Button>
              <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                <Download className="mr-2 h-4 w-4" /> Export data
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex rounded-lg overflow-hidden mb-8">
            <button
              className={`py-3 px-6 text-center flex-1 transition-colors ${
                activeTab === "dimensions" ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              onClick={() => setActiveTab("dimensions")}
            >
              Dimensions
            </button>
            <button
              className={`py-3 px-6 text-center flex-1 transition-colors ${
                activeTab === "trends" ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              onClick={() => setActiveTab("trends")}
            >
              Trends
            </button>
          </div>

          {activeTab === "dimensions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dimensionsData.map((dimension) => (
                <div
                  key={dimension.id}
                  className={`bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full status-${dimension.status}`}></div>
                  <div className="pl-3">
                    <h3 className="text-lg font-semibold text-primary mb-1">{dimension.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium status-${dimension.status} text-white`}
                      >
                        {dimension.status.charAt(0).toUpperCase() + dimension.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dimension.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm mb-6">
                <h2 className="text-xl font-bold text-primary mb-4">Civic Space Trends</h2>
                <p className="text-muted-foreground mb-6">Evolution of civic space dimensions over time</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dimensionsData.map((dimension) => (
                    <Card key={dimension.id} className="border-primary/10">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-md font-medium">{dimension.title}</h3>
                          <Badge
                            className={`${
                              dimension.trend === "improving"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : dimension.trend === "deteriorating"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              {getTrendIcon(dimension.trend)}
                              <span>{dimension.trend.charAt(0).toUpperCase() + dimension.trend.slice(1)}</span>
                            </div>
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                          <div className={`w-3 h-3 rounded-full status-${dimension.status}`}></div>
                          <span className="text-sm text-muted-foreground">
                            Current status: {dimension.status.charAt(0).toUpperCase() + dimension.status.slice(1)}
                          </span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-primary/10">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">2021</span>
                            <span className="text-xs text-muted-foreground">2022</span>
                            <span className="text-xs font-medium">2023</span>
                          </div>
                          <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                            <div
                              className={`absolute left-0 top-0 h-full status-${dimension.status}`}
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-bold text-primary mb-4">Overall Trend Analysis</h2>
                <div className="h-[300px] flex items-center justify-center bg-secondary/10 rounded-lg p-4">
                  <p className="text-muted-foreground">Detailed trend charts will be available in the final version.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

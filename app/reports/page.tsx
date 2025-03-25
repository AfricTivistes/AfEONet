import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Download, FileText, Search, ArrowRight } from "lucide-react"

// Sample data for demonstration
const reports = [
  {
    id: 1,
    title: "State of Civic Space in Senegal - 2023",
    date: "December 15, 2023",
    country: "Senegal",
    status: "open",
    summary:
      "This report presents a detailed analysis of civic space in Senegal in 2023, highlighting progress made and persistent challenges.",
  },
  {
    id: 2,
    title: "Administrative Constraints for Observers in Nigeria",
    date: "November 10, 2023",
    country: "Nigeria",
    status: "obstructed",
    summary: "An in-depth analysis of administrative constraints faced by election observers in Nigeria.",
  },
  {
    id: 3,
    title: "Report on Observer Security in Kenya",
    date: "October 5, 2023",
    country: "Kenya",
    status: "repressed",
    summary: "This report documents threats and security incidents affecting election observers in Kenya.",
  },
  {
    id: 4,
    title: "Access to Funding for Observers in West Africa",
    date: "September 20, 2023",
    country: "Regional",
    status: "narrowed",
    summary:
      "A comparative analysis of access to funding for election observer organizations in West African countries.",
  },
  {
    id: 5,
    title: "Relationships between Observers and Electoral Management Bodies in Southern Africa",
    date: "August 15, 2023",
    country: "Regional",
    status: "narrowed",
    summary:
      "This report examines relationships between citizen observers and electoral management bodies in Southern African countries.",
  },
  {
    id: 6,
    title: "Perception of Election Observers in Ghana",
    date: "July 1, 2023",
    country: "Ghana",
    status: "open",
    summary: "An analysis of the perception of election observers by various stakeholders in Ghana.",
  },
]

const alerts = [
  {
    id: 1,
    title: "Closure of Civic Space in Mali",
    date: "March 10, 2023",
    country: "Mali",
    status: "closed",
    description: "Malian authorities have imposed severe new restrictions on the activities of election observers.",
  },
  {
    id: 2,
    title: "Threats Against Observers in Burkina Faso",
    date: "February 5, 2023",
    country: "Burkina Faso",
    status: "repressed",
    description: "Threats have been reported against several election observers in Burkina Faso.",
  },
  {
    id: 3,
    title: "New Accreditation Procedures in Tanzania",
    date: "January 20, 2023",
    country: "Tanzania",
    status: "obstructed",
    description: "Tanzanian authorities have introduced complex new accreditation procedures for election observers.",
  },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Reports and Alerts</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              Access detailed reports and alerts on the state of civic space in Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <Alert variant="default" className="border-none bg-yellow-100 dark:bg-yellow-900/20 mb-8 border-yellow-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            The reports and alerts presented are for demonstration purposes only. The platform is in development phase.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reports..." className="pl-10 border-primary/20" />
          </div>
          <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
            <FileText className="mr-2 h-4 w-4" /> Advanced filters
          </Button>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="bg-primary/10 p-1 rounded-lg mb-6">
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
            >
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={`status-${report.status} border-none`}>{report.country}</Badge>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{report.summary}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" size="sm" className="border-primary/20 text-primary hover:bg-primary/10">
                      <Download className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button size="sm" asChild className="bg-secondary text-primary hover:bg-secondary/90">
                      <Link href={`/reports/${report.id}`}>
                        Read report <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 status-${alert.status}`}></div>
                  <div className="pl-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`status-${alert.status} border-none`}>{alert.country}</Badge>
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
                    <Button size="sm" asChild className="bg-primary text-white hover:bg-primary/90">
                      <Link href={`/alerts/${alert.id}`}>More details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


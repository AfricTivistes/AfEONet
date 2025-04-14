import { DataSubmissionForm } from "@/components/data-submission-form"
import { Card, CardContent } from "@/components/ui/card"

export default function SubmitPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Submit Data</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              Use this form to submit data on the state of civic space in your country. Your contributions are essential
              for monitoring and improving civic space for election observers.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-primary mb-4">The 8 Dimensions of Civic Space</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">1. Regulatory Framework</h4>
                    <p className="text-xs text-muted-foreground">
                      Laws and institutions governing civil society organizations.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">2. Administrative Constraints</h4>
                    <p className="text-xs text-muted-foreground">
                      Accreditation procedures and bureaucracies imposed on observers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">3. Relationship with EMB</h4>
                    <p className="text-xs text-muted-foreground">
                      Quality of relationship with the electoral management body.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">4. Security and Well-being</h4>
                    <p className="text-xs text-muted-foreground">Threats to the work and safety of observers.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">5. Access to Electoral Data</h4>
                    <p className="text-xs text-muted-foreground">
                      Access to information on electoral management and processes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">6. Access to Funding</h4>
                    <p className="text-xs text-muted-foreground">
                      Freedom to mobilize funding for election observation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">7. Dialogue and Consultation</h4>
                    <p className="text-xs text-muted-foreground">
                      Platforms for engagement with government institutions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">8. Perception of Observers</h4>
                    <p className="text-xs text-muted-foreground">
                      How observers are perceived by various stakeholders.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8">
              <DataSubmissionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

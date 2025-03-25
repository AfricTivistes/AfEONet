import { DataSubmissionForm } from "@/components/data-submission-form"

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
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8">
          <DataSubmissionForm />
        </div>
      </div>
    </div>
  )
}


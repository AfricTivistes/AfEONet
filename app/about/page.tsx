import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Award, Globe, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">About AfEONet</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              Discover our mission, history, and impact on election observation in Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary relative inline-block">
              Our Mission
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></span>
            </h2>
            <p className="mb-4 text-muted-foreground">
              AfEONet's mission is to monitor and document the state of civic space for citizen election observers in
              Africa. Our ultimate goal is to establish a robust monitoring framework that highlights and reports
              whenever the work of citizen observers is threatened.
            </p>
            <p className="text-muted-foreground">
              Citizen election observers are now recognized as human rights defenders, playing an indispensable role in
              upholding civil and political rights, as well as strengthening democratic values and principles.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-lg">
              <Image src="/AfEONet-Logo-Green.jpeg" alt="AfEONet Logo" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[300px] rounded-xl overflow-hidden my-16 bg-primary">
          <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              Strengthening Democracy Through Observation
            </h2>
          </div>
        </div>

        <Tabs defaultValue="dimensions" className="w-full mb-16">
          <TabsList className="bg-primary/10 p-1 rounded-lg mb-6">
            <TabsTrigger
              value="dimensions"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
            >
              Dimensions
            </TabsTrigger>
            <TabsTrigger
              value="methodology"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
            >
              Methodology
            </TabsTrigger>
            <TabsTrigger
              value="partners"
              className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-colors"
            >
              Partners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dimensions" className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">The 8 Dimensions of Civic Space</h2>
            <p className="mb-6 text-muted-foreground">
              Our monitoring framework focuses on eight key dimensions that define civic space for election observers:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">1. Regulatory Framework</h3>
                <p className="text-muted-foreground">
                  The regulatory framework that protects citizen observers as human rights defenders, including laws and
                  institutions governing civil society organizations' operations.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">2. Administrative Constraints</h3>
                <p className="text-muted-foreground">
                  Accreditation procedures and other bureaucracies imposed on citizen observers, which were once
                  relatively simple but have become more constraining.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  3. Relationship with Electoral Management Body
                </h3>
                <p className="text-muted-foreground">
                  The quality and nature of the relationship between citizen observer organizations and the electoral
                  management body.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">4. Security and Well-being</h3>
                <p className="text-muted-foreground">
                  The use of legal and illegal mechanisms that threaten the work of citizen observer organizations,
                  their leaders, staff, and volunteers.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">5. Access to Electoral Data</h3>
                <p className="text-muted-foreground">
                  The procedures in place to allow citizen observers to access information on electoral management and
                  processes.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">6. Access to Funding</h3>
                <p className="text-muted-foreground">
                  The freedom of citizen observers to mobilize funding for election observation, the types of funding
                  sources available, and whether these sources are open or controlled.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">7. Dialogue and Consultation</h3>
                <p className="text-muted-foreground">
                  The platforms available for citizen observers to engage in dialogue with relevant government
                  institutions, including the electoral management body, on observation recommendations and electoral
                  reforms.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-primary">8. Perception of Observers</h3>
                <p className="text-muted-foreground">
                  The perception of the ruling party/regime, opposition political parties, media, and the general public
                  on the role of citizen observers in democracy and the credibility of elections.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="methodology">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Our Methodology</h2>
              <p className="mb-6 text-muted-foreground">
                AfEONet uses a rigorous methodology to assess the state of civic space for election observers. Our
                approach combines qualitative and quantitative data collection to provide a comprehensive picture of the
                situation.
              </p>

              <h3 className="text-xl font-semibold text-primary mb-4">Color Coding System</h3>
              <p className="mb-6 text-muted-foreground">
                We use a color coding system to visually represent the different civic space situations:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="status-open p-4 rounded-md text-white text-center">
                  <p className="font-semibold">Open/free/secure</p>
                </div>
                <div className="status-narrowed p-4 rounded-md text-black text-center">
                  <p className="font-semibold">Narrowed</p>
                </div>
                <div className="status-obstructed p-4 rounded-md text-white text-center">
                  <p className="font-semibold">Obstructed</p>
                </div>
                <div className="status-repressed p-4 rounded-md text-white text-center">
                  <p className="font-semibold">Repressed/threatened</p>
                </div>
                <div className="status-closed p-4 rounded-md text-white text-center">
                  <p className="font-semibold">Closed</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-primary mb-4">Data Collection Process</h3>
              <p className="text-muted-foreground mb-8">
                Our data collection process involves a network of focal persons in different African countries. These
                individuals are trained to observe and document the state of civic space according to our eight
                dimensions. The collected data is then validated by our team of administrators before being published on
                the platform.
              </p>

              <div className="relative w-full h-[250px] rounded-xl overflow-hidden bg-secondary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Election Observers at Work</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="partners">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Our Partners</h2>
              <p className="mb-8 text-muted-foreground">
                AfEONet works closely with a network of partners across Africa and beyond to promote an open and secure
                civic space for election observers.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">AfricTivistes</h3>
                  <p className="text-muted-foreground">
                    A pan-African network of bloggers and cyber-activists for democracy.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">WAEON</h3>
                  <p className="text-muted-foreground">West African Election Observers Network.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">ESN-SA</h3>
                  <p className="text-muted-foreground">Electoral Support Network of Southern Africa.</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
                  <Link href="/partners">
                    View all our partners <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-secondary/20 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Join our network</h2>
          <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
            Are you an election observer, civil society organization, or simply interested in our work? Join our network
            to contribute to monitoring civic space in Africa.
          </p>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


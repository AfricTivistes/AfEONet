import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusLegend } from "@/components/status-legend"
import { AfricaMap } from "@/components/africa-map"
import { ArrowRight, BarChart2, FileText, Send, Users, Calendar, Globe, Shield, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Données d'exemple pour les actualités récentes
const recentNews = [
  {
    id: 1,
    title: "AfEONet Launches New Civic Space Monitoring Platform",
    excerpt:
      "The African Election Observers Network has launched a new platform to monitor and document the state of civic space for election observers across the continent.",
    date: "May 15, 2023",
    category: "Announcements",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Report: Civic Space Deteriorating in Several African Countries",
    excerpt:
      "A new report by AfEONet highlights concerning trends in civic space restrictions for election observers in multiple African countries over the past year.",
    date: "April 22, 2023",
    category: "Reports",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Training Workshop for Election Observers Held in Nairobi",
    excerpt:
      "AfEONet conducted a successful training workshop for election observers from East African countries, focusing on new methodologies and digital tools.",
    date: "March 10, 2023",
    category: "Events",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Interview: The Challenges of Election Observation in Conflict Zones",
    excerpt:
      "In an exclusive interview, experienced observers discuss the unique challenges and risks of monitoring elections in conflict-affected regions of Africa.",
    date: "February 28, 2023",
    category: "Interviews",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Données pour les statistiques
const stats = [
  { value: "54", label: "African Countries", icon: Globe, color: "bg-accent-pink" },
  { value: "1000+", label: "Election Observers", icon: Users, color: "bg-accent-blue" },
  { value: "250+", label: "Reports Published", icon: FileText, color: "bg-accent-green" },
  { value: "35+", label: "Partner Organizations", icon: Shield, color: "bg-accent-purple" },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <div className="bg-secondary">
      <section className="relative py-20 md:py-32 overflow-hidden bg-primary diagonal-clip">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-white">
                  Monitoring Civic Space for Citizen Election Observers
                </h1>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                  AfEONet monitors and documents civic space for citizen election observers in Africa.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-1 bg-secondary text-primary hover:bg-secondary/90">
                  <Link href="/dashboard">
                    View data <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-white/20 text-white border border-white/40 hover:bg-white/30">
                  <Link href="/about">About AfEONet</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 flex items-center justify-center">
              <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden">
                <Image src="/AfEONet-Logo-Green.jpeg" alt="AfEONet Logo" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-primary/80 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary relative inline-block">
                Our Mission
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></span>
              </h2>
              <p className="mb-4 text-muted-foreground">
                AfEONet's mission is to monitor and document the state of civic space for citizen election observers in
                Africa. Our ultimate goal is to establish a robust monitoring framework that highlights and reports
                whenever the work of citizen observers is threatened.
              </p>
              <p className="text-muted-foreground">
                Citizen election observers are now recognized as human rights defenders, playing an indispensable role
                in upholding civil and political rights, as well as strengthening democratic values and principles.
              </p>
              <div className="mt-8">
                <Button asChild className="bg-primary text-white hover:bg-primary/90">
                  <Link href="/about">
                    Learn more about our mission <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Election observers at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-lg font-medium">Citizen observers monitoring elections in Africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mini Dashboard Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Overview of Civic Space in Africa</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Explore the current state of civic space for election observers across the continent.
            </p>
          </div>
          <div className="mt-8">
            <AfricaMap />
          </div>
          <div className="mt-4">
            <StatusLegend />
          </div>
          <div className="mt-8 text-center">
            <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
              <Link href="/dashboard">
                View full dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
            <p className="max-w-[700px] text-primary-foreground/80 md:text-lg">
              Discover how AfEONet helps you understand and improve civic space.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/10 border-none">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-secondary rounded-full">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Data Visualization</h3>
                <p className="text-primary-foreground/80">
                  Explore civic space data through interactive visualizations and maps.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-secondary rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Detailed Reports</h3>
                <p className="text-primary-foreground/80">
                  Access comprehensive reports on the state of civic space in different African countries.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-secondary rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Observer Network</h3>
                <p className="text-primary-foreground/80">
                  Join a network of citizen observers dedicated to monitoring and improving civic space.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-none">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-secondary rounded-full">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">Submit Data</h3>
                <p className="text-primary-foreground/80">
                  Contribute to our database by submitting your observations on civic space in your country.
                </p>
                <Button asChild size="sm" className="mt-2 bg-secondary text-primary hover:bg-secondary/90">
                  <Link href="/submit">Submit Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section - Simplified */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Latest News</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
              Stay updated with the latest developments, reports, and activities from AfEONet
            </p>
          </div>

          {/* Featured Article - Simplified */}
          <div className="bg-secondary/10 p-8 rounded-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src={recentNews[0].image || "/placeholder.svg"}
                  alt={recentNews[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-secondary text-primary">{recentNews[0].category}</Badge>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-primary">{recentNews[0].title}</h3>
                <p className="text-muted-foreground">{recentNews[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{recentNews[0].date}</span>
                  </div>
                </div>
                <Button asChild className="w-fit bg-primary text-white hover:bg-primary/90">
                  <Link href={`/news/${recentNews[0].id}`}>
                    Read full article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Other Recent Articles - Simplified Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.slice(1, 4).map((article) => (
              <div key={article.id}>
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-secondary text-primary">{article.category}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Link href={`/news/${article.id}`} className="text-primary text-sm font-medium">
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
              <Link href="/news">
                View all news <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary wave-clip">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-3xl font-bold md:text-4xl text-primary">Join us in this mission</h2>
              <p className="text-primary/80 md:text-lg">
                Contribute to monitoring civic space and help strengthen democracy in Africa. Together, we can make a
                difference in promoting transparent and fair elections across the continent.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row mt-4">
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary border-primary hover:bg-primary/10"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-primary border-primary hover:bg-primary/10"
              >
                <Link href="/submit">Submit Data</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Impact Across Africa</h2>
              <p className="text-muted-foreground mb-6">
                AfEONet has been working tirelessly to monitor and improve civic space for election observers across
                Africa. Our network spans the continent, providing crucial data and insights that help strengthen
                democratic processes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-accent-pink w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Improved Observer Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhanced safety protocols and advocacy for observer rights.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent-blue w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Data-Driven Advocacy</h3>
                    <p className="text-sm text-muted-foreground">
                      Evidence-based approach to improving civic space policies.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent-green w-6 h-6 rounded-full flex items-center justify-center mt-1 mr-3">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Capacity Building</h3>
                    <p className="text-sm text-muted-foreground">
                      Training and resources for observer organizations across the continent.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild className="bg-secondary text-primary hover:bg-secondary/90">
                  <Link href="/about">
                    Learn more about our work <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=500&width=500" alt="AfEONet Impact" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


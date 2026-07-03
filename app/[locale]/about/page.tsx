import { Suspense } from "react"
import Image from "next/image"
import { Link } from "@/lib/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/pages"
import { notFound } from "next/navigation"
import { AboutTabs } from "./about-tabs"

export const metadata = {
  title: "About AfEONet - African Election Observers Network",
  description: "Discover our mission, history, and impact on election observation in Africa. Learn about our 8-dimension monitoring framework for civic space.",
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })
  const tFooter = await getTranslations({ locale, namespace: "footer" })
  const pageData = await getPage('about', locale)

  if (!pageData) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{t("heroTitle")}</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold tracking-tight text-primary mb-6">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mb-6 text-primary relative inline-block">
                    {children}
                    <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></span>
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mb-4 text-primary">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                ),
                a: ({ children, href }) => (
                  <Link href={href || '#'} className="text-primary hover:text-primary/80 underline">
                    {children}
                  </Link>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 space-y-2 text-muted-foreground list-disc list-inside">{children}</ul>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
              }}
            >
              {pageData.content}
            </ReactMarkdown>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-lg">
              <Image src="/AfEONet-Logo-Green.jpeg" alt="AfEONet Logo" fill className="object-contain" sizes="300px" />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[300px] rounded-xl overflow-hidden my-16 bg-primary">
          <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              {t("bannerTitle")}
            </h2>
          </div>
        </div>

        <Suspense fallback={null}>
          <AboutTabs />
        </Suspense>

        <div className="bg-secondary/20 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">{t("joinNetworkTitle")}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
            {t("joinNetworkText")}
          </p>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
            <Link href="/contact">{tFooter("contactUs")}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
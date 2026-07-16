import Image from "next/image"
import { Link } from "@/lib/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/pages"
import { getAboutSections } from "@/lib/about"
import { notFound } from "next/navigation"
import { aboutMarkdownComponents } from "./markdown-components"
import { AboutSections } from "./about-sections"

export const metadata = {
  title: "About AfEONet - African Election Observers Network",
  description: "Discover our mission, vision, values, and impact on election observation in Africa.",
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about" })
  const tFooter = await getTranslations({ locale, namespace: "footer" })
  const pageData = await getPage('about', locale)
  const sections = await getAboutSections(locale)

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
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={aboutMarkdownComponents}>
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

        <AboutSections sections={sections} />

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
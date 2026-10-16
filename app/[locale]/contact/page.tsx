import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getContactPage } from "@/lib/contact"
import { ContactForm } from "@/components/contact-form"
import { FAQSection } from "@/components/faq-section"
import { Mail, MapPin, Phone } from "lucide-react"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const pageData = await getContactPage(locale)
  return {
    title: `${pageData?.title || "Contact Us"} - AfEONet`,
    description: pageData?.description || "We're here to answer your questions and receive your feedback.",
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })
  const pageData = await getContactPage(locale)

  const contactDetails = [
    { icon: Mail, label: t("emailLabel"), value: pageData?.email, href: pageData?.email ? `mailto:${pageData.email}` : undefined },
    { icon: Phone, label: t("phoneLabel"), value: pageData?.phone, href: pageData?.phone ? `tel:${pageData.phone.replace(/[^\d+]/g, "")}` : undefined },
    { icon: MapPin, label: t("addressLabel"), value: pageData?.address },
  ].filter((detail) => detail.value)

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{pageData?.hero?.title || t("heroTitle")}</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              {pageData?.hero?.subtitle || t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-8">
            {(pageData?.intro || contactDetails.length > 0) && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-primary mb-6">{pageData?.infoTitle || t("infoTitle")}</h2>
                {pageData?.intro && <p className="text-muted-foreground mb-6">{pageData.intro}</p>}
                <div className="space-y-6">
                  {contactDetails.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">{label}</h3>
                        {href ? (
                          <a href={href} className="text-muted-foreground hover:text-primary">
                            {value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pageData && pageData.faq.length > 0 && (
              <FAQSection title={pageData.faqTitle || t("faqTitle")} items={pageData.faq} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

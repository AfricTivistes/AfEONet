import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/pages"
import { ContactForm } from "@/components/contact-form"
import { FAQSection } from "@/components/faq-section"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata = {
  title: "Contact Us - AfEONet",
  description: "We're here to answer your questions and receive your feedback.",
}

export default async function ContactPage() {
  const pageData = await getPage('contact')
  const staticContent = pageData?.content || ''

  return (
    <div className="flex flex-col min-h-screen bg-secondary/5">
      {/* Hero Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-primary-foreground/80 max-w-2xl">
              We're here to answer your questions and receive your feedback.
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
            {staticContent && (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-primary mb-6">{children}</h2>
                      </div>
                    ),
                    h3: ({ children }) => {
                      const content = String(children)
                      if (content === 'Email') {
                        return (
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-primary">Email</h3>
                            </div>
                          </div>
                        )
                      }
                      if (content === 'Phone') {
                        return (
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-primary">Phone</h3>
                            </div>
                          </div>
                        )
                      }
                      if (content === 'Address') {
                        return (
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-primary">Address</h3>
                            </div>
                          </div>
                        )
                      }
                      return <h3 className="font-medium text-primary">{children}</h3>
                    },
                    p: ({ children }) => {
                      const content = String(children)
                      if (content.includes('contact@afeonet.org')) {
                        return <p className="text-muted-foreground">contact@afeonet.org</p>
                      }
                      if (content.includes('+123 456 7890')) {
                        return <p className="text-muted-foreground">+123 456 7890</p>
                      }
                      if (content.includes('123 Democracy Street')) {
                        return (
                          <p className="text-muted-foreground">
                            123 Democracy Street<br />
                            Dakar, Senegal
                          </p>
                        )
                      }
                      return <p className="text-muted-foreground mb-4">{children}</p>
                    },
                    ul: ({ children }) => (
                      <div className="space-y-6">{children}</div>
                    ),
                    li: ({ children }) => <div className="mb-4">{children}</div>,
                  }}
                >
                  {staticContent}
                </ReactMarkdown>
              </div>
            )}
            
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  )
}
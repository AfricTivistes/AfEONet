"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, MapPin, Phone } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must contain at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must contain at least 5 characters" }),
  message: z.string().min(10, { message: "Message must contain at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      form.reset()
    }, 1500)
  }

  const faqs = [
    {
      question: "What is AfEONet?",
      answer:
        "AfEONet (African Election Observers Network) is a network of citizen election observers in Africa. Our platform monitors and documents the state of civic space for election observers across the continent.",
    },
    {
      question: "How can I become a focal person?",
      answer:
        "To become a focal person and contribute to collecting data on civic space, please contact us through the form on this page by selecting the 'Become a focal person' category. Our team will contact you with more information.",
    },
    {
      question: "Is the data accessible to the public?",
      answer:
        "Yes, all validated data is accessible to the public through our dashboard. We believe in transparency and knowledge sharing to strengthen civic space in Africa.",
    },
    {
      question: "How can I report a civic space violation?",
      answer:
        "You can report a civic space violation through our contact form by selecting the 'Report a violation' category. Please provide as much detail as possible to help us verify and document the incident.",
    },
    {
      question: "Does AfEONet offer training?",
      answer:
        "Yes, AfEONet offers training for election observers and civil society organizations on monitoring civic space. Contact us for more information about our training programs.",
    },
  ]

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
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Contact Form</h2>
              <p className="text-muted-foreground mb-6">
                Fill out this form to send us a message. We'll respond as soon as possible.
              </p>

              {isSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">
                    Message sent successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-400 mb-6">
                    Thank you for contacting us. We'll respond as soon as possible.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} className="bg-primary text-white hover:bg-primary/90">
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" className="border-primary/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" className="border-primary/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-primary/20">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General question</SelectItem>
                              <SelectItem value="technical">Technical support</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="focal-person">Become a focal person</SelectItem>
                              <SelectItem value="violation">Report a violation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" className="border-primary/20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className="min-h-[150px] border-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide as much detail as possible to help us better respond to you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary text-white hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">Email</h3>
                    <p className="text-muted-foreground">contact@afeonet.org</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">Phone</h3>
                    <p className="text-muted-foreground">+123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">Address</h3>
                    <p className="text-muted-foreground">
                      123 Democracy Street
                      <br />
                      Dakar, Senegal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-primary mb-4">FAQ</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-primary/10">
                    <AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


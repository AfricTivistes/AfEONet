"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    question: "What is AfEONet?",
    answer: "AfEONet (African Election Observers Network) is a network of citizen election observers in Africa. Our platform monitors and documents the state of civic space for election observers across the continent."
  },
  {
    question: "How can I become a focal person?",
    answer: "To become a focal person and contribute to collecting data on civic space, please contact us through the form by selecting the 'Become a focal person' category. Our team will contact you with more information."
  },
  {
    question: "Is the data accessible to the public?",
    answer: "Yes, all validated data is accessible to the public through our dashboard. We believe in transparency and knowledge sharing to strengthen civic space in Africa."
  },
  {
    question: "How can I report a civic space violation?",
    answer: "You can report a civic space violation through our contact form by selecting the 'Report a violation' category. Please provide as much detail as possible to help us verify and document the incident."
  },
  {
    question: "Does AfEONet offer training?",
    answer: "Yes, AfEONet offers training for election observers and civil society organizations on monitoring civic space. Contact us for more information about our training programs."
  }
]

export function FAQSection() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
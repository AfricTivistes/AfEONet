"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { FAQItem } from "@/lib/contact"

export function FAQSection({ title, items }: { title: string; items: FAQItem[] }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-primary mb-6">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground whitespace-pre-line">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

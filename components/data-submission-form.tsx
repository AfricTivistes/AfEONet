"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronRight, ChevronLeft, Save, Send, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const formSchema = z.object({
  country: z.string().min(1, { message: "Please select a country" }),
  dataEntrant: z.string().min(1, { message: "Please enter your name" }),
  date: z.string().min(1, { message: "Please enter a date" }),

  // Dimension 1
  regulatoryFrameworkRating: z.string().min(1, { message: "Please select a rating" }),
  regulatoryFrameworkTrend: z.string().min(1, { message: "Please select a trend" }),
  regulatoryFrameworkContext: z.string().optional(),

  // Dimension 2
  administrativeConstraintsRating: z.string().min(1, { message: "Please select a rating" }),
  administrativeConstraintsTrend: z.string().min(1, { message: "Please select a trend" }),
  administrativeConstraintsContext: z.string().optional(),

  // Dimension 3
  relationshipRating: z.string().min(1, { message: "Please select a rating" }),
  relationshipTrend: z.string().min(1, { message: "Please select a trend" }),
  relationshipContext: z.string().optional(),

  // Other dimensions would follow the same pattern
})

export function DataSubmissionForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      dataEntrant: "",
      date: new Date().toISOString().split("T")[0],
      regulatoryFrameworkRating: "",
      regulatoryFrameworkTrend: "",
      regulatoryFrameworkContext: "",
      administrativeConstraintsRating: "",
      administrativeConstraintsTrend: "",
      administrativeConstraintsContext: "",
      relationshipRating: "",
      relationshipTrend: "",
      relationshipContext: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here, you would send the data to the server
    alert("Data submitted successfully!")
    // Don't reset the form here to avoid potential state issues
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const saveAsDraft = () => {
    try {
      const values = form.getValues()
      localStorage.setItem("formDraft", JSON.stringify(values))
      alert("Draft saved!")
    } catch (error) {
      console.error("Error saving draft:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">Submit Civic Space Data</h2>
      <p className="text-muted-foreground mb-6">
        Step {step} of {totalSteps} - {step === 1 ? "General Information" : `Dimension ${step - 1}`}
      </p>
      <div className="w-full bg-secondary/20 h-2 mb-8 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300 ease-in-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-primary/20">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="senegal">Senegal</SelectItem>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="ghana">Ghana</SelectItem>
                        <SelectItem value="south-africa">South Africa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataEntrant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" className="border-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observation date</FormLabel>
                    <FormControl>
                      <Input type="date" className="border-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-medium text-primary">Regulatory Framework</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Evaluate the regulatory framework that protects citizen observers as human rights defenders.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormField
                control={form.control}
                name="regulatoryFrameworkRating"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="open" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <span className="inline-block w-3 h-3 rounded-full status-open mr-2"></span>
                            Open/free/secure
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="narrowed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <span className="inline-block w-3 h-3 rounded-full status-narrowed mr-2"></span>
                            Narrowed
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="obstructed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <span className="inline-block w-3 h-3 rounded-full status-obstructed mr-2"></span>
                            Obstructed
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="repressed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <span className="inline-block w-3 h-3 rounded-full status-repressed mr-2"></span>
                            Repressed/threatened
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="closed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <span className="inline-block w-3 h-3 rounded-full status-closed mr-2"></span>
                            Closed
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regulatoryFrameworkTrend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trend</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-primary/20">
                          <SelectValue placeholder="Select a trend" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="improving">Improving</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="deteriorating">Deteriorating</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regulatoryFrameworkContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Context and reasons</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the context and reasons for your assessment..."
                        className="resize-none border-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about laws, policies, or events that justify your assessment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Other steps would follow the same pattern */}

          {step === totalSteps && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary mb-4">Summary and confirmation</h3>
              <p className="text-muted-foreground mb-6">
                Please review your data before submitting. Once submitted, it will be reviewed by our administrators.
              </p>

              <div className="bg-secondary/10 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm font-medium">Country:</div>
                  <div className="text-sm">{form.getValues().country || "Not specified"}</div>

                  <div className="text-sm font-medium">Observer:</div>
                  <div className="text-sm">{form.getValues().dataEntrant || "Not specified"}</div>

                  <div className="text-sm font-medium">Date:</div>
                  <div className="text-sm">{form.getValues().date || "Not specified"}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-primary/10">
            <div>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} className="border-primary/20">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={saveAsDraft} className="border-primary/20">
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} className="bg-primary text-white hover:bg-primary/90">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-secondary text-primary hover:bg-secondary/90"
                >
                  <Send className="mr-2 h-4 w-4" /> Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}


"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type Control } from "react-hook-form"
import { ChevronRight, ChevronLeft, Save, Send, HelpCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DIM_KEYS } from "@/lib/countries"
import {
  HONEYPOT_FIELD,
  RATING_VALUES,
  TREND_VALUES,
  buildDimensionDefaults,
  countryName,
  countryOptions,
  submissionSchema as formSchema,
  type DimensionKey,
  type SubmissionValues as FormValues,
} from "@/lib/submission"

const DRAFT_KEY = "formDraft"

const totalSteps = DIM_KEYS.length + 2 // general info + 8 dimensions + summary

function DimensionStep({
  control,
  dimensionKey,
  index,
}: {
  control: Control<FormValues>
  dimensionKey: DimensionKey
  index: number
}) {
  const t = useTranslations("submit")
  const tDim = useTranslations("dimensions")
  const tStatus = useTranslations("status")

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-medium text-primary">
          D{index + 1} — {tDim(dimensionKey)}
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{t(`dim${index + 1}Desc`)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-secondary/10 p-4 rounded-md mb-6">
        <p className="text-sm text-muted-foreground">{t(`dim${index + 1}Desc`)}</p>
      </div>

      <FormField
        control={control}
        name={`${dimensionKey}Rating`}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t("rating")}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value as string}
                className="flex flex-col space-y-1"
              >
                {RATING_VALUES.map((rating) => (
                  <FormItem key={rating} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={rating} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <span className={`inline-block w-3 h-3 rounded-full status-${rating} mr-2`}></span>
                      {tStatus(rating)}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${dimensionKey}Trend`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("trend")}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value as string}>
              <FormControl>
                <SelectTrigger className="border-primary/20">
                  <SelectValue placeholder={t("selectTrend")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TREND_VALUES.map((trend) => (
                  <SelectItem key={trend} value={trend}>
                    {t(trend)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${dimensionKey}Context`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("context")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("describeContext")}
                className="resize-none border-primary/20"
                {...field}
                value={field.value as string}
              />
            </FormControl>
            <FormDescription>{t("provideDetails")}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export function DataSubmissionForm() {
  const t = useTranslations("submit")
  const tDim = useTranslations("dimensions")
  const tStatus = useTranslations("status")
  const locale = useLocale()
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "invalid">("idle")
  const [honeypot, setHoneypot] = useState("")

  const emptyValues = {
    country: "",
    dataEntrant: "",
    date: new Date().toISOString().split("T")[0],
    ...buildDimensionDefaults(),
  } as FormValues

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: emptyValues,
  })

  // Restore the draft saved with the "Save" button.
  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY)
      if (draft) form.reset({ ...emptyValues, ...JSON.parse(draft) })
    } catch {
      // Unreadable draft or blocked storage: start empty.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(values: FormValues) {
    setStatus("submitting")
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, [HONEYPOT_FIELD]: honeypot }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {}
      form.reset(emptyValues)
      setStep(1)
      setStatus("success")
    } catch (error) {
      console.error("Submission failed:", error)
      setStatus("error")
    }
  }

  // Errors sit on fields of other steps: jump to the first step that has one.
  function onInvalid(errors: Partial<Record<keyof FormValues, unknown>>) {
    const fields = Object.keys(errors)
    const dimIndex = DIM_KEYS.findIndex((key) => fields.some((f) => f.startsWith(key)))
    const generalError = ["country", "dataEntrant", "date"].some((f) => fields.includes(f))
    setStep(generalError || dimIndex < 0 ? 1 : dimIndex + 2)
    setStatus("invalid")
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
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values))
      alert("Draft saved!")
    } catch (error) {
      console.error("Error saving draft:", error)
    }
  }

  const values = form.getValues()

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">{t("title")}</h2>
      <p className="text-muted-foreground mb-6">
        {t("step")} {step} {t("of")} {totalSteps} -{" "}
        {step === 1
          ? t("generalInfo")
          : step === totalSteps
          ? t("summary")
          : `${t("dimension")} ${step - 1}`}
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
                    <FormLabel>{t("country")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-primary/20">
                          <SelectValue placeholder={t("selectCountry")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryOptions.map(({ iso2, name }) => (
                          <SelectItem key={iso2} value={iso2}>
                            {name}
                          </SelectItem>
                        ))}
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
                    <FormLabel>{t("observer")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("observer")} className="border-primary/20" {...field} />
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
                    <FormLabel>{t("date")}</FormLabel>
                    <FormControl>
                      <Input type="date" className="border-primary/20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step > 1 &&
            step < totalSteps &&
            DIM_KEYS.map(
              (key, i) =>
                step === i + 2 && (
                  <DimensionStep key={key} control={form.control} dimensionKey={key} index={i} />
                )
            )}

          {step === totalSteps && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary mb-4">{t("summary")}</h3>
              <p className="text-muted-foreground mb-6">
                Please review your data before submitting. Once submitted, it will be reviewed by our administrators.
              </p>

              <div className="bg-secondary/10 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm font-medium">{t("country")}:</div>
                  <div className="text-sm">{(values.country && countryName(values.country)) || "Not specified"}</div>

                  <div className="text-sm font-medium">{t("observer")}:</div>
                  <div className="text-sm">{values.dataEntrant || "Not specified"}</div>

                  <div className="text-sm font-medium">{t("date")}:</div>
                  <div className="text-sm">{values.date || "Not specified"}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DIM_KEYS.map((key) => (
                  <div key={key} className="bg-secondary/10 rounded-lg p-4">
                    <div className="text-sm font-medium mb-1">{tDim(key)}</div>
                    <div className="text-xs text-muted-foreground">
                      {t("rating")}: {values[`${key}Rating`] ? tStatus(values[`${key}Rating`] as (typeof RATING_VALUES)[number]) : "—"}
                      {" · "}
                      {t("trend")}: {values[`${key}Trend`] ? t(values[`${key}Trend`] as (typeof TREND_VALUES)[number]) : "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Honeypot: hidden from people and assistive tech, filled only by bots. */}
          <input
            type="text"
            name={HONEYPOT_FIELD}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          {status === "success" && (
            <p role="status" className="rounded-md bg-primary/10 p-4 text-sm text-primary">
              {t("successMessage")}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
              {t("errorMessage")}
            </p>
          )}
          {status === "invalid" && (
            <p role="alert" className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
              {t("invalidMessage")}
            </p>
          )}

          <div className="flex justify-between pt-6 border-t border-primary/10">
            <div>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} className="border-primary/20">
                  <ChevronLeft className="mr-2 h-4 w-4" /> {t("previous")}
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={saveAsDraft} className="border-primary/20">
                <Save className="mr-2 h-4 w-4" /> {t("save")}
              </Button>
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} className="bg-primary text-white hover:bg-primary/90">
                  {t("next")} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit, onInvalid)}
                  disabled={status === "submitting"}
                  className="bg-secondary text-primary hover:bg-secondary/90"
                >
                  {status === "submitting" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}{" "}
                  {t("submit")}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "@/lib/i18n/navigation"
import { useTranslations } from "next-intl"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function NewsSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("news")

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) params.set("q", e.target.value)
    else params.delete("q")
    params.delete("page")
    router.replace(`/news?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="relative w-full md:w-auto max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={t("searchPlaceholder")}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={onChange}
        className="pl-10 bg-white/20 border-none text-white placeholder:text-white/60"
      />
    </div>
  )
}

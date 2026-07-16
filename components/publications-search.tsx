"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "@/lib/i18n/navigation"
import { useTranslations } from "next-intl"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PublicationsSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("publications")

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) params.set("q", e.target.value)
    else params.delete("q")
    params.delete("rpage")
    params.delete("apage")
    router.replace(`/publications?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={t("searchPlaceholder")}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={onChange}
        className="pl-10 border-primary/20"
      />
    </div>
  )
}

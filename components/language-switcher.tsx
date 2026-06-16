"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/lib/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type Language = {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (langCode: string) => {
    // Replace current locale in pathname with new locale
    router.replace(pathname, { locale: langCode })
    setOpen(false)
  }

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === locale) || languages[0]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-white hover:bg-white/10 px-2">
          <Globe className="h-4 w-4" />
          <span className="font-medium">{getCurrentLanguage().code.toUpperCase()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="end">
        <div className="py-1">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="ghost"
              className="w-full justify-start px-3 py-2 text-sm font-medium"
              onClick={() => handleLanguageChange(language.code)}
            >
              <div className="flex items-center w-full">
                <span className="mr-2">{language.flag}</span>
                <span>{language.name}</span>
                {locale === language.code && <Check className={cn("ml-auto h-4 w-4")} />}
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

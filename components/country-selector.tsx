"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const countries = [
  { value: "senegal", label: "Senegal" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "ghana", label: "Ghana" },
  { value: "south-africa", label: "South Africa" },
  { value: "cote-divoire", label: "Ivory Coast" },
  { value: "cameroon", label: "Cameroon" },
  { value: "mali", label: "Mali" },
  { value: "burkina-faso", label: "Burkina Faso" },
  { value: "tanzania", label: "Tanzania" },
]

interface CountrySelectorProps {
  onSelect: (value: string) => void
}

export function CountrySelector({ onSelect }: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      setValue(currentValue)
      onSelect(currentValue)
      setOpen(false)
    },
    [onSelect],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? countries.find((country) => country.value === value)?.label : "Select a country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search for a country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem key={country.value} value={country.value} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", value === country.value ? "opacity-100" : "opacity-0")} />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


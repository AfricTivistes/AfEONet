"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { countries, REGIONS } from "@/lib/countries"

interface CountrySelectorProps {
  value?: string
  onSelect: (value: string) => void
}

export function CountrySelector({ value: controlledValue, onSelect }: CountrySelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState("")

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      if (!isControlled) setInternalValue(currentValue)
      onSelect(currentValue)
      setOpen(false)
    },
    [isControlled, onSelect],
  )

  const selectedCountry = countries.find((c) => c.iso2 === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedCountry ? selectedCountry.name : "Select a country..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search for a country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            {REGIONS.map((region) => {
              const regionCountries = countries.filter((c) => c.region === region)
              return (
                <CommandGroup key={region} heading={region}>
                  {regionCountries.map((country) => (
                    <CommandItem key={country.iso2} value={country.iso2} onSelect={handleSelect}>
                      <Check className={cn("mr-2 h-4 w-4", value === country.iso2 ? "opacity-100" : "opacity-0")} />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

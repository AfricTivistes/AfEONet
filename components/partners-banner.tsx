import Image from "next/image"
import { PARTNERS } from "@/lib/partners"

export function PartnersBanner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {PARTNERS.map((partner) => (
        <div
          key={partner.name}
          className="flex h-20 w-40 items-center justify-center rounded-md border border-primary/20 bg-white px-4 py-2 text-center"
          title={partner.name}
        >
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={128}
              height={56}
              className="max-h-14 w-auto object-contain"
            />
          ) : (
            <span className="text-xs font-medium text-primary/70">{partner.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}

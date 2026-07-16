import Image from "next/image"
import { PARTNERS } from "@/lib/partners"

export function PartnersBanner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {PARTNERS.map((partner) => (
        <div
          key={partner.name}
          className="flex h-14 w-28 items-center justify-center rounded-md border border-primary/20 bg-white px-3 text-center"
          title={partner.name}
        >
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={partner.name}
              width={96}
              height={40}
              className="object-contain"
            />
          ) : (
            <span className="text-xs font-medium text-primary/70">{partner.name}</span>
          )}
        </div>
      ))}
    </div>
  )
}

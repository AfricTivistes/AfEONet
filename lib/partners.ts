export interface Partner {
  name: string
  logo?: string
}

// Funders and supporting organizations — shown on the homepage banner.
// Logos sourced from each organization's official website (see public/partners/).
export const PARTNERS: Partner[] = [
  { name: "AHEAD Africa", logo: "/partners/ahead-africa.svg" },
  { name: "European Union", logo: "/partners/eu.svg" },
  { name: "EPD", logo: "/partners/epd.svg" },
  { name: "Africtivistes", logo: "/partners/africtivistes.svg" },
  { name: "EPDE", logo: "/partners/epde.svg" },
  { name: "NDI", logo: "/partners/ndi.png" },
  { name: "EISA", logo: "/partners/eisa.jpg" },
]

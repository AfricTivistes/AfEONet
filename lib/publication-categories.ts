export const PUBLICATION_CATEGORIES = [
  "election-observation",
  "civic-space-annual",
  "country-specific",
] as const

export type PublicationCategory = (typeof PUBLICATION_CATEGORIES)[number]

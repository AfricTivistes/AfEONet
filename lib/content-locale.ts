import fs from 'fs'
import path from 'path'

/**
 * Resolves which file to read for a given content slug + locale.
 * English is the canonical file (`slug.en.ext`) — matches Decap CMS's
 * `i18n: multiple_files` structure, which requires a suffix on every locale
 * including the default. Other locales are optional siblings (`slug.fr.ext`)
 * — falls back to English when absent, so translating content is
 * incremental and never produces a 404.
 */
export function resolveLocalizedPath(directory: string, slug: string, ext: string, locale: string): string {
  const basePath = path.join(directory, `${slug}.en.${ext}`)
  if (locale === 'en') return basePath

  const localizedPath = path.join(directory, `${slug}.${locale}.${ext}`)
  return fs.existsSync(localizedPath) ? localizedPath : basePath
}

/**
 * Lists canonical (English) slugs in a content directory, keyed off the
 * `slug.en.ext` files — the same files Decap CMS treats as the default-locale
 * entry — so each entry is counted once regardless of which other locale
 * siblings (`slug.fr.ext`) exist.
 */
export function listCanonicalSlugs(directory: string, ext: string): string[] {
  if (!fs.existsSync(directory)) return []
  const suffix = `.en.${ext}`
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(suffix))
    .map((name) => name.slice(0, -suffix.length))
}

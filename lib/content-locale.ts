import fs from 'fs'
import path from 'path'

/**
 * Resolves which file to read for a given content slug + locale.
 * English is the canonical file (`slug.ext`, no suffix). Other locales are
 * optional siblings (`slug.fr.ext`) — falls back to English when absent, so
 * translating content is incremental and never produces a 404.
 */
export function resolveLocalizedPath(directory: string, slug: string, ext: string, locale: string): string {
  const basePath = path.join(directory, `${slug}.${ext}`)
  if (locale === 'en') return basePath

  const localizedPath = path.join(directory, `${slug}.${locale}.${ext}`)
  return fs.existsSync(localizedPath) ? localizedPath : basePath
}

/**
 * Lists canonical (English) slugs in a content directory, ignoring any
 * locale-suffixed sibling files (`slug.fr.ext`) so each entry is counted once.
 */
export function listCanonicalSlugs(directory: string, ext: string): string[] {
  if (!fs.existsSync(directory)) return []
  return fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(`.${ext}`) && !/\.[a-z]{2}\.[^.]+$/.test(name))
    .map((name) => name.slice(0, -(ext.length + 1)))
}

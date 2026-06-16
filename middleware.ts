import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // Liste des locales supportées
  locales: ['en', 'fr'],
  
  // Locale par défaut
  defaultLocale: 'en',
  
  // Redirection automatique basée sur la langue du navigateur
  localeDetection: true,
})

export const config = {
  // Exclure les routes qui ne doivent pas être internationalisées
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}

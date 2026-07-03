import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Link } from "@/lib/i18n/navigation"
import { PARTNER_NAMES } from "@/lib/partners"

function PartnerLogoPlaceholder({ name }: { name: string }) {
  return (
    <div
      className="flex h-14 w-28 items-center justify-center rounded-md border border-white/20 bg-white/5 px-3 text-center text-xs font-medium text-white/70"
      title={name}
    >
      {name}
    </div>
  )
}

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  const t = await getTranslations("footer")
  const tNav = await getTranslations("navigation")
  const tCommon = await getTranslations("common")

  return (
    <footer className="bg-primary text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="AfEONet Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">AfEONet</h3>
            </div>
            <p className="text-white/80">{t("tagline")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">{t("navigationTitle")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {tNav("dashboard")}
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {tNav("reports")}
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {tNav("submit")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">{t("resourcesTitle")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about?tab=methodology#scoring"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {t("methodology")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about?tab=partners"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  {t("partners")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">{t("contactTitle")}</h3>
            <address className="not-italic text-sm text-white/70 space-y-3">
              <p>
                {t("emailLabel")}:{" "}
                <a href="mailto:contact@afeonet.org" className="hover:text-secondary transition-colors duration-200">
                  contact@afeonet.org
                </a>
              </p>
              <p>
                {t("phoneLabel")}:{" "}
                <a href="tel:+123456789" className="hover:text-secondary transition-colors duration-200">
                  +123 456 7890
                </a>
              </p>
              <p className="mt-4">
                {t("addressLine1")}
                <br />
                {t("addressLine2")}
              </p>
            </address>
            <div className="mt-6">
              <Button asChild variant="secondary" size="sm" className="text-primary">
                <Link href="/contact">{t("contactUs")}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="mb-4 text-center text-sm font-semibold text-secondary">{tCommon("partnersTitle")}</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNER_NAMES.map((name) => (
              <PartnerLogoPlaceholder key={name} name={name} />
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-medium text-white/80">{tCommon("euCofundedBy")}</p>
          <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-white/50">{tCommon("euDisclaimer")}</p>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {currentYear} {t("copyright")}</p>
          <p className="mt-2 text-xs">
            {t("credit")}
          </p>
        </div>
      </div>
    </footer>
  )
}

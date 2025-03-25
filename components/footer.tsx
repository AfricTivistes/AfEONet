import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
            <p className="text-white/80">
              African Election Observers Network - Monitoring civic space, strengthening democracy in Africa.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-secondary transition-colors duration-200">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/reports"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Submit Data
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/methodology"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-1"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-secondary">Contact</h3>
            <address className="not-italic text-sm text-white/70 space-y-3">
              <p>
                Email:{" "}
                <a href="mailto:contact@afeonet.org" className="hover:text-secondary transition-colors duration-200">
                  contact@afeonet.org
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+123456789" className="hover:text-secondary transition-colors duration-200">
                  +123 456 7890
                </a>
              </p>
              <p className="mt-4">
                123 Democracy Street
                <br />
                Dakar, Senegal
              </p>
            </address>
            <div className="mt-6">
              <Button asChild variant="secondary" size="sm" className="text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {currentYear} AfEONet. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Designed and developed with <span className="text-red-400">❤</span> for democracy in Africa by Africtivistes
          </p>
        </div>
      </div>
    </footer>
  )
}


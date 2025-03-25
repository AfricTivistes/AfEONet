"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "News", href: "/news" },
    { name: "Reports", href: "/reports" },
    { name: "Submit Data", href: "/submit" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled ? "bg-primary/95 shadow-md" : "bg-primary"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="AfEONet Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white">AfEONet</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              asChild
              className="hidden md:flex bg-secondary text-primary hover:bg-secondary/90 transition-all duration-200"
            >
              <Link href="/login">Login</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay - separate from the header */}
      <div
        className={`fixed inset-0 z-50 bg-primary md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container py-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative w-10 h-10">
                <Image
                  src="/AfEONet-Logo__1_-removebg-preview.png"
                  alt="AfEONet Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white">AfEONet</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-white hover:text-secondary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between py-2 border-t border-white/10 mt-2">
              <span className="text-white/80">Language</span>
              <LanguageSwitcher />
            </div>
            <Button asChild className="bg-secondary text-primary hover:bg-secondary/90 w-full mt-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </>
  )
}


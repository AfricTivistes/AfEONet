import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { baseMetadata } from "@/lib/metadata"

const inter = Inter({ subsets: ["latin"] })

export const metadata = baseMetadata

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

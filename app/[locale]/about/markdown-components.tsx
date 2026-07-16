import { Link } from "@/lib/i18n/navigation"
import type { Components } from "react-markdown"

export const aboutMarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-primary mb-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mb-6 text-primary relative inline-block">
      {children}
      <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></span>
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mb-4 text-primary">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
  ),
  a: ({ children, href }) => (
    <Link href={href || '#'} className="text-primary hover:text-primary/80 underline">
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 text-muted-foreground list-disc list-inside">{children}</ul>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
}

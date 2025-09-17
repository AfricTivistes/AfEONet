import type React from "react"

interface MdxLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MdxLayout({ children, className = "" }: MdxLayoutProps) {
  return (
    <div 
      className={`
        prose 
        prose-lg
        max-w-4xl
        mx-auto
        dark:prose-invert
        prose-headings:text-primary
        prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-0
        prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8
        prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6
        prose-h4:text-xl prose-h4:font-semibold prose-h4:mb-2 prose-h4:mt-4
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-secondary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-semibold
        prose-em:text-muted-foreground
        prose-blockquote:border-secondary prose-blockquote:bg-secondary/5 
        prose-blockquote:text-muted-foreground prose-blockquote:font-normal
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
        prose-li:text-muted-foreground prose-li:mb-1
        prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 
        prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-muted prose-pre:border prose-pre:text-foreground
        prose-img:rounded-lg prose-img:shadow-sm
        prose-hr:border-border
        prose-table:text-foreground
        prose-thead:border-border
        prose-tr:border-border
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default MdxLayout
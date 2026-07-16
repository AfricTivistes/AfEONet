"use client"

import { useEffect, useState } from "react"

interface AboutNavItem {
  id: string
  label: string
}

export function AboutNav({ items }: { items: AboutNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="sticky top-16 z-30 -mx-4 mb-12 overflow-x-auto border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3">
      <ul className="flex min-w-max items-center gap-1">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeId === id
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

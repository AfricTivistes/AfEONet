import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Award, Shield, Users } from "lucide-react"
import type { AboutSection } from "@/lib/about"
import { aboutMarkdownComponents } from "./markdown-components"
import { AboutNav } from "./about-nav"

const memberIcons: Record<string, typeof Shield> = {
  "E-HORN": Shield,
  WAEON: Users,
  ESN: Award,
}

function memberIcon(title: string) {
  const key = Object.keys(memberIcons).find((k) => title.startsWith(k))
  return key ? memberIcons[key] : Users
}

function MembersGrid({ content }: { content: string }) {
  const members = content
    .split(/^### /m)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [title, ...rest] = block.split("\n")
      return { title: title.trim(), description: rest.join(" ").trim() }
    })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {members.map((member) => {
        const Icon = memberIcon(member.title)
        return (
          <div
            key={member.title}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm text-center"
          >
            <div className="mx-auto p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">{member.title}</h3>
            <p className="text-muted-foreground">{member.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export function AboutSections({ sections }: { sections: AboutSection[] }) {
  const navItems = sections.map((s) => ({ id: s.section, label: s.title }))

  return (
    <div className="mb-16">
      <AboutNav items={navItems} />

      <div className="space-y-16">
        {sections.map((s) => (
          <section key={s.slug} id={s.section} className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-6 text-primary relative inline-block">
              {s.title}
              <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-secondary"></span>
            </h2>
            {s.section === "members" ? (
              <MembersGrid content={s.content} />
            ) : (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={aboutMarkdownComponents}>
                  {s.content}
                </ReactMarkdown>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

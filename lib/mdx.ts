import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getMDXContent(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath)
  const source = fs.readFileSync(fullPath, 'utf8')
  
  const { content, frontmatter } = await compileMDX<{
    title: string
    description: string
    section: string
  }>({
    source,
    components: useMDXComponents(),
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    content,
    frontmatter,
  }
}
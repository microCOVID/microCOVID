import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import React from 'react'
import { useParams } from 'react-router-dom'

import { pages } from 'paper/index'

export const Paper = (): React.ReactElement => {
  const { id } = useParams()

  // Return 404 for unknown pages
  if (!Object.keys(pages).includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  // @ts-ignore suppressImplicitAnyIndexErrors
  const page = pages[id]
  const markdownContent = page.content
  const prev = page.prev
  const next = page.next

  const processor = new MarkdownIt().use(markdownItFootnote)
  const processed = { __html: processor.render(markdownContent) }

  return (
    <div id="paperPage">
      <h1>{page.title}</h1>

      <div dangerouslySetInnerHTML={processed} />

      {prev && <a href={`/paper/${prev}`}>Previous: {pages[prev].title} </a>}
      {next && <a href={`/paper/${next}`}>Next: {pages[next].title} </a>}
    </div>
  )
}

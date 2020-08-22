import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { pages } from 'paper/index'

export const Paper = (): React.ReactElement => {
  const { id } = useParams()

  const slugs = Object.keys(pages)

  // Return 404 for unknown pages
  if (!slugs.includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  const page = pages[id]
  const markdownContent = page.content
  const prev = slugs[slugs.indexOf(id) - 1]
  const next = slugs[slugs.indexOf(id) + 1]

  const processor = new MarkdownIt().use(markdownItFootnote)
  const processed = { __html: processor.render(markdownContent) }

  return (
    <div id="paperPage">
      <div className="sectionIndicator">
        Section {Object.keys(pages).indexOf(id) + 1}
      </div>
      <h1 id="pageTitle">{page.title}</h1>

      <div dangerouslySetInnerHTML={processed} />

      {prev && (
        <Link to={`/paper/${prev}`}>
          Previous: {pages[prev].shortTitle || pages[prev].title}{' '}
        </Link>
      )}
      {next && (
        <Link to={`/paper/${next}`}>
          Next: {pages[next].shortTitle || pages[next].title}{' '}
        </Link>
      )}
    </div>
  )
}

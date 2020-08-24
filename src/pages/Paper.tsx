import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHeadings from 'markdown-it-github-headings'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import React from 'react'
import { Button } from 'react-bootstrap'
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

  const processor = new MarkdownIt({
    html: true,
  })
    .use(markdownItFootnote)
    .use(markdownItHeadings)
    .use(markdownItLinkAttributes, {
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })
  const processed = { __html: processor.render(markdownContent) }

  return (
    <div id="paperPage">
      <div className="sectionIndicator">
        Section {Object.keys(pages).indexOf(id) + 1}
      </div>

      {prev && (
        <Button size="lg" variant="link">
          <Link to={`/paper/${prev}`}>
            {'\u2B05'} Previous: {pages[prev].shortTitle || pages[prev].title}{' '}
          </Link>
        </Button>
      )}

      {next && (
        <Button size="lg" variant="link">
          <Link to={`/paper/${next}`}>
            Next: {pages[next].shortTitle || pages[next].title} {'\u27A1'}{' '}
          </Link>
        </Button>
      )}

      <h1 id="pageTitle">{page.title}</h1>

      <div dangerouslySetInnerHTML={processed} />

      {prev && (
        <Button size="lg" variant="link">
          <Link to={`/paper/${prev}`}>
            {'\u2B05'} Previous: {pages[prev].shortTitle || pages[prev].title}{' '}
          </Link>
        </Button>
      )}

      {next && (
        <Button size="lg" variant="link">
          <Link to={`/paper/${next}`}>
            Next: {pages[next].shortTitle || pages[next].title} {'\u27A1'}{' '}
          </Link>
        </Button>
      )}
    </div>
  )
}

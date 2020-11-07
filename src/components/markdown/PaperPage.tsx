import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Donation } from 'components/Donation'
import { metaContent, processor } from 'components/markdown/markdownProcessor'
import { PageLink } from 'components/markdown/PageLink'
import { PostMap } from 'posts/post'

export const MarkdownContents: React.FunctionComponent<{
  posts: PostMap
  id: string
  allInOnePage?: boolean
}> = ({ posts, id, allInOnePage }) => {
  // Return 404 for unknown pages
  const slugs = Object.keys(posts)

  if (!slugs.includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  const page = posts[id]
  let markdownContent = page.content
  const prev = slugs[slugs.indexOf(id) - 1]
  const next = slugs[slugs.indexOf(id) + 1]

  if (allInOnePage) {
    // Replace links to pages with links within the one big page
    markdownContent = markdownContent.replace(
      /\]\(([1-9][0-9a-z-]+)([#)])/g,
      (
        _match: string,
        p1: string,
        p2: string,
        _offset: number,
        _string: string,
      ) => (p2 === '#' ? '](' + p2 : '](#' + p1 + p2),
    )
  }

  function Navigation() {
    return (
      <div className="navigation">
        {prev ? (
          <PageLink toId={prev} anchor={allInOnePage}>
            ← Previous: {posts[prev].shortTitle || posts[prev].title}
          </PageLink>
        ) : (
          <Link to="./">← Table of Contents</Link>
        )}

        {next && (
          <PageLink toId={next} className="next" anchor={allInOnePage}>
            Next: {posts[next].shortTitle || posts[next].title} →
          </PageLink>
        )}
      </div>
    )
  }

  const processed = processor.render(markdownContent)

  let body = processed
  if (allInOnePage) {
    // Uniqify footnote labels
    const pageIdx = slugs.indexOf(id) + 1
    body = body.replace(
      /( href="#| id=")fn((ref)?[0-9]+)"/g,
      '$1fn' + pageIdx + '_$2"',
    )
  }

  // markdownItFootnote addition:
  // - Split the text to put navigation between text and footnotes.
  const indexOfFootnotes = body.indexOf('<hr class="footnotes-sep">')
  let footnotes = ''
  if (indexOfFootnotes > 0) {
    footnotes = body.substr(indexOfFootnotes)
    body = body.substr(0, indexOfFootnotes)
  }

  const metaDescription = metaContent(body)

  return (
    <div className="paperPage">
      <Helmet>
        <title>{`${page.title} - microCOVID Project`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:title" content={page.title} />
        <meta property="og:type" content="article" />
      </Helmet>

      <span id={id}></span>
      <div className="sectionIndicator">Section {slugs.indexOf(id) + 1}</div>

      <h1 className="pageTitle">{page.title}</h1>

      <Navigation />
      <hr />

      <div dangerouslySetInnerHTML={{ __html: body }} />

      {page.donation ? <Donation /> : null}

      <Navigation />

      {footnotes && (
        <div dangerouslySetInnerHTML={{ __html: footnotes }} key="footnotes" />
      )}
    </div>
  )
}

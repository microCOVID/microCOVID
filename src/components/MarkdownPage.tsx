import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHeadings from 'markdown-it-github-headings'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import { PostMap } from 'posts/post'
import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import Donation from '../components/Donation'

function stripHtml(html: string): string {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const processor = new MarkdownIt({
  html: true,
})
  .use(markdownItFootnote)
  .use(markdownItHeadings, {
    prefixHeadingIds: false,
  })
  .use(markdownItLinkAttributes, {
    pattern: /^https:/,
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })

export const MarkdownContents: React.FunctionComponent<{
  posts: PostMap
  id: string
  allInOnePage: boolean
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

  const PageLink: React.FunctionComponent<{
    toId: string
    className?: string
  }> = (props) => {
    if (allInOnePage) {
      return (
        <a href={`#${props.toId}`} className={props.className}>
          {props.children}
        </a>
      )
    } else {
      return (
        <Link to={props.toId} className={props.className}>
          {props.children}
        </Link>
      )
    }
  }

  function Navigation() {
    return (
      <div className="navigation">
        <span>
          {prev ? (
            <PageLink toId={prev}>
              ← Previous: {posts[prev].shortTitle || posts[prev].title}
            </PageLink>
          ) : (
            <Link to="./">← Table of Contents</Link>
          )}
        </span>

        {next && (
          <PageLink toId={next} className="next">
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

  // Split the text to put navigation between text and footnotes.
  // TODO(Ben): Do not continue hacking more of these in. If we need another tag, make it general-purpose.
  const indexOfFootnotes = body.indexOf('<hr class="footnotes-sep">')
  let footnotes = ''
  if (indexOfFootnotes > 0) {
    footnotes = body.substr(indexOfFootnotes)
    body = body.substr(0, indexOfFootnotes)
  }

  // Hack to allow inserting a donation component from markdown.
  const includeDonation = processed.indexOf('<!-- Donation -->') >= 0
  const textWithoutHtml = stripHtml(body)

  const imageMeta = page.image && (
    <meta
      property="og:image"
      content={process.env.REACT_APP_PUBLIC_URL + page.image.url}
    />
  )
  const imageWidth = page.image && (
    <meta property="og:image:width" content={page.image.width.toString()} />
  )
  const imageHeight = page.image && (
    <meta property="og:image:height" content={page.image.height.toString()} />
  )

  return (
    <div className="paperPage">
      <Helmet>
        <title>{`${page.title} - microCOVID Project`}</title>
        <meta name="description" content={textWithoutHtml} />
        <meta property="og:description" content={textWithoutHtml} />
        <meta property="og:title" content={page.title} />
        {imageMeta}
        {imageWidth}
        {imageHeight}
      </Helmet>
      <span id={id}></span>
      <div className="sectionIndicator">
        {page.date ? page.date : `Section ${slugs.indexOf(id) + 1}`}
      </div>
      <h1 className="pageTitle">{page.title}</h1>
      {page.author && <div className="pageAuthor">{page.author}</div>}

      <Navigation />

      <hr />

      <div dangerouslySetInnerHTML={{ __html: body }} />

      {includeDonation ? <Donation /> : null}
      <Navigation />

      {footnotes && (
        <div dangerouslySetInnerHTML={{ __html: footnotes }} key="footnotes" />
      )}
    </div>
  )
}

export const TableOfContents: React.FunctionComponent<{
  posts: PostMap
  title: string
  baseNavPath: string
  children?: React.ReactNode
}> = ({ posts, title, baseNavPath, children }) => {
  const slugs = Object.keys(posts)

  return (
    <div className="paperPage">
      <h1 className="pageTitle">{title}</h1>
      <div className="navigation">
        &nbsp;
        <Link to={`${baseNavPath}/${slugs[0]}`} className="next">
          Next: {posts[slugs[0]].shortTitle || posts[slugs[0]].title} →
        </Link>
      </div>
      {children}
      <ol className="toc">
        {slugs.map((pageId, pageIndex) => (
          <li key={pageIndex}>
            <Link to={`${baseNavPath}/${pageId}`}>{posts[pageId].title}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export const MarkdownNavDropdown: React.FunctionComponent<{
  title: string
  baseNavPath: string
  posts: PostMap
  enableAll: boolean
}> = ({ title, baseNavPath, posts, enableAll }) => {
  return (
    <NavDropdown title={title} id="basic-nav-dropdown">
      <NavDropdown.Item href={baseNavPath}>Table of Contents</NavDropdown.Item>
      {enableAll ? (
        <NavDropdown.Item href={`${baseNavPath}/all`}>
          All In One Page
        </NavDropdown.Item>
      ) : null}
      {Object.keys(posts).map((pageId, pageIndex) => (
        <NavDropdown.Item href={`${baseNavPath}/${pageId}`} key={pageIndex}>
          {pageIndex + 1}. {posts[pageId].shortTitle}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  )
}

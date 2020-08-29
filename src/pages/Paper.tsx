import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItHeadings from 'markdown-it-github-headings'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import Donation from '../components/Donation'
import { pages } from '../paper/index'

const slugs = Object.keys(pages)

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

const PaperContents: React.FunctionComponent<{
  id: string
  fullPage: boolean
}> = ({ id, fullPage }) => {
  // Return 404 for unknown pages
  if (!slugs.includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  const page = pages[id]
  const markdownContent = page.content
  const prev = slugs[slugs.indexOf(id) - 1]
  const next = slugs[slugs.indexOf(id) + 1]

  const PageLink: React.FunctionComponent<{
    toId: string
    className?: string
  }> = (props) => {
    if (fullPage) {
      return (
        <a href={`#${props.toId}`} className={props.className}>
          {props.children}
        </a>
      )
    } else {
      return (
        <Link to={`/paper/${props.toId}`} className={props.className}>
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
              ← Previous: {pages[prev].shortTitle || pages[prev].title}
            </PageLink>
          ) : (
            <Link to="/paper">← Table of Contents</Link>
          )}
        </span>

        {next && (
          <PageLink toId={next} className="next">
            Next: {pages[next].shortTitle || pages[next].title} →
          </PageLink>
        )}
      </div>
    )
  }

  const processed = processor.render(markdownContent)

  // Split the text to put navigation between text and footnotes.
  // TODO(Ben): Do not continue hacking more of these in. If we need another tag, make it general-purpose.
  const indexOfFootnotes = processed.indexOf('<hr class="footnotes-sep">')
  let body = processed
  let footnotes = ''
  if (indexOfFootnotes > 0) {
    body = processed.substr(0, indexOfFootnotes)
    footnotes = processed.substr(indexOfFootnotes)
  }

  // Hack to allow inserting a donation component from markdown.
  const includeDonation = processed.indexOf('<!-- Donation -->') >= 0

  return (
    <div className="paperPage">
      <a id={id}></a>
      <div className="sectionIndicator">
        Section {Object.keys(pages).indexOf(id) + 1}
      </div>
      <h1 className="pageTitle">{page.title}</h1>

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

export const Paper = (): React.ReactElement => {
  const { id } = useParams()

  if (id === 'all') {
    return (
      <div>
        {Object.keys(pages).map((pageId, pageIndex) => (
          <PaperContents id={pageId} key={pageIndex} fullPage={true} />
        ))}
      </div>
    )
  } else {
    return <PaperContents id={id} fullPage={false} />
  }
}

export const PaperTOC = (): React.ReactElement => {
  return (
    <div className="paperPage">
      <div className="sectionIndicator">Table of Contents</div>
      <h1 className="pageTitle">White Paper</h1>
      <div className="navigation">
        &nbsp;
        <Link to={`/paper/${slugs[0]}`} className="next">
          Next: {pages[slugs[0]].shortTitle || pages[slugs[0]].title} →
        </Link>
      </div>
      <hr />
	  <p>
      This writeup explains the numbers and calculations
      used in the <Link to="/calculator">calculator</Link>. It will also teach you
      how to model situations that are more complex than the calculator can
      describe.
	  </p>
	  <p>We know "white paper" might sound intimidating! Don't be too afraid. We have made it as readable as possible. It's possible to skim and skip around. It shows every step clearly. The goal of the document is to <i>teach you</i> how the model works.
	  </p>
	  <p>
	  (On the other hand, if you want to skip straight to the details, go to the <Link to={"/paper/14-research-sources"}>Research Sources</Link> section)
	  </p>
      <p>You can read it <Link to="/paper/all">all in one page</Link>{' '}
      (good for searching or reading offline); select the page you want below; or just click "Next" above to proceed with the introduction.
	  </p>
      <ol className="toc">
        {Object.keys(pages).map((pageId, pageIndex) => (
          <li key={pageIndex}>
            <Link to={`/paper/${pageId}`}>{pages[pageId].title}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

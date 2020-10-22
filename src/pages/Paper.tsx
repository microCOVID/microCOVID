import { pages } from 'posts/paper/index'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  MarkdownContents,
  MarkdownNavDropdown,
  TableOfContents,
} from 'components/MarkdownPage'

const slugs = Object.keys(pages)

export const Paper = (): React.ReactElement => {
  const { id } = useParams()

  if (id === 'all') {
    return (
      <div>
        {slugs.map((pageId, pageIndex) => (
          <MarkdownContents
            posts={pages}
            id={pageId}
            key={pageIndex}
            allInOnePage={true}
          />
        ))}
      </div>
    )
  } else {
    return <MarkdownContents posts={pages} id={id} allInOnePage={false} />
  }
}

export const PaperTOC = (): React.ReactElement => {
  return (
    <TableOfContents posts={pages} title="White Paper" baseNavPath="/paper">
      <hr />
      <p>
        This writeup explains the numbers and calculations used in the{' '}
        <Link to="/calculator">calculator</Link>. It will also teach you how to
        model situations that are more complex than the calculator can describe.
      </p>
      <p>
        We know "white paper" might sound intimidating! Don't be too afraid. We
        have made it as readable as possible. It's possible to skim and skip
        around. It shows every step clearly. The goal of the document is to{' '}
        <i>teach you</i> how the model works.
      </p>
      <p>
        (Or if overly detailed analyses are what you're here for, you can skip
        straight to the{' '}
        <Link to={'/paper/14-research-sources'}>Research Sources</Link>{' '}
        section.)
      </p>
      <p>
        You can read the white paper{' '}
        <Link to="/paper/all">all in one page</Link> (good for searching or
        reading offline); select the page you want below; or just click "Next"
        above to proceed with the introduction.
      </p>
    </TableOfContents>
  )
}

export const PaperNavDropdown = (): React.ReactElement => {
  return (
    <MarkdownNavDropdown
      title="White Paper"
      baseNavPath="/paper"
      posts={pages}
      enableAll={true}
    />
  )
}

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { DropdownNav } from 'components/DropdownNav'
import { MarkdownCombinedPage } from 'components/markdown/MarkdownCombinedPage'
import { MarkdownContents } from 'components/markdown/PaperPage'
import { TableOfContents } from 'components/TableOfContents'
import { pages } from 'posts/paper/index'
import 'pages/styles/Paper.scss'

export const Paper = (): React.ReactElement => {
  const { id } = useParams()

  if (id === 'all') {
    return <MarkdownCombinedPage posts={pages} />
  } else {
    return <MarkdownContents posts={pages} id={id} />
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
  const { t } = useTranslation()
  return (
    <DropdownNav
      title={t('menu.whitepaper')}
      baseNavPath="/paper"
      posts={pages}
      enableAll={true}
    />
  )
}

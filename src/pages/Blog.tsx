import { pages } from 'posts/blog/index'
import React from 'react'
import { useParams } from 'react-router-dom'

import {
  MarkdownContents,
  MarkdownNavDropdown,
  TableOfContents,
} from 'components/MarkdownPage'

const navPath = '/blog'

export const Blog = (): React.ReactElement => {
  const { id } = useParams()
  return <MarkdownContents posts={pages} id={id} allInOnePage={false} />
}

export const BlogTOC = (): React.ReactElement => {
  return (
    <TableOfContents posts={pages} title="Blog" baseNavPath={navPath}>
      All blog posts:
    </TableOfContents>
  )
}

export const BlogNavDropdown = (): React.ReactElement => {
  return (
    <MarkdownNavDropdown
      title="Blog"
      baseNavPath={navPath}
      posts={pages}
      enableAll={false}
    />
  )
}

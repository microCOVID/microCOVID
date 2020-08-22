import MarkdownIt from 'markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import React from 'react'
import { useParams } from 'react-router-dom'

import { posts } from 'post/index'

export const Post = (): React.ReactElement => {
  const { id } = useParams()

  // Return 404 for unknown pages
  if (!Object.keys(posts).includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  // @ts-ignore suppressImplicitAnyIndexErrors
  const post = posts[id]
  const markdownContent = post.content
  const prev = post.prev
  const next = post.next

  const processor = new MarkdownIt().use(markdownItFootnote)
  const processed = { __html: processor.render(markdownContent) }

  return (
    <div>
      <div dangerouslySetInnerHTML={processed} />

      {prev && <a href={`/post/${prev}`}>Previous: {posts[prev].title} </a>}
      {next && <a href={`/post/${next}`}>Next: {posts[next].title} </a>}
    </div>
  )
}

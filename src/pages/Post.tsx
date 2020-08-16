import React from 'react'
import ReactMarkdown from 'react-markdown'
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

  return (
    <div>
      <ReactMarkdown source={markdownContent} />

      {prev && <a href={`/post/${prev}`}>Previous: {posts[prev].title} </a>}
      {next && <a href={`/post/${next}`}>Next: {posts[next].title} </a>}
    </div>
  )
}

import React from 'react'
import { useParams } from 'react-router-dom'

import { BlogPostPage } from 'components/markdown/BlogPostPage'
import { BlogPosts } from 'posts/blog/BlogPosts'
import { pages } from 'posts/blog/index'

export const Blog = (): React.ReactElement => {
  const { id } = useParams()
  return <BlogPostPage posts={pages} id={id} />
}

export const BlogTOC = (): React.ReactElement => {
  // const { page } = useParams()

  return <BlogPosts posts={pages} />
}

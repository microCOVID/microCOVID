import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

import { content } from 'post/index'

export const Post = (): React.ReactElement => {
  const { id } = useParams()

  // Return 404 for unknown pages
  if (!Object.keys(content).includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  // @ts-ignore suppressImplicitAnyIndexErrors
  const markdownContent = content[id]

  return (
    <div>
      <ReactMarkdown source={markdownContent} />
    </div>
  )
}

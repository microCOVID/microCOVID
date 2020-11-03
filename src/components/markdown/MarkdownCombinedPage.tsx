import React from 'react'

import { MarkdownContents } from 'components/markdown/PaperPage'
import { PostMap } from 'posts/post'

export const MarkdownCombinedPage: React.FunctionComponent<{
  posts: PostMap
}> = ({ posts }) => {
  const slugs = Object.keys(posts)

  return (
    <div>
      {slugs.map((pageId, pageIndex) => (
        <MarkdownContents
          key={pageIndex}
          id={pageId}
          posts={posts}
          allInOnePage={true}
        />
      ))}
    </div>
  )
}

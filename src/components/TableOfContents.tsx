import React from 'react'
import { Link } from 'react-router-dom'

import { PostMap } from 'posts/post'

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

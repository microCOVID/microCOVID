import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { BlogPostMap } from 'posts/post'
import 'pages/styles/Paper.scss'

export const BlogPosts: React.FC<{ posts: BlogPostMap }> = ({ posts }) => (
  <div>
    <Helmet>
      <title>Blog - microCOVID Project</title>
    </Helmet>
    {Object.keys(posts).map((postID) => {
      const page = posts[postID]!
      return (
        <>
          <div className="paperPage">
            <Link to={`blog/${postID}`}>
              <h1 className="pageTitle">{page.title}</h1>
            </Link>
            <div className="postByLine">
              <span className="postAuthor">{page.author}</span> •{' '}
              <span className="postDate">{page.date}</span>
            </div>

            <p>{page.summary}</p>

            <p>
              <Link to={`blog/${postID}`}>Read more</Link>
            </p>
          </div>
          <hr />
        </>
      )
    })}
  </div>
)

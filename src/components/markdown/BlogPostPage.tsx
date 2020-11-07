import React from 'react'
import { Helmet } from 'react-helmet-async'

import { metaContent, processor } from 'components/markdown/markdownProcessor'
import { BlogPostMap } from 'posts/post'
import 'pages/styles/Paper.scss'

export const BlogPostPage: React.FunctionComponent<{
  posts: BlogPostMap
  id: string
}> = ({ posts, id }) => {
  // Return 404 for unknown pages
  const slugs = Object.keys(posts)

  if (!slugs.includes(id)) {
    return <div>PAGE NOT FOUND</div>
  }

  const page = posts[id]
  const body = processor.render(page.content)
  const metaDescription = metaContent(body)

  return (
    <div className="paperPage">
      <Helmet>
        <title>{`${page.title} - microCOVID Project`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:title" content={page.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={process.env.REACT_APP_DEPLOY_PRIME_URL + page.image.url}
        />
        <meta
          property="og:image:height"
          content={page.image.height.toString()}
        />
        <meta property="og:image:width" content={page.image.width.toString()} />
      </Helmet>

      <h1 className="pageTitle">{page.title}</h1>

      <div className="postAuthor">{page.author}</div>
      <div className="postDate">{page.date}</div>

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

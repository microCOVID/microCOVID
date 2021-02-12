import React from 'react'
import { Helmet } from 'react-helmet-async'

import { processor } from 'components/markdown/markdownProcessor'
import { BlogPostMap, ImageMeta } from 'posts/post'
import 'pages/styles/Paper.scss'

const ImageMetaIfPresent = (image?: ImageMeta) => {
  if (image === undefined) {
    return null
  }
  return [
    <meta
      property="og:image"
      content={process.env.REACT_APP_DEPLOY_PRIME_URL + image.url}
      key="imageUrl"
    />,
    <meta
      property="og:image:height"
      content={image.height.toString()}
      key="imageHeight"
    />,
    <meta
      property="og:image:width"
      content={image.width.toString()}
      key="imageWidth"
    />,
  ]
}

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

  return (
    <div className="paperPage">
      <Helmet>
        <title>{`${page.title} - microCOVID Project`}</title>
        <meta name="description" content={page.summary} />
        <meta property="og:description" content={page.summary} />
        <meta property="og:title" content={page.title} />
        <meta property="og:type" content="article" />
        {ImageMetaIfPresent(page.image)}
      </Helmet>

      <h1 className="pageTitle">{page.title}</h1>

      <div className="postByLine">
        <span className="postAuthor">{page.author}</span> •{' '}
        <span className="postDate">{page.date}</span>
      </div>

      {typeof page.content === 'string' ? (
        <div
          dangerouslySetInnerHTML={{ __html: processor.render(page.content) }}
        />
      ) : (
        page.content({})
      )}
    </div>
  )
}

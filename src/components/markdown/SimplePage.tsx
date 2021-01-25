import React from 'react'
import { Helmet } from 'react-helmet-async'

import { metaContent, processor } from 'components/markdown/markdownProcessor'
import { PostContent } from 'posts/post'

export const SimplePage: React.FunctionComponent<{
  page: PostContent
}> = ({ page }) => {
  const markdownContent = page.content

  const body = processor.render(markdownContent)

  const metaDescription = metaContent(body)

  return (
    <div className="paperPage">
      <Helmet>
        <title>{`${page.title} - microCOVID Project`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:title" content={page.title} />
        <meta property="og:type" content="article" />
      </Helmet>
      <h1 className="pageTitle">{page.title}</h1>

      <hr />

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

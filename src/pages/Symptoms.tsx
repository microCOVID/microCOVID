import React from 'react'

import { MarkdownContents } from 'components/markdown/PaperPage'
import { PostMap } from 'posts/post'
import symptomsPage from 'posts/symptoms'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
const symptomPostMap: PostMap = {
  symptoms: symptomsPage,
}

export const Symptoms = (): React.ReactElement => {
  return (
    <MarkdownContents
      posts={symptomPostMap}
      id="symptoms"
      simpleLayout={true}
    />
  )
}

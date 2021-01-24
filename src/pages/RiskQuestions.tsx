import React from 'react'

import { MarkdownContents } from 'components/markdown/PaperPage'
import { PostMap } from 'posts/post'
import riskQuestionsPage from 'posts/risk-questions'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
const riskQuestionsPostMap: PostMap = {
  questions: riskQuestionsPage,
}

export const RiskQuestions = (): React.ReactElement => {
  return (
    <MarkdownContents
      posts={riskQuestionsPostMap}
      id="questions"
      simpleLayout={true}
    />
  )
}

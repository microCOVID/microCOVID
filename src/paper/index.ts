import post1intro from 'paper/1-intro'
import post2riskiness from 'paper/2-riskiness'
import post3activites from 'paper/3-activities'
import post4qanda from 'paper/4-q-and-a'
import post5researchSources from 'paper/5-research-sources'

interface PostContent {
  title: string
  shortTitle?: string
  content: string
}

export const pages: { [key: string]: PostContent } = {
  '1-intro': post1intro,
  '2-riskiness': post2riskiness,
  '3-activites': post3activites,
  '4-qanda': post4qanda,
  '5-research-sources': post5researchSources,
}

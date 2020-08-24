import post1intro from 'paper/1-intro'
import post2riskiness from 'paper/2-riskiness'
import post3introtomicrocovids from 'paper/3-intro-to-microcovids'
import post4activityrisk from 'paper/4-activity-risk'
import post5personrisk from 'paper/5-person-risk'
import post6calculatingpoints from 'paper/6-calculating-points'
import post7calculatorandconclusion from 'paper/7-calculator-and-conclusion'
import post8qanda from 'paper/8-q-and-a'
import post9researchsources from 'paper/9-research-sources'

interface PostContent {
  title: string
  shortTitle?: string
  content: string
}

export const pages: { [key: string]: PostContent } = {
  '1-intro': post1intro,
  '2-riskiness': post2riskiness,
  '3-intro-to-microcovids': post3introtomicrocovids,
  '4-activity-risk': post4activityrisk,
  '5-person-risk': post5personrisk,
  '6-calculating-points': post6calculatingpoints,
  '7-calculator-and-conclusion': post7calculatorandconclusion,
  '8-q-and-a': post8qanda,
  '9-research-sources': post9researchsources,
}

import post1 from 'paper/1-intro'
import post11 from 'paper/11-putting-it-all-together'
import post12 from 'paper/12-calculator-and-conclusion'
import post13 from 'paper/13-q-and-a'
import post14 from 'paper/14-research-sources'
import post2 from 'paper/2-riskiness'
import post3 from 'paper/3-covid-transmission'
import post4 from 'paper/4-computing-microcovids'
import post5 from 'paper/5-activity-risk'
import post6 from 'paper/6-person-risk'


interface PostContent {
  title: string
  shortTitle?: string
  content: string
}

export const pages: { [key: string]: PostContent } = {
  '1-intro': post1,
  '2-riskiness': post2,
  '3-covid-transmission': post3,
  '4-computing-microcovids': post4,
  '5-activity-risk': post5,
  '6-person-risk': post6,
  '11-putting-it-all-together': post11,
  '12-calculator-and-conclusion': post12,
  '13-q-and-a': post13,
  '14-research-sources': post14,
}

import post1 from 'paper/1-intro'
import post2 from 'paper/2-riskiness'
import post3 from 'paper/3-activities'
import post4 from  'paper/4-person-and-activity-risk'
import post5 from 'paper/5-activity-risk'
import post10 from 'paper/10-calculator-and-conclusion'
import post11 from 'paper/11-q-and-a'
import post12 from 'paper/12-research-sources'

interface PostContent {
  title: string
  shortTitle?: string
  content: string
}

export const pages: { [key: string]: PostContent } = {
  '1-intro': post1,
  '2-riskiness': post2,
  '3-activites': post3,
  '4-person-and-activity-risk': post4,
  '5-activity-risk': post5,
  '10-calculator-and-conclusion': post10,
  '11-qanda': post11,
  '12-research-sources': post12,

}

import post1intro from 'post/1-intro'
import post2riskiness from 'post/2-riskiness'
import post3activites from 'post/3-activities'

interface PostContent {
  title: string
  content: string
  next?: string
  prev?: string
}

export const posts: { [key: string]: PostContent } = {
  '1-intro': post1intro,
  '2-riskiness': post2riskiness,
  '3-activites': post3activites,
}

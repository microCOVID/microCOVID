import post1 from 'posts/paper/1-intro'
import post10 from 'posts/paper/10-example-person-risk'
import post11 from 'posts/paper/11-putting-it-all-together'
import post12 from 'posts/paper/12-calculator-and-conclusion'
import post13 from 'posts/paper/13-q-and-a'
import post14 from 'posts/paper/14-research-sources'
import uncertaintyEstimation from 'posts/paper/15-uncertainty-estimation'
import post2 from 'posts/paper/2-riskiness'
import post3 from 'posts/paper/3-covid-transmission'
import post4 from 'posts/paper/4-computing-microcovids'
import post5 from 'posts/paper/5-activity-risk'
import post6 from 'posts/paper/6-person-risk'
import post7 from 'posts/paper/7-basic-method'
import post8 from 'posts/paper/8-intermediate-method'
import post9 from 'posts/paper/9-advanced-method'
import changelog from 'posts/paper/99-changelog'
import { PostMap } from 'posts/post'

// Note: the keys in this map are the public URL for the post. Changing them will break links.
export const pages: PostMap = {
  '1-intro': post1,
  '2-riskiness': post2,
  '3-covid-transmission': post3,
  '4-computing-microcovids': post4,
  '5-activity-risk': post5,
  '6-person-risk': post6,
  '7-basic-method': post7,
  '8-intermediate-method': post8,
  '9-advanced-method': post9,
  '10-example-person-risk': post10,
  '11-putting-it-all-together': post11,
  '12-calculator-and-conclusion': post12,
  '13-q-and-a': post13,
  '14-research-sources': post14,
  'uncertainty-estimation': uncertaintyEstimation,
  changelog, // Keep this as the last entry.
}

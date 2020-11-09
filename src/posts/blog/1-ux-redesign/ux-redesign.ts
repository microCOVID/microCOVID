import thermometer_social from './thermometer-social.png'
import thermometer from './thermometer.png'
import { ImageMeta } from 'posts/post'

const title = 'Microcovid UX and functional update'

const author = 'Team microCOVID'
const date = 'October 30, 2020'
const image: ImageMeta = {
  url: thermometer_social,
  width: 1290,
  height: 675,
}

const summary =
  'We’ve been hard at work improving the microCOVID calculator to make it better and easier to use.  Today we’re announcing Version 2 of our calculator.  Much of the interface will feel familiar, but there have been some changes to reduce confusion and improve the user flow.'

const content = `Hi everyone!

We’ve been hard at work improving the microCOVID [calculator](/) to make it better and easier to use.  Today we’re announcing Version 2 of our calculator.  Much of the interface will feel familiar, but there have been some changes to reduce confusion and improve the user flow.  

![Picture of the new result display](${thermometer})

Some notable UX updates:
- We’ve changed how results are reported.  We already talked about the idea of a weekly risk budget, in which you decide what yearly chance of catching COVID you’re comfortable with, and that dictates how many microCOVIDs you’re able to spend in a week.  The new UX puts the “% of your weekly risk budget” number front and center for every activity so it’s easy to budget your risk allocation for the week.
- We’ve reordered and reworded the questions we ask about the activity you’re trying to model to clarify how you should answer them.  For example, users were confused about whether “number of people” referred to the number of people at the activity, the number of people who are near you at any given time, or the number of people who get near you over the course of the activity.  The new ordering and wording makes this and other questions clear.  
- We’ve streamlined the visual layout of the calculator, hiding the more detailed explanations under expandable sections or moving them to the bottom so that it’s easier to make sense of the most important information in a compact report while allowing you to delve into details if you want. 
- We’ve added far more detail on the different options you have for masks and their relative merits.  You’ll find this under “Learn more about masks” in the risk reduction advice section at the bottom.
- We now have a “copy link to clipboard” button that enables you to share scenarios that you create.  We’re excited for people to be able to share models of activities to help each other make informed decisions.  

We’ve also introduced some functional changes in the modeling:

- Now that N95 masks are commonly available to the general public, we’ve added them as an option in the calculator.  A properly fitting N95 can do a lot to reduce your COVID risk during unavoidable activities.  
- We’ve changed the assessment of certain settings to make them better conform to reality.  Being outdoors no longer reduces your COVID risk from close contact or kissing.  Separately, kissing now carries a minimum activity risk regardless of length, as we cannot reliably say that only a minute or two of exposure in this manner would be significantly less risky than a longer exposure.  

We have more changes on the way that we’ll be excited to share with you!  Feedback on the new version is welcome at [info@microcovid.org](mailto:info@microcovid.org).
`

export const post = { title, summary, content, author, date, image }

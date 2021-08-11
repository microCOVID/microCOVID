import podOverviewChart from './img/pod-overview-chart.png'
import { ImageMeta } from 'posts/post'

const image: ImageMeta = {
  url: podOverviewChart,
  width: 1632,
  height: 502,
}

const title = 'microCOVID Risk Tracker: How our house got our lives back'

const author = 'Jeremy Blanchard'
const date = 'February 11, 2021'

const summary =
  'Navigating house/pod agreements around COVID can be really stressful. We made a tool to help make it a lot easier.'
const content = `

*Today we’re launching a new version of the microCOVID Risk Tracker with features for households and pods to collectively budget their risk over time.* [*You can download the latest version of the Risk Tracker here →*](/tracker)


<figure>
  <img src="${podOverviewChart}" alt="Graph of 4 housemate's risk budget, showing risk points used and risk points remaining." />
</figure>


## How the Risk Tracker helped our house get our lives back

We're launching Version 2 of the [microCOVID Risk Tracker](/tracker) today, and I want to share a bit of the backstory. Up until [microCOVID](/) was released in August 2020, my house was struggling with the same thing I know many communal houses were struggling with: we want to make sure to keep ourselves, each other, and the wider community safe from COVID, *and* at the same time, there are things that are important enough that we want to be able to find a way to do them. 

The dilemma: how do you make decisions about what a “safe amount of risk is” when living with many other people?

At that time our system was similar to many other group houses: masked, outdoor, distance hangs were okay, but anything other than that needed group input/consensus. Having every single person’s activities be subject to a consensus discussion in a house meeting is a recipe for a ton of stress and struggle.

We encountered questions like:
* “What’s riskier: a 3-hour unmasked. outdoor hang? Or a 30-minute indoor, masked hang? 🤷‍♂️”
* “Sam really wants to see their bodyworker. I really wanted to see my partner. But was I ok being in indirect contact with that bodyworker for Sam's sake? Did Sam think my happiness from seeing my partner was worth the risk they'd experience?”

Then we discovered the microCOVID spreadsheet. I realized it had the potential to completely change how we had these discussions. If we could quantify and track how much risk each of us were taking, we could allocate everyone a small but even share of risk that they could use to make their own decisions, without consulting the house every time.

We agreed that each of us was willing to take on a 1% chance of getting COVID over the next year.[^budget] Dividing risk evenly among each of of our 7 housemates meant we could each bring 68 microCOVIDs each week; this became our risk "budget" that we could plan against.


I'll say this: since we replaced our consensus approach with a microCOVID budget approach, COVID-related relationship stress in the house has gone down dramatically. We can now make choices on our own about what we do that’s within our individual risk budget! Once the system is set up and everyone knows how to use it, we don’t need to have many (if any) group meeting time to talk about our COVID agreements.

**Having this new approach has saved us SO much energy. We got our lives back.**  We aren’t constantly talking about COVID decisions every week, and we have flexibility to take certain actions that are important to us.

I realized that, although I personally love spreadsheets, many people don’t. I wanted to find a way for everyone to be able to get their lives back the way my house did. That’s why I’ve been working with the microCOVID team for the last few months to upgrade the risk tracker so it is cleaner, clearer, and easier to use. I want anyone to be able to pick it up and start using it for their house/pod. We hope you find it useful for your situation!


----------
## What’s new in Version 2?

Version 1 of the Risk Tracker was built primarily for [individual risk budgeting](/paper/2-riskiness#choosing-your-risk-budget) that wasn’t possible on the [website calculator](/).

**Version 2 is built with households/pod risk budgeting in mind** (and it’s an upgrade for individual budgeting as well!).

Here’s what’s you’ll find in the latest version:


- **Household/pod risk budget tracking** to empower individuals within your group to have more flexibility to make decisions while keeping everyone’s risk within an agreed-upon risk threshold.
- A new [**quickstart guide**](/tracker/quickstart) to orient you to the spreadsheet.
- [**Step-by-step instructions**](/tracker/basics) to help answer many common questions about the spreadsheet and how to use it in specific scenarios.
- [**Custom person risk modeling**](/tracker/basics#using-the-custom-people-sheet-to-model-risk-more-precisely), so you can figure out just how risky that friend or co-worker is to see.
- **Updated mask options** and risk multipliers that match the Calculator. (See our recent blog posts on [upgrading your mask](/blog/masks).)
- A more accurate "risk to others outside of the pod" number that includes all of your activities over the last 23 days, but "decays" over time (if you don't develop symptoms). You can read more about our model for [infectuiousness period](/paper/14-research-sources#infectious-period) here.


## Get Started

**You can [download the Risk Tracker here](/tracker).**

You can read the Risk Tracker documentation here: 


- [Risk Tracker Introduction](/tracker)
- [Risk Tracker Quickstart Guide for Pods](/tracker/quickstart)
- [Basic Risk Tracker Usage](/tracker/basics)
- [Risk Tracker FAQ](/tracker/faq) (Activity Modeling, Custom Person Modeling, Risk Budget)
- [Using the Risk Tracker with your household/pod](/tracker/household-pod)

We’d love your feedback on this new version, so please do [contact us](/contact) if you have any questions/ideas you want to share.

If you know anyone who might benefit from trying on a risk budget approach like this, please pass this post along to them.

*(Thanks to Ben Shaya for helping co-author this post.)*

[^budget]: You can read more about [selecting a microCOVID budget](/paper/13-q-and-a#how-should-i-choose-my-annual-risk-budget) here.
`

export const post = { title, summary, content, author, date, image }
export default post

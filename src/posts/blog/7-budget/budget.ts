import podOverviewChart from './img/pod-overview-chart.png'
import { ImageMeta } from 'posts/post'

const image: ImageMeta = {
  url: podOverviewChart,
  width: 1632,
  height: 502,
}

const title =
  'How our house got our lives back by using a collective “risk budget”'

const author = 'Jeremy Blanchard'
const date = 'February 7, 2021'

const summary =
  'Navigating house agreements around COVID can be really stressful. We made a tool to help make it a lot easier.'
const content = `

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>



*Today we’re launching a new version of the microCOVID Risk Tracker with features for households and pods to collectively budget their risk over time.* [*You can download the latest version of the Risk Tracker here →*](/tracker)


<figure>
  <img src="${podOverviewChart}" alt="Graph of 4 housemate's risk budget, showing risk points used and risk points remaining." />
</figure>


## How the Risk Tracker helped our house get our lives back

Here’s a bit of the backstory behind this new version: Up until [microCOVID](/) was released in August 2020, my house was struggling with the same thing many communal houses were struggling with: we want to make sure to keep ourselves, each other, and the wider community safe from COVID, *and* at the same time, there are were things that were important enough that we want to be able to do. 

The dilemma: how do you make decisions about what a “safe amount of risk is” when living with many other people?

At that time our system was similar to many other group houses: masked, outdoor, distance hangs were okay, but anything other than that needed group input/consensus. As you might imagine, having every single person’s activities be subject to a consensus discussion in a house meeting is a recipe for a ton of stress and struggle. (“What’s riskier: a 3-hour unmasked. outdoor hang? Or a 30-minute indoor, masked hang? 🤷‍♂️” and “Okay I know you really want to see your bodyworker and I really want to see my partner, but are either of those risks we’re willing to take?!”)

So when I got my hands on the original microCOVID spreadsheet, I went to town upgrading it for our house to use. I asked the team dozens of questions to make sure I had my head around how it was supposed to work.

Let me say this: since we replaced our consensus approach with a microCOVID budget approach, COVID-related relationship stress in the house has gone down dramatically. We can now make choices on our own about what we do that’s within our individual risk budget! Once the system is set up and everyone knows how to use it, we don’t need to have much (if any) group meeting time to talk about our COVID agreements.

**Having this new approach has saved us SO much energy. We got our lives back.** Both in that we aren’t constantly talking about COVID decisions every week, and that we have flexibility to take certain actions that are important to us.

I realized that, although I personally love spreadsheets, many people don’t. I wanted to find a way for everyone to be able to get their lives back the way my house did. That’s why I’ve been working with the team for the last few months upgrading the risk tracker to be cleaner, clearer, and easier to use so that anyone could pick it up and start using it for their pod. We hope you find it useful for your situation.


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
`

export const post = { title, summary, content, author, date, image }
export default post

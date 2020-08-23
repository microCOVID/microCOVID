const title = 'How many microCOVIDs are different activities?'
const shortTitle = 'Activity Cost'

const content = `

### Understanding COVID transmission

First, let's strengthen our intuitive model of COVID transmission.

COVID is transmitted primarily through tiny droplets produced when an infected person talks, coughs, or sneezes ([CDC FAQ](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)), many of which can [remain suspended in the air](https://docs.google.com/document/d/1Kx4Mka_nORa8LlEwziRYZxOX0J8_fFfgnt-9TBjxusc/edit) for minutes to hours. Touching contaminated surfaces or objects is _possibly_ a way that COVID spreads, but the [CDC](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html) believes the _main_ way it spreads is person-to-person through respiratory droplets. Therefore, in this writeup, we focus primarily on the risk from exhaled droplets in the air.[^1]

To visualize how exhaled droplets work, we suggest a helpful metaphor from our friend [Matt Bell](https://medium.com/@llebttam_45762/summer-vacations-in-the-era-of-covid-ab5576a7b302). Think of everyone around you exhaling cigarette smoke. If someone is smoking a cigarette in a park 30 feet away from you, you might not even smell it. But in a crowded bar where indoor smoking is permitted, the air will be thick with people’s smoky exhalations.

If you inhale just a bit of “smoke” (exhaled air) from someone with COVID, you might be fine. But if you inhale lots of “smoke,” you’re likely to get COVID. If you’re wondering about the riskiness of a situation, then it’s helpful to imagine, “What if everyone here were smoking a cigarette? How much smoke would I breathe in?” If you’d be breathing in other people’s smoke, then it’s a risky situation.

![LaVision imaging technique shows how masks restrict the spread of exhaled air](https://miro.medium.com/max/864/1*zyx-Sh2FQFwRGyQWkiherg.gif)

Source: [https://www.lavision.de/en/news/2020/4302/](https://www.lavision.de/en/news/2020/4302/)

Concretely, this means it’s important to avoid situations that feature the [3 C’s](https://www.businessinsider.com/how-japan-tackled-coronavirus-without-a-lockdown-2020-5): Crowds, Closed Spaces, and Close Contact. Why? Because if anyone there has COVID, which becomes likelier as the size of the crowd increases, their “smoke” will be blown into your face. Even if you're not standing near them, it will build up in the enclosed space, making it more likely that you’ll inhale it.

So we know what to _avoid:_ the 3 C’s. But besides staying in our homes, what should we _do_? We can choose to have “MOD” hangouts: 1-on-1 or small-group socializing that is Masked, Outdoors, and Distanced. These hangouts are MODified from normal. The COVID “smoke” gets stopped by your mask, falls to the ground before it reaches the other person, and dissipates into the air. MODified hangouts are much safer, especially when they don’t involve many people.


![alt_text](images/image2.png "image_tooltip") [TODO fix this image]


In the section below, we’ll try to answer questions like: How much does a mask actually help? Is it safer to be indoors with a mask, or outdoors without one? Should you stay 6 feet away or 10 feet?

In order to answer these questions with microCOVID numbers (not just “high” or “low” risk), we’ll now dive into the research. You can also skip right to the [calculator](/calculator) to start playing with numbers if you prefer.

### The cost of activities in microCOVIDs

In order to calculate the actual microCOVIDs of an activity, we need to combine two numbers:

*   _Activity Risk:_ the chance that this activity will transmit COVID to you, if the other person currently has COVID
*   _Person Risk:_ the chance that the other person currently has COVID. This is based on overall prevalence in your area and their recent behaviors.

For example:

*   Let’s say you do an activity with someone (like watching a movie indoors) that has an 8% chance of transmitting COVID to you. We call that an Activity Risk of 8%.
*   And let’s say that person has a 1% chance of currently being COVID-positive. We call that a Person Risk of 10,000. (Just like for microCOVIDs, if someone has a one-in-a-million chance of having COVID, we’ll say their Person Risk is 1.)
*   Then your chance of contracting COVID from that activity-and-person pair is \`8% x 10,000 = 800 microCOVIDs (or 0.08%)\`.
*   If you’re aiming for at most 1% per year risk of COVID (which is 833 microCOVIDs per month), then you’ve spent almost a whole month’s worth of risk on this one activity!

**In other words, whenever you’re deciding to do an activity, ask: How risky is the activity itself? And how risky are the people you’re doing it with?**

We'll think about our actions in terms of how much they "cost" us in microCOVIDs:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

Let’s explore how you can estimate these two numbers (Activity Risk and Person Risk) for an activity you’d like to do.

[^1]:
     If you’re worried about surfaces, the best thing to do is to be careful not to touch your face (mouth, nose, or eyes) when out and about, unless you’ve just washed your hands thoroughly. Getting the virus on your hands isn’t harmful in itself; it has to get to your mucous membranes in order to infect you.


`

const post = { title, content }
export default post
const title = 'Computing microCOVIDs'

const content = `

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
     If you’re worried about surfaces, the best thing to do is to be careful not to touch your face (mouth, nose, or eyes) when out and about, unless you’ve just washed or sanitized your hands thoroughly. Getting the virus on your hands isn’t harmful in itself; it has to get to your mucous membranes in order to infect you.


`

const post = { title, content }
export default post

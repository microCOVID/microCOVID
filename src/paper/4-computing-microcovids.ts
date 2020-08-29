const title = 'Computing microCOVIDs'

const content = `

In order to calculate the actual risk of an activity in microCOVIDs, we need to combine two numbers:

*   **[Activity Risk](5-activity-risk):** the chance that this activity will transmit COVID to you, if the other person currently has COVID.
*   **[Person Risk](6-person-risk):** the chance that the other person currently has COVID. This is based on overall prevalence in your area and their recent behaviors.

For example:

*   Let’s say you do an activity with someone (like watching a movie indoors) that has an 8% chance of transmitting COVID to you _if_ they currently have COVID. We call that an Activity Risk of 8%.
*   And let’s say that person has a 1% chance of currently being COVID-positive. We call that a Person Risk of 10,000.
    * Just like for microCOVIDs, if someone has a one-in-a-million chance of having COVID, we’ll say their Person Risk is 1.
*   Then your chance of contracting COVID from that activity-and-person pair is \`8% x 10,000 = 800\` microCOVIDs (which is the same thing as \`0.08%\`).

**In other words, whenever you’re deciding to do an activity, ask:**

1. **How risky is the activity itself?**
2. **How risky is the person you’re doing it with?**

We’ll think about our actions in terms of how much they “cost” us in microCOVIDs:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

Note that the Activity Risk does _not_ factor in the prevalence of COVID in your area. Nor does it take into account the recent behaviors of the person you are interacting with. It is just about the activity itself, specifically how risky it would be if the person currently had COVID.

The Person Risk is the part of the calculation that takes into account the prevalence of COVID in your area, and the other person’s recent behaviors, such as whether they have behaved in a lower-risk or higher-risk manner recently.

Let’s explore how you can estimate these two numbers (Activity Risk and Person Risk) for an activity you’d like to do.



[^1]:
     If you’re worried about surfaces, the best thing to do is to be careful not to touch your face (mouth, nose, or eyes) when out and about, unless you’ve just washed or sanitized your hands thoroughly. Getting the virus on your hands isn’t harmful in itself; it has to get to your mucous membranes in order to infect you.


`

const post = { title, content }
export default post

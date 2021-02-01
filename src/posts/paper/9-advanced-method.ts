const title = 'The Advanced Method makes a list of the person’s recent behavior'
const shortTitle = 'Advanced Method'
const content = `

To get an even more accurate estimate for Person Risk, we can actually add up the risk (in microCOVIDs) of their recent behavior. Remember, a single microCOVID represents a one-in-a-million chance of getting COVID.

The **Advanced Method** is to add up the risk of each individual activity that person has done recently.

The [Risk Tracker](/tracker) is a tool that can help you add up activities in the Advanced Method.

Just like you can calculate this for each of your actions, you can also calculate it for your friend’s actions, using the same formula:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

We can do this by looking at all of their activities between 2–9 days ago[^12] and determining the risk of each individual activity. Or if they do the same things every week, what does their typical week look like?

This is an advanced method because it requires asking about—and calculating the risk of—each of your friend’s recent or typical errands, hangouts, and other activities. And you might have to ask about your friend’s contacts too!

## Add up the person’s socializing, errands, and work

We suggest thinking about this in three categories: socializing, errands, and work. To calculate total Person Risk using the advanced method, you can add these three categories together, as follows:

<p class="calloutText">Person Risk (Advanced) = Socializing + Errands + Work</p>

Note that this formula uses addition, whereas everything else we’ve done until now has been multiplication.

For socializing, just estimate each social activity in microCOVIDs (using “Cost = Activity Risk ⨉ Person Risk”) and add them together. This is the place to count the exposure from all their household members as well.

Errands include grocery shopping, transit, and other public settings. These can be harder to estimate individually; we have some guidelines in the [Q&A](13-q-and-a).

Work is modeled just like the above socializing and errands, and you would ask similar kinds of questions: how many people is this person sharing indoor air space with? For how many hours per week? What is their risk profile like?

Though you can do Advanced Method calculations on your own, the [Risk Tracker](/tracker) was designed for that very purpose. It is a helpful tool for both individuals and households/pods who want to manage their risk.

The best way to understand how to apply the Advanced Method is through an example. See the [next section](10-example-person-risk) for a detailed example.


[^12]:
     The reason we care most about their activities between 2–9 days ago is because that is the most likely range of time intervals between infections. ([He et al](https://www.nature.com/articles/s41591-020-0869-5), figure 1c middle graph; [Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) “generation time”). See [Research Sources](14-research-sources) for graphs and more about the infectious period.

`

const post = { title, shortTitle, content }
export default post

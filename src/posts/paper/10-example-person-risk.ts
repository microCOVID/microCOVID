const title = 'Comparing Person Risk methods with an example'
const shortTitle = 'Comparing Methods'
const content = `

Let’s work through a quick example to compare the different approaches for estimating Person Risk.

Reasonable Rosie lives with one roommate in San Francisco and works from home. Rosie grocery shops twice a week in a well-fitting cloth mask. Nobody else visits Rosie’s apartment, and she doesn’t hang out with anyone else indoors. She went on 5 separate 1.5 hour masked, outdoor, regular distance (3-feet apart) walks with friends over the past ten days. For simplicity, we’ll assume her roommate does the exact same set of activities that she does.

You’re planning to hang out with Rosie and want to know her Person Risk, so you can know what precautions to take. You calculate:


*   Basic method: **5106** Person Risk.
    *   Because we estimate the San Francisco prevalence of COVID infection (at the time of writing) as 5106-in-a-million. This would change if prevalence changed.
*   Intermediate method: **2553** Person Risk.
    *   Rosie is _not_ a frontline worker, so we can reduce our estimate by the Frontline Work Factor of 1/2.
*   Advanced method: **217** Person Risk
    *   _Remember, here you’re calculating **Rosie’s own** risk of getting COVID from **her** activities, in microCOVIDs, which you can then use in calculating **your** risk of getting COVID from her._
    *   Each walk starts with a 6% Activity Risk (for one-time contact per hour) times 1.5 hours, and then gets a decrease of 2x for Rosie’s mask, 4x for her friend’s mask, and 20x for being outdoors. Since you she at regular distance on these walks (3 feet), there is no additional reduction for distance. We’ll treat the friends as average residents (using the 5106 Person Risk from the Basic Method above). Five walks in the past ten days adds up to \`0.06/hr ⨉ 1.5hr ⨉ 5 ⨉ 5106 ⨉ (1/2) ⨉ (1/4) ⨉ (1/20) = 14\` microCOVIDs.
    *   Rosie also goes to the grocery store twice a week. We estimate this as spending 2 hours per week, about six feet away (2x) from 5 random people at a time (each with 5106 Person Risk using the Basic Method), wearing a high-quality mask (2x). Let's assume the other people in the store are not wearing particularly good masks (no decrease), but that people are not talking (5x decrease). Rosie’s grocery shopping adds up to \`5106 ⨉ 0.06/hr ⨉ 2hr ⨉ 5 ⨉ (1/2) ⨉ (1/2) ⨉ (1/5) = 153\` microCOVIDs.
    *   So Rosie’s errands plus her walks gives her a risk of \`153 + 14 = 167\` microCOVIDs (or 167-in-a-million chance of catching COVID).
    *   If Rosie’s roommate does the same things (two hours of grocery shopping and five walks with friends per week), then Rosie’s roommate’s risk of getting COVID, in microCOVIDs, _due to sources other than Rosie_, is the same: 167. Multiply this by the 30% Activity Risk of being a roommate and you learn that Rosie’s roommate poses a risk to Rosie of \`0.30 ⨉ 167 = 50\` microCOVIDs.[^13]


    *   So the total COVID risk for Rosie, based on her behaviors, is \`153 + 14 + 50 = 217\` microCOVIDs. Now you can use this number as the “Person Risk” when you’re calculating your own chance of getting COVID from Rosie.

One thing you will notice is that when we re-compute Rosie's Person Risk via more detailed methods, we get substantially smaller numbers. This is because the Basic and Intermediate method both assume Rosie is about average, which is not true. In fact, she is being about ten times more cautious than the average non-essential-worker in her geographic area. The more you know about a person’s behavior, the more accurate your estimate can be. In some cases it might go up, in other cases it might go down.

With a total COVID risk of 217 microCOVIDs, Rosie is being much more cautious than average![^14] It’s also possible we’re still overestimating her risk, even using the Advanced Method. For example, if her friends are similar to her, then they are probably more cautious than average as well, which would reduce her COVID risk from socializing.

In our [calculator](/calculator) we’ve provided some Person Risk Profiles that were made using the Advanced Method. You can use them as a starting point to create your own calculations.

Now that we’ve looked at Person Risk, we can combine it with Activity Risk to get the cost in microCOVIDs of a given activity. Hooray, you made it!

[^13]:
     If the people in your household/pod have any significant exposure to the outside world (including groceries, essential work, etc.) then you will need to include your own contact with your housemates (or others in your pod) in your estimate of how many microCOVIDs of exposure _you_ have incurred, because those people’s Activity Risk is not zero. The fact that they are in your pod does not change the fact that everything they have done in the past 10 days poses a risk to you. See our [household/pod documentation](/tracker/household-pod) for more info on managing risk in that setting.

[^14]:
     If Reasonable Rosie keeps up this rate of 217 microCOVIDs per week, she’ll incur about 11,000 microCOVIDs per year, which implies about a 1% chance of getting COVID during that year. This is much lower than the average American!

[^essential]: By “essential worker” we mean roughly the same thing as the following two definitions. First: “Frontline workers include, but are not limited to, healthcare workers, protective service workers (police and EMTs), cashiers in grocery and general merchandise stores, production and food processing workers, janitors and maintenance workers, agricultural workers, and truck drivers.” ([econofact.org](https://econofact.org/essential-and-frontline-workers-in-the-covid-19-crisis)) Second: “Essential workers are those who must leave their home to do their jobs AND: who interact in person with members of the public; OR who cannot maintain social distancing at their jobs; OR who work directly with people who are homeless or who have serious medical conditions or who are over age 60.” (originally from [color.com](https://www.reddit.com/r/sanfrancisco/comments/gacw9v/covid19_testing_sites_falling_short_of_5000_test/))
`

const post = { title, shortTitle, content }
export default post

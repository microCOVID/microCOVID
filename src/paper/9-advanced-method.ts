const title = "The Advanced Method makes a list of the person's recent behavior"
const shortTitle = 'Advanced Method'
const content = `

To get an even more accurate estimate for Person Risk, we can actually add up the risk (in microCOVIDs) of their recent behavior. Remember, a single microCOVID represents a one-in-a-million chance of getting COVID.

The **Advanced Method** is to add up the risk of each individual activity that person has done recently.

Just like you can calculate this for each of your actions, you can also calculate it for your friend’s actions, using the same formula:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

We can do this by looking at all of their activities in the past 2–9 days[^12] and determining the risk of each individual activity. Or if they do the same things every week, what does their typical week look like?

This is an advanced method because it requires asking about—and calculating the risk of—each of your friend’s recent or typical errands, hangouts, and other activities. And you might have to ask about your friend's contacts too!

## Add up the person's socializing, errands, and work

We suggest thinking about this in three categories: socializing, errands, and work. To calculate total Person Risk using the advanced method, you can add these three categories together, as follows:

<p class="calloutText">Person Risk (Advanced) = Socializing + Errands + Work</p>

Note that this formula uses addition, whereas everything else we've done until now has been multiplication.

For socializing, just estimate each social activity in microCOVIDs (using “Cost = Activity Risk ⨉ Person Risk”) and add them together. This is the place to count the exposure from all their household members as well.

Errands include grocery shopping, transit, and other public settings. These can be harder to estimate individually; we have some guidelines in the [Q&A section](https://docs.google.com/document/d/1hOxv2F_XCf1tUEOU-yQ6vsJcBWBex5ZlP3poT9iGJUk/edit#heading=h.l40d9yf3rvx6) [TODO verify link copying].



**Person Risk example**

Let’s work through a quick example to compare the different approaches for estimating Person Risk.

Reasonable Rosie lives with one roommate in San Francisco and works from home. Rosie rides the bus to the park and also grocery shops once a week in a well-fitting cloth mask. Nobody else visits Rosie’s apartment, and she doesn’t hang out with anyone else indoors. She went on 5 separate 1.5 hour masked outdoor walks with friends over the past ten days. For simplicity, we’ll assume her roommate does the exact same set of activities that she does.

You’re planning to hang out with Rosie and want to know her Person Risk, so you can know what precautions to take.  You calculate:



*   Basic method: **5106** Person Risk.
    *   Because we estimate the San Francisco prevalence of COVID infection (at the time of writing) as 5106-in-a-million. This would change if prevalence changed.
*   Intermediate method: **2553** Person Risk.
    *   Rosie is _not_ an essential worker, so we can reduce our estimate by the Essential Work Factor of 1/2.
*   Advanced method with a rule-of-thumb measurement of COVID risk from errands: **381** Person Risk
    *   _Remember, here you’re calculating **Rosie’s own** risk of getting COVID from **her** activities, in microCOVIDs, which you can then use in calculating your risk of getting COVID from her._
    *   Using the rule of thumb suggested above, calculate Rosie’s grocery shopping and bus riding at 10% of the Intermediate method estimate of **2553**, which contributes 255 microCOVIDs to her total.
    *   Each walk starts with a 6% Activity Risk (for one-time contact per hour) times 1.5 hours, and then gets a decrease of 2x for Rosie’s mask, 4x for her friend’s mask, and 10x for being outdoors. We’ll treat the friends as average residents. Five walks in the past ten days adds up to 0.06/hr ⨉ 1.5hr ⨉ 5 ⨉ 5106 ⨉ (1/2) ⨉ (1/4) ⨉ (1/10) = 29 microCOVIDs.
    *   So Rosie’s errands plus her walks gives her a risk of 255 + 29 = 284 microCOVIDs (or 284-in-a-million chance of catching COVID).
    *   If Rosie’s roommate did the same things (grocery shopping, bus riding, five walks with friends), then Rosie’s roommate’s risk of getting COVID, in microCOVIDs, (_due to sources other than Rosie)_ is the same: 284. Multiply this by the 30% Activity Risk of being a roommate and you learn that Rosie’s roommate poses a risk to Rosie of 0.30 x 293 = 85 microCOVIDs.[^13]


    *   So the total COVID risk for Rosie, based on her behaviors, is 255 + 29 + 85 = 369 microCOVIDs.  Now you can use this number as the “Person Risk” when you’re calculating your own chance of getting COVID from Rosie.

One thing you will notice is that when we re-compute the Person Risk used for a hangout with Rosie via more detailed methods, we get substantially smaller numbers. This is because the Basic and Intermediate method both assume Rosie is about average, which is not true. The more you know about a person’s behavior, the more accurate your estimate can be. In some cases it might go up, in other cases it might go down.

With a total COVID risk of 369 microCOVIDs, Rosie is being more cautious than average![^14] It’s also possible we’re still _over_estimating her risk, even using the Advanced Method. She may be incurring less risk from errands than the 10% rule of thumb suggests, and if her friends are similar to her, then they are probably more cautious than average as well, which would reduce her COVID risk from socializing.

In our [calculator](/calculator) we’ve provided some Person Risk Profiles that were made using the Advanced Method. You can use as a starting point to create your own calculations.

Now that we’ve looked at Person Risk, we can combine it with Activity Risk to get the cost in microCOVIDs of a given activity. Hooray, you made it!


[^4]:
     Note that this figure includes both _presymptomatic_ transmissions (where the person transmitting COVID will eventually show symptoms, usually within a few days, but hasn’t yet) and _asymptomatic_ transmissions (where the person transmitting will never show symptoms). Catching COVID from someone _presymptomatic_ is much more common: this accounts for about 50% of all transmissions, as opposed to _asymptomatic_ transmissions which account for only about 5%. The COVID discourse tends to muddy this fact somewhat. Asymptomatic infections are inherently harder to measure (because you probably won't get tested if you don't show symptoms), and there are indeed plenty of them. However, most of them don’t infect anyone else. Thus, they don’t wind up affecting our risk calculations that much.

[^5]:
     The most-infectious period starts a couple days after infection, but the day-to-day noise in new case numbers is enough that “0-7 days ago” and “2-9 days ago” are unlikely to be meaningfully different. We’ve found Figure 2 in [Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) most helpful when thinking about this.

[^6]:
     As an example, New York City in March–April 2020 was completely overwhelmed by COVID, with widespread reports that even people with obvious and severe symptoms were unable to receive a test. We’ll look specifically at the five boroughs plus Westchester, Nassau, and Suffolk counties, an area containing 12.2 million residents. A survey for COVID antibodies in these counties performed between April 25–May 6 [found](https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/commercial-lab-surveys.html) that 23% of people had previously been infected, but according to the [Johns Hopkins dashboard](https://coronavirus.jhu.edu/us-map) only 263,900 cases (2.2% of the area’s population) had been officially recorded by May 1.

[^7]:
     Note these are _contagiousness-adjusted_ underreporting factors: that is, we think the total number of infections might be 6x the reported number of cases, but additionally that the unreported infections are somewhat less contagious (due to containing a higher proportion of asymptomatic individuals), so we adjust this factor down. See Research Sources TODO for our full methodology and reasoning here.

[^8]:
     With this low of a positive test rate, an even lower underreporting factor is quite plausible, but we don’t have enough data to estimate just how low we should go.

[^9]:
     Tip: if your data source lists a “7-day moving average” of cases on a certain day, the number of cases in the preceding week is just 7 times that.

[^10]:
     This seems high to us: a 5107-in-a-million chance over a week-long period of getting COVID from being an average SF resident implies the average SF resident has a 23% annualized chance of getting COVID. That seems pretty bad. We really hope we’re wrong somewhere and the real number is lower; perhaps we don’t need as high as a 6x underreporting factor anymore?

[^11]:
     We derive this from data about US essential workers, and from a blanket testing initiative in the Mission District in San Francisco. First, we use data from [McNicholas & Poydock Table 4](https://www.epi.org/blog/who-are-essential-workers-a-comprehensive-look-at-their-wages-demographics-and-unionization-rates/) showing that around 55 million people in the US are essential workers (38% of workforce and 17% of the population); we sanity-check this against [another source](https://bayareaequityatlas.org/essential-workers) citing 28% of workers in the Bay Area are essential workers. In [Chamie et al.](https://www.medrxiv.org/content/10.1101/2020.06.15.20132233v1.full.pdf)’s blanket testing survey of residents in the Mission District in San Francisco, they found a positive test rate of 5% among frontline service workers and 0.8% among non-frontline workers (6.27x higher for frontline workers). The overall prevalence is a population-weighted average: \`prevalence_total = 0.17 x p_essential + 0.83 x (p_essential / 6.27)\`. From this we compute \`p_essential = 3.3 x prevalence_total\`. We round off to 3x for essential workers, and 0.5x for all others.

[^12]:
     The reason we care most about their activities between 2–9 days ago is because that is the most likely range of time intervals between infections ([Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) “generation time”).

`

const post = { title, shortTitle, content }
export default post

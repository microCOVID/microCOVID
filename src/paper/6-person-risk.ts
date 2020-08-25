const title = 'Person Risk'

const content = `

_Person Risk_ is the chance that the other person currently has COVID. This is based on overall prevalence in your area and their recent behaviors.

So you’ve decided to meet a friend for lunch. You know the Activity Risk is 6% per hour (for an indoor unmasked lunch) and much less if you MODify your hangout. But the Activity Risk _assumes_ that they currently have COVID.

What’s the chance that your friend actually has COVID? They aren’t coughing and they feel totally fine. Can you conclude they aren't infected? Unfortunately, no. Roughly [55% of COVID transmissions](https://science.sciencemag.org/content/368/6491/eabb6936) happen when the person has _no symptoms_.[^4]

 * Not all diseases work this way—for example, [Ebola](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4358015/) is only contagious when the person is already exhibiting symptoms. However, COVID is a different disease, and one of its defining features is that it has a high rate of transmission from people _who don’t yet have symptoms_.

This means that the chance someone has COVID (which we’re calling “Person Risk”) depends on their actions and choices in the past 10 days or so, not just whether they’re actively showing symptoms.

We use three different methods of guessing someone’s chance of having COVID.

*   The **Basic Method** is to just assume the person is “average” for their region. The chance your friend has COVID is the chance that _anyone_ in your geographic area has COVID.
*   The **Intermediate Method** adds adjustments for whether the person is or isn’t an essential worker.
*   The **Advanced Method** is to add up the risk of each individual activity that person has done recently.

You do not need to understand exactly how these methods work to use the [calculator](/calculator), but if you want to create your own custom estimates for specific people in your life then we strongly recommend learning to use the Advanced Method.


### Skip ahead and takeaways

If you would like to skip ahead, please first read the following takeaways that we think are the most important things conveyed in the next few sections:

* **The chance someone has COVID is very different in different geographic regions.**
  * The very same activity that is fairly safe where I live might be fairly dangerous where my parents live, because the risk that people have COVID there is higher.
* **People who interact with the public at work are at greater risk of having COVID.**
  * We estimate essential workers are 3x more likely than average to have COVID.
  * People who are not essential workers are half as likely as average to have COVID.

If you would like to understand how we use the basic, intermediate, and advanced methods to calculate Person Risk, read on.


Skip ahead to [Putting it all together](/paper/9-putting-it-all-together)\u23E9, or read on about the [Basic Method](/paper/7-basic-method)\u27A1 for more detail.

[^4]:
     Note that this figure includes both _presymptomatic_ transmissions (where the person transmitting COVID will eventually show symptoms, usually within a few days, but hasn’t yet) and _asymptomatic_ transmissions (where the person transmitting will never show symptoms). Catching COVID from someone _presymptomatic_ is much more common: this accounts for about 50% of all transmissions, as opposed to _asymptomatic_ transmissions which account for only about 5%. The COVID discourse tends to muddy this fact somewhat. Asymptomatic infections are inherently harder to measure (because you probably won't get tested if you don't show symptoms), and there are indeed plenty of them. However, most of them don’t infect anyone else. Thus, they don’t wind up affecting our risk calculations that much.

[^5]:
     The most-infectious period starts a couple days after infection, but the day-to-day noise in new case numbers is enough that “0-7 days ago” and “2-9 days ago” are unlikely to be meaningfully different. We’ve found Figure 2 in [Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) most helpful when thinking about this.

[^6]:
     As an example, New York City in March–April 2020 was completely overwhelmed by COVID, with widespread reports that even people with obvious and severe symptoms were unable to receive a test. We’ll look specifically at the five boroughs plus Westchester, Nassau, and Suffolk counties, an area containing 12.2 million residents. A survey for COVID antibodies in these counties performed between April 25–May 6 [found](https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/commercial-lab-surveys.html) that 23% of people had previously been infected, but according to the [Johns Hopkins dashboard](https://coronavirus.jhu.edu/us-map) only 263,900 cases (2.2% of the area’s population) had been officially recorded by May 1.

[^7]:
     Note these are _contagiousness-adjusted_ underreporting factors: that is, we think the total number of infections might be 6x the reported number of cases, but additionally that the unreported infections are somewhat less contagious (due to containing a higher proportion of asymptomatic individuals), so we adjust this factor down. See [Research Sources](/14-research-sources) for our full methodology and reasoning here.

[^8]:
     With this low of a positive test rate, an even lower underreporting factor is quite plausible, but we don’t have enough data to estimate just how low we should go.

[^9]:
     Tip: if your data source lists a “7-day moving average” of cases on a certain day, the number of cases in the preceding week is just 7 times that.

[^10]:
     This seems high to us: a 5107-in-a-million chance over a week-long period of getting COVID from being an average SF resident implies the average SF resident has a 23% annualized chance of getting COVID. That seems pretty bad. We really hope we’re wrong somewhere and the real number is lower; perhaps we don’t need as high as a 6x underreporting factor anymore?

[^11]:
     We derive this from data about US essential workers, and from a blanket testing initiative in the Mission District in San Francisco. First, we use data from [McNicholas & Poydock Table 4](https://www.epi.org/blog/who-are-essential-workers-a-comprehensive-look-at-their-wages-demographics-and-unionization-rates/) showing that around 55 million people in the US are essential workers (38% of workforce and 17% of the population); we sanity-check this against [another source](https://bayareaequityatlas.org/essential-workers) citing 28% of workers in the Bay Area are essential workers. In [Chamie et al.](https://www.medrxiv.org/content/10.1101/2020.06.15.20132233v1.full.pdf)’s blanket testing survey of residents in the Mission District in San Francisco, they found a positive test rate of 5% among frontline service workers and 0.8% among non-frontline workers (6.27x higher for frontline workers). The overall prevalence is a population-weighted average: \`prevalence_total = 0.17 x p_essential + 0.83 x (p_essential / 6.27)\`. From this we compute \`p_essential = 3.3 x prevalence_total\`. We round off to 3x for essential workers, and 0.5x for all others.

[^12]:
     Technically we care most about their activities between 2–9 days ago, because that is the most likely range of time intervals between infections ([Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) “generation time”).

[^13]:
     Technically, Rosie and her roommate each pose a risk of 85 microCOVIDs to each other. If the people in your household (or “bubble,” or “pod,” or whatever term you want to use) have any significant exposure to the outside world (including groceries, essential work, etc.) then you will need to include your own contact with your housemates (or others in your pod) in your estimate of how many microCOVIDs of exposure _you_ have incurred, because those people’s Activity Risk is not zero. The fact that they are “in your bubble” does not change the fact that everything they have done in the past 10 days poses a risk to you.

[^14]:
     If Reasonable Rosie keeps up this rate of 369 microCOVIDs per week, she’ll incur about 20,000 microCOVIDs per year, which implies about a 2% chance of getting COVID during that year. This is lower than the average American, but is too high for comfort for some people!

[^essential]: By "essential worker" we mean roughly the same thing as the following two definitions. First: "Frontline workers include, but are not limited to, healthcare workers, protective service workers (police and EMTs), cashiers in grocery and general merchandise stores, production and food processing workers, janitors and maintenance workers, agricultural workers, and truck drivers." ([econofact.org](https://econofact.org/essential-and-frontline-workers-in-the-covid-19-crisis)) Second: "Essential workers are those who must leave their home to do their jobs AND: who interact in person with members of the public; OR who cannot maintain social distancing at their jobs; OR who work directly with people who are homeless or who have serious medical conditions or who are over age 60." (originally from [color.com](https://www.reddit.com/r/sanfrancisco/comments/gacw9v/covid19_testing_sites_falling_short_of_5000_test/))
`

const post = { title, content }
export default post

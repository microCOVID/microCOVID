const title = 'Person Risk'

const content = `

### Person Risk: the chance your contact has COVID

So you’ve decided to meet a friend for lunch. You know the Activity Risk is 6% per hour (for an indoor unmasked lunch) and much less if you MODify your hangout. But the Activity Risk _assumes_ that they have COVID. 

What’s the chance that your friend actually has COVID? They aren’t coughing and they feel totally fine. Can you conclude they aren't infected? Unfortunately, no. Roughly [55% of COVID transmissions](https://science.sciencemag.org/content/368/6491/eabb6936) happen when the person has _no symptoms_.[^4]

Not all diseases work this way—for example, [Ebola](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4358015/) is only contagious when the person is already exhibiting symptoms. However, COVID is a different disease, and one of its defining features is that it has a high rate of transmission from people _who don’t show symptoms_.

This means that the chance someone has COVID (which we’re calling “Person Risk”) depends on their actions and choices in the past 10 days or so, not just whether they’re actively showing symptoms.

We’ll show you three different methods of guessing someone’s chance of having COVID.

*   The **basic method** is to just assume the person is “average” for their region. The chance your friend has COVID is the chance that _anyone_ in your geographic area has COVID.
*   The **intermediate method** adds adjustments for whether the person is or isn’t an essential worker.
*   The **advanced method** is to add up the risk of each individual activity that person has done recently. 


**Basic method: Regional prevalence**

As we know, prevalence varies widely across different geographic locations. For example, at the time of writing, Sydney has much less COVID than San Francisco. So the Person Risk from your friend in Sydney will be much lower than the risk from your friend in San Francisco.

To estimate the chance a random resident in your area has COVID, you need to figure out the number of **new infections last week** in your area. This is because a typical person is infectious for about a one-week period[^5].

With some Googling, you can look up the number of **new reported cases** in your region last week. (Make sure to look up _new_ cases, not _total_ cases). But before you can use this number, you need to take into account two important factors.

The first factor is **underreporting**. Many people with COVID won’t ever get counted in the official statistics. They might not think their symptoms are anything unusual, so they don’t get tested. Or they might not be able to access testing.[^6]

The second factor is **delay**. There’s a delay of 1-2 weeks between when people got infected and when their positive test results come back. The true number of cases _last_ week isn’t known yet, and won’t be known until those tests come back _next_ week.

To estimate the prevalence of COVID where you live, start by looking up the number of reported cases last week in your region. You decide how to define your region. This might be based on the county where you live, or you might want to include multiple counties if you live in a major metropolitan area. If data is limited, you might have to use your entire state.

If you live in the US, you can use the [CovidActNow](https://covidactnow.org/us) website. This gives _daily_ new cases per _100,000_ people. To get a week's worth of cases for your entire region, you'll need to calculate: \`daily new cases per 100,000 people * 7 days * population of your region / 100,000\`.

We then suggest using the following factors to adjust for underreporting and delay:

*   **Underreporting factor:** You can use the _positive test rate_ (the percentage of tests that come back COVID-positive) as some evidence about how many infections are being caught by testing. Ideally, the positive test rate should be very low, indicating that contact tracing is working to find all contacts of an infected person, and that testing is available for each contact. If a high percentage of tests are coming back positive, then there are probably a lot _more_ infected people out there than the testing data shows. If you live in the US, you can look up the positive test rate in your state at [CovidActNow](https://covidactnow.org). 
    *   If the percentage of positive tests is 5% or lower, we suggest a 4x underreporting factor.[^7]


    *   If the percentage of positive tests is between 5% and 15%, we suggest a 5x factor.
    *   If the percentage of positive tests is greater than 15%, we suggest _at least_ a 7x factor. This indicates dangerously little testing in your area compared to the number of infected people. 

*   **Delay factor:** Since test results take about one week to come back on average, the number of _new reported cases_ in your region last week really represents the number of _new positive test results_ in your region _the week before that_. If cases are flat or falling, it's fine to use this number as is. If cases are rising, then we need to estimate the increase by comparing last week's reported case numbers to the week before that. For example, if last week there were 120 reported cases, and the previous week there were 80 reported cases, then the weekly increase is \`120 / 80 = 1.5\`. We would use 1.5x as our delay factor.

Use this equation (along with the two factors above) to calculate the regional prevalence of COVID in your area:

<p class="calloutText">Actual Infections Last Week = Reported Cases ⨉ Underreporting Factor ⨉ Delay Factor</p>


From there, calculate the basic person risk by comparing the actual infections last week with the overall population in your region.

<p class="calloutText">Person Risk (Basic) = Actual Infections Last Week / Population In Millions</p>

Here are two examples:

*   As of July 26, 2020, the state of New South Wales in Australia (where Sydney is located) had [81 new cases in the last week](https://web.archive.org/web/20200726233453/https://www.health.nsw.gov.au/Infectious/covid-19/Pages/stats-nsw.aspx), and a population of around 7.5 million. The week before that, there were 62 new cases. \`81 / 62 = 1.3\` so we’ll use a 1.3x delay factor. The percentage of positive COVID tests is extremely low: \`81 cases / 135,089 tests = 0.05%\` so we'll use our minimum 4x underreporting factor. Therefore, \`81 reported cases * 1.3 * 4 = 421 actual infections last week\`.[^8] So the Person Risk (the chance that a random resident in New South Wales has COVID) is \`421 infections / 7,500,000 people = 0.000056 or 0.0056%\`. An easier way to talk about this tiny number is to multiply it by a million: \`0.000056 * 1,000,000 = 56\`. This is the same as if we had just divided by 7.5 (the population _in millions_). So if all you know about a person is that they live in New South Wales, their Person Risk is **56**, which means there's a **56-in-a-million** chance that they currently have COVID (for this particular week). 

*   Compare this with San Francisco County in California, which had [749 new cases](https://data.sfgov.org/stories/s/dak2-gvuj) during that same week, and a population of 0.88 million.[^9] Cases at that time were declining, so we won’t use a delay factor. The [positive test rate is 4.3%](https://data.sfgov.org/stories/s/d96w-cdge), so we’ll use a 6x underreporting factor. Therefore, \`749 reported cases * 6 = 4494 actual infections last week\`. To get the Person Risk, divide by the population (in millions): \`4494 infections / 0.88 million people = 5107\`.[^10] So a resident of San Francisco has a Person Risk of **5107**, or a **5107-in-a-million** chance of currently having COVID (for this particular week). 

5107-in-a-million (in San Francisco) is about 90 times higher than 56-in-a-million (in Sydney). So the average Person Risk in San Francisco is 90x as high as in Sydney!

Another way to think about this is that inviting one random person over for coffee (indoors, unmasked, undistanced) in San Francisco at the time of writing is about as risky as inviting 90 random Sydney residents to your home.

But of course, not everyone is average. The Person Risk of someone who works at a grocery store is different from the Person Risk of someone who works from home and doesn’t leave the house, even if they live in the same city, because these two people have significantly different behaviors. How can we model those differences?

**Intermediate method: Adjust for essential workers**

For a slightly more nuanced estimate, we can adjust for the fact that work circumstances matter. Frontline essential workers unfortunately have a higher chance of infection than others. Compared to the average resident, we estimate that:

* frontline workers are **3x more likely** to have COVID, and 
* anyone who is not a frontline worker is **0.5x as likely**[^11] to be infected. 

We can use the following equation to adjust our estimate of Person Risk:

<p class="calloutText">Person Risk (Intermediate) = Person Risk (Basic) ⨉ Frontline Work Factor</p>

In the example above, if all you know about someone is that they live in San Francisco, their Person Risk is 5107 (for the week ending July 26, 2020). If you also know that they are a frontline worker, then \`5107 * 3 = 15,321\` so their Person Risk increases to 15,321. If instead you know that they are not a frontline worker, then \`5107 * 0.5 = 2553\` so their Person Risk goes down to 2553. 

[TODO add thank you to essential workers?]

**Advanced method: Add up risks for an individual person given their recent behavior**

To get an even more accurate estimate for Person Risk, we can actually add up the risk (in microCOVIDs) of their recent behavior. Remember, a single microCOVID represents a one-in-a-million chance of getting COVID. Just like you can calculate this for each of your actions, you can also calculate it for your friend’s actions, using the same formula:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

We can do this by looking at all of their activities in the past 10 days or so[^12] and determining the risk of each individual activity. Or if they do the same things every week, what does their typical week look like?

If you already know that this sort of detailed calculation isn’t something that you want to do, go ahead and skip forward to the next section of this blog post. [TODO: skip ahead link].

This is an advanced method because it requires asking about—and calculating the risk of—each of your friend’s recent or typical errands, hangouts, and other activities. And you might have to ask about your friend's contacts too! 

We suggest thinking about this in three categories: socializing, errands, and work. To calculate total Person Risk using the advanced method, you can add these three categories together, as follows:

<p class="calloutText">Person Risk (Advanced) = Socializing + Errands + Work</p>

Note that this formula uses addition, whereas everything else we've done until now has been multiplication. 

For socializing, just estimate each social activity in microCOVIDs (using “Cost = Activity Risk ⨉ Person Risk”) and add them together. This is the place to count the exposure from all their household members as well.

Errands include grocery shopping, transit, and other public settings. These can be harder to estimate individually; we have some guidelines in the [Q&A section](https://docs.google.com/document/d/1hOxv2F_XCf1tUEOU-yQ6vsJcBWBex5ZlP3poT9iGJUk/edit#heading=h.l40d9yf3rvx6) [TODO verify link copying]. But if estimating each one individually sounds hard, a faster way to model errands and work combined is to use the following rule of thumb: use 10% of the Intermediate Person Risk to stand in for the total of all their public activity combined. This doesn’t factor in how many times per week they grocery shop, or what exactly their workplace is; it’s a way to avoid having to think about those details. You might prefer to estimate each individual excursion separately.

<p class="calloutText">Errands + Work = Person Risk (Intermediate) ⨉ 10%</p>

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

In our microCOVIDs calculator [TODO link], we’ve provided some Person Risk examples that you can use as a starting point to create your own calculations.

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
     Technically we care most about their activities between 2–9 days ago, because that is the most likely range of time intervals between infections ([Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) “generation time”).

[^13]:
     Technically, Rosie and her roommate each pose a risk of 85 microCOVIDs to each other. If the people in your household (or “bubble,” or “pod,” or whatever term you want to use) have any significant exposure to the outside world (including groceries, essential work, etc.) then you will need to include your own contact with your housemates (or others in your pod) in your estimate of how many microCOVIDs of exposure _you_ have incurred, because those people’s Activity Risk is not zero. The fact that they are “in your bubble” does not change the fact that everything they have done in the past 10 days poses a risk to you.

[^14]:
     If Reasonable Rosie keeps up this rate of 369 microCOVIDs per week, she’ll incur about 20,000 microCOVIDs per year, which implies about a 2% chance of getting COVID during that year. This is lower than the average American, but is too high for comfort for some people!

`

const post = { title, content }
export default post
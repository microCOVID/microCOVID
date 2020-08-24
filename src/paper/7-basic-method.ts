const title =
  'The Basic Method of calculating Person Risk is the regional average'
const shortTitle = 'Basic Method'
const content = `

As we know, prevalence varies widely across different geographic locations. For example, at the time of writing, Sydney has much less COVID than San Francisco. So the Person Risk from your friend in Sydney will be much lower than the risk from your friend in San Francisco.

The **Basic Method** is to just assume the person is “average” for their region. The chance your friend has COVID is the chance that _anyone_ in your geographic area has COVID.

## How we estimate the regional average

To estimate the chance a random resident in your area has COVID, you need to figure out the number of **new infections last week** in your area. This is because a typical person is infectious for about a one-week period[^5].

We will give an overview of the steps, then explain the steps in more detail:

1. Start with the number of **new reported cases** in your region last week. The [calculator](/calculator) does this automatically for you, or you can look up these numbers manually by Googling.

However, this is just a start. You cannot use this number directly because it underestimates how many people are actually sick. You need to take into account two important factors.

2. The first factor is **underreporting**. Many people with COVID won’t ever get counted in the official statistics. They might not think their symptoms are anything unusual, so they don’t get tested. Or they might not be able to access testing.[^6]

3. The second factor is **delay**. There’s a delay of 1-2 weeks between when people got infected and when their positive test results come back. The true number of cases _last_ week isn’t known yet, and won’t be known until those tests come back _next_ week. If cases are rising, last week's statistics will be too low.

The [calculator](/calculator) can look up new reported cases automatically, and takes these adjustments into account as well.

To do these steps manually, or to understand how the calculator does it, follow these instructions:


### Step one: Look up reported cases
To estimate the prevalence of COVID where you live, start by looking up the number of reported cases last week in your region.

* Make sure to look up _new_ cases, not _total_ cases.
* Make sure to get statistics for a _week_, not a _day_.

You decide how to define your region. This might be based on the county where you live, or you might want to include multiple counties if you live in a major metropolitan area. If data is limited, you might have to use your entire state.

If you live in the US, you can use the [CovidActNow](https://covidactnow.org/us) website. This gives _daily_ new cases per _100,000_ people. To get a week's worth of cases, you'll need to calculate: \`daily new cases per 100,000 people * 7 days\`. You will then use 100,000 as the population.


### Step two: Underreporting factor

Many people with COVID won't ever get counted in the official statistics. The official statistics are **underreporting** the real number of new infections.

You can use the _positive test rate_ (the percentage of tests that come back COVID-positive) as some evidence about how many infections are being caught by testing. Ideally, the positive test rate should be very low, indicating that contact tracing is working to find all contacts of an infected person, and that testing is available for each contact. If a high percentage of tests are coming back positive, then there are probably a lot _more_ infected people out there than the testing data shows. If you live in the US, you can look up the positive test rate in your state at [CovidActNow](https://covidactnow.org).
  *   If the percentage of positive tests is 5% or lower, we suggest a 4x underreporting factor.[^7]

  *   If the percentage of positive tests is between 5% and 15%, we suggest a 5x factor.
  *   If the percentage of positive tests is greater than 15%, we suggest _at least_ a 7x factor. This indicates dangerously little testing in your area compared to the number of infected people.

### Step three: Delay factor
Since test results take about one week to come back on average, the number of _new reported cases_ in your region last week really represents the number of _new positive test results_ in your region _the week before that_. The results are **delayed**.

If cases are flat or falling, it's fine to use this number as is.

If cases are rising, then we need to estimate the increase by comparing last week's reported case numbers to the week before that. For example, if last week there were 120 reported cases, and the previous week there were 80 reported cases, then the weekly increase is \`120 / 80 = 1.5\`. We would use 1.5x as our delay factor

* In the [calculator](/calculator) this would be displayed as a 50% increase in cases from last week to this week

### Step four: Estimate actual infections

Use this equation to combine the previous three steps to estimate the regional prevalence of COVID in your area:

<p class="calloutText">Actual Infections Last Week = Reported Cases ⨉ Underreporting Factor ⨉ Delay Factor</p>

### Step five: Divide by population to get a final estimate
From there, calculate the basic person risk by comparing the actual infections last week with the overall population in your region.

<p class="calloutText">Person Risk (Basic) = Actual Infections Last Week / Population In Millions</p>

## Example calculations
Here are two examples:

### Sydney in July 2020 (lower prevalence)
* Step 1: As of July 26, 2020, the state of New South Wales in Australia (where Sydney is located) had [81 new cases in the last week](https://web.archive.org/web/20200726233453/https://www.health.nsw.gov.au/Infectious/covid-19/Pages/stats-nsw.aspx), and a population of around 7.5 million.

* Step 2: The week before that, there were 62 new cases. \`81 / 62 = 1.3\` so we’ll use a 1.3x delay factor. (i.e. a 30% increase in cases from last week to this week)

* Step 3: The percentage of positive COVID tests is extremely low: \`81 cases / 135,089 tests = 0.05%\` so we'll use our minimum 4x underreporting factor.[^8]

* Step 4: Therefore, \`81 reported cases * 1.3 * 4 = 421 actual infections last week\`.

* Step 5: So the Person Risk (the chance that a random resident in New South Wales has COVID) is \`421 infections / 7,500,000 people = 0.000056 or 0.0056%\`.
    *  An easier way to talk about this tiny number is to multiply it by a million:  \`0.000056 * 1,000,000 = 56\`. This is the same as if we had just divided by 7.5 (the population _in millions_).

So if all you know about a person is that they live in New South Wales, their Person Risk is **56**, which means there's a **56-in-a-million** chance that they currently have COVID (for this particular week).

### San Francisco in July 2020 (higher prevalence)
Compare this with San Francisco County in California, which had [749 new cases](https://data.sfgov.org/stories/s/dak2-gvuj) during that same week, and a population of 0.88 million.[^9] Cases at that time were declining, so we won’t use a delay factor. The [positive test rate is 4.3%](https://data.sfgov.org/stories/s/d96w-cdge), so we’ll use a 6x underreporting factor. Therefore, \`749 reported cases * 6 = 4494 actual infections last week\`. To get the Person Risk, divide by the population (in millions): \`4494 infections / 0.88 million people = 5107\`.[^10] So a resident of San Francisco has a Person Risk of **5107**, or a **5107-in-a-million** chance of currently having COVID (for this particular week).

### Comparing the above examples
5107-in-a-million (in San Francisco) is about 90 times higher than 56-in-a-million (in Sydney). So the average Person Risk in San Francisco is 90x as high as in Sydney!

Another way to think about this is that inviting one random person over for coffee (indoors, unmasked, undistanced) in San Francisco at the time of writing is about as risky as inviting 90 random Sydney residents to your home.




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

[^essential]: By "essential worker" we mean roughly the same thing as the following two definitions. First: "Frontline workers include, but are not limited to, healthcare workers, protective service workers (police and EMTs), cashiers in grocery and general merchandise stores, production and food processing workers, janitors and maintenance workers, agricultural workers, and truck drivers." ([econofact.org](https://econofact.org/essential-and-frontline-workers-in-the-covid-19-crisis)) Second: "Essential workers are those who must leave their home to do their jobs AND: who interact in person with members of the public; OR who cannot maintain social distancing at their jobs; OR who work directly with people who are homeless or who have serious medical conditions or who are over age 60." (originally from [color.com](https://www.reddit.com/r/sanfrancisco/comments/gacw9v/covid19_testing_sites_falling_short_of_5000_test/))
`

const post = { title, shortTitle, content }
export default post

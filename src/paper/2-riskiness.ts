const title = 'We measure the riskiness of interactions in “microCOVIDs”'
const shortTitle = 'Riskiness'

const content = `

You might have seen images categorizing COVID risk as [“high,” “medium,” or “low”](https://twitter.com/SaskiaPopescu/status/1279133758965248000) or rating activities on [a riskiness scale from 1 through 9](https://www.newsweek.com/texas-doctors-rank-1-9-risks-catching-covid-19-these-activities-1515790). This is helpful, but personally we found that we had to dig further—into actual numbers—so we could make confident decisions.

Calling an event “high risk” is like categorizing a furniture purchase as “expensive.” If I’m buying a rug, and I know it’s “expensive,” but it would really complete the look of my room, can I afford to splurge this time? Maybe, or maybe not! If the rug is $100, that might be a sensible purchase. But if the rug is $10,000 then I might have difficulty paying for rent and groceries if I buy it!

Similarly: if I’ve been told that going to gatherings is “high risk” but I really truly miss my friends and there’s a picnic coming up I want to attend, should I go? Is this high risk like skiing, or high risk like jumping off a cliff?

We would like to give you a research-based, quantitative framework to answer questions like these.

### We can use research to numerically estimate COVID risk

Some people might not realize that it’s even possible to measure and numerically quantify the risk of getting COVID. Most sources tend to give non-quantitative advice, such as “the CDC recommends that everyone wear a mask to reduce transmission.” This advice is good, but we would like to go even further.

Fortunately, there are now many research papers available about the numerical likelihood of getting COVID from different kinds of interactions. You can search for these studies on [Google Scholar](https://scholar.google.com/) and read them yourself. Some of these studies are not peer-reviewed (which is the gold standard for scientific publication), so it’s extra important to analyze them carefully. While none of us are public health experrts, we have enough academic background to feel comfortable wading into the literature to come up with numerical estimates. We explain more of our reasoning in footnotes and in the [Research Sources](14-research-sources) section.

### Measuring COVID risk in “microCOVIDs”

So let’s get started. To quantify the risk of an individual interaction—say, meeting a friend for coffee—we’re going to think in terms of **_microCOVIDs_** (abbreviated μCoV)[^1]: **a one-in-a-million chance of getting COVID[^2]**.

<p class="calloutText">1 microCOVID = a one-in-a-million chance of getting COVID</p>

For example, if you live in a region where about 1 in 1,000 people currently has COVID, then you could calculate based on studies of other indoor interactions (as we will explain later in this writeup) that meeting a friend for coffee indoors has about a 1 in 17,000 chance of giving you COVID. Such small numbers are hard to think about, so we can use microCOVIDs instead. Your coffee date would be about 60 microCOVIDs. By the end of this white paper, you will understand how to do these calculations yourself.

One benefit of using microCOVIDs is that you can straightforwardly add up microCOVIDs to estimate your risk over longer periods of time.[^3]
* Here’s an example (using some made-up numbers): last week you made two trips to the grocery store (25 microCOVIDs each), went for two masked outdoor walks with friends (1 microCOVID each), and otherwise stayed home alone, so your total risk for that week would be 52 microCOVIDs. You can imagine doing the same calculation over longer time intervals to estimate your chance of getting COVID in a month or even a year of activities.

We use microCOVIDs rather than some other scale factor (milliCOVIDs? nanoCOVIDs?) because they tend to come out as conveniently-sized numbers.

### How much is a microCOVID?

We—the authors—are a group of 30-something-year-olds in San Francisco who live together in a communal house and mostly work from home. After much discussion (which we hope to explain later in a future post), we agreed that we would aim to keep each of our individual risks of getting COVID below **1% per year**[^4] (i.e., about **10,000 microCOVIDs per year**[^5]). We don’t regularly interact with anyone who is at high risk of severe illness from COVID, but we also care a lot about doing our part to reduce the spread of the pandemic.

So, given that we each have 10,000 microCOVIDs to spend per year, and many of those are taken up by having housemates and running errands:

| An activity that measures this many microCOVIDs... | feels this risky… | … and we could do the activity this often, if we were not doing much else |
|----------------------------------------------|---------------------|---------------------------------------------------------------------------|
|                                       1 μCoV | almost negligible   | dozens of times per week                                                  |
|                                      10 μCoV | moderate risk       | several times per week                                                    |
|                                      100 μCoV | quite substantial risk       | once or twice a month                                                    |
|                                      1000 μCoV | borderline reckless       | once a year, *maybe*                                                    |



\n
\n

In general, if you are young and healthy, don’t regularly visit anyone who is [older](https://ourworldindata.org/mortality-risk-covid#case-fatality-rate-of-covid-19-by-age) or has [COVID risk factors](https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/people-with-medical-conditions.html), and are lucky enough to be able to make voluntary choices about your risk exposure, then we think aiming for 10,000 microCOVIDs per year (corresponding to 1% risk of COVID per year) is a plausible choice. This is based on two important considerations: risk to _you_, and risk to _others_.


*   **Risk to you:** If you are in the under-40 age bracket and do not have other risk factors, then a 1% chance of COVID per year puts your risk of disability due to COVID at about the same level as your risk of disability due to driving a car.[^6]


*   **Risk to others**: Even if you are personally comfortable with risk-taking, it’s important to choose a lower risk tolerance in order to protect vulnerable members of your community. Here are a few ways to think about that:
    *   If you get COVID, on average you will pass it to at least one other person, who in turn will pass it to others. Eventually it will reach someone who is at very high risk of death. By avoiding getting infected yourself, you are protecting these vulnerable members of your community.
    *   A useful ethical rule-of-thumb is to behave in a way that would be good if _everyone_ behaved that way. So, we can ask: what risk tolerance would keep the pandemic at manageable levels if everyone followed it? In most places in the US right now, a 1% yearly risk of COVID would keep the pandemic at manageable levels. For public health reasons, we wouldn’t recommend voluntarily choosing a risk tolerance higher than 3%.[^7]


    *   Some people (such as essential workers) have no choice but to run a high risk of getting COVID. Containing the pandemic across society only works if those of us who _do_ have a choice choose to take fewer risks.

What we want you to take away from this section is that for people in the authors’ demographics, an activity that is 1 microCOVID is _very low risk_, whereas an activity that is 1000 microCOVIDs is _very high risk_. Furthermore, any risk of infection that you incur is not just a risk to you, but also a risk to vulnerable people in your community.

Let’s now explore how to quantify the risk of various activities in terms of microCOVIDs.


<!-- Footnotes themselves at the bottom. -->


[^1]:
     μ is the standard abbreviation for “micro,” the unit prefix meaning “one millionth.” For example, one microgram (μg) is one millionth of a gram.

[^2]:
     Strictly speaking there is a difference between “getting SARS-CoV-2” (the virus itself) and “getting COVID-19” (the disease caused by the virus). In the rest of this article, no matter what language we use, we are talking about the total chance of getting infected, including if you show no symptoms and are an asymptomatic carrier of the virus. We chose to use “microCOVIDs” (referring to the disease) instead of “microCoV” (referring to the virus) for this article based on reader feedback that it was simpler and easier to understand. But we emphasize that we are not excluding asymptomatic infections from this measurement.

[^3]:
     Technical note—skip if you’re not interested in the underlying math! If you’ve worked with probabilities before, you might worry that adding them together like this is too straightforward to possibly be correct. There’s an underlying nonlinearity: while you could accumulate well over a million microCOVIDs if you do enough risky things, your chance of getting COVID can never be higher than 100%. To properly compute the probability that you remain uninfected despite independent activities A and B, you should calculate \`”probability not infected via A” * “probability not infected via B”\`. If you’d prefer to add instead of multiplying, then you’ll need to take a logarithm somewhere. Thus, to be fully correct, the formula for converting a risk (like 0.01 or 1%) to microCOVIDs should be \`-1,000,000 * ln(1 - risk)\`. You can use calculus to verify that when the risk is small, this is very well approximated by the simpler \`1,000,000 * risk\`. For values as high as 100,000 microCOVIDs, the error introduced by ignoring the logarithm is still within about 5%. The uncertainty in our other estimates is at least that large, so we think the simplification is reasonable.

[^4]:
     Technically, what we mean when we say “1% per year” is a 1% _annualized_ risk. That is, if we go 6 months without getting sick, we aren’t going to double our chances and bump up to a 2% chance in the following 6 months to even it out. We’ll continue at the same 1% annualized risk level.

[^5]:
     Since we live in a household of 8 people, we also have to account for the substantial risk of getting COVID _from each other_, not just outside the house. To keep each person’s annualized risk below 1%, each person only gets a budget of about 3,000 “out-of-house” microCOVIDs to “spend” on their personal activities. We hope to discuss these budgeting considerations for communal living in much more detail in a future writeup.

[^6]:
     Here are our calculations. We think as many as 1 in 10 COVID cases could potentially lead to long-term negative health consequences for the infected person; we don't think the ratio is likely to be higher than that, due to sources like the app-based [COVID Symptom Study](https://covid.joinzoe.com/post/covid-long-term) that found one in ten cases weren't fully recovered after 3 weeks. That would mean that a 1% chance of COVID is the same as up to a 0.1% chance of ongoing negative health consequences from COVID. The average American drives [13,476 miles per year](https://www.fhwa.dot.gov/ohim/onh00/bar8.htm). In 2018 [there were](https://cdan.nhtsa.gov/tsftables/National%20Statistics.pdf) 2,491,000 car-crash-related injuries (of any severity) spread across 3,240,327,000,000 vehicle miles travelled (see the [NHTSA website](https://cdan.nhtsa.gov/tsftables/tsfar.htm) for more detailed breakdowns). [A study of Swedish car crash injuries](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3256772/) found that 11.4% of them met the criteria for at least “1% permanent medical impairment” five years later. (“Permanent medical impairment” is a [legally-relevant concept](https://www.disabilitysecrets.com/resources/understanding-permanent-disability-rating-system.htm) that attempts to quantify disability, and the 1% level was the lowest level of disability that was discussed in the Swedish car crash study.) Multiplying this out, we get a 0.11% chance of ongoing negative health consequences from driving for one year.

[^7]:
     You can check the annual rate of COVID infection for your region by looking up the number of cases in the past _day_; for states in the US, try [covidactnow.org](http://covidactnow.org). Divide by your region’s population (or by 100,000 if the figure you got was “cases per 100,000 population”) and multiply by 365 (days per year) to get the proportion of your region that will have a reported case of COVID this year at current rates. You probably want to aim to stay below that percentage. For the San Francisco Bay Area in August 2020, it’s about 3.5%. Note that unlike the analysis we’ll do in the next section, there’s no correction for potential underreporting here, since we want to err on the _low_ side (not take too many risks).
`

const post = { title, shortTitle, content }
export default post

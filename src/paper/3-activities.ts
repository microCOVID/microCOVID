const title = 'How many microCOVIDs are different activities?'
const shortTitle = 'Activity Cost'
const content = `

### Understanding COVID transmission

First, we’d like to strengthen our intuitive model of COVID transmission.

COVID is transmitted primarily through tiny droplets produced when an infected person talks, coughs, or sneezes ([CDC FAQ](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)), many of which can [remain suspended in the air](https://docs.google.com/document/d/1Kx4Mka_nORa8LlEwziRYZxOX0J8_fFfgnt-9TBjxusc/edit) for minutes to hours. Touching contaminated surfaces or objects is _possibly_ a way that COVID spreads, but the [CDC](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html) believes the _main_ way it spreads is person-to-person through respiratory droplets. Therefore, in this post, we focus primarily on the risk from exhaled droplets in the air.[^1]

To visualize how exhaled droplets work, we suggest a helpful metaphor from our friend [Matt Bell](https://medium.com/@llebttam_45762/summer-vacations-in-the-era-of-covid-ab5576a7b302). Think of everyone around you exhaling cigarette smoke. If someone is smoking a cigarette in a park 30 feet away from you, you might not even smell it. But in a crowded bar where indoor smoking is permitted, the air will be thick with people’s smoky exhalations.

If you inhale just a bit of “smoke” (exhaled air) from someone with COVID, you might be fine. But if you inhale lots of “smoke,” you’re likely to get COVID. If you’re wondering about the riskiness of a situation, then it’s helpful to imagine, “What if everyone here were smoking a cigarette? How much smoke would I breathe?” If you’d be breathing other people’s smoke, then it’s a risky situation.

![LaVision imaging technique shows how masks restrict the spread of exhaled air](https://miro.medium.com/max/864/1*zyx-Sh2FQFwRGyQWkiherg.gif)

Source: [https://www.lavision.de/en/news/2020/4302/](https://www.lavision.de/en/news/2020/4302/)

Concretely, this means it’s important to avoid situations that feature the [3 C’s](https://www.businessinsider.com/how-japan-tackled-coronavirus-without-a-lockdown-2020-5): Crowds, Closed Spaces, and Close Contact. Why? Because if anyone there has COVID, which becomes likelier as the size of the crowd increases, their “smoke” will be blown into your face. Even if you're not standing near them, it will build up in the enclosed space, making it more likely that you’ll breathe it in.

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
*   Then your chance of contracting COVID from that activity-and-person pair is \`8% x 10,000 = 800 microCOVIDs (0.08%)\`.
*   If you’re aiming for at most 1% per year risk of COVID (which is 833 microCOVIDs per month), then you’ve spent almost a whole month’s worth of risk on this one activity!

**In other words, whenever you’re deciding to do an activity, ask: How risky is the activity itself? And how risky are the people you’re doing it with?**

We'll think about our actions in terms of how much they "cost" us in microCOVIDs:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

Let’s explore how you can estimate these two numbers (Activity Risk and Person Risk) for an activity you’d like to do.


### Activity Risk: The chance this activity transmits COVID to you

We’re going to summarize four key factors that affect Activity Risk:

* duration of contact
* masks
* location (outdoor vs. indoor), and
* distance from each other.

For speculation about other factors, see the Q&A [TODO].

We looked through a bunch of research [TODO check internal link] and extracted the following guesses for Activity Risk:

**Indoor Unmasked Transmission**

| Type of Contact | Rough chance you’ll get COVID if they have COVID | Citations: Why do we think this? <br> (See Research Sources [TODO] for detailed reasoning) |
|--|--|--|
| One-time contact (e.g., visiting one friend indoors) | about 6% per hour | Rough estimate from combining many sources: [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) train passenger study, [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), [Bi et al.](https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930287-5) contact tracing data, [Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis, [Cheng et al.](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2765641) prospective study |
| Household member | about 30% | Directly from [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) meta-analysis|
| Partner | perhaps 48% | Speculative. Adjusting [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) using a datapoint from [Li et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7184465/) |

[TODO: replace "perhaps" above with something more useful - can we just keep "about"?]


**Risk Reduction from Protective Measures**

| Protective Measure | Reduction in COVID risk to me | Citations: Why do we think this? <br> (See Research Sources [TODO] for detailed reasoning) |
|--|--|--|
| I’m wearing a high-quality mask[^2] | 2x | [Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis (2–3x), [Liang et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7253999/?fbclid=IwAR2jeBEkkl2YvR184no95tVQ-jER-59apwyUk2l6Xz8FXMEVbISmlrWqDCI) meta-analysis (2x),  [Lai et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/) mannequin study (2x) |
| Other person wearing a high-quality mask | 4x | [Davies et al.](https://www.researchgate.net/publication/258525804_Testing_the_Efficacy_of_Homemade_Masks_Would_They_Protect_in_an_Influenza_Pandemic) on improvised masks for influenza (5–7x), [Milton et al.](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205) on exhalations from influenza patients (3x) |
| Outdoors | 10x [TODO CHANGE TO 20x]| Speculative. Suggestive evidence: [Qian et al.](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) study of cases in China, [Jimenez’s Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), lack of surge from [BLM protests](https://www.nytimes.com/2020/07/01/nyregion/nyc-coronavirus-protests.html), anecdotal CO2 data from protests, [zero outdoor outbreaks of any kind, many indoor dining outbreaks](https://www.nytimes.com/2020/08/12/health/Covid-restaurants-bars.html), despite both indoor and outdoor dining being open in the US |
| > 6 feet distance | 2x | [Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) train passenger study |
| Each additional 3 feet of distance (up to 12 feet) | 2x | Same sources as above |


If you're taking multiple precautions, multiply these COVID risk reductions. So if you’re wearing a mask and they’re wearing a mask, then your reduction in COVID risk is 2x times 4x, which is 8x.

These numbers assume a conversation at normal volume. For louder contexts (singing, chanting, or speaking loudly) or quieter contexts (such as a subway car where nobody is speaking), you can adjust up or down; we brainstorm about how much to adjust in the Q&A section [TODO link].

There is substantial uncertainty in many of these numbers. We’ve generally chosen to err on the more conservative side, so that even if we’re off the mark it’s unlikely to expose you to more risk than you’re comfortable with. See the discussion of Research Sources (TODO link) for details about the data we based these numbers on.

_Important disclaimer for the tables above: We keep calling these numbers “guesses” and “rough estimates.” Please take our uncertainty seriously! Our goal in sharing these numbers is to enable ordinary people to do back-of-the-envelope calculations and [order-of-magnitude estimates](https://en.wikipedia.org/wiki/Fermi_problem) to make personal decisions. Although these numbers are based on multiple sources of evidence rather than being pulled out of thin air, we are nonetheless deviating from a firm medical standard of evidence. Additionally, we have made simplifications for ease-of-use. To learn more about the research supporting these estimates, please see the Research Sources [TODO check internal link] section in the Appendix._


### Indoor Unmasked Transmission

Indoor unmasked transmission is quite risky, though it’s far from guaranteed that you’ll get COVID from an indoor interaction with someone who is COVID-positive.

If you “just” see someone with COVID indoors _one time_ for an hour-long coffee meetup, then you have about a 6% chance of getting COVID from them.

If someone you _live with_ gets COVID, the chance you’ll get it is higher—more like 30%. This makes sense, because this is someone you might see as often as _every day_, not just once.[^3]

If the person you live with is a spouse or partner, the number is even higher, because this is someone you not only see every day but also might share a bed with (with your heads very close together). We estimate this at 48%.

In any case, indoor unmasked contact is quite risky. But you can reduce your Activity Risk by MODifiying your activity—doing it Masked, Outdoors, and Distanced.


### Modifiers to Activity Risk: Masked, Outdoors, Distanced

Instead of meeting a friend indoors, let’s say you choose to hang out outdoors, masked, and distanced. How much does that decrease your risk in microCOVIDs?

*   **Masks** reduce your risk by 8x. This is if _both_ people are wearing masks. _Your_ mask decreases the risk to _you_ by about 2x [(for a reasonably well-fitting surgical mask under normal conditions)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/). And _their_ mask decreases risk (to _you_) by 4x.
    *   Note: We are assuming basic surgical masks for this modeling. For more protection, there are other types of masks you can consider (addressed in the Q&A at the end) (TODO link). And bandanas or single-layer coverings provide _less_ protection than we estimate here (TODO link).
*   **Outdoors** reduces your risk by:
    *   10x because the outdoors is well-ventilated.
    *   If you’re 20 feet away *and* outdoors, you can probably ignore the risk from that person.
*   **Distance** reduces your risk by 2x if you’re 6 feet away, and another 2x for each additional 3 feet up to 12 feet. This gives a total risk reduction of:
    *   2x if you’re 6-9 feet away
    *   4x if you’re 9-12 feet away
    *   8x if you’re >12 feet away

Curious how we got these numbers? Again, check out the Research Sources [TODO check internal link copied] section!

By multiplying these three modifiers together, \`8 * 10 * 2 = 160\`, we can see that a MODified hangout (Masked, Outdoors, & Distanced) is **160 times** less risky than a non-masked, indoor, non-distanced hangout. If you have a 6% chance of getting sick from a one-hour indoor visit with someone who turns out to be COVID-positive, then you have a 6% / 160 = **0.04% chance** with full MOD protection. Please protect yourself!

![alt_text](images/image3.png "image_tooltip")

**TODO fix the above image (the Indoor Contact ratio is wrong)**


There are plenty of other precautions you can take to reduce your risk that we don’t describe here. For more on other precautions, see the [Q&A](https://docs.google.com/document/d/1hOxv2F_XCf1tUEOU-yQ6vsJcBWBex5ZlP3poT9iGJUk/edit#heading=h.l40d9yf3rvx6) [TODO internal link].

Ok, so we now understand Activity Risk—how your chance of getting the virus changes based on the activity you’re doing. But Activity Risk _assumes_ the person is COVID-positive. What are the actual chances that whoever you're interacting with has COVID? Let’s look at Person Risk to understand that.


### III.D) Person Risk: The chance your contact has COVID

So you’ve decided to meet a friend for lunch. What’s the chance that they have COVID? They aren’t coughing and they feel totally fine. Can you conclude they don’t have COVID? Unfortunately, no. Roughly [55% of COVID transmissions](https://science.sciencemag.org/content/368/6491/eabb6936) happen when the person has _no symptoms_![^4]

Not all diseases work this way—for example, [ebola](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4358015/) is only contagious when the person is already exhibiting symptoms. However, COVID is a different disease, and this disease in particular has a high rate of transmission from people _who don’t show symptoms_.

This means that the chance someone has COVID (which we’re calling “Person Risk”) depends on their actions and choices in the past 10-or-so days, not just whether they’re actively showing symptoms.

We’ll show you three different methods of guessing someone’s chance of having COVID.

*   The **basic method** is to just assume the person is “average” for their region. The chance your friend has COVID is the chance that _anyone_ in your geographic area has COVID.
*   The **intermediate method** adds adjustments for whether the person is or isn’t an essential worker.
*   The **advanced method** is to add up each individual activity for the person, based on their recent behavior. \


**Basic method: Regional prevalence**

As we know, prevalence varies widely across different geographic locations. For example, at the time of writing, Sydney has much less COVID than San Francisco. So the Person Risk from your friend in Sydney will be much lower than the risk from your friend in San Francisco.

To estimate the chance a random resident has COVID, you need to guess at the number of new_ _infections_ last week_ in your region. This is because a typical person is infectious for about a one-week period[^5].

With some Googling you can look up the number of _new reported cases_ in your region last week. (Make sure to look up _new_ cases, not _total_ cases). But you need to take into account two important factors when estimating the actual number of new infections.

The first consideration is **underreporting**. Many people with COVID won’t ever get counted in the official statistics. They might not think their symptoms are anything unusual, and so they don’t get tested. Or they might not be able to access testing.[^6]

The second consideration is **delay**. There’s a delay of 1-2 weeks between when people got infected and when their positive test results come back. The true number of cases _last_ week isn’t known yet, and won’t be known until those tests come back _next_ week.

To estimate the prevalence of COVID in your area, start by looking up the number of reported cases last week in your region. You decide how to define your region; this might be based on the county where you live, or you might want to include multiple counties if you live in a major metropolitan area. If data is limited, you might have to use your entire state.



*   If you live in the US, you can use the [CovidActNow](https://covidactnow.org/us) website. This gives _daily_ new cases per _100,000_ population, so you need to multiply by 7 to get a week’s worth of cases.

We then suggest using the following factors to adjust for underreporting and delay:



*   **Underreporting factor**: You can use the _positive test rate _(i.e. the percentage of tests that come back COVID-positive) as some evidence about how many infections are being caught by testing. If you live in the US, you can look up the positive test rate in your state at [https://covidactnow.org](https://covidactnow.org). If a high percentage of tests are coming back positive, then there are probably a lot _more_ infected people out there than the testing data shows.
    *   If the percentage of positive tests is 5% or lower, we suggest a 4x underreporting factor.[^7]


    *   If the percentage of positive tests is between 5% and 15%, we suggest a 5x factor.
    *   If the percentage of positive tests is greater than 15%, we suggest _at least_ a 7x factor. This indicates dangerously little testing in your area, compared to the number of infected people. \

*   **Delay factor:** If cases are rising, then we suggest multiplying last week’s cases by the latest week-over-week rate of increase. To do this, compare last week's case numbers to the week before that. For example, if last week there were 120 reported cases, and the previous week there were 80 reported cases, 120 / 80 = 1.5, so the week-over-week rate of increase is 1.5x. We would use 1.5x as our delay factor.

Use this equation (along with the two factors above) to calculate the regional prevalence of COVID in your area:

<p class="calloutText">Actual Infections Last Week = Cases ⨉ Underreporting Factor ⨉ Delay Factor</p>


From there, calculate the basic person risk by comparing the actual infections last week with the overall population in your region.

<p class="calloutText">Basic Person Risk = Actual Infections Last Week / Population In Millions</p>

To add specific numbers to this:



*   As of July 26, 2020, the state of New South Wales (where Sydney is located) had [81 new cases in the past week](https://web.archive.org/web/20200726233453/https://www.health.nsw.gov.au/Infectious/covid-19/Pages/stats-nsw.aspx), and a population of around 7.5 million. Cases are rising about 1.3x week-over-week, so we’ll use a 1.3x delay factor. The percentage of COVID tests that are positive is extremely low (81 cases divided by 135,089 tests = 0.05%) so we’ll multiply by our minimum 6x underreporting factor to get 630 infections total in the past week.[^8] So the Person Risk (the chance that a random resident has COVID) is 630 divided by 7.5 million, or **84-in-a-million** (we’ll just say **84** when talking about Person Risk, but that means 84-in-a-million chance of_ currently having_ COVID).


*   Compare this with San Francisco County, which had [749 new cases](https://data.sfgov.org/stories/s/dak2-gvuj) during the week ending July 26, and a population of 0.88 million.[^9] Cases at that time were declining, so we won’t add a delay factor. The [positive test rate is 4.3%](https://data.sfgov.org/stories/s/d96w-cdge), so we’ll use a 6x underreporting factor. This works out to 749 x 6 / 0.88 = **5106**[^10].
5106-in-a-million (in San Francisco) is about 60 times higher than 84-in-a-million (in Sydney). So the average Person Risk in San Francisco is 60x as high as in Sydney!

This means that inviting _one_ random person over for coffee in San Francisco at the time of writing is about as risky as inviting_ sixty_ random Sydney residents to your home.

But of course, not everyone is average. The Person Risk of someone who works at a grocery store is different from the Person Risk of someone who works from home and doesn’t leave the house, even if they live in the same city, because these two people have significantly different behaviors. How can we model those differences?

**Intermediate method: Adjust for essential work**

For a slightly more nuanced estimate, we can adjust for the fact that front-line essential workers (unfortunately) have a higher chance of infection. We estimate that front-line workers are **3x more likely** than average to have COVID, and that anyone who is _not_ a front-line worker is **1/2 as likely**[^11] to be infected. So we can use the following equation to adjust our estimate of Person Risk:

<p class="calloutText">Intermediate Person Risk = Basic Person Risk ⨉ Front-Line Work Factor</p>

**Advanced method: Add up risks for an individual person given their recent behavior**

To get an _even more_ accurate estimate for Person Risk, we can actually add up the risk (in microCOVIDs!) of _their_ recent behavior. Remember, a single microCOVID represents a one-in-a-million chance of getting COVID. Just like you can calculate this for each of your actions, you can also calculate it for your friend’s actions, using the same formula:

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

We can do this by looking at all of their activities in the past ten days or so[^12] and determining the risk of each individual activity. Or if they do the same things every week, what does their typical week look like?

If you already know that this sort of detailed calculation isn’t something that you want to do, go ahead and skip forward to the next section of this blog post. [TODO: skip ahead link].

This is an advanced method because it requires knowing—and calculating the risk of—your friend’s recent or typical errands, hangouts, and other activities. (And because the riskiness of each of your friend’s contacts is based on _that_ person’s history of activities and exposures!)

We suggest thinking about this in three categories: socializing, errands, and work.  To calculate total Person Risk using the advanced method, you can add these three categories together, as follows:

<p class="calloutText">Advanced Person Risk = Socializing + Errands + Work</p>

For socializing, just estimate each social activity in microCOVIDs (using “Cost = Activity Risk ⨉ Person Risk”) and add them together. This is the place to count the exposure from all their household members as well.

Errands include grocery shopping, transit, and other public settings. These can be harder to estimate individually; we have some guidelines in the [Q&A section](https://docs.google.com/document/d/1hOxv2F_XCf1tUEOU-yQ6vsJcBWBex5ZlP3poT9iGJUk/edit#heading=h.l40d9yf3rvx6) [TODO verify link copying]. But if estimating each one individually sounds hard, a faster way to model errands and work combined is to use the following rule of thumb: use 10% of the Intermediate Person Risk to stand in for the total of all their public activity combined. This doesn’t factor in how many times per week they grocery shop, or what exactly their workplace is; it’s a way to avoid having to think about those details. You might prefer to estimate each individual excursion separately.

<p class="calloutText">Errands + Work = Intermediate Person Risk ⨉ 10%</p>

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


### III.E) Combining Activity Risk and Person Risk to get microCOVIDs

We can now multiply Activity Risk by Person Risk to get the microCOVID cost of a given interaction.

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

Let’s say you would like to hang out with Reasonable Rosie (from the example above), whose Person Risk is 369 using the Advanced Method. An indoors meetup has a 6% Activity Risk per hour, so it costs you 6% per hour ⨉ 1.5 hours ⨉ 369 Person Risk = **33 microCOVIDs**.

<p class="calloutText">33 microCOVIDs = 6% per hour (Activity Risk) ⨉ 1.5 hr ⨉ 369 (Person Risk)</p>

If you both wear masks, it costs you 8x less: only **4 microCOVIDs.** And if you hang out outside instead of inside, it costs you _an additional _10x less, for just 0.4 microCOVIDs (**less than 1 microCOVID!**) \


<p class="calloutText">0.4 microCOVIDs = 6% per hour ⨉ 1.5 hr ⨉ (1/8 masks) ⨉ (1/10 outdoors) ⨉ 369 (Person Risk)</p>


Should you do these activities? It depends on how important you believe it is to avoid COVID (for your own health, and to protect others), and how important seeing Rosie is to you!



*   If you’re aiming for 1% risk per year (833 microCOVIDs per month), an indoor unmasked hangout with Reasonable Rosie is something you can do multiple times per month, and you can treat the outdoor masked hangout as totally “free.”
*   However, if you’re aiming for 0.1% risk per year (83 microCOVIDs per month), _two_ unmasked indoor hangouts with Reasonable Rosie add up to almost as much risk as you were willing to spend in an_ entire month_. To spend your microCOVIDs more efficiently, you’ll want to use protective measures like wearing a mask or only hanging out outdoors. Unless, of course, Reasonable Rosie is the only person you want to see all month.
*   And if you’re highly vulnerable and aiming for 0.01% risk per year (8.3 microCOVIDs per month), the outdoor mask walk is something you can afford, but you should limit yourself to just a few per week, and you _cannot_ hang out indoors with Reasonable Rosie _even once_ without jeopardizing a large fraction of your budget for the entire year.

Note that all these values depend on _San Francisco prevalence in July 2020_. If you’re reading this at a different place or time, we suggest you re-do the math for your own region today! (reminder: Actual Infections Last Week = Cases ⨉ Underreporting Factor ⨉ Delay Factor, and Basic Person Risk = Infections Last Week divided by Population)


[^1]:
     If you’re worried about surfaces, the best thing to do is to be careful not to touch your face (mouth, nose, or eyes) when out and about, unless you’ve just washed your hands thoroughly. Getting the virus on your hands isn’t harmful in itself; it has to get to your mucous membranes in order to infect you.

[^2]:
     We mean surgical masks, well-fitted cloth masks with a filter, or similar high-quality masks. Bandanas, poorly-fitting masks, or DIY masks will likely give less protection than this.

[^3]:
     You might ask: why isn’t the risk of getting COVID from someone in your house _even more risky_ compared to the risk from hanging out with a friend? Why is the household member risk (30%) only as bad as about 5 hours of one-time interaction (at 6% per hour)? Our main guess is that people often reduce contact with household members who have been exposed or have started showing symptoms. This means that “living with someone who has COVID” doesn’t mean the same normal behavior you have with household members ordinarily. It could also just be the case that our estimates are wrong: we might be overestimating the one-time hangout risk, or underestimating the household member risk. We look forward to improved data.

[^4]:
     Note that this figure includes both _presymptomatic_ transmissions (where the person transmitting COVID will eventually show symptoms, usually within a few days, but hasn’t yet) and _asymptomatic_ transmissions (where the person transmitting will never show symptoms). Catching COVID from someone _pre_symptomatic is much more common: this accounts for about 50% of all transmissions, as opposed to _a_symptomatic transmission which accounts for only about 5%. The popular discourse tends to muddy this fact somewhat. There are a _lot_ of asymptomatic _infections_, which are inherently harder to measure (because you probably won’t get tested if you don’t show symptoms). However, most of them don’t infect anyone else. Thus, they don’t wind up affecting our risk budget that much.

[^5]:
     The most-infectious period starts a couple days after infection, but the day-to-day noise in new case numbers is enough that “0-7 days ago” and “2-9 days ago” are unlikely to be meaningfully different. We’ve found Figure 2 in [Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) most helpful when thinking about this.

[^6]:
     As an example, New York City in March–April 2020 was completely overwhelmed by COVID, with widespread reports that even people with obvious and severe symptoms were unable to receive a test. We’ll look specifically at the five boroughs plus Westchester, Nassau, and Suffolk counties, an area containing 12.2 million residents. A survey for COVID antibodies in these counties performed between April 25–May 6 [found](https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/commercial-lab-surveys.html) that 23% of people had previously been infected, but according to the [Johns Hopkins dashboard](https://coronavirus.jhu.edu/us-map) only 263,900 cases (2.2% of the area’s population) had been officially recorded by May 1.

[^7]:

     Note there are _contagiousness-adjusted_ underreporting factors: that is, we think the total number of infections might be 6x the reported number of cases, but additionally that the unreported infections are somewhat less contagious (due to containing a higher proportion of asymptomatic individuals), so we adjust this factor down. See Research Sources TODO for our full methodology and reasoning here.

[^8]:

     With _this_ low of a positive test rate, an _even lower_ underreporting factor is quite plausible, but we don’t have data in this regime to estimate just how low we should go.

[^9]:

     Tip: if your data source lists a “7-day moving average” of cases on a certain day, the number of cases in the preceding week is just 7 times that.

[^10]:
     This seems high to us: a 5106-in-a-million chance over a week-long period of getting COVID from being an average SF resident implies the average SF resident has a 23% annualized chance of getting COVID. That seems pretty bad. We really hope we’re wrong somewhere and the real number is lower; perhaps we don’t need as high as a 6x underreporting factor anymore?

[^11]:
     We derive this from data about US essential workers, and from a blanket testing initiative in the Mission in San Francisco. First, we use data from [McNicholas & Poydock Table 4](https://www.epi.org/blog/who-are-essential-workers-a-comprehensive-look-at-their-wages-demographics-and-unionization-rates/) showing that around 55 million people in the US are essential workers (38% of workforce and 17% of the population); we sanity-check this against [another source](https://bayareaequityatlas.org/essential-workers) citing 28% of workers in the Bay Area are essential workers. In [Chamie et al.](https://www.medrxiv.org/content/10.1101/2020.06.15.20132233v1.full.pdf)’s blanket testing survey of residents in the Mission in San Francisco, they found a positive test rate of 5% among frontline service workers and 0.8% among non-frontline workers (6.27x higher for frontline workers). The overall prevalence is a population-weighted average: prevalence_total = 0.17 x p_essential + 0.83 x (p_essential / 6.27). From this we compute p_essential = 3.3 x prevalence_total. We round off to 3x for essential workers, and 0.5x for all others.

[^12]:
     Technically we care most about their activities between 2–9 days ago, because that is the most likely range of time intervals between infections ([Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) “generation time”).

[^13]:

     Technically, Rosie and her roommate each pose a risk of 85 microCOVIDs to each other.  If the people in your household ( or “bubble”, or “pod”, or whatever term you want to use) have any significant exposure to the outside world (including groceries, essential work, etc.) then you will need to include your own contact with your housemates (or others in your pod) in your estimate of how many microCOVIDs of exposure _you_ have incurred, because those people’s Activity Risk is not zero. The fact that they are “in your bubble” does not change the fact that everything they have done in the past 10 days poses a risk to you.

[^14]:
     If Reasonable Rosie keeps up this rate of 369 microCOVIDs per week, she’ll incur about 20,000 microCOVIDs per year, which implies about a 2% chance of getting COVID during that year. This is lower than the average American, but is too high for comfort for some people!
`

const post = { title, shortTitle, content }

export default post

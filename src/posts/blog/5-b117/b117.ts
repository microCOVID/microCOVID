const title = 'Model updates for the new, more contagious COVID-19 variant'

const author = 'Ben Shaya'
const date = 'January 5, 2021'

const summary =
  'The new variant of COVID, B117, is ~50% more contagious than the viruses that were circulating before. We explain why that matters and how microCOVID is changing to account for this.'
const content = `
If you’ve been keeping tabs on COVID-19 news, you might have seen news of a new variant, first spotted in the UK, that is more contagious than the previous variants. We’ve been following research from the UK on this variant, and have concluded that there is sufficient evidence to make some major changes to microCOVID.

Here’s what we cover below:

1. [What’s changing?](#whats-changing)
2. [Why is this happening?](#why-is-this-happening)
3. [Why is this a big deal?](#why-is-this-a-big-deal)
4. [What does this mean for microCOVID?](#what-does-this-mean-for-microcovid)
5. [Impact on Calculator Users](#impact-on-calculator-users)
6. [Impact on Spreadsheet users](#impact-on-spreadsheet-users)
7. [Should I reduce my risk budget?](#should-i-reduce-my-risk-budget)
8. [What changes are we making to our lifestyles?](#what-changes-are-we-making-to-our-lifestyles)
9. [This sucks!](#this-sucks)

## What’s changing?

As of today, Activity Risks for one-time interractions have been increased 50% from 6% to 9%. The Housemate and Partner Activity Risks are unchanged, but we expect to tweak them in the near future.

## Why is this happening?

Researchers in the UK identified a variant of COVID-19 that is spreading considerably faster than other variants of the virus. In a pandemic, viruses mutate randomly. Most mutations before now have not appreciably changed the dynamics of the virus. The new variant, named B117 in most media sources or VOC 202012/01 in most scientific journals, appears to be 56% more contagious than the variants that were previously circulating[^1].  Additionally, early evidence also indicates that the B117 variant is roughly as deadly as the previous variants.  

## Why is this a big deal?

B117 has already been found in [5 states and 33 countries](https://www.usatoday.com/story/news/health/2021/01/02/new-covid-strain-b-117-explained/4112125001/) and it is better at spreading than other variants, it almost certainly will continue to spread until it is the most common strain of COVID-19. B117 is contagious enough that all past efforts to contain COVID-19 in the United States would be insufficient to prevent its exponential growth - prevalence will increase to record numbers in the next few months, and everyday activities will become much riskier for the first quarter of 2021.

Epidemiologists track the trajectory of COVID-19 with two numbers:

- The current prevalence, i.e. % of a population that currently has the virus
- The Reproduction Number, or R, which describes how many people each infected person goes on to infect.

You can think of R as the rate of change of the prevalence; if R is 1, each infected person infects one other person, and the caseload is stable. If R is less than 1, things get better as caseload drops. If R is greater than one, the caseload increases exponentially.

In California, the lowest R has ever been is about 0.9 - allowing caseload to slightly decrease in the late summer. Currently R is 1.3, resulting in the number of cases doubling roughly every month.

When B117 becomes the dominant variant in California, we expect R to be 1.5x higher. That means that, unless we resume the very cautious behavior and limited interaction we had during the initial lockdown, caseload will increase rapidly when B117 is dominant. It is quite plausible that caseloads will triple (or worse) every month from January to March.

## What does this mean for microCOVID?

We stand by microCOVID as the best tool for adapting to changing conditions, as microCOVID tracks and updates the prevalence of COVID-19 in your region. B117’s impact on you will be dominated by the effects on regional prevalence.  The more contagious variant means that Activity Risk increases by just 1.5x for all activities, but the longer term effect on R means Person Risk could end up increasing by 10x or more over time.

We are also updating Activity Risks for "One-time interactions" to assume that B117 is the dominant variant. This is an aggressive change, as we expect it will take 2-4 months for B117 to completely spread everywhere. However, we have no data on the proportion of the virus that is B117, so it could be true for any given region at any given time. Making this change now means you’ll be ahead of the curve in adapting to changing conditions. If you have data on the proportion of cases in your region that are B117, you may multiply activity risk by a factor of \`%B117 + (1-%B117) / 1.5\`

We are not changing the multipliers for Partner or Housemate Activity Risks right now; there is additional research that we are currently analyzing for household transmission that we expect will mostly counterract the net effect of B117 on these numbers. Expect a small change in the next few weeks.

## Impact on Calculator users

The [Calculator](/) has been updated as outlined in (What’s Changing). You may continue to use the calculator as usual.

## Impact on Spreadsheet users

We recommend that [Risk Tracker spreadsheet](/tracker) users update their pod to the newest version of the spreadsheet as soon as possible. The new version is set to use parameters for the the new variant.

See the [latest version of the template Risk Tracker spreadsheet](/tracker) or update your existing following the instructions in the [Risk Tracker Changelog](https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8/edit#heading=h.oojlk631x46d).

## Should I reduce my risk budget?

Our budget is based on how bad the outcome getting COVID-19 is. Given that the new variant seems to cause similar hospitalization, ICU, and death rates as the old variant, our budget recommendations are unchanged.

## What changes are we making to our lifestyles?

We in the Ibasho community are anticipating significant changes in what activities we will be doing if prevalence rises as we predict. We are sharing this here in the hopes that some of these changes may be helpful to you for staying within your own risk budget.

- Checking prevalence numbers more frequently - the cost of activities changes week to week as caseloads are changing rapidly.
- Avoiding being in stores with a non-rated mask.
  - Previously we would use P100 respirators or N95/KN95 masks for longer grocery store trips, but would occasionally use a cloth mask for short trips to a corner store - as prevalence rises, we are switching over to P100/N95/KN95’s for even short trips.
  - We are increasing our usage of curbside pickup, farm CSAs, and grocery deliveries.
- Reducing indoor contact between households.
    - We had been using microCOVID to budget for indoor hangouts between households that use the system. 
    - As case rates rose, these have become more infrequent.
    - If case rates continue to rise as we are predicting, we anticipate being completely locked down.
- Wearing a mask in outdoor areas unless 15+ feet away from other people.
- Avoiding crowded outdoor areas, even when wearing masks.
- Prioritizing doing any elective medical procedures (dental cleaning, checkup, etc) ASAP, since we expect things to get worse over the next 3 months.

We recognize that staying within a 200microCOVID risk budget is not feasible for many people due to life or employment circumstances the force them to have contact with other people. This makes it more important for those who can reduce their risk to be safe and help bring prevalence down. 

## This sucks!

Yes, it really does. 😞 

The good news is it should be over soon - between vaccinations ramping up and large numbers of people getting sick and recovering, we expect that herd immunity is just a few months away. Expect better conditions when the weather gets warmer.

It’s possible that a government response or people choosing to be more vigilant will drive cases down sooner. We would absolutely love to be wrong about the trajectory of the virus. If that happens, microCOVID will reflect conditions as they change.

[^1]: [https://www.medrxiv.org/content/10.1101/2020.12.24.20248822v1.full.pdf](https://www.medrxiv.org/content/10.1101/2020.12.24.20248822v1.full.pdf)
`

export const post = { title, summary, content, author, date }
export default post

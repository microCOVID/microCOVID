const title =
  'The Intermediate Method makes slight adjustments to the Basic Method'
const shortTitle = 'Intermediate Method'
const content = `

One difficulty with the [Basic Method](/7-basic-method) is that not everyone is average. The Person Risk of someone who works at a grocery store is different from the Person Risk of someone who works from home and doesn’t leave the house, even if they live in the same city, because these two people have significantly different behaviors. How can we model those differences?

The **Intermediate Method** adds adjustments for whether the person is or isn’t an essential worker.


## Intermediate method: Adjust for frontline workers

For a slightly more nuanced estimate, we can adjust for the fact that work circumstances matter. Frontline essential workers unfortunately have a higher chance of infection than others. Compared to the average resident, we estimate that:

* frontline workers are **3x more likely** to have COVID, and
* anyone who is not a frontline worker is **0.5x as likely**[^11] to be infected.

By "frontline worker" we mean someone who leaves their home to work, and who interacts in person with members of the public, or cannot maintain social distancing at work.[^essential]


We can use the following equation to adjust our estimate of Person Risk:

<p class="calloutText">Person Risk (Intermediate) = Person Risk (Basic) ⨉ Frontline Work Factor</p>

In the example above, if all you know about someone is that they live in San Francisco, their Person Risk is 5107 (for the week ending July 26, 2020).

* If you also know that they _are_ a frontline worker, then \`5107 * 3 = 15,321\` so their Person Risk increases to 15,321.
* If instead you know that they _are not_ a frontline worker, then \`5107 * 0.5 = 2553\` so their Person Risk goes down to 2553.
* If you're not certain, don't make any adjustment.


[^4]:
     Note that this figure includes both _presymptomatic_ transmissions (where the person transmitting COVID will eventually show symptoms, usually within a few days, but hasn’t yet) and _asymptomatic_ transmissions (where the person transmitting will never show symptoms). Catching COVID from someone _presymptomatic_ is much more common: this accounts for about 50% of all transmissions, as opposed to _asymptomatic_ transmissions which account for only about 5%. The COVID discourse tends to muddy this fact somewhat. Asymptomatic infections are inherently harder to measure (because you probably won't get tested if you don't show symptoms), and there are indeed plenty of them. However, most of them don’t infect anyone else. Thus, they don’t wind up affecting our risk calculations that much.


[^11]:
     We derive this from data about US essential workers, and from a blanket testing initiative in the Mission District in San Francisco. First, we use data from [McNicholas & Poydock Table 4](https://www.epi.org/blog/who-are-essential-workers-a-comprehensive-look-at-their-wages-demographics-and-unionization-rates/) showing that around 55 million people in the US are essential workers (38% of workforce and 17% of the population); we sanity-check this against [another source](https://bayareaequityatlas.org/essential-workers) citing 28% of workers in the Bay Area are essential workers. In [Chamie et al.](https://www.medrxiv.org/content/10.1101/2020.06.15.20132233v1.full.pdf)’s blanket testing survey of residents in the Mission District in San Francisco, they found a positive test rate of 5% among frontline service workers and 0.8% among non-frontline workers (6.27x higher for frontline workers). The overall prevalence is a population-weighted average: \`prevalence_total = 0.17 x p_essential + 0.83 x (p_essential / 6.27)\`. From this we compute \`p_essential = 3.3 x prevalence_total\`. We round off to 3x for essential workers, and 0.5x for all others.

[^essential]: Here are two definitions we have seen of "frontline" or "essential" workers. First: "Frontline workers include, but are not limited to, healthcare workers, protective service workers (police and EMTs), cashiers in grocery and general merchandise stores, production and food processing workers, janitors and maintenance workers, agricultural workers, and truck drivers." ([econofact.org](https://econofact.org/essential-and-frontline-workers-in-the-covid-19-crisis)) Second: "Essential workers are those who must leave their home to do their jobs AND: who interact in person with members of the public; OR who cannot maintain social distancing at their jobs; OR who work directly with people who are homeless or who have serious medical conditions or who are over age 60." (originally from [color.com](https://www.reddit.com/r/sanfrancisco/comments/gacw9v/covid19_testing_sites_falling_short_of_5000_test/))
`

const post = { title, shortTitle, content }
export default post

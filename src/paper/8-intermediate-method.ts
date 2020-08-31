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

By “frontline worker” we mean someone who leaves their home to work, and who interacts in person with members of the public, or cannot maintain social distancing at work.[^essential]


We can use the following equation to adjust our estimate of Person Risk:

<p class="calloutText">Person Risk (Intermediate) = Person Risk (Basic) ⨉ Frontline Work Factor</p>

In the example above, if all you know about someone is that they live in San Francisco, their Person Risk is 5107 (for the week ending July 26, 2020).

* If you also know that they _are_ a frontline worker, then \`5107 * 3 = 15,321\` so their Person Risk increases to 15,321.
* If instead you know that they _are not_ a frontline worker, then \`5107 * 0.5 = 2553\` so their Person Risk goes down to 2553.
* If you’re not certain, don’t make any adjustment.


[^11]:
     We derive this from data showing that 17% of the US population are essential workers ([McNicholas & Poydock Table 4](https://www.epi.org/blog/who-are-essential-workers-a-comprehensive-look-at-their-wages-demographics-and-unionization-rates/)), and from a blanket testing initiative in the Mission District in San Francisco ([Chamie et al.](https://www.medrxiv.org/content/10.1101/2020.06.15.20132233v1.full.pdf)) that found a ~6x higher positive test rate among frontline service workers. See [Research Sources](/paper/14-research-sources) for the full calculation.

[^essential]: Here are two definitions we have seen of “frontline” or “essential” workers. First: “Frontline workers include, but are not limited to, healthcare workers, protective service workers (police and EMTs), cashiers in grocery and general merchandise stores, production and food processing workers, janitors and maintenance workers, agricultural workers, and truck drivers” ([econofact.org](https://econofact.org/essential-and-frontline-workers-in-the-covid-19-crisis)). Second: “Essential workers are those who must leave their home to do their jobs AND: who interact in person with members of the public; OR who cannot maintain social distancing at their jobs; OR who work directly with people who are homeless or who have serious medical conditions or who are over age 60” (originally from [color.com](https://www.reddit.com/r/sanfrancisco/comments/gacw9v/covid19_testing_sites_falling_short_of_5000_test/)).


`

const post = { title, shortTitle, content }
export default post

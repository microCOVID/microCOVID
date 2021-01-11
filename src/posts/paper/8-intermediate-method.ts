const title =
  'The Intermediate Method adjusts risk based on industry of employment'
const shortTitle = 'Intermediate Method'
const content = `

The [Basic Method](/7-basic-method) applies when you know nothing about the person. Many members of our community suspected that people working outside the home or in frequent contact with people (grocery store checkout clerks, healtcare workers, etc) would be at significantly greater risk of contracting COVID-19.
The **Intermediate Method** is a quick adjustment for the risk a person's job exposed them to.

## Intermediate method: Adjust for job exposure.

We found evidence suggesting that healthcare and social services workers tend to get infected at 2x the average rate, while people in jobs that could work from home were infected at 1/2x the average rate [^11]. 

We can use the following equation to adjust our estimate of Person Risk:

<p class="calloutText">Person Risk (Intermediate) = Person Risk (Basic) ⨉ Workplace Factor</p>

In the example above, if all you know about someone is that they live in San Francisco, their Person Risk is 5,000 (for the week ending July 26, 2020).

* If you also know that they work in healthcare or social services, then \`5,000 * 2 = 10,000\` so their Person Risk increases to 10,000.
* If instead you know that they work from home, then \`5,000 * 0.5 = 2,500\` so their Person Risk goes down to 2,500.
* If they work outside the home but not in healthcare or social services, or you don't know anything about them, don’t make any adjustment.

This is a very broad stroke, intended for people who you don't know well enough to make a more detailed estimation. There is huge variation within industries of how much contact someone has and what PPE they wear. Additionally, if a person's social life involves seeing people indoors and undistanced, that can completely dominate their risk of infection. For people with whom you can discuss individual actions, read on to see how the Advanced Method to get a more detailed risk estimate for those people.

Finally, we note that Healthcare and Social Services workers are among the first who will be vaccinated. This should significantly reduce their risk of getting infected and is projected to be completed by the end of March.

[^11]:
     We derive this from [data from Washington State](https://www.doh.wa.gov/Portals/1/Documents/1600/coronavirus/IndustrySectorReport.pdf) that shows that Health Care and Social Assistance workers accounted for 25% of infections but just 13% of the population, or about twice as many cases as average. Most other categories, including Retail, Accomodation + Food Services, Construction, and Manufacturing were infected at the state average rate. Workers who could work from home, including Educational Services (Washington moved to distance learning) and Professional, Scientific, and Technical
     Services were infected at about half the average rate.
`

const post = { title, shortTitle, content }
export default post

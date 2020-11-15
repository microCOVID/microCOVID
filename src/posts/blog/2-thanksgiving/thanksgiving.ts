import gatherSafely from './gather_safely.png'
import { ImageMeta } from 'posts/post'

const title = 'Thanksgiving during COVID'

const author = 'Ben Shaya'
const date = 'November 15, 2020'
const image: ImageMeta = {
  url: gatherSafely,
  width: 1910,
  height: 1000,
}

const summary =
  'Thanksgiving is fast approaching! I examined the risks of coming home for Thanksgiving and suggest some precautions to make it 1000x safer for my family.'

const content = `<figure><img src=${gatherSafely}><figcaption>Illustration by Melody Chang</figcaption></figure>

Thanksgiving is my family’s favorite holiday. My brother and I live far from home, and it’s the one weekend a year, our family reliably gets together. This year, traveling is a lot less palatable - I really don’t want to bring home a deadly virus to my parents. I used the microCOVID calculator to figure out how risky my trip was and how I could reduce that risk by 1000x. 

**These are the key takeaways:**

1. Travel safer, avoid flying if possible
2. Avoid indoor contact with others starting 10 days before the gathering
3. Encourage all guests to do the same
4. Do 1-3, even if you are also getting tested
## Travel Safer
- Given that I’d be on a crowded plane, I’ve opted to buy the best protection - N95/KN95 masks provide the best protection - 10x better than a cloth mask. I bought mine at [Honest PPE Supply](https://honestppe.supply/) for about $3 a mask.
- If I could avoid flying I really should - a plane ride is about as risky as 12 weeks of grocery shopping (which is already one of the more dangerous activities!).
- Likewise, it would have been ideal for me to quarantine for 10 days after getting off the plane (to ensure I don’t pass on the virus if I get it on the plane). I don’t have a good place near my parents to do so.
## Avoid Indoor Contact
- COVID spreads via exhaled particles; whenever someone is breathing in the same room as you, they could be transmitting the virus.
- Starting 14 days before your gathering:
    - I will avoid working in an indoor space with others. I note that I’m fortunate to have a job that allows this. If I were working a job that made me come in, I’d wear a KN95 mask during this period.
- Starting 10 days before your gathering:
    - I won’t share air space with others - no indoor dining or in person shopping. I’ll shop ahead of time or use curbside pickup for essentials.
    - If I must go into a store, I’ll wear our KN95 mask.
    - I won’t spend time indoors with friends - but I can still hang out with them outside.
    - I don’t have housemates, but if I did, I would try to avoid sharing air with them - I’ll use the kitchen at different times and run a HEPA Air Purifier in common spaces.
## Encourage Family/Guests to do the Same
- Since my brother would also be coming, I’d need to talk to him about taking the same precautions as me. Keeping our parents safe is on both of us!
- We normally have friends over for Thanksgiving, but we won’t do that this year. Having a smaller gathering reduces how many people might bring COVID to dinner, and reduces how many people will be exposed if someone does show up with the virus.
## Tests Don’t Replace Staying Safe
- Taking a test before seeing my parents isn’t the same as taking the above precautions - COVID tests give a snapshot of whether or not a person contracted the virus 5-8 days ago.
- Even if a test comes back negative, I might have contracted the virus after I took the test, so it only works if I’m careful starting 5 days before the test.

Again, following the above precautions, even without the extra ones, reduce the chance of my parents getting COVID by **1000x**. But even with all that, I would be exposing my parents to a full 6 weeks of their risk budget. In the end, our family decided to give this year a pass. Hopefully we'll have a vaccine by next year and life can go back to normal.

Your family's risk tolerance may be different than mine - if you decide the risk is worthwhile I highly recommend working some or all of these precautions into your plans!

----------
# Behind the Scenes: How I used microCOVID to Plan My Trip

Here’s the steps I took to assess what the risk level of my family gathering would be. The general precautions I outlined are great practice and should work for you, even if you don’t want to dive into the numbers. If calculating out your exact risk and optimizing for your situation is something that excites you, read on!

Note: The microCOVID values reported here are a snapshot from November 14, 2020. Following the links on a different day may give different results if prevalence changes.

Note 2: Location matters! If you want to apply these to your own plans, be sure to change the location to where you are travelling from and to.


## The Plane Ride
****
A 3 hour plane from Denver while wearing a N95 mask costs [200 microCOVIDs](/?distance=normal&duration=180&interaction=oneTime&personCount=20&riskProfile=average&setting=transit&subLocation=US_08013&theirMask=basic&topLocation=US_08&voice=silent&yourMask=n95).

## Transit to and from the Airport
****
A taxi to the airport in Denver costs [20 microCOVIDs](/?distance=sixFt&duration=60&interaction=oneTime&personCount=1&riskProfile=average&setting=carWindowsDown&subLocation=US_08031&theirMask=basic&topLocation=US_08&voice=silent&yourMask=basic). The taxi from the airport in Maryland costs [4 microCOVIDs](https://www.microcovid.org/?distance=sixFt&duration=60&interaction=oneTime&personCount=1&riskProfile=average&setting=carWindowsDown&subLocation=US_24031&theirMask=basic&topLocation=US_24&voice=silent&yourMask=basic). I included rolling down the windows for the ride.

If public transit is an option for you, we note that many trains/subways are relatively safe, due to great air circulation. Busses do not have these filtration systems and are riskier than cars.

Either way, transit to the airport is relatively safe!

## Behavior Before Travel

My normal routines include grocery shopping with an N95 mask ([40 microCOVIDs](/?distance=sixFt&duration=60&interaction=oneTime&personCount=5&riskProfile=average&setting=indoor&subLocation=US_08031&theirMask=basic&topLocation=US_08&voice=silent&yourMask=n95)) and seeing my partner who used microCOVID to manage her risk ([100 microCOVIDs](https://www.microcovid.org/?distance=sixFt&duration=60&interaction=partner&personCount=1&riskProfile=onePercent&setting=indoor&subLocation=US_08031&theirMask=basic&topLocation=US_08&voice=silent&yourMask=n95)).

My brother also grocery shops (40 microCOVIDs), and his partner is a schoolteacher, and schools have been in-person ([200,000 microCOVIDs](/?distance=sixFt&duration=2400&interaction=oneTime&personCount=10&riskProfile=average&setting=indoor&subLocation=US_08031&theirMask=basic&topLocation=US_08&voice=normal&yourMask=basic))

## Quarantining

If we were to fly home today to see our parents, we have a total of over 200,600 microCOVIDs. Our parents would get 30% of this, or 60,000 microCOVIDs. As people over the age of 60, their weekly microCOVID budget is 20, so coming home would be 3000x their weekly budget or 60x their annual budget. That’s no good!

We need to reduce the chance of bringing home the virus. This is where quarantining comes in. We can avoid risky behavior for 14 days prior to seeing our parents, which gives us a chance to see if we actually got COVID (and not come in contact with our parents if we did).

There are a couple of durations of  quarantine that get thrown around - the two I’ll talk about are 14 and 10.

- 14 days - catches 99.9% of cases
- 10 days - catches 95% of cases

Or in the context of microCOVID, a 10 day quarantine reduces your risk by 95%. A 14 day quarantine reduced your risk by 99.9%.

My brother’s partner, who currently has 200,000 microCOVIDs, needs to sit out the full 14 day quarantine (as a 10 day quarantine would bring her to 10,000). My brother and I only need a 10 day quarantine, as this will bring me from 140 to 7 and him from 40 to 2.

Of course, quarantining from a job is not always easy. For those who don’t have the option of working remotely or taking time off, there’s no easy answer. Consider what your options are and how much risk you’re willing to bring home.

There is also a choice of quarantining at home or at your destination; if we quarantine at home in Denver, all three of us still incur 100 microCOVIDs from the plane ride, which we’d bring home to our parents. To be maximally safe, we would instead quarantine in Maryland, *after* flying. However, doing this would require getting a hotel or other place to stay in Maryland where we wouldn’t be sharing air with our parents. It would probably be less comfortable than staying at either our homes or our parents’, but it would reduce our microCOVIDs by 95 a piece.

## Putting it Together

With a quarantine at home and N95 masks on the plane, we still come home with about 800microCOVIDs. Our parents would record a “housemate” interaction with us, which gives them 240 microCOVIDs. Assuming they are otherwise being maximally safe, that is 12x their weekly budget of 20 microCOVIDs. There’s a few ways to deal with this:

- They could “save up” for this risk by using only 10 microCOVIDs a week for 24 weeks.
- We could find a way to quarantine in Maryland after the flight, reducing our risk to 40, at which point they would get only 12 microCOVIDs from us
- They could decide that having the family together is worth going over their annual risk budget (1000 microCOVID) by 20%.
- We could delay our family holiday until COVID rates go down - states are starting to react to the current surge, so there’s a decent change that things will get better in 3-12 weeks.
- We could drive instead of flying, avoiding the large risk that the plane poses.

None of these options feel right to our family, so we're taking a year off from gathering. I don't presume that right decision for everyone, but it's worth evaluating what risk your family is willing to take.
`

export const post = { title, summary, content, author, date, image }
export default post

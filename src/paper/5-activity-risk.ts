const title = 'Activity Risk'

const content = `

Activity Risk is the chance that an activity will transmit COVID to you, if the other person currently has COVID.

In this section we explain how we estimate Activity Risk. If you just want to compare our estimates of risk of specific activities (such as grocery shopping for an hour or eating in a restaurant), and you are not interested in learning how to do those calculations yourself, you could skip this section and instead explore the example scenarios in the [calculator](/calculator).


### Our estimate starts with indoor unmasked conversation

We start by first estimating the risk of interacting with a single COVID-positive person indoors for 1 hour at a normal socializing distance (3 feet) while having a normal-volume conversation.

<p class="calloutText">Activity Risk of talking to 1 person who has COVID, for 1 hour, indoors, unmasked, at 3 feet = 6%</p>

So if you have a friend over to your house for an hour, the way you might have before pandemic times, and your friend turns out to have COVID, the chance of you getting COVID from that single interaction is 6%. 

How did we come up with this number? It's a rough estimate combining many sources: [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) train passenger study, [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), [Bi et al.](https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930287-5) contact tracing data, [Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis, [Cheng et al.](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2765641) prospective study. For the gory details of how we combine these sources, please see [Research Sources](/9-research-sources).

Think of this as our "reference interaction." We can now use it as a starting point to estimate the risk of other kinds of interactions.


### Modifiers: duration, number, masks, location, distance

Not all interactions are exactly one hour, exactly one person, etc.

To estimate the Activity Risk of a different interaction (like a visit to two friends, or a trip to a store or restaurant), we modify our estimate based on how the interaction in question is different from the "reference interaction" above, based on the following factors:

* duration of interaction
* number of people
* masks
* location (outdoor vs. indoor), and
* distance from each other.

For example, we might think of a trip to the grocery store as interacting for 30 minutes (duration), indoors (location), with roughly 5 people at a time (number) who are more than 6 feet away most of the time (distance) and who are wearing masks.


Here are our estimates for the change in risk based on these modifiers:

| Modification | Reduction in COVID risk to me | Citations: Why do we think this? <br>|
|--|--|--|
| I’m wearing a high-quality mask[^2] | 2x | <sub><super>[Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis (2–3x), [Liang et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7253999/?fbclid=IwAR2jeBEkkl2YvR184no95tVQ-jER-59apwyUk2l6Xz8FXMEVbISmlrWqDCI) meta-analysis (2x),  [Lai et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/) mannequin study (2x)</super></sub> |
| Other person is wearing a high-quality mask | 4x | <sub><super>[Davies et al.](https://www.researchgate.net/publication/258525804_Testing_the_Efficacy_of_Homemade_Masks_Would_They_Protect_in_an_Influenza_Pandemic) on improvised masks for influenza (5–7x), [Milton et al.](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205) on exhalations from influenza patients (3x)</super></sub> |
| Outdoors | 20x or more | <sub><super>Speculative. Suggestive evidence: [Qian et al.](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) study of cases in China, [Jimenez’s Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), lack of surge from [BLM protests](https://www.nytimes.com/2020/07/01/nyregion/nyc-coronavirus-protests.html), anecdotal CO2 data from protests, [zero outdoor outbreaks of any kind, many indoor dining outbreaks](https://www.nytimes.com/2020/08/12/health/Covid-restaurants-bars.html), despite both indoor and outdoor dining being open in the US</super></sub> |
| >6 feet distance | 2x | <sub><super>[Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) train passenger study |
| Each additional 3 feet of distance (up to 12 feet) | 2x | <sub><super>Same sources as above</super></sub> |

If an activity involves multiple people, you can generally add the risks together. So if hanging out with one friend for an hour (indoors, unmasked, undistanced) means a 6% chance you'll get COVID if they have COVID, then hanging out with two friends in the same way means a 12% chance (if they _both_ have COVID).

If you're taking multiple precautions, multiply the COVID risk reductions together. So if you’re wearing a mask and they’re wearing a mask, then your reduction in COVID risk is \`2x * 4x = 8x\`.


### Masked, outdoor, distanced interactions are much lower risk

Being outdoors and wearing masks both make a _huge_ difference.

**Masks** reduce your risk by 8x. This is if _both_ people are wearing masks. _Your_ mask decreases the risk to _you_ by about 2x. And _their_ mask decreases risk to _you_ by 4x. This assumes [a reasonably well-fitting surgical mask](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/). For more protection, there are other types of masks you can wear (addressed in the [Q&A](8-q-and-a)). Bandanas, buffs, or other single-layer coverings provide significantly less protection than we estimate here (TODO link), so we treat them as "no mask."

**Outdoors** reduces your risk by 20x or more because the outdoors is well-ventilated, so small respiratory droplets can't accumulate. If there is any wind, the risk is even less.

**Distance** is not quite as beneficial as wearing a mask or being outdoors. Keeping 6 feet apart reduces your risk by 2x, and another 2x for each additional 3 feet, up to 12 feet. This gives a total risk reduction of:

* 2x if you’re 6-9 feet away
* 4x if you’re 9-12 feet away
* 8x if you’re >12 feet away

If you’re outdoors _and_ 20 feet away from a person, you can probably ignore the risk from them.

Curious how we got these numbers? Again, check out the [Research Sources](9-research-sources)!

### Household members and spouses/partners are estimated differently

We do the calculation differently for household members and spouses/partners because you're likely to interact with them on a recurring basis. We estimate a single, fixed Activity Risk for one week of living in the same household as someone who is COVID-positive.

<p class="calloutText">Activity Risk of living with 1 household member, who has COVID, for 1 week = 30%</p>

<p class="calloutText">Activity Risk of living with 1 spouse/partner, who has COVID, for 1 week = 48%</p>

The household member estimate comes directly from [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) meta-analysis. The partner estimate is very speculative, based on adjusting [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) using a datapoint from [Li et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7184465/) See [Research Sources](9-research-sources) for slightly more detail.






### TODO title

We looked through a bunch of research [TODO check internal link] and extracted the following guesses for Activity Risk.


Indoor unmasked transmission is quite risky, though it’s far from guaranteed that you’ll get COVID from an indoor interaction with someone who is COVID-positive. In fact, if you've been reading the news about how easy it is to spread COVID, these numbers might look suspiciously low to you. However, [TODO: insert that paragraph speculating about why household transmission is low].

If you “just” see someone with COVID indoors _one time_ for an hour-long coffee meetup, then you have about a 6% chance of getting COVID from that one interaction.

If someone you live with gets COVID, the chance you’ll get it is higher, more like 30%. This makes sense, because this is someone you might see as often as _every day_, not just once.[^3]

If the person you live with is a spouse or partner, the number is even higher, because this is someone you not only see every day but also might share a bed with (with your heads very close together). We estimate this at 48%.

These numbers assume you are interacting by talking at normal volume, where respiratory droplets are projected a certain distance. To estimate the risk for activities that require stronger breathing (such as singing, shouting, or exercising) or quieter breathing (such as riding a subway car where no one is talking), you can adjust the numbers up or down. We brainstorm how much to adjust in the Q&A section (TODO link).


If you'd like to read more about modeling the risks of specific activities, see the Q&A section (TODO: link). In any case, indoor unmasked interactions are quite risky. For now, let's look at what we can do to reduce these risks.



Let's say you choose to hang out with your friend in the park, with both of you wearing well-fitting high-quality masks, sitting 6 feet apart. This is now a MODified interaction (Masked, Outdoors, Distanced). How much does that decrease your risk in microCOVIDs?


## MOD hangouts

By multiplying these three modifiers together, \`8 * 10 * 2 = 160\`, we can see that a MODified hangout (Masked, Outdoors, & Distanced) is **160 times** less risky than a non-masked, indoor, non-distanced hangout.

If you have a 6% chance of getting sick from a one-hour indoor visit with someone who turns out to be COVID-positive, then with full MOD protection, your risk goes down to \`6% / 160 = 0.04%\`. That's only a **0.04% chance** of getting sick from this interaction if you're masked, outside, and 6 feet apart! Please protect yourself!

![alt_text](images/image3.png "image_tooltip")

**TODO fix the above image (the Indoor Contact ratio is wrong)**

There are plenty of other precautions you can take to reduce your risk that we don’t describe here. For more on other precautions, see the [Q&A](https://docs.google.com/document/d/1hOxv2F_XCf1tUEOU-yQ6vsJcBWBex5ZlP3poT9iGJUk/edit#heading=h.l40d9yf3rvx6) [TODO internal link].

There is substantial uncertainty in many of these numbers. We’ve generally chosen to err on the more conservative side, so that even if we’re off the mark it’s unlikely to expose you to more risk than you’re comfortable with. See the discussion of Research Sources (TODO link) for details about the data we based these numbers on.

_Important disclaimer for the tables above: We keep calling these numbers “guesses” and “rough estimates.” Please take our uncertainty seriously! Our goal in sharing these numbers is to enable ordinary people to do back-of-the-envelope calculations and [order-of-magnitude estimates](https://en.wikipedia.org/wiki/Fermi_problem) to make personal decisions. Although these numbers are based on multiple sources of evidence rather than being pulled out of thin air, we are nonetheless deviating from a firm medical standard of evidence. Additionally, we have made simplifications for ease-of-use. To learn more about the research supporting these estimates, please see the Research Sources [TODO check internal link] section in the Appendix._

Now we understand Activity Risk, or how your chance of getting the virus changes based on the activity you’re doing. But Activity Risk _assumes_ the other person is COVID-positive. What are the actual chances that whoever you're interacting with has COVID? Let’s look at Person Risk to understand that.


[^2]:
     We mean surgical masks, well-fitted cloth masks with a filter, or similar high-quality masks. Bandanas, poorly-fitting masks, or DIY masks will likely give less protection than this.

[^3]:
     You might ask: why isn’t the risk of getting COVID from someone in your house _even more risky_ compared to the risk from hanging out with a friend? Why is the household member risk (30%) only as bad as about 5 hours of one-time interaction (at 6% per hour)? Our main guess is that people often reduce contact with household members who have been exposed or have started showing symptoms. This means that “living with someone who has COVID” doesn’t mean the same normal behavior you have with household members ordinarily. It could also just be the case that our estimates are wrong: we might be overestimating the one-time hangout risk, or underestimating the household member risk. We look forward to improved data.

`

const post = { title, content }
export default post

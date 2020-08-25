const title = 'Activity Risk'

const content = `

**Activity Risk** is the chance that an activity will transmit COVID to you, _assuming_ the other person currently has COVID.

In this section we explain how we estimate Activity Risk for an activity involving one other person. If you just want to compare our risk estimates of specific activities (such as grocery shopping for an hour, or eating in a restaurant), and you are not interested in learning how to do those calculations yourself, you could skip this section and instead explore the example scenarios in the [calculator](/calculator).

### Our estimate starts with indoor unmasked conversation

We start by first estimating the risk of interacting with a single COVID-positive person indoors for 1 hour at a normal socializing distance of 3 feet while having a normal-volume conversation.

<p class="calloutText">Activity Risk of talking to 1 person who has COVID, for 1 hour, indoors, unmasked, at 3 feet = 6%</p>

So if you have a friend over to your house to chat for an hour, and your friend turns out to have COVID, the chance of you getting COVID from that single interaction is 6%.

How did we come up with this number? It's a rough estimate combining many sources: [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) train passenger study, [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), [Bi et al.](https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930287-5) contact tracing data, [Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis, [Cheng et al.](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2765641) prospective study. For the gory details of how we combine these sources, please see [Research Sources](/paper/14-research-sources).

Think of this as our "reference interaction." We can now use it as a starting point to estimate the risk of other kinds of interactions.


### Modifiers: duration, masks, location, distance, volume

Not all interactions are exactly an hour, at a distance of 3 feet, etc.

To estimate the Activity Risk of a different interaction (an outdoor picnic, or being in a restaurant), we modify our estimate based on how the interaction in question is different from the "reference interaction" above, based on the following factors:

* duration of interaction
* masks
* location (outdoor vs. indoor)
* distance from each other, and
* volume of conversation.

For example, we might consider having lunch with a friend in the park as interacting for 2 hours (duration), outdoors (location), with someone who is sitting about 6 feet away (distance), without masks because you are eating, talking at a normal volume.

Or we might think of a trip to the grocery store as interacting for 30 minutes (duration), indoors (location), with people who are more than 6 feet away most of the time (distance), who are wearing masks, and who are not talking.


Here are our estimates for the change in risk based on these modifiers:

| Modification | Change in COVID risk to me | Citations: Why do we think this? <br>|
|--|--|--|
| I’m wearing a high-quality mask[^1] | / 2 | <sub><super>[Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis (2–3x), [Liang et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7253999/?fbclid=IwAR2jeBEkkl2YvR184no95tVQ-jER-59apwyUk2l6Xz8FXMEVbISmlrWqDCI) meta-analysis (2x),  [Lai et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/) mannequin study (2x)</super></sub> |
| Other person is wearing a high-quality mask | / 4 | <sub><super>[Davies et al.](https://www.researchgate.net/publication/258525804_Testing_the_Efficacy_of_Homemade_Masks_Would_They_Protect_in_an_Influenza_Pandemic) on improvised masks for influenza (5–7x), [Milton et al.](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205) on exhalations from influenza patients (3x)</super></sub> |
| Outdoors | / 20 or more | <sub><super>Speculative. Suggestive evidence: [Qian et al.](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) study of cases in China, [Jimenez’s Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), lack of surge from [BLM protests](https://www.nytimes.com/2020/07/01/nyregion/nyc-coronavirus-protests.html), anecdotal CO2 data from protests, [zero outdoor outbreaks of any kind, many indoor dining outbreaks](https://www.nytimes.com/2020/08/12/health/Covid-restaurants-bars.html), despite both indoor and outdoor dining being open in the US</super></sub> |
| >6 feet distance | / 2 | <sub><super>[Chu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) meta-analysis, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) train passenger study |
| Each additional 3 feet of distance (up to 12 feet) | / 2 | <sub><super>Same as above</super></sub> |
| Loud talking (shouting, talking over music, singing) | ⨉ 5 | [<sub><super>Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277)</super></sub> |
| Not talking (such as riding the train) | / 5 | <sub><super>Same as above</super></sub> |


If you're taking multiple precautions, multiply the COVID risk reductions together. So if you’re wearing a mask _and_ they’re wearing a mask, then your reduction in COVID risk is \`2x * 4x = 8x\`.

What about if the interaction is with more than one other person? We'll get to this later, in the section on [Putting it all together](/paper/11-putting-it-all-together#multiple-person-interactions). For now, even though it may seem a little silly, we will still imagine there is just one other person (a picnic with one friend, just one other person in the restaurant, etc.)

There are plenty of other precautions you can take to reduce your risk that we don’t describe here. For more on other precautions, see the [Q&A](/paper/13-q-and-a).

There is substantial uncertainty in many of these numbers. We’ve generally chosen to err on the more conservative side, so that even if we’re off the mark it’s unlikely to expose you to more risk than you’re comfortable with. See the discussion of [Research Sources](14-research-sources) for details about the data we based these numbers on.


### Example calculations

To calculate the Activity Risk of lunch in the park with your friend, start with 6% (the Activity Risk for our "reference interaction") and apply modifiers as needed: \`6% * 2 (hours) / 20 (outdoors) / 2 (distance of 6-9 feet) = 0.6%\`. You have a **0.6%** chance of getting COVID from this single activity if the other person has COVID. Note that there is no modifier for masks or volume because the reference interaction is already unmasked and at normal volume.

What about indoor dining with that friend? You're there for 2 hours, indoors, at a distance of about 3 feet, without masks. Start the same way with 6% and apply modifiers: \`6% * 2 (hours) = 12%\`. Since the reference interaction is already indoors, at a distance of about 3 feet, without masks, and at normal volume, you don't need further modifiers. You have a **12%** chance of getting COVID from your indoor lunch if your friend has COVID.

Compare the risk of getting sick from these interactions: 12% for indoor dining vs. 0.6% for lunch in the park. That's a big difference! Remember, your friend won't necessarily know that they have COVID, and it's very common to be infectious before you show symptoms. And that's with only one person!

Hopefully this puts the risk of indoor gatherings into perspective. To compare the Activity Risk of other activities, such as going grocery shopping or attending a large outdoor party, try our [calculator](/calculator) or check out the [Q&A](/paper/13-q-and-a) for tips and tricks. In the next section, we will look at calculating the risk of activities with multiple people.


### Masked, outdoor, distanced interactions are much lower risk

Indoor unmasked interactions are quite risky, but being outdoors and wearing masks both make a _huge_ difference.

**Masks** reduce your risk by 8x. This is if _both_ people are wearing masks. _Your_ mask decreases the risk to _you_ by about 2x. And _their_ mask decreases risk to _you_ by 4x. This assumes [a reasonably well-fitting surgical mask](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/). For more protection, there are other types of masks you can wear (addressed in the [Q&A](/paper/13-q-and-a)). Bandanas, buffs, or other single-layer coverings provide significantly less protection than we estimate here (see [Research Sources](/paper/14-research-sources), so for simplicity we treat them as "no mask", even though we do believe they provide some benefit.

**Outdoors** reduces your risk by 20x or more because the outdoors is well-ventilated, so small respiratory droplets are less likely to accumulate. With any wind, the risk is even less. We think being outdoors is by far the most valuable thing you can do for your safety, although even that is not a guarantee.

**Distance** is not quite as beneficial as wearing a mask or being outdoors. We estimate keeping 6 feet apart reduces your risk by 2x, and another 2x for each additional 3 feet, up to 12 feet. This gives a total risk reduction of:

* 2x if you’re 6-9 feet away
* 4x if you’re 9-12 feet away
* 8x if you’re >12 feet away

If you’re outdoors _and_ 20 feet away from a person, you can probably ignore the risk from them.

**Volume of conversation** also matters. If the other person isn't talking, that reduces the risk to you by about 5x, because they are not expelling as many respiratory droplets. This actually makes some activities where people don't talk much, taking public transportation, safer than they would otherwise be. On the other hand, loud talking, shouting, or singing _increases_ the risk by about 5x (as compared to a conversation at normal volume) because more respiratory droplets are exhaled and expelled when you are speaking or breathing forcefully.

Curious how we got these numbers? Again, check out the [Research Sources](/paper/14-research-sources)!



### Household members and spouses/partners are estimated differently

We do the calculation differently for household members and spouses/partners because you're likely to interact with them on a recurring basis. We estimate a single, fixed Activity Risk for one week of living in the same household as someone who is COVID-positive.

<p class="calloutText">Activity Risk of living with 1 household member, who has COVID, for 1 week = 30%</p>

<p class="calloutText">Activity Risk of living with 1 spouse/partner, who has COVID, for 1 week = 48%</p>

These numbers clearly show that if your housemate gets COVID, it is _not_ inevitable that you will get COVID too! Even if your spouse or partner (who you are likely to share a bed with) gets COVID, your chance of getting it is still only about 48%.

You might ask: why isn’t the risk of getting COVID from someone in your house higher? Why is the household member risk (30%) only as bad as about 5 hours of hanging out indoors with a friend (at 6% per hour)? Our main guess is that people often reduce contact with household members who have been exposed or have started showing symptoms. This means that “living with someone who has COVID” doesn’t mean the same behavior you normally have with household members. It could also just be the case that our estimates are wrong: we might be overestimating the one-time hangout risk, or underestimating the household member risk.[^super] We look forward to improved data.

The household member estimate comes directly from [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) meta-analysis. The partner estimate is very speculative, based on adjusting [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) using a datapoint from [Li et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7184465/) See [Research Sources](/paper/14-research-sources) for slightly more detail.

_Important disclaimer for the numbers above: We keep calling these “guesses” and “rough estimates.” Please take our uncertainty seriously! Our goal in sharing these numbers is to enable ordinary people to do back-of-the-envelope calculations and [order-of-magnitude estimates](https://en.wikipedia.org/wiki/Fermi_problem) to make personal decisions. Although these numbers are based on multiple sources of evidence rather than being pulled out of thin air, we are nonetheless deviating from a firm medical standard of evidence. Additionally, we have made simplifications for ease-of-use. To learn more about the research supporting these estimates, please see the [Research Sources](/paper/14-research-sources) section._


### How likely is it that the other person has COVID?

Now we understand Activity Risk, or how your chance of getting the virus changes based on the activity you’re doing. But Activity Risk _assumes_ the other person is COVID-positive. What are the actual chances that whoever you're interacting with has COVID? Let’s look at Person Risk to understand that.



[^1]:
     We mean surgical masks, well-fitted cloth masks with a filter, or similar high-quality masks. Bandanas, poorly-fitting masks, or DIY masks will give less protection than this.

[^super]:
    Another possibility we considered, which is much more speculative, is that this has to do with some people naturally producing more respiratory droplets when they talk and breathe ([Meselson](https://www.nejm.org/doi/full/10.1056/nejmc2009324). These people are called superspreaders. Therefore it might be the case (but we are just speculating) that if you live with a superspreader, you are almost certain to get it, but most people are not that highly infectious.
`

const post = { title, content }
export default post

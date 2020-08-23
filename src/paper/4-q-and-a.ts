const title = 'Q&A'

const content = `

### General
**If there’s a precaution I don’t see a multiplier for here, should I still do it?**

Yes, definitely! The most important such precaution, in our opinion, is communication around symptoms:
- Ask people _directly and clearly_ if they have any symptoms, _right before_ hanging out with them. Even if they only have “mild” symptoms that seem like “nothing to worry about”, consider if you can take a rain check, or at least MODify your hangout.
- If you have any more concerning symptoms[^1] then _immediately_ notify anyone you saw in the past 10 days, and contact your doctor for medical advice.
- If a household member develops more concerning symptoms, follow [CDC best practices for home isolation](https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/isolation.html) straight away while you contact a doctor for medical advice.

Other important precautions include washing & sanitizing your hands, covering your sneezes with your elbow including when you are at home, using a better-fitting mask, and wearing eye protection (we particularly recommend wearing goggles and a P100 mask if you are looking for extra safety when shopping!)

### Activity Risk

[TODO many of these questions are about housemates AND budgeting, hence need to be more granularly pulled apart to be included in both Part 1 and Part 2]

**How much riskier is a spouse/partner I live with than a regular household member?**

We’re not sure, but we might guess at this based on [Li et al.](https://academic.oup.com/cid/article/doi/10.1093/cid/ciaa450/5821281) which found a 1.6x times higher infection rate among spouses than among other adult household members. This implies an Activity Risk of 48% rather than 30%.

**What if I hang out with someone indoors for a long time? If we hang out for 5 hours, that’s an Activity Risk of 6% ⨉ 5 = 30%, which is the same risk as for a household member.**

In the case of a long indoor hangout, we suggest just to cap the total Activity Risk at the household member number (30%). Or if you’re cuddling or being intimate, cap the total Activity Risk at 48% as mentioned above for spouse/partner. These are not particularly principled answers. As we’ve mentioned in footnotes before, the ability to just add microCOVIDs (rather than multiplying probabilities) starts to break down as probabilities get larger. Additionally, the data we’re basing our guesses off is more relevant to the smaller risks that we more commonly see with typical activities. Certainly don’t use an Activity Risk larger than 100% for anything.

**If you live with multiple people, how do you account for the additional risk of a longer infection chain?**

In other words, imagine my housemate Alice gets sick. Perhaps I get it _directly_ from Alice. Or perhaps I _don’t_ get it from Alice, but a second housemate Bob does get it from her... and then Bob infects _me_! Doesn’t this mean that 30% housemate transmission is an underestimate of how risky it is for me if Alice gets sick, because it’s missing the indirect routes?


We currently don’t model this effect, and we think that’s pretty safe if (and only if) you and your household members are conscientious about monitoring for symptoms and isolating at the first sign that they’re feeling unwell. Ideally such isolation would also include some reduction in contact between the household members that still feel fine, since one or more of them might have become infected by the unwell person before their symptoms appeared. While it’s easy for Alice to give COVID to Bob before Alice has symptoms, it’s much harder for Bob to pass it on to Carol _before Alice has symptoms_[^2]. That means that if Bob reduces his contact with Carol as soon as Alice shows symptoms, the chance of a second-hop infection within the household can be substantially reduced. Being extra conscientious about prompt isolation also probably reduces the first-hop housemate Activity Risk somewhat below 30%, since that number was drawn from an average of data covering a range of different levels of isolation caution. As a result, we don’t think we’re making a huge error by using the unadjusted 30% number for the Activity Risk of having a housemate.

Of note here: while full isolation is the gold standard for reducing infection risk, it’s useful to also have some lighter-weight tools that you can deploy if you’re uneasy about infection risk for some reason but not uneasy enough to find hard isolation to be worth the (admittedly considerable) social and practical costs. Extrapolating from the MOD factors, we think wearing a mask around the house for several days probably reduces your risk of infecting your housemates by about 4x, which is a lot of protection to get from a relatively simple intervention. In the authors’ household we deploy this one if we’re feeling at all unusual, even if the symptoms (such as a scratchy throat) aren’t suggestive of COVID; or if we’ve recently done something moderately higher-risk than usual.

**Why do I need to account for my household members? I thought it was “free” to hang out with people as often as I want, so long as they’re all in the same “bubble”?**

So long as the people in your “bubble” have some risk of getting infected from anywhere, the risk they pose to you contributes to your total microCOVIDs.

In short, we think “closed quarantine bubbles” are a good strategy for very-low-risk groups who don’t venture outside the house often, but make less sense for larger bubbles with more exposure to the outside world. 

To spell it out a bit more: If nobody in your bubble has any exposure to other people or public spaces outside the bubble, then in fact you can count their Person Risk as very minimal[^3]. This isn’t a magical property of the bubble being closed per se; it’s a result of everyone only socializing with other people who also have very minimal Person Risk. Seeing a friend who lives completely alone and literally never leaves the house would also keep you at this same low risk level. The “closed bubble” framework is a way to coordinate around maintaining a very low risk level together.

But if people in the bubble are doing things that expose them to others somewhat—going to work, grocery shopping, taking trips—then even if they aren’t meeting up for coffee, dates, or events with anyone outside the bubble, they still have some nonzero Person Risk, and you should multiply this with the Activity Risk of seeing them.

This means that, if the people “in your bubble” have some exposure to the outside world, then reducing your _total_ amount of contact is likely more important than making sure you are only seeing people in your bubble.

To summarize, _reducing your total amount of contact_ (and choosing to hang out infrequently with people who are also doing this) is for most people the most important way to stay safe.

**So if my housemate really wants to see a partner in another house, you believe it is sometimes better from a _risk_ standpoint _not_ to negotiate for the partner’s entire house to get added to our bubble?**

Right! To illustrate, imagine a full group dinner between the two houses of several people each. This could be quite a large gathering, where everyone is exposed to everyone. If any of these people have been to work, on public transit, or in stores, then everyone at the dinner is indirectly exposed to those external sources of risk. By contrast, imagine that just your housemate sees just their partner, in the partner’s room with the door closed. One person is exposed to one other person. This is less overall contact. Of course, without a “closed bubble” agreement, the partner might be doing other socializing of their own.

Which strategy is less risky depends on which factor dominates: the partner’s other socializing, or every bubble member’s combined external exposure. This is why we think closed bubbles are less risky for people who are generally not working or going out at all, and reducing total contact is less risky for people who have a moderate amount of external exposure. We haven’t done the math on this yet, and we would be interested to see an analysis of this.

### MOD: Masked, Outdoors, and Distance

**I was told to wear masks to protect others, not myself. Do masks actually protect me?**

Yes! Cloth masks and surgical masks protect others more than they protect _you_ [see Research Sources TODO], but they still reduce your risk of catching COVID by half, so they’re well worth it even from a selfish perspective.

**What about masks that provide more protection, like an N95 or P100 respirator?**

These masks provide more protection than a cloth or surgical mask, it’s true. For a well-fitted, well-sealed N95, we roughly estimate a 10x reduction in risk for the wearer (versus 2x for a surgical mask or high-quality cloth mask). A P100 is even better. Since P100s are generally not used in medical settings, there isn’t the sort of research that would let one state a protection

factor under typical use with any kind of confidence. [One study](https://l.messenger.com/l.php?u=https%3A%2F%2Fpubmed.ncbi.nlm.nih.gov%2F24011377%2F&h=AT0VSXC16pfmydLzFwe4I4iMM9mntA6ncWcryALZFpqZviFlN3cldl3eNGym6u9y5Kyah8KHRJF11baGm-oKugw36kZQgAs-d6xD6I3bp9n6RGl26KKY_jTE01XYaJBMWrB2NcE) found P100s to filter out a virus aerosol at their stated 99.97% filtration efficiency, but at those levels your risk probably starts to be dominated by previously-small effects like surface transmission and getting virus in your eyes. We think that under ideal conditions, the risk reduction with a P100 might plausibly be as high as 100x compared to no mask, but we’re really not sure.  Note that P100 respirators typically have an outflow valve, meaning they provide minimal protection to others from you, so if you take this route, you should at least cover the outflow valve with a surgical mask.  

But remember, these masks are only effective if you get a tight seal around your face, and unless you’re professionally trained in how to do this, you probably don’t! All of the studies on N95s are from hospitals, where the medical professionals are fit-tested and have training in mask wearing. Just “wearing an N95” doesn’t protect you all the way. We have seen a friend of ours “wear an N95” that was much too big for their face, leaving a big gap under their chin. Other friends have worn an N95 over a beard, but facial hair definitely prevents a good seal. [One study](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/) shows that even a pair of tiny points of leakage a couple of millimeters in diameter dramatically increases the number of aerosol particles that can pass through a high quality mask. Please do a [fit test](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/) and watch some online training in order to effectively use your N95 or P100.  

If you think your mask has better filtration than a surgical mask (2x modifier), but it _doesn’t_ seal on your face, we advise against counting it as a 10x improvement. We recommend a 5x modifier at most.

**Is it reasonable to just multiply together all the modifiers? 8x for masks, 10x for outdoors, and 2x for 6ft of distance?**

Each of these modifiers changes the total number of particles that might reach you, so we do think it’s reasonable to keep piling them on _somehow. How exactly_ they combine is not precisely clear. But if you consult the [Research Sources](https://docs.google.com/document/d/1ewRz_sEs51ohO4013WWxM2EouvA5T-BIyIELRoEdCzk/edit#heading=h.fchc31gy5ii4) [TODO link] section, the masks and distance modifiers were estimated from data including healthcare settings where they were sometimes combined.

The “outdoors” modifier is the one we have the least confidence of. At larger distances, we speculate that outdoors might provide _more_ than 10x protection, because particles have more time to diffuse upwards into the vast empty space above everyone’s heads, whereas indoors small particles could hang in the enclosed room air. On the other hand, at smaller distances (especially at close range: cuddling, tango dancing, etc.) we don’t have any reported data that we feel sheds light on how much of a protection factor there might be, so we suggest _not_ to use the 10x modifier for outdoor interactions with unusually close range or with other factors associated with superspreader events (yelling, dense crowds, etc.).

### Person Risk

**Basic method: Other than essential workers, is anyone above average?**

Of course! Someone should probably be considered “above average risk” if they have lots of contact with others and minimal protection; if they regularly attend gatherings, or recently attended a large gathering, especially indoors; or if they seem to think "this isn't a big deal" or "I don't care" when considering precautions.

**Why is 10% prevalence a rule of thumb for grocery shopping etc.?**

This figure comes from contact tracing studies. If you get COVID, you either got it from someone you know (e.g., the friend you saw last Tuesday) or from someone you don’t (e.g., the person in line behind you at the grocery store or sitting next to you on the bus). If a contact tracer asks you about all of your known contacts, and one of them has COVID, that’s probably who you got it from. If none of them have COVID, you probably got it from someone you don’t know. In various countries that effectively contained COVID outbreaks, such as Singapore and South Korea, contact tracers were able to link about 90% of cases to a known contact [anecdotal observation cited in [Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936)]. The remaining 10% “environmental” infections are the ones to which a person with no known contacts might still be exposed just from being in public areas. This is why we suggest using “10% the Person Risk of a random person” as a rule-of-thumb starting point meant to cover the risk of a typical level of exposure to public spaces, before adding close contacts to the estimate.

If this feels too high (e.g. if you get all your groceries delivered and don’t leave the house), you can also skip the rule of thumb and instead tally each outing individually.

### Specific Activities

**Can I let a friend use the bathroom in my house?**

We believe that if the person is indoors for <5 mins and wears a mask the whole time, then the risk will be negligible for all but the most cautious risk budgets. This is especially true if you can open a window to ventilate the bathroom space. See [this article](https://www.huffpost.com/entry/is-it-safe-people-use-bathroom-coronavirus_l_5ef43b8fc5b66c3126820ec8) for more tips about this.

**Silence? Singing, chanting, yelling? Speaking loudly? Exercising?**

Based on the [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), we could contemplate up to a 5x reduction in risk for silence, and a 5x penalty for singing, chanting, yelling, or speaking loudly; plus an additional 5x penalty for heavy exercise.

**Are small rooms riskier than large spaces?**

Yes! Based on the [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277) and estimates of the total area of rooms of different sizes, we think you might consider the following multipliers:
×4 _higher_ risk for a ‘tiny room’ (~10ft across)
×2 for a ‘small room’ (~15ft across)
×1 for a ‘normal room’ (~20ft across) 
×0.5 for a ‘large room’ (~30 ft across)

These assume you are already sufficiently distanced (at least 6 feet) that the size of the room is relevant to the amount of aerosol you’ll breathe. In close quarters, we think the size of the room has less of an impact.

**Should I use an extra multiplier for cuddling? Going on a date?**

We personally use an additional multiplier of at least 2x for cuddling, Our original take on this was based on the assumption that our data for infection risk under “no particular distance” (which were largely collected in hospitals) reflect a distance closer to 3 feet than 0 feet. If each additional 3 feet adds a 2x improvement in safety, then being right on top of each other (0ft apart) might involve a 2x reduction in safety. This looks consistent with recently released data from train passengers sitting directly adjacent to one another versus merely in the same row ([Hu et al.](https://academic.oup.com/cid/article/doi/10.1093/cid/ciaa1057/5877944)).  If you’re breathing right into each other’s faces, more so than train passengers would, maybe use a higher number.

We think it doesn’t make sense to take the full “outdoor” bonus when cuddling, because your faces are very close together. Finally, we think a brief hug probably doesn’t meaningfully change your risk, but we don’t have any evidence for that. Basically, we really don’t know and don’t have any evidence here, so take this with more grain of salt than the rest of our more-research-backed numbers.

We don’t have an additional multiplier for kissing. A one-time hangout combined with the cuddling multiplier is already an Activity Risk of 2 ⨉ 6% per hour = 12% per hour, which makes two and a half hours of cuddling appear riskier than having a roommate. As a side note, it seems to us that masked sex might be a lot safer from a COVID standpoint than making out without masks... provided you actually have the willpower to keep your masks on!


**Cuddling and hugging aside, is it risky to touch the other person if we remain a normal socializing distance apart?**

We don’t feel we have enough data to fully model this risk. But if we assume you aren’t changing how far apart you are, then we think that hand-to-hand touching is more risky than other kinds of touch. Any type of touch is safer if you wash or thoroughly sanitize your hands both before and after touching.

If you’re within hand-holding distance of someone, and you reach out and touch their hand, it does _not_ change your chance of inhaling a respiratory droplet, because your faces didn’t really move. What _does_ change is the chance that any virus that’s on their hands (from rubbing their nose or coughing) could get from your hands into _your_ eyes, nose, or mouth (when you touch your face). Touching hand-to-hand seems likely to be riskier for this route than other types of touch (such as clasping forearms, giving a shoulder massage, or a brief hug with faces averted).

The CDC says that contact transmission is not a main driver, but we haven’t yet seen research on this topic we feel we can trust. For our house, we’ve learned to treat our hands as “contaminated” any time we’re outside the house, and to wash our hands as soon as we get home. As such we don’t currently add an extra budget factor for touching or not. You could perhaps assume that touching bare hands adds another 2x factor (which is as much as we use for cuddling) if you expect you won’t manage to wash your hands before touching your face, but we’re entirely making that up and we don’t use it in our estimates. We don’t have a better suggestion we can stand behind right now.

Touch is a psychologically powerful way to show affection and appreciation. In our experience, outdoor masked hand-holding has a huge positive impact on our mental health and feeling of connection, as compared to assiduously not touching one another. Feeling “touch starved” [is a real thing](https://asu.pure.elsevier.com/en/publications/relational-and-health-correlates-of-affection-deprivation) with real psychological effects, and for many people we think touch is a good use of your risk budget.


**How do I count receiving a package?**

We don’t currently count microCOVIDs from packages, because of our understanding that fomite transmission is not a primary driver of the spread; most of our risk comes from time we spend indoors with others. People maintaining much lower annual risk levels than us might prefer to sanitize packages to maintain a stricter risk tolerance.

Health officials are often quoted as saying the risk from packages is “[very low](https://www.hackensackmeridianhealth.org/HealthU/2020/03/26/can-you-get-coronavirus-from-packages-and-mail/)” and “[unlikely](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)”, but until they quantify that in microCOVIDs we’re just going to proceed with assuming it’s less than 1 microCOVID per package. We do know there’s [no known evidence of transmission from food packages](https://www.fda.gov/food/food-safety-during-emergencies/shopping-food-during-covid-19-pandemic-information-consumers).

**Lyfts/Ubers?**

You’re indoors, about six feet away from one other person (the driver), and both of you are hopefully wearing masks. It’s an unusually tiny space with poor air circulation by default.

We did some informal tests with a CO2 meter in a Lyft[^4], and found that if you crack the windows open by an inch or so, this makes it “just” as well ventilated as a normal indoor space, rather than much stuffier than usual. So we suggest to at least crack the windows, then count it like an indoor space. If they’re chatting or talking on the phone, you might consider politely asking them not to.

If you keep the windows all the way open, the air circulation according to our CO2 meter is just about as good as being outdoors, so you’ll probably reap some of the benefits of being outdoors. We wouldn’t recommend taking the full 10x outdoor modifier for a windows-open Lyft, since it’s unclear how much of the safety of outdoor interactions is due to factors like UV light that aren’t present inside a car. But 2x or so might be reasonable. 

**Public transit?**

You can very conservatively treat transit as an indoor hangout with however many other people are in the bus or train car with you, continuing to take a decrease of 2x per additional 3 feet away that the people are. You’re also probably up to 5x safer in the likely event that nobody is talking (but if anyone starts yelling, which happens on public transit sometimes, you could be 5x _less_ safe). Overall, [very few transmission clusters](https://www.scientificamerican.com/article/there-is-little-evidence-that-mass-transit-poses-a-risk-of-coronavirus-outbreaks/) have been linked to public transit.

**Airplanes?**

Unlike transit, airplanes have pretty good air filtration systems: all the air is replaced with new air from outside every 4–5 minutes, and all the air passes through a HEPA filter that eliminates 99.97% of particles (the same as a P100 respirator) every 2–3 minutes ([source](https://www.travelandleisure.com/airlines-airports/how-airplane-cabin-air-works)). That means your risk will primarily be from people near you.

The exact numbers for the Activity Risk will depend on how full your flight is; we’ve used 20 people at 6 feet of distance as a reasonable estimate for a moderately full flight. The worst case of a middle seat on a totally packed flight might be twice as bad as that:
- Two people right next to you: potentially equivalent to about 8 people six feet away (though there’s a lot of uncertainty about risk at extremely close quarters)
- Six people in the rows ahead of you and behind you, about 3 feet away: equivalent to about 12 people six feet away
- 21 other people within two rows of you (five full sets of 3 seats across the aisle, one that’s two rows ahead of you and one two rows behind), all of which are about six feet away
which adds up to 41 people. (The plane is divided into “zones” of 5–7 rows each with separate climate control systems, so 5 rows worth of people — yours, two in front of you, and two behind — is a pretty good estimate for how many you’re potentially sharing exhalations with). As with public transit, you probably get some benefit from the fact that few of the people around you are talking, though it’s hard to say how much. Anything you can do to reduce the number of people near you (such as flying at an inconvenient time, paying for a reserved or extra-legroom seat, or even buying a first-class ticket) will help reduce your risk.

For the Person Risk, we suggest you use the maximum prevalence of your source or destination region.

What about the _airport_ rather than the plane? We still suggest you wear a high-quality mask. However we also note that airports are huge spaces and at the time of writing we're still at only about [20% of the passenger volume per day](https://www.statista.com/statistics/1107016/coronavirus-tsa-checkpoint-travel-numbers-us-airports/) compared to what we saw last year—with decreases in demand, the flights get fewer but the airports don't get smaller. It's also easier to distance in the airport. Our intuition is that most of your risk comes from the plane.

Overall, there are very few documented cases of transmission on airplanes, which is surprising given that 500,000 or more Americans are flying every day at the time of writing (which, if we naively assume current US-wide prevalence rates, would mean ~100 COVID-positive passengers per day). We are aware of [one flight in China in January 2020](https://www.medrxiv.org/content/10.1101/2020.03.28.20040097v1) that infected 12 people, [one case in February](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7194574/) probably acquired on a flight, and [one flight in March from London to Vietnam](https://www.npr.org/sections/goatsandsoda/2020/07/04/886788377/international-flights-are-ramping-up-slowly-and-with-plenty-of-caveats) that infected 13 people. Erin Bromage has written more on [flying in the age of COVID-19](https://www.erinbromage.com/post/flying-in-the-age-of-covid-19).

**Grocery stores? Drug stores? Haircuts?**
For grocery stores, we count the average number of people near us: in our neighborhood this is usually about 5 people, keeping 6 feet away, everyone wearing masks. For drug stores, pharmacy pickup, or medical buildings, you might want to add an extra boost to Person Risk to account for the fact that the people you’re encountering are more likely than average to be sick. 

Haircuts can be modeled by counting each person in the hair salon. We definitely recommend wearing the best mask you have that won’t interfere with the haircut, and checking in advance that your mask style will be fine. If your stylist is usually chatty, we suggest for an extra safety margin to ask the hair stylist to chat less! We found an anecdote [on Twitter](https://twitter.com/robshirkey/status/1269369868182315014) about 140 clients who were in close contact with two infected hair stylists, indoors, with both client and stylist wearing masks. 45 clients were tested – all negative – and we haven’t heard of any cases among the others. Last we checked this was statistically consistent with the Activity Risk and modifier suggestions we use in this post.

**Going to a protest?**

The risk of attending a protest depends on how close you get to others, whether they are yelling/chanting, whether they are wearing masks, and other factors we have not modeled in this writeup (for example, we have heard anecdotally that it is lower risk to be in a group where people are moving constantly, rather than staying near the same people for a long time). If you are in a shoulder-to-shoulder group of yelling people without masks, you might be near 10 people within 6 feet: Activity Risk = 6% per hour ⨉ 10 people ⨉ (1/10 outdoors) ⨉ 5x yelling (see earlier in Q&A) = 30% per hour. Alternately, if you are in a group of cyclists protesting by biking down the road banging drums and gongs, that might be more like Activity Risk = 6% per hour ⨉ 10 people ⨉ (1/10 outdoors) ⨉ (1/5 silent) ⨉ (1/2 at least 6 ft away) = 0.6% per hour. This is a 50 times less risky activity. There are many ways to protest. We encourage you to keep all the same heuristics in mind: if possible, avoid very dense crowds, yelling, and enclosed spaces; and wear masks to protect yourself and others.

The most important thing to remember in attending a protest is that you may not have control over what happens to you. Police might [pull your mask off](https://nypost.com/2020/05/31/nypd-cop-pulls-mask-off-man-pepper-sprays-him-in-the-face-video/). If pepper spray is used, people are likely to cough uncontrollably. You might get [kettled](https://en.wikipedia.org/wiki/Kettling) into a small area, even if you were planning to keep your distance from others. One thing you can do to help stay safer is to make a plan in advance about what you will and won’t do: for example, you might decide in advance that if you see any gas used near the protest, you will leave. By thinking about what you are and are not up for, and making choices that take into account the risks, we hope you can confidently and proudly participate in protests that make sense for your risk tolerance.

### Related Work

**How do microCOVIDs relate to initial viral load?**

“[Initial viral load](https://thezvi.wordpress.com/2020/04/01/taking-initial-viral-load-seriously/)” refers to how big a “dose” of virus you get when you first get exposed to the virus. If you’re exposed to more viral particles, evidence suggests that you’re more likely to develop a severe infection. This means it’s important to try to reduce the strength of your initial exposure, not just in order to avoid getting sick.

For the same total number of microCOVIDs, our guess is that getting them from many smaller independent sources (many mask walks, numerous brief grocery runs, etc.) is more likely to involve a low initial viral load than getting them from fewer riskier contacts (household members who don’t take many precautions; cuddling a random person whose recent activities you don’t know). \


**Are there other similar models or scales?**

Here are some quantitative analyses we like:

*   Peter Hurford of Rethink Priorities created a [COVID Risk Calculator](https://docs.google.com/spreadsheets/d/1LBZWHEk2Jo-IFvZK_smrwYoOTOykB7H-oHb0qYjg2ys/edit) which we really like. His approach is entirely compatible with ours, although he uses some different numbers. The tool outputs a risk of COVID infection in terms like “1 in 578” which is easy to convert by multiplying by a million to e.g. 1730 microCOVIDs
*   Prof. Jimenez from Univ. of Colorado-Boulder has an [aerosol transmission estimator](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277) in a Google Sheet that informed many of our numbers. Unlike our analysis, this sheet uses detailed assumptions about the dynamics of particles in the air. Each tab gives a risk of infection for a specific scenario.
*   The [NYTimes](https://www.nytimes.com/2020/05/22/well/live/putting-the-risk-of-covid-19-in-perspective.html) has an easy-to-digest discussion of COVID risk in terms of micromorts.

In terms of qualitative scales, we like the following:

*   The interactive guide at [COVID - Can I Do It?](https://covidcanidoit.com/US/all), where you can plug in an activity and see its risk breakdown in terms of crowding, respiratory droplet formation, time, and ventilation. 
*   The diagram of [red/yellow/green activities](https://twitter.com/SaskiaPopescu/status/1279133758965248000/photo/1) by Popescu et al. which was featured in a FiveThirtyEight article about [risks and decisionmaking](https://fivethirtyeight.com/features/every-decision-is-a-risk-every-risk-is-a-decision/).





[^1]:  More concerning symptoms include cough, chest tightness/discomfort, obvious sore throat, body aches, malaise, loss of taste/smell, nausea/vomiting, loss of appetite, diarrhea, any subjective “feverish feeling” or elevated temperature, fainting, or thermometer reading of >100.4.
[^2]: This is due to the fact that very little transmission occurs more than 2 days before the appearance of symptoms ([He et al](https://www.nature.com/articles/s41591-020-0869-5), figure 1c middle graph) or fewer than 2 days after infection ([Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936), figure 1 “generation time”). In order for Carol to infect Bob before Alice shows symptoms, Carol’s generation time would have to be greater than the delay between Alice’s infectiousness and Alice’s symptoms. We ran a Monte Carlo simulation using the probability distributions from He and Ferretti and found that that only occurred 1% of the time. The broader picture isn’t quite that rosy due to the facts that people might not always correctly identify their symptoms and that some transmission occurs from people who will remain asymptomatic, but we still think the chance of second-hop infections within a careful household is manageably low.
[^3]: When we do these calculations, the lowest Person Risk we allow ourselves to assign anyone is 1/100th the Intermediate Person Risk, just as a safety margin.
[^4]:  [Jimenez’s aerosol transmission tool](https://docs.google.com/spreadsheets/d/1Enmh7DJZ8kN8Ia6yDOsPs42Y-jlsp7R8Hwy7LiUUJO4/edit#gid=154529406&range=A106:B106) lends some support to the idea of using CO2 as a proxy for density of exhalations.


`



const prev = '3-activites'
const next = '5-research-sources'

const post = { title, content, prev, next }



export default post
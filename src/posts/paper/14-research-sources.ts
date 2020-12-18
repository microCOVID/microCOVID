import ferrettiFig1 from './img/ferretti-fig-1.png'
import ferrettiFig2 from './img/ferretti-infectiousness.gif'
import heExtended from './img/he-extended-fig-1.png'
import positiveTestRate from './img/positive-test-rate.png'

const title = 'Research Sources'
const shortTitle = title
const content = `

Read this section if you are interested in the epistemic nitty-gritty behind our estimates of Activity Risk and Person Risk.

## Activity Risk

### Indoor unmasked transmission

#### One-time contact

This is the chance that you would get COVID from spending more than 10 minutes indoors or in close proximity to someone who is COVID-positive. We estimate this as “about 6% per hour” from combining multiple sources:

1. In a study of train passengers that analyzed 2,334 index patients with COVID, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) found that passengers on seats within the same row as the index patient had an average attack rate of 1.5%; for passengers in adjacent seats, the attack rate increased 1.3% per hour. Assuming train passengers are mostly silent, combining this with the respiration rates from the [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277) would imply that a conversational hangout in the adjacent seat of a train would be a risk of **roughly 6% per hour**. The distance between adjacent seats on this train was half a meter, and we think typical socialization is moderately further away than this, which gives some extra breathing room on the estimate.
2. Using the [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), we modify the “Class” scenario (1 infected instructor speaking loudly) to propose a normal conversational volume, smaller room (10ft wide x 14ft long x 10ft high), and no masks, leaving other parameters unchanged. This outputs 2.8% per hour; however, this model notes it assumes uniform mixing of air and ignores near-field effects, so is not a good estimate for interactions that aren’t 6+ feet. If we take this as our 6+ feet estimate, and double it as per the “Distance” modifiers described later, this also **suggests 6% per hour**. (Note that this is rather dependent on room size: increasing the 10ft width to 15ft decreases the estimate by a third.)
3. [Bi et al](https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930287-5) analyzed Shenzhen contact tracing data from Jan 14–Feb 12 (1281 contacts of 291 cases). Their Table 3 provides data about how often close contacts of COVID-positive people got infected based on different types of contact. The average estimates for each group tend to fall **roughly between 6-9%** (total, not per hour); we note that the vast majority of the infections in this dataset come from the “Contact frequency: Often” category, so we expect this to be an overestimate for the “Moderate” and “Rare” frequency. This data was collected in a setting where 17% of cases were isolated _before_ symptom onset, and we would expect a larger fraction isolated after symptom onset, so the numbers would be higher in a setting where people are not being notified when their contacts get sick.
4. Next is [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) who did a meta-analysis of 172 studies covering 26,000 individuals, to determine the impact of various interventions (masks, distance, and eye protection) on transmissibility. Importantly to note, they included analyses of SARS and MERS, not just COVID-19. As shown in their Table 2, they found baseline transmissibility values (without masks/distance/etc) of 12.8%, 17.4%, and 16% in different groups. These data mostly come from healthcare settings, and the baseline assumption is direct physical contact, rather than an ordinary socializing distance. We don’t know how many hours were generally spent with patients. We assume these are infected patients who have sought treatment, so definitionally there is no additional distance from anyone symptomatic, so we might expect casual social contact outside a healthcare setting to carry a lower infection probability. However, COVID-19 may be [more infectious/contagious](https://www.medicalnewstoday.com/articles/how-do-sars-and-mers-compare-with-covid-19#Coronaviruses-past-and-present) than SARS and MERS. Overall, this is consistent with “6% per hour” for normal socializing if the average duration in this dataset is on the order of 2 hours; if the baseline “no distance” is closer together than typical socializing; or some combination.
5. In a prospective study in Taiwan, [Cheng et al](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2765641) found a secondary attack rate of 1.0% among contacts of longer than 15 minutes who were exposed within the first 5 days of symptom onset. This **implies a rate of 4% per hour** if all the contacts were only 15 minutes (and even lower rates if the contacts were for longer).

#### Household member

This is the chance of getting infected from a household member who has COVID. We use the estimate of 30% from the meta-analysis of [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) (specifically their updated June 27 version). We explain a bit here about where their estimate comes from.

[Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) used three different methods to synthesize existing literature. The first method is a re-analysis of nine recent studies, which gives them the central estimate of 30% for the “secondary attack rate” (which is the parameter we care about: the chance of getting infected from a housemate who has COVID). They point out that the estimates vary substantially from source to source, which they conjecture is likely in part due to variations in isolation practices.

Their other two estimation methods use independent datasets. Although these two methods don’t estimate secondary attack rate—rather, they estimate R<sub>h</sub>, the _number_ of within-household transmissions, which is not quite the number we’re looking for—we can nonetheless use this information as corroboration. Specifically, they estimate an R<sub>h </sub>of 0.37 from Vo’, Italy, where average household size was 2.1. If the average infected person infects 0.37 of their 1.1 (excluding self) other household members, that works out to each household member having a 34% risk of being infected. The data suggests this could be substantially larger for older people.

#### Partner

This is a highly speculative number. [Li et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7184465/) found a 1.6x higher infection rate among spouses than among other adult household members. This is just one datapoint, but it’s the best we have right now. We use this to adjust the 30% figure from [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) up by 1.6x, to get 48% for spouses.


### Modifiers to Activity Risk: Masked, Outdoors/Ventilation, Distanced

#### Masks

We get our wearer protection figure of 2x from [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) (again!), who estimated this number for surgical masks at 2–3x. [Liang et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7253999/?fbclid=IwAR2jeBEkkl2YvR184no95tVQ-jER-59apwyUk2l6Xz8FXMEVbISmlrWqDCI) provides us some corroboration that high-quality masks, in practice when worn by non-healthcare-workers, give about 2x benefit. [Lai et al](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/) uses mannequins and precisely calibrated aerosol spray to further verify the performance of basic surgical masks under a variety of conditions, and this research confirms that under “normal wearing” conditions, there’s roughly a 2x wearer protection. Other analyses we have seen shave off some efficacy to account for masks worn improperly or poorly-made DIY masks. We keep our number at 2x here, and emphasize that this is for high-quality and well-fitting masks, in part because 2x is simple and not too far off.

As for protection to the other party by wearing a mask (also known as “source control”), we estimate a source control factor of 4x. We base this on several sources:

*   [Davies et al.](https://www.researchgate.net/publication/258525804_Testing_the_Efficacy_of_Homemade_Masks_Would_They_Protect_in_an_Influenza_Pandemic) on improvised masks for influenza estimated around 5x protection for homemade cloth masks and around 7x for surgical masks (see Figure 4).
*   [Milton et al](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205) provided a somewhat lower estimate of a 3.6x reduction in the number of exhaled influenza viruses if the infected person wore a surgical mask.
*   [Fischer et al](https://advances.sciencemag.org/content/early/2020/08/07/sciadv.abd3083) counted respiratory droplets produced during normal speech through a variety of mask types. We averaged the droplet counts for the four cotton masks in their study (which were among the less effective masks tested) and found a 5.4x reduction in emitted droplets relative to no mask.

We combine these numbers to estimate approximately a 4x reduction. Again, this is a case where we have seen other analyses (especially those estimating _population-wide_ efficacy of mask-wearing) knock these numbers down somewhat. We keep the higher numbers here because we believe that if _you personally_ are hanging out with someone and they are _not actually wearing_ their mask (for example, it is hanging off their chin) you will notice that they aren’t wearing a mask, and not count this as giving you any extra protection factor. These types of “imperfect use” considerations need to be factored in more strongly than we do here when analyzing mask efficacy at the societal level.

We note that we think masks on the infected person might not help proportionately as much at larger indoor distances, because surgical masks are most effective at stopping larger droplets ([Leung et al.](https://www.nature.com/articles/s41591-020-0843-2)).

For N95 masks, [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) found that N95 masks reduced infection rates by 10x compared to surgical masks. This would be a 20x reduction in risk compared to no mask, but we have discounted this to 10x to account for the difficulty of getting a medical-grade fit test.
#### Outdoor / Ventilation

##### Outdoor
This is one of the tougher numbers to estimate, but we currently feel good estimating that being outdoors reduces your risk by more than 20x (unless you’re super close together, in which case we’re really not sure).

Almost every news article about outdoor transmission cites the same two sources: [Nishiura et al.](https://www.medrxiv.org/content/10.1101/2020.02.28.20029272v2) and [Qian et al.](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) Nishiura et al. is the source of the “18.7x” figure that we see all over the place, but we don’t put much stock in this specific paper for two reasons. For one, many summaries seem to miss that this is an _odds ratio_ and not a relative risk ratio (that is, it tells us that 18.7x as many of the transmissions came from indoors, but if people in general usually had 18.7x as much indoor contact as outdoor contact, this would not imply any difference in risk!).[^1] For another, Nishiura et al. also uses a very small sample size, it’s only six scant pages with very little explanation, and we can’t make heads or tails of the bar chart at the end.

Instead, we put stock in two sources:



*   [Qian et al](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) looked at 7,324 identified cases in China, and only found one outdoor outbreak involving two cases (which we interpret as one primary case, who had a conversation with the secondary case). Americans spend about [8% of their time](https://www.statista.com/chart/21408/time-americans-spend-indoors-outdoors/) outside; if we assume the same holds in this population, and close contact follows the same distribution, and there was no difference in indoor and outdoor risk, then this would imply 629 outdoor cases in expectation. A factor of several-100x lower risk needs to be accounted for somehow, through some combination of reduced outdoor risk and overestimating number of outdoor contacts.
*   Professor Jose Jimenez’s Google sheet [Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277)[^2], which is one of our absolute favorite resources so far. Professor Jimenez models the Skagit Choir outbreak, and then re-does the model again as though the choir had been outdoors, and finds transmission rates 100x lower outdoors. Notably, this model does NOT include the contribution of larger respiratory droplets, and assumes 6ft social distancing.

There’s also anecdotal evidence. In addition to the reports that there was no [significant protest-related surge](https://www.nytimes.com/2020/07/01/nyregion/nyc-coronavirus-protests.html) as a result of the Black Lives Matter protests, we also heard from a friend of ours who took a CO2 meter to a crowded protest and observed that the CO2 readouts were totally flat, implying minimal density or buildup of exhalations.

Finally, there have been zero outdoor outbreaks of any kind in the US, whereas in Colorado 9 percent of outbreaks [are reported](https://www.nytimes.com/2020/08/12/health/Covid-restaurants-bars.html) to have been traced to bars and restaurants, despite the fact that both indoor and outdoor restaurant dining are open throughout the US.

The sources above hint at up to a 100x benefit. Fellow armchair modeler Peter Hurford assumes a 5x benefit from being outdoors. We feel good about calling it “more than 20x” for now and waiting for more evidence, with a warning about not trusting this number if you’re very close to one another because we have no data about outdoor cuddling.

##### Ventilation
We draw our figure for room with HEPA filters from [Curtius & Schrod](https://www.medrxiv.org/content/10.1101/2020.10.02.20205633v2), who found that running HEPA filters in a class room with total hourly flow rate equal to 5x the volume of the room to decrease the concentration of aerosols in the room by 90%. They further project that this would decrease the liklihood of COVID transmission by 3x for a 1-hour interaction and 6x for a 2-hour interaction. We split the difference apply 4x in the calculator (but note that the longer your interaction lasts, the greater an impact air purifiers will have). We note that simply circulating air is insufficient - the air must either be exchanged with the outside or passed through a high quality filter (HEPA is equivalent to P100; HVAC filters rated on the MERV scale do not meet this critieria.)

It's important that your filter is actually circulating sufficient air. 
* Look up the model of your air purifier online; it should have a rating in CFM, which will be for running at maximum. 
* Measure the length and width of your room in feet. 
* For a normal room height (8ft), ensure \`CFM > 2/3 * length * width\`

The derivation of this rule is as follows:
\`\`\`
Refreshes/hr = 60 min/hr * CFM ft^3/min / (length ft * width ft * height ft) = 5
60 * CFM / (length * width * height) = 5
CFM = 5 * (length * width * height) / 60
CFM = 1/12 * (length * width * height)
if height = 8ft,
CFM = 2/3 * (square footage)
\`\`\`

From this, we also deduce that areas that have high rates of air exchange while not being "outside" per-se should be similarly safer. This includes cars with the windows rolled down and partially enclosed spaces (i.e. at least one wall is open to outside air).

Finally, many mass transit options have very high air circulation standards, so we apply the same risk reduction. For instance, SF's (BART)[https://www.bart.gov/news/articles/2020/news20200813] claims that their trains circulate and purify air every 70 seconds, or 50 times an hour. 

On planes, [Silcott et al](https://www.ustranscom.mil/cmd/docs/TRANSCOM%20Report%20Final.pdf) directly measured aerosol concentrations on a plane and found that the plane's filtration system resulted in 90% less exposure than a house. Since this is the same reduction as Curtis & Schrod found, we reason that the same reduction should apply. However, plane rides tend to be 2+ hours, so we use the 6x reduction that Curtis & Schrod calculated.

#### Distance
This is another [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) estimate. Each meter of distance was associated with about a 2x reduction in infection risk; specifically they find that being one meter apart is 2x better than baseline, and two meters 2x better than one meter. They speculate, and we agree, that three meters is thus likely at least 2x better than two meters. Although these data come from a healthcare setting in which “0m” means direct physical contact with the patient, we instead conservatively take “baseline” as “normal socializing” ≈ one meter. When doing our own personal risk calculations, we estimate “cuddling” = zero meters as twice as risky as baseline.

We get some corroboration for this number from the study of train passengers, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) Looking for example at Figure 3, for passengers that were 1 row apart, moving an additional 2 columns away (seats 0.5m wide, so about 1m away) decreased the risk from what we eyeball as 0.2ish to 0.1ish, and then from 0.1ish to 0.05ish for an additional 2 columns. It’s worth noting that they report a steeper drop from sitting _right next to_ the index patient to sitting 1m away, which could be relevant to hangouts at closer than a normal social distance from someone.

## Person Risk

### Basic Method: Underreporting factor

Previously we rolled out own estimation of underreporting factor based on raw caseloads. We now follow the model buit by [COVID-19 Projections](https://covid19-projections.com/estimating-true-infections-revisited/). Their team fit a model to seroprevalance data from various points in the pandemic.

The model they use is:
![Prevalance model](https://covid19-projections.com/assets/images/etir_equation.png)
This model works on the assumption that testing availability has steadily improved over the course of the pandemic, such that the impact of the positive test rate decreases as the pandemic continues. Our original model was based on a snapshot of testing availability early in the pandemic, which is now overly pessimistic.

For historical purposes, here is the original model that we used:
> In order to make suggestions about underreporting factor, we threw together a quick comparison of two data sources.
>
> * The first data source is state-by-state historical Positive Test Rates from [Covid Act Now](https://covidactnow.org/).
> * The second is the CAR (case ascertainment ratio) columns of [this table](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7239078/bin/NIHPP2020.04.29.20083485-supplement-1.pdf) from the NIH, as explained in [Chow et al.](https://www.medrxiv.org/content/10.1101/2020.04.29.20083485v1) (which used a computational model to estimate these numbers).
> * We typed these in by hand hastily. We excluded the NY and NJ numbers as the two that did not have a specified Positive Test Rate, being listed just as "over 20%", in the relevant timeframe. If you would like to check our work, this [code snippet](https://gist.github.com/catherio/8d95858c0f69023a9d5427fc5ef02671) shows what we did.
>
>There was a visible correlation, so we eyeballed some approximate ranges. Here's the data we see, with a simple linear regression line drawn on top. We eyeball this as being roughly "1 in 6" on the left-hand side; "1 in 8" in the middle; and "1 in 10" on the right-hand side.
>
>![Positive test rate](${positiveTestRate})

#### Contagiousness adjustment

The way we're using the prevalence numbers in our model assumes everyone in your area with COVID is equally likely to give it to you. But in reality, that's probably too pessimistic:

* A high proportion of all cases are asymptomatic. There's some uncertainty about the exact fraction, but a literature review by [Oran et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7281624/) estimates 40-45%.

* Asymptomatic cases are less likely to ever be tested than symptomatic cases, because symptoms prompt people to get tested. In the absence of symptoms, you'll only know you have COVID from contact tracing or from an effectively "random" / "just to be sure" test. This implies that asymptomatic cases are likely to be a relatively smaller fraction of _reported_ cases than of _all_ cases.

* Asymptomatic cases are probably responsible for quite a low proportion of infections. [Ferretti et al.](https://science.sciencemag.org/content/368/6491/eabb6936) concluded that only 5% of infections were caused by someone asymptomatic (i.e., who will never show symptoms no matter how long you wait).

* Our data about transmission likelihood (Activity Risk) are probably drawn from mostly symptomatic index cases. Thus, asymptomatic cases are likely to be less risky than our model would indicate.

In a region with positive test rates below 5%, we estimate the number of infected people as 6x the number of reported cases. But if reported cases are relatively more likely to be symptomatic, and unreported cases relatively less so, and asymptomatic cases are less risky in terms of onward transmission... then there's an argument that just multiplying the number of reported cases by 6 is too pessimistic. Even if the number of infections is 6x the reported case count, the risk to you would be lower since so many of those cases are asymptomatic. Maybe the increase in risk due to those unreported infections is only 4x or 5x, even though the underreporting factor is 6.

We can make a fairly speculative guess at what this "contagiousness-adjusted" underreporting factor should be, as follows. Testing provider [Color](https://www.color.com/new-covid-19-test-data-majority-of-people-who-test-positive-for-covid-19-have-mild-symptoms-or-are-asymptomatic) observes that 30% of their positive test results do not have any symptoms at the time of testing, and thus we infer are either presymptomatic or asymptomatic. If we again use the ratio from [Oran et al.](https://www.acpjournals.org/doi/10.7326/M20-3012), we might guess 40% of those 30% will never show symptoms; which is to say, we guess 12% of all [Color](https://www.color.com/new-covid-19-test-data-majority-of-people-who-test-positive-for-covid-19-have-mild-symptoms-or-are-asymptomatic)-reported positive tests are from asymptomatic cases, and the remaining 88% are from presymptomatic and symptomatic cases. By contrast, 60% of all *total* infections found via blanket testing of everyone in a region (by [Oran et al.](https://www.acpjournals.org/doi/10.7326/M20-3012) again) are presymptomatic or symptomatic. This tells us that we might expect 0.6/0.88 = ~2/3 as many of the unreported cases are highly contagious (by virtue of being presymptomatic or symptomatic instead of asymptomatic). While this calculation is far from perfect, it gives us a rough estimate that could be used as a "contagiousness adjustment factor" of 2/3. And that would imply that the minimum underreporting factor could be 4x, not 6x.

We have chosen _not_ to apply this adjustment to the estimates we
report in the main text: the underreporting factors of 6x/8x/10x
assume all cases are equally contagious. We made this choice because
of how speculative the adjustment is. Even though we're reasonably
sure from first principles that there should be _some_ effect along
these lines, we're quite uncertain about its magnitude. So, we'll
treat the effect as an unknown safety margin rather than using it
to reduce our prevalence estimate.


### Basic Method: Infectious period

We mentioned in the [Basic Method](7-basic-method) that the reason we use a week's worth of cases in our prevalence estimate is that people are most infectious in a roughly week-long span of time between 2 and 9 days after they were infected. Similarly, the [Advanced Method](9-advanced-method) works by tallying up all of someone's activities between 2 and 9 days ago.

We have found the following graph useful for thinking about this. [Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936) Figure 1 shows several curves in black that provide different estimates of the distribution of SARS-CoV-2 “generation time,” which is the time between when a person gets infected and when they transmit the virus to someone else. The curve with the thickest line is the one they picked as the best-fitting distribution. We observe that not very many transmissions occur fewer than 2 days after infection or more than 9 days after infection. (Not a *negligible* fraction from a public health standpoint, but few enough to not dominate our personal judgments about our risk.)

![Ferretti et al](${ferrettiFig1})

### Note on Infectious Period: Contacts' symptoms

Another important thing to know about the infectious period is that only about 9% of transmissions from people who eventually show symptoms occur more than 3 days before those symptoms appear, and only 1% occur more than 5 days before symptoms appear. We get this data from [He et al](https://www.nature.com/articles/s41591-020-0869-5), figure 1c middle graph:

![He et al](${heExtended})

(If you were previously familiar with this source, note that it was substantially updated in a [07 Aug 2020 author correction](https://www.nature.com/articles/s41591-020-1016-z).)

Additionally, only about 6% of transmissions come from people who won't ever show symptoms ([Ferretti et al](https://science.sciencemag.org/content/368/6491/eabb6936)):[^ferretti]

![Ferretti et al](${ferrettiFig2})

These two facts combined imply that, if you interacted with someone more than 3 days ago, and that person has not yet shown symptoms, then you should be about 7 times more confident than you were before that they did not transmit COVID to you: \`0.94*0.09 + 0.06 = 0.14 ≈ 1/7\`.

And if your interaction was 5 days ago and your contact still has no symptoms, you should have an additional 2x as much certainty (total of 14 times more confident): \`0.94*0.01 + 0.06 = 0.07 ≈ 1/14\`.

To see where these factors might be useful in practice, imagine that Alice lives with risk-averse housemates but wishes to spend undistanced time with her partner Bob, who generally acts in riskier ways. Without further information, Alice might imagine that she needs to isolate for 10 days after spending time with Bob in order to avoid exposing her housemates to more risk than they're comfortable with. But suppose seeing Bob is the only high-risk thing Alice is doing, and suppose that Alice and her housemates have modelled Bob using the Advanced Method and all agree that he is only 5x "too risky." (That is, if Bob were 5x less likely to have COVID at the time of Alice's visit, Alice's housemates would be fine with Alice seeing Bob and then coming back home without further isolation.) Then Alice could safely follow a procedure where she:
* has her visit with Bob;
* waits 3 full days without interacting with Bob or her housemates;
* verifies that Bob is not experiencing any potential symptoms of COVID-19, even mild or ambiguous ones;
* and then returns home.

This works because Bob is less than 7x "too risky." If he were 10x "too risky," Alice could safely wait 5 days instead of 3, because 10x is less than the 14x increased confidence that you can have after 5 days.

If each visit only requires 3 or 5 days of isolation instead of 10, Alice can probably see her partner more often, which is likely to be good for both Alice's and Bob's mental health.

### Intermediate Method: Frontline worker adjustment

We estimate that frontline workers are 3x more likely to have COVID, and anyone who is not a frontline worker is 0.5x as likely to be infected. Here is how we made that calculation.

First, we use data from [McNicholas & Poydock Table 4](https://www.epi.org/blog/who-are-essential-workers-a-comprehensive-look-at-their-wages-demographics-and-unionization-rates/) showing that around 55 million people in the US are essential workers (38% of workforce and 17% of the population); we sanity-check this against [another source](https://bayareaequityatlas.org/essential-workers) citing 28% of workers in the Bay Area are essential workers. In [Chamie et al.](https://www.medrxiv.org/content/10.1101/2020.06.15.20132233v1.full.pdf)’s blanket testing survey of residents in the Mission District in San Francisco, they found a positive test rate of 5% among frontline service workers and 0.8% among non-frontline workers (6.27x higher for frontline workers). The overall prevalence is a population-weighted average: \`prevalence_total = 0.17 x p_essential + 0.83 x (p_essential / 6.27)\`. From this we compute \`p_essential = 3.3 x prevalence_total\`. We round off to 3x for essential workers, and 0.5x for all others.

## Uncertainty estimation

In this writeup, we've presented individual numbers for all the parameters of our model:
* 30% Activity Risk from a housemate per week, or 48% from a partner
* 6% baseline Activity Risk per hour (indoor, unmasked, undistanced)
* Various multiplicative risk reductions (2x per 3 feet, 2x for your mask, 4x for their mask, 20x for outdoors, etc)
* Person Risk underreporting factors of 6x/8x/10x depending on positive test rate

Based on the sources we've described so far, we think these numbers are the best estimate of the truth — that's why we're presenting them instead of some other numbers. But of course there's still a lot of uncertainty about the details of COVID transmission, which means that it's possible, even likely, that some or all of the numbers we're using will turn out to be off by a little or a lot. In this section, we attempt to answer the question: "if we're wrong, how wrong might we be?".

The top-line answer: **we think the numbers produced by our calculator are correct within a factor of 10, and probably within a factor of 3**. That is, if the calculator says some activity has a risk of 300 microCOVIDs, the risk might well actually be 100 or 1000 microCOVIDs. (And the calculator will tell you that, alongside the result it gives you.) It *could* be as few as 30 or as many as 3000 microCOVIDs, but that would be a lot more surprising to us.

The rest of this section explains how we came up with those bounds, and will be much more jargon-heavy.

We estimated underlying probability distributions for a subset of the parameters in our model: the protection factors for masks, distance, and outdoors, the baseline Activity Risk of 6%, and the underreporting factor for prevalence. In some of these cases, we were able to do this estimation using the confidence intervals that were reported in the scientific papers that we used as sources. In other cases, our sources did not provide clear confidence intervals, so we had to resort to fuzzier intuition. We then combined these distributions using Monte Carlo simulation to produce distributions for the risk of three example activities, and compared these to the calculator outputs.

We did this analysis using [Guesstimate](https://www.getguesstimate.com), an online tool that makes it easy to do math on probability distributions. (Imagine a spreadsheet where each cell is a random variable instead of just a number.) Our work is spread across two Guesstimate models:

* [Masks and distance data](https://www.getguesstimate.com/models/16799) (using uncertainties from published sources)
* [Overall model](https://www.getguesstimate.com/models/16798) (using uncertainties from the masks-and-distance model and from the authors' current beliefs)

In the following subsections, we go into more detail on the rationale behind the distributions in the Guesstimate models. When we say "A (B to C)", we mean we think a random variable is distributed with median A and 90% confidence interval B to C. We have represented 95% confidence intervals in our sources as 90% confidence intervals in the Guesstimate models, because Guesstimate is designed to work with 90% confidence intervals and we figure the extra uncertainty doesn't hurt.

### Masks

**Wearer protection:** We use [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) as the source for our wearer protection data in this model. This study directly measured reduction in coronavirus infections (SARS, MERS, and COVID-19) as a result of mask wearing and other measures. We conservatively use the smaller risk reduction that they report for non-healthcare settings: someone wearing a surgical mask has **0.56x (0.41x to 0.80x, lognormal)** the risk of infection as someone not wearing a mask. The studies in this group were all for SARS. Taking the reciprocal of this, we find the mask provides **1.7x (1.2x to 2.5x, approximately lognormal)** protection. (Our other sources are more optimistic than Chu about the benefit of masks, so it seems sufficiently conservative to only include Chu.)

**Source control:** We use two studies as the source of our data for source control, excluding Davies (the third we used in making our original estimate, and the most optimistic of the three) because it does not provide clear confidence intervals.

* From [Milton et al](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205), surgical masks reduced exhaled influenza virus count by **3.3x (1.8x to 6.3x, lognormal)**.
* From [Fischer et al](https://advances.sciencemag.org/content/early/2020/08/07/sciadv.abd3083), we take droplet counts that were produced in different trials by the same speaker when speaking through the four different cotton masks that were tested, as well as no mask. Averaging the droplet counts through the four cotton masks and dividing by the droplet count with no mask, we find a **5.3x (2.9x to 8.7x)** reduction. We acknowledge that droplet count is not the same as virus count which is not the same as risk of infection, but we think the one is a reasonable proxy for the other.
* Averaging these two estimates, we get a source control factor of **4.4x (2.9x to 6.7x)**.

### Distance

We limit our analysis to the decrease in risk specifically between one meter and two meters of distance. We find:

* From [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext), a risk reduction factor of **2.1x (1.1x to 3.8x)**. (Chu reports this per meter: from "no distance" (which we think is probably more like half a meter than zero) to one meter, and from one meter to two meters.)
* From [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) (the train passenger study), we compare attack rates for two different scenarios.
  * In one, we compare "same row two seats away" (1 or 1.1 meters distance) to "same row four seats away" (2.1 meters distance). We find that the further distance is associated with a **4.3x (2.1x to 10x)** reduction in risk.
  * In another, we compare "one row and one column away" (1.02 meters distance, by the Pythagorean theorem since rows are 0.9 meters apart and columns are 0.5 meters apart) with "one row and three columns away" (1.74 meters distance). ("Column" here refers to the number of seats away in the direction perpendicular to the direction the passengers are facing.) We used three columns away rather than four columns away, even though four columns was closer to 2 meters, because the attack rate for one-row-four-columns seemed uncharacteristically low (lower than five columns away) and it would have artificially inflated our estimate of the protection factor from greater distance. We find that the further distance among this pair is associated with a **2.9x (0.9x to 10x)** reduction in risk.
* Averaging the estimate from Chu with the average of the estimates from Hu, we get a **3.0x (1.9x to 4.9x, approximately lognormal)** reduction in risk when going from one meter to two meters.

### Remaining parameters

These are in the [main Guesstimate sheet](https://www.getguesstimate.com/models/16798), not the [sub-sheet](https://www.getguesstimate.com/models/16799) that was used for the mask and distance data, because we're no longer able to base our distributions on the confidence intervals from our sources: the remaining parameters come from sources without obviously usable confidence intervals. We don't have fully legible justifications for the intervals that we've chosen; they're derived from our intuitions based on reading papers and listening to statements by public health officials for a few months. If you want to see the impact of different choices, you can edit the Guesstimate model. (Don't worry, it won't change what anyone else sees.)

* Reduction in risk from being outdoors: 28x (9x to 95x), computed by combining the following guesses:
  * Transmission due to breathing and speaking might be reduced by 10x to 100x, lognormal (implies a median of 31x, mean 40x).
  * Transmission due to coughing and sneezing (which happen even in people who would describe themselves as healthy) is probably only reduced 1x to 3x, lognormal (median and mean about 2x).
  * Overall transmission from people who don't know they're sick might be 90% due to breathing and speaking, and only 10% from sneezing and coughing, because even though sneezing and coughing are much more effective at transmitting the virus, people who feel well usually don't sneeze and cough very much.
* Baseline transmission risk (indoor unmasked 1-hour conversation at typical socializing distance, point estimate 6%): 2% to 13%, lognormal (median 5%, mean 6%).
* Underreporting factor in San Francisco (point estimate 6x): 3x to 10x, lognormal (median 5.5x, mean 5.9x).

### Results

Now that we have all the above distributions, we can multiply them together for typical scenarios, and compare the results against what we get using the calculator.

* Outdoor hangout (\`prevalence ⨉ baseline / outdoors\`): calculator says 12 μCoV, uncertainty-based model says 1.5 to 36 μCoV (mean 10, median 6).
* Indoor masked hangout (\`prevalence ⨉ baseline / (my mask ⨉ their mask)\`): calculator says 30 μCoV, uncertainty-based model says 7.7 to 92 μCoV (mean 32, median 24).
* Indoor unmasked hangout (\`prevalence ⨉ baseline\`): calculator says 236 μCoV, uncertainty-based model says 67 to 640 μCoV (mean 230, median 179).

We note the following:

* The calculator result is quite close to the mean of the underlying distribution of the uncertainty-based model. Taking into account all of the information available to us, that means we think we're neither overestimating nor underestimating *on average* (i.e., low or no bias).

* Multiplying the calculator result by 3 yields in each case a value that is close to or above the upper end of the 90% confidence interval from the model. Dividing the calculator result by 3 yields a value that is somewhere between 1.2x and 2.6x higher than the lower end of the 90% confidence interval from the model. For ease of communication, we'll call that a **3x margin of error in either direction**. We think we might be overestimating by a greater factor than we might be underestimating, but that's the direction we'd prefer to err in if we must — no disaster will befall if some action turns out to be safer than we told our users it might be.

**Note:** This analysis is about _known_ unknowns, i.e., places where we know there's uncertainty and can reasonably estimate how much. We have not characterized the uncertainty in all parameters of the model; we have only demonstrated that, under some typical scenarios, the uncertainty might be low enough to make the results usable. Additionally, it is entirely possible that there is more uncertainty beyond what we've calculated here, due to some unforeseen problem in our (individual or society-wide) understanding of COVID transmission dynamics. At the beginning of this section we quoted bounds of 10x, not 3x; this discrepancy is intended as a hedge against such "unknown unknowns", but we have no way of knowing if it's enough. Use our model with care.


[^1]:
     We find it easier to understand the difference between an odds ratio and a risk ratio in a medical context. If 100 people walk into your clinic with heart disease, and twice as many were smokers as non-smokers, then the odds ratio is 2x. But that doesn’t tell you what you would get if you _started_ with 50 smokers and 50 nonsmokers and watched for heart disease later. You don’t know what the base rate of smoking was in your original dataset. See [https://psychscenehub.com/psychpedia/odds-ratio-2](https://psychscenehub.com/psychpedia/odds-ratio-2) for more on this.

[^2]:
     We understand there’s currently somewhat of a [debate or discussion](https://slate.com/technology/2020/07/droplets-aerosols-coronavirus-covid-19.html) around whether COVID is best thought of as being transmitted by smaller droplets that can linger in the air, or mostly by larger droplets that fall down quickly due to gravity. We already thought the evidence was pointing towards lingering droplets, and [Prof. Jimenez’s writeup](https://docs.google.com/document/d/1Kx4Mka_nORa8LlEwziRYZxOX0J8_fFfgnt-9TBjxusc/edit) on the topic summarizes this perspective far better than we could.

[^ferretti]: There's an inconsistency in Ferretti et al, where the main text states that total transmissions come "10% from asymptomatic individuals (who never show symptoms), and 6% from environmentally mediated transmission via contamination.", whereas Figure 1 and Table 2 report the reverse, 6% from asymptomatic and 10% from environmental. We choose to go with the Figure 1 and Table 2 estimates.
`

const post = { title, shortTitle, content }

export default post

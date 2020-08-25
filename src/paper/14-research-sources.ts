const title = 'Research Sources'

const content = `

Read this section if you are interested in the epistemic nitty-gritty behind our estimates of Activity Risk and Person Risk.

# Person Risk

### Underreporting factor

In order to make suggestions about underreporting factor, we threw together a quick comparison of two data sources.

* The first data source is state-by-state historical Positive Test Rates from [Covid Act Now](https://covidactnow.org/).
* The second is the CAR (case ascertainment ratio) columns of [this table](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7239078/bin/NIHPP2020.04.29.20083485-supplement-1.pdf) from the NIH, as explained in [Chow et al.](https://www.medrxiv.org/content/10.1101/2020.04.29.20083485v1) (which used a computational model to estimate these numbers).
  * We typed these in by hand hastily. We excluded the NY and NJ numbers as the two that did not have a specified Positive Test Rate, being listed just over , in the relevant timeframe. If you would like to check our work, this [code snippet](https://gist.github.com/catherio/8d95858c0f69023a9d5427fc5ef02671) shows what we did.

There was a visible correlation, so we eyeballed some approximate ranges. Here’s the data we see, with a simple linear regression line drawn on top. We eyeball this as being roughly “1 in 6” on the left-hand side; “1 in 8” in the middle; and “1 in 10” on the right-hand side.

![Positive test rate](/paper/positive-test-rate.png)

One question that came up is whether we’re overestimating the _contagious_ cases, because asymptomatic cases are probably a high proportion of all cases (a literature review Oran et 40 al. estimates 40-45%) and _especially_ a high proportion of _unreported_ cases, but they are resposible for a much lower proportion of infections ([Ferretti et al.](https://science.sciencemag.org/content/368/6491/eabb6936) concluded 5%). Our data about transmission likelihood (Activity Risk) are probably drawn from mostly symptomatic index cases, which suggests that asymptomatic cases should count for “less” in the prevalence numbers, which would decrease the effective underreporting factor.

We make a fairly speculative guess at a “contagiousness-adjusted” prevalence figure as follows. Testing provider [Color](https://www.color.com/new-covid-19-test-data-majority-of-people-who-test-positive-for-covid-19-have-mild-symptoms-or-are-asymptomatic?utm_source=Press+%26+Media+Contacts&utm_campaign=9f99621884-Press+Outreach+-++COVID+Testing+Data+6+20&utm_medium=email&utm_term=0_cd48a5177d-9f99621884-230595282) observes that 30% of their positive test results do not have any symptoms at the time of testing, and thus we infer are either presymptomatic or asymptomatic. If we again use the ratio from [Oran et al.](https://www.acpjournals.org/doi/10.7326/M20-3012), we might guess 40% of those 30% will never show symptoms; which is to say, we guess 12% of all [Color](https://www.color.com/new-covid-19-test-data-majority-of-people-who-test-positive-for-covid-19-have-mild-symptoms-or-are-asymptomatic?utm_source=Press+%26+Media+Contacts&utm_campaign=9f99621884-Press+Outreach+-++COVID+Testing+Data+6+20&utm_medium=email&utm_term=0_cd48a5177d-9f99621884-230595282)-reported positive tests are from asymptomatic cases, and the remaining 88% are from presymptomatic and symptomatic cases. By contrast, 60% of all total infections (by [Oran et al.](https://www.acpjournals.org/doi/10.7326/M20-3012) again) are presymptomatic or symptomatic. This tells us that we might expect 0.6/0.88 = ~2/3 as many of the unreported cases are highly contagious. While this calculation is far from perfect, it gives us a rough estimate that we use as our “contagiousness adjustment factor” of 2/3.


We combine our original guesses with the rough 2/3 contagiousness adjustment factor, to make our final recommendations:
* Positive test rate 5% or lower => 4x underreporting factor
* Positive test rate between 5% and 15% => 5x underreporting factor
* Positive test rate between greater than 15% => at least a 7x underreporting factor.

### Indoor unmasked transmission

**One-Time Contact**

This is the chance that you would get COVID from spending more than 10 minutes indoors or in close proximity to someone who is COVID-positive. We estimate this as “about 6% per hour” from combining multiple sources:

1. In a study of train passengers that analyzed 2,334 index patients with COVID, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) found that passengers on seats within the same row as the index patient had an average attack rate of 1.5%; for passengers in adjacent seats, the attack rate increased 1.3% per hour. Assuming train passengers are mostly silent, combining this with the respiration rates from the [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277) would imply that a conversational hangout in the adjacent seat of a train would be a risk of **roughly 6% per hour**. The distance between adjacent seats on this train was half a meter, and we think typical socialization is moderately further away than this, which gives some extra breathing room on the estimate.
2. Using the [Jimenez Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277), we modify the “Class” scenario (1 infected instructor speaking loudly) to propose a normal conversational volume, smaller room (10ft wide x 14ft long x 10ft high), and no masks, leaving other parameters unchanged. This outputs 2.8% per hour; however, this model notes it assumes uniform mixing of air and ignores near-field effects, so is not a good estimate for interactions that aren’t >6ft. If we take this as our >6ft estimate, and double it as per the “Distance” modifiers described later, this also **suggests 6% per hour**. (Note that this is rather dependent on room size: increasing the 10ft width to 15ft decreases the estimate by a third.)
3. [Bi et al](https://www.thelancet.com/action/showPdf?pii=S1473-3099%2820%2930287-5) analyzed Shenzhen contact tracing data from Jan 14–Feb 12 (1281 contacts of 291 cases). Their Table 3 provides data about how often close contacts of COVID-positive people got infected based on different types of contact. The average estimates for each group tend to fall **roughly between 6-9%** (total, not per hour); we note that the vast majority of the infections in this dataset come from the “Contact frequency: Often” category, so we expect this to be an overestimate for the “Moderate” and “Rare” frequency. This data was collected in a setting where 17% of cases were isolated _before_ symptom onset, and we would expect a larger fraction isolated after symptom onset, so the numbers would be higher in a setting where people are not being notified when their contacts get sick.
4. Next is [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) who did a meta-analysis of 172 studies covering 26,000 individuals, to determine the impact of various interventions (masks, distance, and eye protection) on transmissibility. Importantly to note, they included analyses of SARS and MERS, not just COVID-19. As shown in their Table 2, they found baseline transmissibility values (without masks/distance/etc) of 12.8%, 17.4%, and 16% in different groups. These data mostly come from healthcare settings, and the baseline assumption is direct physical contact, rather than an ordinary socializing distance. We don’t know how many hours were generally spent with patients. We assume these are infected patients who have sought treatment, so definitionally there is no additional distance from anyone symptomatic, so we might expect casual social contact outside a healthcare setting to carry a lower infection probability. However, COVID-19 may be [more infectious/contagious](https://www.medicalnewstoday.com/articles/how-do-sars-and-mers-compare-with-covid-19#Coronaviruses-past-and-present) than SARS and MERS. Overall, this is consistent with “6% per hour” for normal socializing if the average duration in this dataset is on the order of 2 hours; if the baseline “no distance” is closer together than typical socializing; or some combination.
5. In a prospective study in Taiwan, [Cheng et al](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2765641) found a secondary attack rate of 1.0% among contacts of longer than 15 minutes who were exposed within the first 5 days of symptom onset. This **implies a rate of 4% per hour** if all the contacts were only 15 minutes (and even lower rates if the contacts were for longer).

**Household member**

This is the chance of getting infected from a household member who has COVID. We use the estimate of 30% from the meta-analysis of [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) (specifically their updated June 27 version). We explain a bit here about where their estimate comes from.

[Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) used three different methods to synthesize existing literature. The first method is a re-analysis of nine recent studies, which gives them the central estimate of 30% for the “secondary attack rate” (which is the parameter we care about: the chance of getting infected from a housemate who has COVID). They point out that the estimates vary substantially from source to source, which they conjecture is likely in part due to variations in isolation practices.

Their other two estimation methods use independent datasets. Although these two methods don’t estimate secondary attack rate—rather, they estimate R<sub>h</sub>, the _number_ of within-household transmissions, which is not quite the number we’re looking for—we can nonetheless use this information as corroboration. Specifically, they estimate an R<sub>h </sub>of 0.37 from Vo’, Italy, where average household size was 2.1. If the average infected person infects 0.37 of their 1.1 (excluding self) other household members, that works out to each household member having a 34% risk of being infected. The data suggests this could be substantially larger for older people.

**Partner**

This is a highly speculative number. [Li et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7184465/) found a 1.6x higher infection rate among spouses than among other adult household members. This is just one datapoint, but it’s the best we have right now. We use this to adjust the 30% figure from [Curmei et al.](https://www.medrxiv.org/content/10.1101/2020.05.23.20111559v2) up by 1.6x, to get 48% for spouses.


### Modifiers to Activity Risk: Masked, Outdoors, Distanced

**Masks**

We get our wearer protection figure of 2x from [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) (again!), who estimated this number for surgical masks at 2–3x. [Liang et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7253999/?fbclid=IwAR2jeBEkkl2YvR184no95tVQ-jER-59apwyUk2l6Xz8FXMEVbISmlrWqDCI) provides us some corroboration that high-quality masks, in practice when worn by non-healthcare-workers, give about 2x benefit. [Lai et al ](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/)uses mannequins and precisely calibrated aerosol spray to further verify the performance of basic surgical masks under a variety of conditions, and this research confirms that under “normal wearing” conditions, there’s roughly a 2x wearer protection. Other analyses we have seen shave off some efficacy to account for masks worn improperly or poorly-made DIY masks. We keep our number at 2x here, and emphasize that this is for high-quality and well-fitting masks, in part because 2x is simple and not too far off.

As for protection to the other party by wearing a mask (also known as “source control”), we estimate a source control factor of 4x. We base this on several sources:



*   [Davies et al.](https://www.researchgate.net/publication/258525804_Testing_the_Efficacy_of_Homemade_Masks_Would_They_Protect_in_an_Influenza_Pandemic) on improvised masks for influenza estimated around 5x protection for homemade cloth masks and around 7x for surgical masks (see Figure 4).
*   [Milton et al](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205) provided a somewhat lower estimate of 3x reduction in viral copy numbers from wearing surgical masks in a source control scenario.

We combine these numbers to estimate approximately a 4x reduction. Again, this is a case where we have seen other analyses (especially those estimating _population-wide_ efficacy of mask-wearing) knock these numbers down somewhat. We keep the higher numbers here because we believe that if _you personally_ are hanging out with someone and they are _not actually wearing_ their mask (for example, it is hanging off their chin) you will notice that they aren’t wearing a mask, and not count this as giving you any extra protection factor. These types of “imperfect use” considerations need to be factored in more strongly than we do here when analyzing mask efficacy at the societal level.

We note that we think masks on the infected person might not help proportionately as much at larger indoor distances, because surgical masks are most effective at stopping larger droplets ([Leung et al.](https://www.nature.com/articles/s41591-020-0843-2)).

**Outdoor**

This is one of the tougher numbers to estimate, but we currently feel good estimating that being outdoors reduces your risk by more than 10x (unless you’re super close together, in which case we’re really not sure). \


Almost every news article about outdoor transmission cites the same two sources: [Nishiura et al.](https://www.medrxiv.org/content/10.1101/2020.02.28.20029272v2) and [Qian et al.](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) Nishiura et al. is the source of the “18.7x” figure that we see all over the place, but we don’t put much stock in this specific paper for two reasons. For one, many summaries seem to miss that this is an _odds ratio_ and not a relative risk ratio (that is, it tells us that 18.7x as many of the transmissions came from indoors, but if people in general usually had 18.7x as much indoor contact as outdoor contact, this would not imply any difference in risk!)[^1]. For another, Nishiura et al. also uses a very small sample size, it’s only six scant pages with very little explanation, and we can’t make heads or tails of the bar chart at the end.

Instead, we put stock in two sources:



*   [Qian et al](https://www.medrxiv.org/content/10.1101/2020.04.04.20053058v1) looked at 7,324 identified cases in China, and only found one outdoor outbreak involving two cases (which we interpret as one primary case, who had a conversation with the secondary case). Americans spend about [8% of their time](https://www.statista.com/chart/21408/time-americans-spend-indoors-outdoors/) outside; if we assume the same holds in this population, and close contact follows the same distribution, and there was no difference in indoor and outdoor risk, then this would imply 629 outdoor cases in expectation. A factor of several-100x lower risk needs to be accounted for somehow, through some combination of reduced outdoor risk and overestimating number of outdoor contacts.
*   Professor Jose Jimenez’s Google sheet [Aerosol Transmission Model](https://docs.google.com/spreadsheets/d/16K1OQkLD4BjgBdO8ePj6ytf-RpPMlJ6aXFg3PrIQBbQ/edit#gid=519189277)[^2], which is one of our absolute favorite resources so far. Professor Jimenez models the Skagit Choir outbreak, and then re-does the model again as though the choir had been outdoors, and finds transmission rates 100x lower outdoors. Notably, this model does NOT include the contribution of larger respiratory droplets, and assumes 6 ft social distancing.
There’s also anecdotal evidence. In addition to the reports that there was no [significant protest-related surge](https://www.nytimes.com/2020/07/01/nyregion/nyc-coronavirus-protests.html) as a result of the Black Lives Matter protests, we also heard from a friend of ours who took a CO2 meter to a crowded protest and observed that the CO2 readouts were totally flat, implying minimal density or buildup of exhalations.

Finally, there have been zero outdoor outbreaks of any kind in the US, whereas in Colorado 9 percent of outbreaks [are reported](https://www.nytimes.com/2020/08/12/health/Covid-restaurants-bars.html) to have been traced to bars and restaurants, despite the fact that both indoor and outdoor restaurant dining are open throughout the US.

The sources above hint at up to a 100x benefit. Fellow armchair modeler Peter Hurford assumes a 5x benefit from being outdoors. We feel good about calling it “more than 10x” for now and waiting for more evidence_, _with a warning about not trusting this number as much if you’re very close to one another because we have no data about outdoor cuddling.

**Distance**

This is another [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) estimate. Each meter of distance was associated with about a 2x reduction in infection risk; specifically they find that being one meter apart is 2x better than baseline, and two meters 2x better than one meter. Although this data came from a healthcare setting in which “0m” means direct physical contact with the patient, we instead conservatively take “baseline” as “normal socializing” ≈ one meter. This is also part of why we estimate “cuddling” = zero meters is twice as risky as baseline.

We get some corroboration for this number from the study of train passengers, [Hu et al.](https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1057/5877944) Looking for example at Figure 3, for passengers that were 1 row apart, moving an additional 2 columns away (seats 0.5m wide, so about 1m away) decreased the risk from what I eyeball as 0.2ish to 0.1ish, and then from 0.1ish to 0.05ish for an additional 2 columns. It’s worth noting that they report a steeper drop from sitting _right next to_ the index patient to sitting 1m away, which could be relevant to hangouts at closer than a normal social distance from someone.

[^1]:
     We find it easier to understand the difference between an odds ratio and a risk ratio in a medical context. If 100 people walk into your clinic with heart disease, and twice as many were smokers as non-smokers, then the odds ratio is 2x. But that doesn’t tell you what you would get if you _started_ with 50 smokers and 50 nonsmokers and watched for heart disease later. You don’t know what the base rate of smoking was in your original dataset. See [https://psychscenehub.com/psychpedia/odds-ratio-2](https://psychscenehub.com/psychpedia/odds-ratio-2) for more on this.

[^2]:
     We understand there’s currently somewhat of a [debate or discussion](https://slate.com/technology/2020/07/droplets-aerosols-coronavirus-covid-19.html) around whether COVID is best thought of as being transmitted by smaller droplets that can linger in the air, or mostly by larger droplets that fall down quickly due to gravity. We already thought the evidence was pointing towards lingering droplets, and [Prof. Jimenez’s writeup](https://docs.google.com/document/d/1Kx4Mka_nORa8LlEwziRYZxOX0J8_fFfgnt-9TBjxusc/edit) on the topic summarizes this perspective far better than we could.
`

const post = { title, content }

export default post

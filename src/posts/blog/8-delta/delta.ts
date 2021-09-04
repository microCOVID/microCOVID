import deltaHospitalization from './img/delta_hospitalization.png'
import deltaLongCovid from './img/delta_longcovid.png'
import { ImageMeta } from 'posts/post'

const image: ImageMeta = {
  url: deltaLongCovid,
  width: 1200,
  height: 406,
}

const title = 'The Delta Variant'

const author = 'Team microCOVID'
const date = 'August 10, 2021'

const summary =
  'The Delta variant, now the most common worldwide, has substantially increased COVID risk, including for vaccinated people. We discuss the risk of hospitalization, death, long-term symptoms, and of passing the infection to the people around you.'

const content = `
The Delta[^delta] variant has substantially increased COVID risk, including for vaccinated people. We have adjusted the [microCOVID calculator] to provide updated numbers. Vaccines still provide substantial protection, but it’s gotten more complicated — read on to learn more about the latest findings, and please consider visiting the calculator to get updated risk numbers for your activities and relationships.

[microCOVID calculator]: https://www.microcovid.org/
[^delta]: Delta is now [believed to the the most common variant worldwide](https://www.reuters.com/business/healthcare-pharmaceuticals/delta-covid-variant-now-dominant-worldwide-drives-surge-us-deaths-officials-2021-07-16/). Note that the WHO has [started labelling variants with Greek letter names](https://www.who.int/en/activities/tracking-SARS-CoV-2-variants/) that are easier to remember than letter-number sequences and less stigmatizing than location-based names. In scientific circles, Delta goes by the name B.1.617.2.

## What does the Delta variant mean for me?

The Delta variant’s increased infectiousness means that COVID cases are surging faster than they used to. We now encourage you to check [microCOVID](http://microcovid.org) at least weekly or use the [risk tracker](https://www.microcovid.org/tracker). You ***may want to make very different choices from one week to the next*** about activities like grocery shopping without a mask, dining, attending indoor parties, or going to bars/clubs. We saw the chance of infection from *Indoor dining, fully vaccinated with Pfizer* increase 7x within one week in [Santa Clara County, California]![^santaclara]

[Santa Clara County, California]: https://www.microcovid.org/?distance=sixFt&duration=90&interaction=oneTime&personCount=15&riskProfile=average&scenarioName=restaurantIndoors&setting=indoor&subLocation=US_06085&theirMask=none&topLocation=US_06&voice=normal&yourMask=none&yourVaccineDoses=2&yourVaccineType=pfizer

[^santaclara]: At our recommended caution budget, the 7x increase meant indoor dining went from a once-a-week activity to a less than once a month activity.

One thing that the Delta variant *hasn’t* changed is the effectiveness of simple precautions. In particular, **shifting activities from indoors to outdoors still reduces your risk 20x** as long as you maintain a distance of at least 3 feet (1 meter). N95 and KN95 masks are still [extremely effective](https://www.microcovid.org/blog/masks) when used properly and are now available cheaply online.

Still, the Delta variant *has* affected the consequences of contracting COVID. We’ll discuss the risk of hospitalization, death, long-term symptoms, and of passing the infection to the people around you.

## Avoiding hospitalization/death

<figure>
  <img src="${deltaHospitalization}" alt="Picture of hospital on a green circle, next to the text: Your chance of hospitalization (if you become infected with the Delta variant) is still low" />
</figure>

The microCOVID risk budget[^budget] is based on the risk of *infection*. Infection risks have gone up for both vaccinated and unvaccinated people, though the risk is still much lower if you’re vaccinated. Thankfully, **people who are fully vaccinated still have a low chance of being hospitalized or dying**. [^3]

Some folks have asked us if this means they should tolerate a higher risk budget, since the badness of developing COVID is lower. We think this has some merit, but please see the sections below for strong reasons why developing COVID can still have high costs for you and the people around you.

[^budget]: The microCOVID [calculator](https://www.microcovid.org/) lets you estimate the risk of infection from social gatherings, errands, roommates, and other interactions. We compare it to your [risk budget](https://www.microcovid.org/paper/2-riskiness), which is the total chance of getting infected you’re willing to tolerate over a week or a year.

[^3]: [Stowe et al.](https://khub.net/web/phe-national/public-library/-/document_library/v2WsRK3ZlEig/view_file/479607329?_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_v2WsRK3ZlEig_redirect=https%3A%2F%2Fkhub.net%3A443%2Fweb%2Fphe-national%2Fpublic-library%2F-%2Fdocument_library%2Fv2WsRK3ZlEig%2Fview%2F479607266)

## Avoiding long-term COVID symptoms

<figure>
  <img src="${deltaLongCovid}" alt="A clock with a red arrow around it to indicate the passage of time behind a coronavirus particle, all on a yellow background. The text reads 'Your chance of long-term symptoms (even if you have a mild case of COVID) is ~2-38%' with a clarification that there is ongoing research. There is a color-coded horizontal bar with 0% on the left as green (not alarming) going through yellow, orange, and red on the way to purple on the far right as 100% (extremely alarming). 2-38% is indicated on the bar and is in the yellow to red range, to be interpreted as somewhere between concerning and alarming." />
</figure>

Long COVID (or PCS, Post-COVID Syndrome) refers to symptoms that linger months after initial infection, primarily including **fatigue and respiratory problems**, along with a wide range of other symptoms including pain and cognitive impairment.

There’s a great deal of uncertainty about how to monitor or diagnose long COVID right now. The lowest estimates are around 2%, which is already alarming given that it indicates potential long-term impairments for millions of people worldwide. Other studies show that it may be far more common than that, perhaps as high as 38%![^4]

We do know that **you can develop long COVID even if you’re vaccinated and even if your acute symptoms were only mild**. Based on very rough evidence from previous variants, we estimate that vaccination does reduce risk, but only by about half. (See a [deep-dive analysis by contributor Matt Bell](https://www.mattbell.us/delta-and-long-covid/) for reasoning behind the vaccine estimate).


[^4]: [Short Report on Long COVID](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1007511/S1327_Short_Long_COVID_report.pdf)

For less-vulnerable, vaccinated people, **long COVID is likely a** ***larger*** **source of potential harm than hospitalization or death from acute COVID symptoms**. At this time it’s very hard to quantify that harm, especially for Delta variant cases, and it will likely be several months before we have the data to do so.

With the incomplete information available today, some microCOVID contributors are accepting 2x the infection risk they did prior to being vaccinated, but we are not yet comfortable making this a general recommendation. We expect to have better guidelines in the future as scientific knowledge progresses and we know more about long COVID, communicability, and possible new variants.

## Protecting friends/family/children/strangers

**The Delta variant disproportionately infects unvaccinated people**. Some of these people are children under 12, for whom no vaccine has been authorized yet. Others cannot get vaccinated due to medical factors (like severe allergies, cancer treatment or immune system issues).

If getting vaccinated isn’t an option for them, then the next best way to avoid infecting someone is to avoid getting infected yourself.

You can also encourage the people around you to take simple steps to reduce their own risk. You can:

- help them move gatherings outdoors,
- encourage them to get fully vaccinated, and
- remind them to wear masks indoors (N95, KN95 and surgical masks will protect better than cloth masks, but any mask is better than none).

## Conclusion

We hope this post resolves some of the uncertainty around Delta, or at least gives you sharper boundaries around what is and isn’t currently known. As always, **the goal of microCOVID is to empower people to navigate the pandemic without giving up everything nor taking on more risk than they intended to**.

For those who are interested, the next section will dig into the research studies and decision processes behind the latest updates to the microCOVID model.

----------

# Nitty Gritty: Changes to the microCOVID Model
## Increased Transmissibility

The hourly multiplier for COVID transmission has increased from 9% to 14%. The transmission rate for housemates has increased from 30% to 40%. The transmission rate for partners has increased from 48% to 60%. These increases reflect recent studies demonstrating the R<sub>0</sub> for the Delta variant is substantially higher than for the Alpha[^alpha] variant. 

## Reduced Vaccine Effectiveness Against Infection

Data has shown that vaccines are less effective at preventing symptomatic infection by the Delta variant than they were for the previously predominant Alpha variant. Pfizer/Moderna/Sputnik V have been reduced from a 90% reduction to a 84% reduction. AstraZeneca has been reduced from 60% to 54%. Single doses for all of the above have been reduced from 44% effective to 24%. 

Johnson&Johnson’s single dose vaccine effectiveness reduced from 72% to 64% effective. Johnson and Johnson’s [phase 3 study](https://www.nejm.org/doi/full/10.1056/NEJMoa2101544) included separate data for subtrials run in North America and in South Africa. ~95% of cases in North America were of the original strain, and ~95% of cases in South Africa were of the Beta[^beta] variant. Antibody studies have demonstrated that the Beta variant has achieved equal or greater antibody escape compared the Delta variant. We thus use the J&J vaccine’s efficacy against the Beta variant as a stand-in approximation for its efficacy against the Delta variant while we await publication of [J&J clinical trial data for the Delta variant](https://www.wsj.com/articles/j-j-vaccine-highly-effective-against-delta-variant-in-south-african-trial-11628292645).

Combining the effects of increased transmissibility and reduced vaccine effectiveness against infection, our model says that if you are fully vaccinated with Pfizer/Moderna/Sputnik V, then 60 minutes of exposure to someone infected with the Beta variant is equivalent to 25 minutes of exposure to someone infected with the Delta variant.

[^beta]: Beta is the new name for the B.1.351 variant, also sometimes referred to in the media as the “South Africa variant.”

## I heard that Pfizer’s vaccine is only 64% effective in Israel. Why is microCOVID treating it as 84% effective?

We dug into claims that the [effectiveness of vaccines in Israel is 64%](https://www.gov.il/en/departments/news/06072021-04?fbclid=IwAR2NrFAfFumQumzVW4CBcdGjYf4bPwPUOZOHq6OA21I98wWQZ6nAS850ID8) but had concerns about the methodology. These reports control for “age group (16–24, 25–34, 35–44, 45–54, 55–64, 65–74, 75–84, and ≥85 years), sex, and calendar week” ([Haas et al](https://www.gov.il/BlobFolder/news/06052021-02/ru/NEWS_Corona_lancet-article.pdf)) **but not** **individual behavior**. Since Israel’s policy allows vaccinated individuals to participate in many activities with high risk of exposure (restaurants, movie theaters, etc. without masks), we hypothesize that the 64% effective number captures a combination of reduced efficacy of the vaccine vs the Delta variant AND increased opportunity for exposures.

Therefore, we instead used data from research in the UK that compared # of cases of Delta vs Alpha among vaccinated and unvaccinated individuals, which attempts to assess the vaccines’ efficacy in isolation ([Bernal et al.](https://www.medrxiv.org/content/10.1101/2021.05.22.21257658v1)), ([Stowe et al.](https://khub.net/web/phe-national/public-library/-/document_library/v2WsRK3ZlEig/view_file/479607329?_com_liferay_document_library_web_portlet_DLPortlet_INSTANCE_v2WsRK3ZlEig_redirect=https%3A%2F%2Fkhub.net%3A443%2Fweb%2Fphe-national%2Fpublic-library%2F-%2Fdocument_library%2Fv2WsRK3ZlEig%2Fview%2F479607266)). These studies found 88% vaccine efficacy vs symptomatic COVID, which we adjusted to 84% to account for asymptomatic cases.

[^alpha]: Alpha is the new name for the B.1.1.7 variant, also sometimes referred to in the media as the “UK variant.”
`

export const post = { title, summary, content, author, date, image }
export default post

const title = 'Uncertainty Estimation'
const shortTitle = title
const content = `
_Warning: the entire uncertainty estimation section needs to be revisited for the Delta variant. Proceed with caution._

In this writeup, we've presented individual numbers for all the parameters of our model:
* 30% Activity Risk from a housemate per week, or 48% from a partner
* 6% baseline Activity Risk per hour (indoor, unmasked, undistanced)
* Various multiplicative risk reductions (2x per 3 feet (1 meter), 2x for your mask, 4x for their mask, 20x for outdoors, etc)
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

_Note: This analysis has not been updated to use the new sources from the Jan 2021 masks update._

**Wearer protection:** We use [Chu et al](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext) as the source for our wearer protection data in this model. This study directly measured reduction in coronavirus infections (SARS, MERS, and COVID-19) as a result of mask wearing and other measures. We conservatively use the smaller risk reduction that they report for non-healthcare settings: someone wearing a surgical mask has **0.56x (0.41x to 0.80x, lognormal)** the risk of infection as someone not wearing a mask. The studies in this group were all for SARS. Taking the reciprocal of this, we find the mask provides **1.7x (1.2x to 2.5x, approximately lognormal)** protection. (Our other sources are more optimistic than Chu about the benefit of masks, so it seems sufficiently conservative to only include Chu.)

**Protection to others:** We use the following two studies to estimate uncertainty:

* From [Milton et al.](https://journals.plos.org/plospathogens/article?id=10.1371/journal.ppat.1003205), surgical masks reduced exhaled influenza virus count by **3.3x (1.8x to 6.3x, lognormal)**.
* From [Fischer et al](https://advances.sciencemag.org/content/early/2020/08/07/sciadv.abd3083), we take droplet counts that were produced in different trials by the same speaker when speaking through the four different cotton masks that were tested, as well as no mask. Averaging the droplet counts through the four cotton masks and dividing by the droplet count with no mask, we find a **5.3x (2.9x to 8.7x)** reduction. We acknowledge that droplet count is not the same as virus count which is not the same as risk of infection, but we think the one is a reasonable proxy for the other.
* Averaging these two estimates, we get a source control factor of **4.4x (2.9x to 6.7x)**.

Note: we also cite [Davies et al.](https://www.researchgate.net/publication/258525804_Testing_the_Efficacy_of_Homemade_Masks_Would_They_Protect_in_an_Influenza_Pandemic) as a data source, but they do not state clear error bounds.

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
`

const post = { title, shortTitle, content }

export default post

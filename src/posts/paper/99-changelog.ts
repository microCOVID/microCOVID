const title = 'Calculator Changelog'
const shortTitle = 'Changelog'

interface Change {
  date: Date
  content: string
}

const changes: Change[] = [
  {
    date: new Date(2021, 5, 27),
    content: `
* Updated constants for under-reporting factor
  * New numbers from [COVID 19 Projections](https://covid19-projections.com/estimating-true-infections-revisited/) December 2020 update.
  * Results in slightly lower prevalence estimates.`,
  },
  {
    date: new Date(2021, 3, 10),
    content: `
* Added Gamelaya Research's Sputnik V vaccine to the calculator. See the [Research Sources](/paper/14-research-sources#sputnik-v-gamelaya-research) section of the White Paper for details.`,
  },
  {
    date: new Date(2021, 2, 30),
    content: `
* Vaccine updates: 
  * Added support for Johnson & Johnson's vaccine (single dose, 1/3 multiplier).
  * Improved multiplier for Moderna and Pfizer's vaccines (0.2 -> 0.1) based on new data.
  * Increase wait time before getting the effects of a vaccine (7 -> 14 days). This matches Moderna / AstraZenica / Johnson & Johnson (Pfizer's was the only study that used 7 days).
  * See [Research Sources](/paper/14-research-sources#vaccines) for rationale.`,
  },
  {
    date: new Date(2021, 2, 16),
    content: `
* The latest version of the [Risk Tracker](/tracker) now supports modeling the risk of someone you are seeing who is vaccinated.`,
  },
  {
    date: new Date(2021, 1, 21),
    content: `
* Added precaution for being vaccinated. See paper [Q&A](/paper/13-1-and-a#vaccines-qa) and [Research Sources](/paper/14-research-sources#vaccines) for details.
* Note: vaccines also reduce the risk of people who you interact with, we just haven't implemented this yet.`,
  },
  {
    date: new Date(2021, 1, 2),
    content: `
* Remove "frontline worker", "healthcare worker", and "works from home" person risk categories.
* Remove the "Intermediate Method" from the white paper. You can read more about [our rationale for this change](/paper/13-q-and-a#are-people-who-work-outside-the-home-riskier-than-people-who-work-from-home).`,
  },
  {
    date: new Date(2021, 0, 28),
    content: `
* Created new mask categories and updated multipliers for mask types. See [the Masks section of Research Sources](/paper/14-research-sources#masks) in the White Paper for details.`,
  },
  {
    date: new Date(2021, 0, 5),
    content: `
* Increased One-time interraction transmission rate from 6% to 9% to account for more contagious COVID variant B117. See [blog post](/blog/b117) for details.`,
  },
  {
    date: new Date(2021, 0, 2), // Month is 0 indexed
    content: `
 * Re-labeled "frontline worker" to "healthcare + social worker".
 * Reduced risk of healthcare + social workers to 2x average (previously 3x).
 * Re-labeled "Not an essential or front-line worker" to "a person who works from home."
 * Note This recategorizes people who work outside the home but *not* in healthcare/social work settings as "An average person in your area."`,
  },
  {
    date: new Date(2020, 11, 19),
    content: `
 * Fixed a bug in which many counties were getting the state's positive test ratio instead of the counties.
 * Updated to COVID Act Now's v2 API, allowing positive test rates to sync again.`,
  },
  {
    date: new Date(2020, 11, 13),
    content: `
* Replaced logic for under-reporting factor, resulting in significantly lower prevalence estimations.
* Previous logic: 6x for positive test rate under 5%, 8x for 5%-15%, 10x for above 15%.
* New logic from [COVID 19 Projections](https://covid19-projections.com/estimating-true-infections-revisited/)
* See [Research Sources](/paper/14-research-sources#basic-method-underreporting-factor) for more details.`,
  },
]

export const lastUpdated = changes[0].date

const content = changes
  .map((change) => {
    return `
## ${change.date.toLocaleDateString()}
${change.content}`
  })
  .join('\n\n')

export const post = { title, shortTitle, content }
export default post

const title = 'Calculator Changelog'
const shortTitle = 'Changelog'

interface Change {
  date: Date
  content: string
}

const changes: Change[] = [
  {
    date: new Date(2021, 0, 2), // Month is 0 indexed
    content: `
 * Re-labeled "frontline worker" to "healthcare + social worker".
 * Reduced risk of healthcare + social workers to 2x average (previously 3x).
 * Re-labeled "Not an essential or front-line worker" to "a person who works from home."
 * Note This recategorizes people who work outside the home but *not* in healtcare/social work settings as "An average person in your area."
 * See revised [Intermediate Method](/paper/8-intermediate-method) for rationale.
    `,
  },
  {
    date: new Date(2020, 11, 19),
    content: `
 * Fixed a bug in which many counties were getting the state's positive test ratio instead of the counties.
 * Updated to COVID Act Now's v2 API, allowing positive test rates to sync again.
    `,
  },
  {
    date: new Date(2020, 11, 13),
    content: `
* Replaced logic for under-reporting factor, resulting in significantly lower prevalence estimations.
  * Previous logic: 6x for positive test rate under 5%, 8x for 5%-15%, 10x for above 15%.
  * New logic from [COVID 19 Projections](https://covid19-projections.com/estimating-true-infections-revisited/)
  * See [Research Sources](/paper/14-research-sources#basic-method-underreporting-factor) for more details.
`,
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

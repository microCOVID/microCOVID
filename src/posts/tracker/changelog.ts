const title = 'Risk Tracker Changelog'
const shortTitle = 'Changelog'

interface Change {
  date: Date
  title?: string
  versionNum?: string
  linkToCurrentSpreadsheet?: string
  whatsNew?: string
  instructions?: string
}

const changes: Change[] = [
  {
    date: new Date(2021, 6, 26),
    whatsNew: `
* Updated transmission and vaccine numbers for Delta variant:
  |                         | Previous   | Delta Variant  |
  | ----------------------- | ---------- | -------------- |
  | Hourly Multiplier       |  9%        | 14%            |
  | Housemate               |  30%       | 40%            |
  | Partner                 |  48%       | 60%            |
  | J&J                     |  .34       | .36            |
  | AstraZeneca             |  .4        | .47            |
  | AstraZeneca Single Dose |  .56       | 0.76           |
  | Pfizer/Moderna          |  .1        | 0.17           |
  | Pfizer/Moderna Single   |  .56       | 0.76           |
* See [blog post](/blog/delta) or [Research Sources](/paper/14-research-sources#delta-variant) for more details.
`,
  },
  {
    date: new Date(2021, 7, 18),
    title: 'Add “average vaccinated person”',
    versionNum: '2.3',
    linkToCurrentSpreadsheet:
      'https://docs.google.com/spreadsheets/d/1nlCE-WVIzMEzf9fESE9mD46OIDGnz9yyKTtm49YG2rw/edit',
    whatsNew: `
* Adds “Avg local resident (vaccinated)” and “Avg local resident (unvaccinated)” as risk profiles you can select.`,
    instructions: `
1. **INTERNAL_PERSON sheet**
    * Highlight and *copy* all 4 of these cells (in the table below)
    * Click on cell \`B9\` and press *paste*
      | Column B                              | Coulmn C    |
      | ------------------------------------- | ----------- |
      | Avg local resident (vaccinated)       |  \`=1000000*VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 3, FALSE)\`  |
      | Avg local resident (unvaccinated)     |  \`=1000000*VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 2, FALSE)\`  |
2. **Pod Overview sheet:**
    * Update your version number in cell \`D2\` to 2.3
3. (Optional, most people can disregard this step) If you care about being able to easily read the % prevalence numbers, then do the following in the 📍 Locations sheet
    * Change cell F5 to be Unvaccinated average prevalence
    * Change cell G5 to be Vaccinated average prevalence
    * Highlight cell F6 through cell G30. On the toolbar, click the % button to change the formatting to percentages, so you can read the data in those cells.
`,
  },
]

export const lastUpdated = changes[0].date

// TODO(blanchardjeremy): Add a link to subscribe for updates at the top of this page
const content = changes
  .map((change) => {
    let markdownContent = `## ${change.date.toLocaleDateString()}`
    if (change.versionNum) {
      markdownContent += ` (v${change.versionNum})`
    }
    if (change.title) {
      markdownContent += `: ${change.title}`
    }
    markdownContent += '\n'
    if (change.linkToCurrentSpreadsheet) {
      if (change.versionNum) {
        markdownContent += `[Direct link to v${change.versionNum} of the spreadsheet](${change.linkToCurrentSpreadsheet})\n\n`
      } else {
        markdownContent += `[Direct link to this version of the spreadsheet](${change.linkToCurrentSpreadsheet})\n\n`
      }
    }
    if (change.whatsNew) {
      markdownContent += `${change.whatsNew}\n\n`
    }
    if (change.instructions) {
      markdownContent += `**Instructions to manually apply these changes:**\n${change.instructions}\n\n`
    }
    return markdownContent
  })
  .join('\n\n')

export const post = { title, shortTitle, content }
export default post

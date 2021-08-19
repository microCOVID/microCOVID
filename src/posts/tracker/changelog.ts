import { mailchimpSubscribeUrl } from "components/RiskTrackerUtil"

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
    * Change cell \`F5\` to be Unvaccinated average prevalence
    * Change cell \`G5\` to be Vaccinated average prevalence
    * Highlight cell \`F6\` through cell \`G30\`. On the toolbar, click the % button to change the formatting to percentages, so you can read the data in those cells.
`,
  },
  {
    date: new Date(2021, 6, 26),
    title: 'Delta updates',
    whatsNew: `
The spreadsheet automatically pulls data on transmission rates and vaccine effectiveness from the website. So when we published the updates for the Delta variant, all spreadsheet users automatically got the update.


* [See our blog post on the Delta variant](https://www.microcovid.org/blog/delta)
* [See techinical details](https://www.microcovid.org/paper/changelog#7262021)`,
  },
  {
    date: new Date(2021, 4, 28),
    title: 'Update true infections model & fix budget calculation',
    versionNum: '2.2.5',
    linkToCurrentSpreadsheet:
      'https://docs.google.com/spreadsheets/d/1HefpIbpD4HIqCzJYJex3_ydZ1j-vWZLI2ksouH0Jbco/edit',
    whatsNew: `
* Fixed a bug where budgets were over-estimated using an 8-day time frame instead of a 7-day timeframe.
* For manual location data: Update the “adjusted prevalence” formula to match the [December 10, 2020 updates](https://covid19-projections.com/estimating-true-infections-revisited/).`,
    instructions: `
1. **Pod Overview sheet:**
    * Change the cell \`C125\` to **7**. (It was previously set to 8). To see row 125, you may need to press the plus button to the left of row 120.
2. **Locations sheet**
    * This change is only relevant if you’re using manual data entry for locations. (Most people are not.)
    * Paste into \`M35\` and drag through the end of the column:
      <pre><code>=IF(K35, (1000 / (DAYS(TODAY(), DAY_0) + 10)) * POWER(IF(OR(I35 >= 0, I35 <= 1), I35, 1), 0.5) + 2, )</code></pre>
3. **Pod Overview sheet:**
    * Update your version number in cell \`D2\` to **2.2.5**
`,
  },
]

export const lastUpdated = changes[0].date

let content = `See below for each update that has been made to the [Risk Tracker](/tracker) spreadsheet and instructions for how to migrate your copy of the spreadsheet with the latest changes. [Click here to subscribe for notifications about Risk Tracker version updates](${mailchimpSubscribeUrl}). If you have any questions, you can email [tracker@microcovid.org](mailto:tracker@microcovid.org).\n\n`

content += changes
  .map((change) => {
    // Title
    // NOTE: If you change the title format, you will likely break the anchor tags on each heading, which may be linked to elsewhere in the system
    let markdownContent = `## ${change.date.toLocaleDateString()}`
    if (change.versionNum) {
      markdownContent += ` (v${change.versionNum})`
    }
    if (change.title) {
      markdownContent += `: ${change.title}`
    }
    markdownContent += '\n'

    // Link
    if (change.linkToCurrentSpreadsheet) {
      if (change.versionNum) {
        markdownContent += `[Direct link to v${change.versionNum} of the spreadsheet](${change.linkToCurrentSpreadsheet})\n\n`
      } else {
        markdownContent += `[Direct link to this version of the spreadsheet](${change.linkToCurrentSpreadsheet})\n\n`
      }
    }

    // What's new
    if (change.whatsNew) {
      markdownContent += `${change.whatsNew}\n\n`
    }

    // Instructions to migrate
    if (change.instructions) {
      markdownContent += `**Instructions to manually update your copy of the spreadsheet:**\n${change.instructions}\n\n`
    }

    return markdownContent
  })
  .join('\n\n')

export const post = { title, shortTitle, content }
export default post

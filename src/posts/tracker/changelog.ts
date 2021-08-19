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
]

export const lastUpdated = changes[0].date

let content = `[Click here to subscribe for notifications about Risk Tracker version updates](${mailchimpSubscribeUrl}).  If you have any questions, you can email [tracker@microcovid.org](mailto:tracker@microcovid.org).\n\n`

content += changes
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
      markdownContent += `**Instructions to manually update your copy of the spreadsheet:**\n${change.instructions}\n\n`
    }
    return markdownContent
  })
  .join('\n\n')

export const post = { title, shortTitle, content }
export default post

export const mailchimpSubscribe = 'http://eepurl.com/hb6y4T'

const title = 'Risk Tracker Changelog'
const shortTitle = 'Changelog'

interface Change {
  date: Date
  versionNum?: string
  title?: string
  spreadsheetURL?: string
  whatsNew: string
  instructions?: string
}

// NOTE: Do not include '/edit' at the end of the URL, because we append different paths like /copy or /template/preview depending on the use case. Do not include a slash at the end of the URL.

const changes: Change[] = [
  {
    date: new Date(2021, 8, 7),
    versionNum: '2.4',
    title: 'Increase podmate budgets if everyone is vaccinated',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1Es4ZzLlNiBSxG5jJsGPUYewrCw2NqB5kDXlNfmdSdD0',
    whatsNew: `
* New: Increase individual budgets if everyone in the pod is vaccinated since household transmission is less likely. Follows the [formula outlined here](/paper/13-q-and-a#2-if-a-vaccinated-individual-contracts-covid-how-much-less-or-more-likely-is-this-to-result-in-negative-consequences-increased-budget). ([#1013](https://github.com/microCOVID/microCOVID/issues/1013))
* New: Activity Risk now caps at the partner level (60%) instead of the housemate level (40%). ([#1012](https://github.com/microCOVID/microCOVID/issues/1012))
* Bugfix: Handles the case where we don't have vaccination data for a location, and the users selects "Avg local resident (vaccinated)" as the risk profile. ([#1037](https://github.com/microCOVID/microCOVID/issues/1037))
* Bugfix: Corrects the name of the *HEPA filter* location type to include "per hour". ([#968](https://github.com/microCOVID/microCOVID/issues/968))
* Bugfix: Now correctly ignores "environment" when distance is set to "close" ([#1033](https://github.com/microCOVID/microCOVID/issues/1033))

**Note on how the vaccination budget adjustment works:** This feature reduces the impact of other podmate's activities on each persons' budget, since transmission is lower between podmates now that you are all vaccinated. If some people in the pod are not vaccinated or received different types of vaccines, you have two main options. Let these two examples illustrate.
  * **Example A:** 5 podmates got Pfizer and 1 got J&J. The pod has a 1% annual risk budget. The person who got J&J doesn't mind being exposed to a bit more than 1% per year. So we set this setting to "Pfizer" because most people got Pfizer. This will set individual budgets that, if completely used, will put the housemate with J&J at above 1% risk of getting COVID. In this particular scenario, the podmate with the J&J vaccine may be exposed to up to a 0.07% chance of getting COVID per year.
  * **Example B:** 5 podmates got Pfizer and 1 got J&J. The pod has a 1% annual risk budget. The person who got J&J definitely wants to stay under the 1% total budget. Therefore, the pod chooses "Johnson & Johnson" for this setting. Everyone doesn't get as much of an increase to their budget, but you all stay under the 1% annual budget.

`,
    instructions: `
1. **Bugfix to clarify HEPA filter paramters**
    1. Go to *Edit > Find & Replace* (it doesn't matter what sheet you are currently viewing)
    1. Under **Find** enter: \`flow rate 5x room size\`
    1. Under **Replace** enter: \`flow rate 5x room size per hour\`
    1. Click **Replace all**
    1. Reminder, we have a [air flow calculator](/blog/hepafilters) to determine the flow rate of you air purifier.
1. **Adjusting Activity Risk cap to "Partner" level (60%)**
    1. Go to *Edit > Find & Replace* (it doesn't matter what sheet you are currently viewing)
    1. Under **Find** enter:
        <pre><code>IF\\(([a-zA-Z]+\\d+)<>ACTIVITY_TITLE_ONE_TIME, 1E\\+99,[ \\n]*IF\\(OR\\(([a-zA-Z]+\\d+)=ACTIVITY_TITLE_KISSING,[ \\n]*([a-zA-Z]+\\d+)=ACTIVITY_TITLE_CUDDLING\\),[ \\n]*INTERNAL_ACTIVITY!\\$B\\$4,[ \\n]*INTERNAL_ACTIVITY!\\$B\\$3[ \\n]*\\)\\)</code></pre>
    1. Under **Replace** enter:
        <pre><code>PARTNER</code></pre>
    1. The **Search using regular expressions** checkbox should be checked
    1. The **Also search withing formulas** checkbox should be checked
    1. Click **Replace all**. When prompted if you are sure you want to replace all values in all sheets, click **Ok**. (It may take a 10+ seconds to complete. If it was successful, you will see *Replaced 100+ instances of...*)
1. **Bugfix for distance set to "close"**
    1. Go to *Edit > Find & Replace* (it doesn't matter what sheet you are currently viewing)
    1. Under **Find** enter:
        <pre><code>AND\\(([a-zA-Z]+\\d+)=ACTIVITY_TITLE_CUDDLING,[ \\n]*([a-zA-Z]+\\d+)=ACTIVITY_TITLE_OUTDOOR\\)</code></pre>
    1. Under **Replace** enter:
        <pre><code>$1=ACTIVITY_TITLE_CUDDLING</code></pre>
    1. The **Search using regular expressions** checkbox should be checked
    1. The **Also search withing formulas** checkbox should be checked
    1. Click **Replace all**. When prompted if you are sure you want to replace all values in all sheets, click **Ok**. (It may take a 10+ seconds to complete. If it was successful, you will see *Replaced 100+ instances of...*)
1. **Bugfix for "Avg local resident (vaccinated)" in locations without vaccinations data**
    1. Go to *Edit > Find & Replace* (it doesn't matter what sheet you are currently viewing)
    1. Under **Find** enter:
        <pre><code>=IF\\(ISTEXT\\(([a-zA-Z]+(\\d+))\\), "",[\\n ]+IF\\([\\n ]+ISNUMBER\\(([\\w\\W]*)</code></pre>
    1. Under **Replace** enter:
        <pre><code>=IF(ISTEXT($1), "", IF(AND(OR(T$2="Avg local resident (vaccinated)", T$2="Avg local resident (unvaccinated)"), REGEXMATCH(TO_TEXT(VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 3, FALSE)), "Unknown")), "Error: Vaccination data not available in your region. Please use the 'Avg local resident' risk profile instead", IF(ISNUMBER($3)</code></pre>
    1. The **Search using regular expressions** checkbox should be checked
    1. The **Also search withing formulas** checkbox should be checked
    1. Click **Replace all**. When prompted if you are sure you want to replace all values in all sheets, click **Ok**. (It may take a 10+ seconds to complete. If it was successful, you will see *Replaced 100+ instances of...*)
    1. In the **Activity Log** sheet, click on Column N (to highlight the whole column) an go to *Format > Text wrapping > Wrap*. Repeat for the **Custom People** sheet.
    1. In the **INTERNAL_PERSON** sheet, click on cell \`B9\` and press *paste*
      <table style="border: 1px solid #b4bcc2;">
        <tr><td>Avg local resident (vaccinated)</td>    <td><code>=IF(VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 3, FALSE)="Unknown", "Vaccination data not available in your region, use avg local resident profile instead", 1000000*VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 3, FALSE))</code></td></tr>
        <tr><td>Avg local resident (unvaccinated)</td>    <td><code>=IF(VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 2, FALSE)="Unknown", "Vaccination data not available in your region, use avg local resident profile instead", 1000000*VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 2, FALSE))</code></td></tr>
      </table>
1. **Pod Overview sheet:**
    1. Open the [current spreadsheet](https://docs.google.com/spreadsheets/d/1Es4ZzLlNiBSxG5jJsGPUYewrCw2NqB5kDXlNfmdSdD0) and copy all of \`Row 104\` (Where it says "Adjust budget as though everyone were fully vaccinated with...") to \`Row 104\` in your spreadsheet.
    1. Click on \`C104\` then go to *Data > Data validation*. Under *Criteria* set the range to \`=INTERNAL_ACTIVITY!$I$19:$I$32\` then press *Save*.
    1. In cell \`C124\` to be
      <pre><code>=C123/(1+(C122-1)*HOUSEMATE*D104)</code></pre>
    1. Update your version number in cell \`D2\` to **2.4**
`,
  },
  {
    date: new Date(2021, 7, 18),
    versionNum: '2.3',
    title: 'Add “average vaccinated person”',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1nlCE-WVIzMEzf9fESE9mD46OIDGnz9yyKTtm49YG2rw',
    whatsNew: `
* Adds “Avg local resident (vaccinated)” and “Avg local resident (unvaccinated)” as risk profiles you can select.`,
    instructions: `
1. **INTERNAL_PERSON sheet**
    * Highlight and *copy* all 4 of these cells (in the table below)
    * Click on cell \`B9\` and press *paste*
      <table style="border: 1px solid #b4bcc2;">
        <tr><td>Avg local resident (vaccinated)</td>    <td><code>=1000000*VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 3, FALSE)</code></td></tr>
        <tr><td>Avg local resident (unvaccinated)</td>    <td><code>=1000000*VLOOKUP(PREVALENCE_LOCAL_NAME, LOCATION_TABLE_COMPLETE, 2, FALSE)</code></td></tr>
      </table>
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


* [See our blog post on the Delta variant](/blog/delta)
* [See technical details](/paper/changelog#7262021)`,
  },
  {
    date: new Date(2021, 4, 28),
    versionNum: '2.2.5',
    title: 'Update true infections model & fix budget calculation',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1HefpIbpD4HIqCzJYJex3_ydZ1j-vWZLI2ksouH0Jbco',
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
  {
    date: new Date(2021, 4, 12),
    versionNum: '2.2.4',
    title:
      'Bugfix - vaccine multiplier not applying properly to some activities',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1ivoRA8fFGKwm-XoflKFKeWIpRQJVpTFP6W1KN45_tSs',
    whatsNew: `
* Fixed a bug in the custom people tab where vaccine multiplier wouldn’t apply to every activity row if there was a 0% activity risk`,
    instructions: `
1. **Custom People sheet**
    * Press the plus button above column B to show the hidden columns.
    * Paste into \`L3\` and drag through the end of the column:
        <pre><code>=IF(ISTEXT(P3), ROW(), IF(ISNUMBER(E3), MAX(FILTER(L$3:L, L$3:L&lt;ROW(), ISNUMBER(L$3:L))), ""))</pre></code>
    * Press the minus button above column B to hide the extra columns. \
2. **Pod Overview sheet:**
    * Update your version number in cell \`D2\` to **2.2.4**
`,
  },
  {
    date: new Date(2021, 3, 1),
    versionNum: '2.2.3',
    title: 'Bugfix - Vaccine time to effectiveness',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1W3_RxaLrqILJae6Uw-I1D9opP5tKVA694OhdGusNwMs',
    whatsNew: `
* Changed delay for getting benefits of a vaccine dose to 14 days, consistent with AZ, J&J, and Moderna studies.
* (Also, you’ll see the new [Johnson & Johnson vaccine numbers](/paper/13-q-and-a#vaccines-qa) have been automatically added to your spreadsheet since the last release. No action needed.)
`,
    instructions: `
1. **Custom People sheet**
    * Paste into \`J3\` and drag through the end of the column:
        <pre><code>=IF(L3&lt;&gt;"", IF(Q3="", COUNTIF(H3:I3, "&lt;"&TODAY() - 14), COUNTIF(H3:I3, "&lt;"&Q3-14)), )</pre></code>
2. **Activity Log sheet**
    * Repeat same step as above
3. **Pod Overview sheet:**
    * Update your version number in cell \`D2\` to **2.2.3**
`,
  },
  {
    date: new Date(2021, 2, 29),
    versionNum: '2.2.2',
    title: 'Bugfix - Kissing',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1aCj6tkxC70sT9WBwLjBYFxbr_eLbAv8FPF-fjrBtdaU',
    whatsNew: `
* Fixed a bug with kissing receiving a 30% activity risk cap (now 48% as intended)
* Matched hourly rate for kissing to Calculator (5x normal rate vs 2x)    
`,
    instructions: `
1. **Activity Log:**
    * Paste the following into \`F3\` and drag through the end of the column. (You must press the + button above column B to see column F.)
        <pre><code>=IF(
        OR(
          X3="",
          AND(
          X3=ACTIVITY_TITLE_ONE_TIME,
          Y3="", Z3=""
          )
        ), "",
        MIN(
        IF(X3&lt;&gt;ACTIVITY_TITLE_ONE_TIME, 1E+99,
        IF(OR(AD3=ACTIVITY_TITLE_KISSING, AD3=ACTIVITY_TITLE_CUDDLING),
            INTERNAL_ACTIVITY!$B$4,
            INTERNAL_ACTIVITY!$B$3
        )),
        VLOOKUP(X3, ACTIVITY_RISK_TABLE_INTERACTION, 2, FALSE)
        *IF(
        X3&lt;&gt;ACTIVITY_TITLE_ONE_TIME, 1,
        IF(AD3=ACTIVITY_TITLE_KISSING,
        MAX(1, (Y3+Z3/60)),
        (Y3+Z3/60))
        *IF(OR(AA3="", AD3=ACTIVITY_TITLE_KISSING), 1,
            VLOOKUP(
              IF(AND(AD3=ACTIVITY_TITLE_CUDDLING,
                    AA3=ACTIVITY_TITLE_OUTDOOR),
                ACTIVITY_TITLE_INDOOR,
                AA3),
        ACTIVITY_RISK_TABLE_ENVIRONMENT, 2, FALSE))
        *IF(AD3=ACTIVITY_TITLE_KISSING, 1, 
        IF(AE3="", 1,
            VLOOKUP(AE3, ACTIVITY_RISK_TABLE_VOICE, 2, FALSE))
        *IF(AB3="", 1, 
            VLOOKUP(AB3, ACTIVITY_RISK_TABLE_MASK, 2, FALSE))
        *IF(AC3="", 1,
            VLOOKUP(AC3, ACTIVITY_RISK_TABLE_MASK, 3, FALSE)))
        *IF(AD3="", 1,
            VLOOKUP(AD3, ACTIVITY_RISK_TABLE_DISTANCES, 2, FALSE))
        )))</pre></code>
2. **Custom People:**
    * Paste the following into \`F3\` and drag through the end of the column: (You must press the + button above column B to see column F.)
    <pre><code>=IF(
    OR(
      X3="",
      AND(
      X3=ACTIVITY_TITLE_ONE_TIME,
      Y3="", Z3=""
      )
    ), "",
    MIN(
    IF(X3&lt;&gt;ACTIVITY_TITLE_ONE_TIME, 1E+99,
    IF(OR(AD3=ACTIVITY_TITLE_KISSING, AD3=ACTIVITY_TITLE_CUDDLING),
        INTERNAL_ACTIVITY!$B$4,
        INTERNAL_ACTIVITY!$B$3
    )),
    VLOOKUP(X3, ACTIVITY_RISK_TABLE_INTERACTION, 2, FALSE)
    *IF(
    X3&lt;&gt;ACTIVITY_TITLE_ONE_TIME, 1,
    IF(AD3=ACTIVITY_TITLE_KISSING,
    MAX(1, (Y3+Z3/60)),
    (Y3+Z3/60))
    *IF(OR(AA3="", AD3=ACTIVITY_TITLE_KISSING), 1,
        VLOOKUP(
          IF(AND(AD3=ACTIVITY_TITLE_CUDDLING,
                AA3=ACTIVITY_TITLE_OUTDOOR),
            ACTIVITY_TITLE_ALMOST_OUTDOOR,
            AA3),
    ACTIVITY_RISK_TABLE_ENVIRONMENT, 2, FALSE))
    *IF(AE3="", 1,
        VLOOKUP(AE3, ACTIVITY_RISK_TABLE_VOICE, 2, FALSE))
    *IF(AB3="", 1, 
        VLOOKUP(AB3, ACTIVITY_RISK_TABLE_MASK, 2, FALSE))
    *IF(AC3="", 1,
        VLOOKUP(AC3, ACTIVITY_RISK_TABLE_MASK, 3, FALSE))
    *IF(AD3="", 1,
        VLOOKUP(AD3, ACTIVITY_RISK_TABLE_DISTANCES, 2, FALSE))
    )))</pre></code>
3.  **INTERNAL_ACTIVITY:**
    * Change cell \`F23\` from **2** to **5**
4.  **Pod Overview:**
    * Update your version number in cell \`D2\` to **2.2.2**
`,
  },
  {
    date: new Date(2021, 2, 18),
    versionNum: '2.2.1',
    title: 'Bug fixes',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1lFM0di7j4MaGXbUzbe6GYNeigK1qyl0xuvSxlfIO1us',
    whatsNew: `
* Fixed a bug that caused vaccines to show up under the wrong podmate in some conditions
* Fixed a bug in the Risk to Others Forecast that was showing an erroneously large number
* Changed the way version number comparison is checked
`,
    instructions: `
1. **Activity Log:**
    * Paste the following into G3 and drag through the end of the column:
        <pre><code>=IF(L3&lt;&gt;"", IF($P3="", HLOOKUP($L3, '📊 Pod Overview'!$C$20:$X$28, 7, FALSE), HLOOKUP($P3, '📊 Pod Overview'!$C$20:$X$28, 7, FALSE)), )</pre></code>
    * Paste the following into H3 and drag through the end of the column:
        <pre><code>=IF(L3&lt;&gt;"", IF($P3="", HLOOKUP($L3, '📊 Pod Overview'!$C$20:$X$28, 8, FALSE), HLOOKUP($P3, '📊 Pod Overview'!$C$20:$X$28, 7, FALSE)), )</pre></code>
    * Paste the following into I3 and drag through the end of the column
        <pre><code>=IF(L3&lt;&gt;"", IF($P3="", HLOOKUP($L3, '📊 Pod Overview'!$C$20:$X$28, 9, FALSE), HLOOKUP($P3, '📊 Pod Overview'!$C$20:$X$28, 7, FALSE)), )</pre></code>
2. **Pod Overview:**
    * Paste the following into C81 (hidden by default in the “← Click plus button to show Risk to Others forecast” expandable section).
        <pre><code>=IF(NOT(ISTEXT(C$57)), , 
          computeCustomPersonOnDate(INDIRECT("📋 Activity Log!B"&C$23&":B"&C$24-1), INDIRECT("📋 Activity Log!Q"&C$23&":Q"&C$24-1), 2, -1,$B81) 
        )</pre></code>
    * Drag this through entire section (C81:X100)
    * Edit cell E2 (which appears to be blank but has a formula in it) to be:
        <pre><code>=IF(D2&lt;&gt;D3, HYPERLINK("https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8", "NOTICE: Your spreadsheet is behind the latest version. Please click here for upgrade instructions."), )</pre></code>
    * Update your version number in cell \`D2\` to **2.2.1**
`,
  },
  {
    date: new Date(2021, 2, 16),
    versionNum: '2.2',
    title: 'Vaccines! 🎉 (& additional decay updates)',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1aCj6tkxC70sT9WBwLjBYFxbr_eLbAv8FPF-fjrBtdaU',
    whatsNew: `
* **_Vaccines are now supported_** for Pod Members and Custom People! 🎉
    * You can read more in the [White Paper explanation of vaccines](/paper/13-q-and-a#vaccines-qa)
    * Pod Members’ vaccines are set from the pod overview sheet
    * Custom People’s vaccines are set in column AF-AH of the Custom People sheet
    * Vaccines require a date for each dose and the brand of vaccine. Risk reduction is calculated individually for each day to maintain integrity of the log from before vaccination.
    * If you don’t know the vaccine date or type, you can select “Unknown vaccine, unknown date” and the system will automatically apply the lowest efficacy vaccine.
* The vaccine efficacy multipliers and “interaction type” multipliers (one-time/housemate/partner) are automatically imported from the microCOVID website, so we can easily update them as new information becomes available.
* Your Risk to Others for the last 7 days and next 14 days can be displayed (expandable in the Pod Overview sheet)
* Risk from custom people’s activities on a specific date is calculated as of the day you saw them.
* Removed the “health care or social worker” and “works from home” person types.  [See our rationale for this change here](/paper/13-q-and-a#are-people-who-work-outside-the-home-riskier-than-people-who-work-from-home).
`,
    instructions: `
_Since this is such a large change, these instructions show you how to make a new copy of the spreadsheet and migrate your data over to it._

_Steps_
    
1. **Make a copy** of the [latest version of the spreadsheet](https://docs.google.com/spreadsheets/d/1aCj6tkxC70sT9WBwLjBYFxbr_eLbAv8FPF-fjrBtdaU#gid=1845362878)
2. **Podmate names:** Copy-paste the names of each of your podmates (Pod Overview > row 20)
3. **Locations:** Copy-paste your location settings. (Location > B6 through E26)
4. **Custom People data:** Copy-paste the columns from your Custom People sheet (from “Is this a generic person profile that should be adjustable by location?” to “Volume”)
5. **Activity Log data:** Copy-paste the columns from your Activity Log  (from “Podmate Name” to “Volume”)
6. Delete your old spreadsheet (File > Move to trash). (Or alternately, you can rename it and make it clear to anyone who opens it that they should go to the new copy.)
7. Notify all your podmates of the new URL.

_Less common settings you may also want to migrate:_

1. Copy-paste your risk budget choice (if it’s something other than default).
2. Copy-paste each of your shared budget reductions (Pod Overview > rows 65-63)

_Note: Known Issue with vaccines:_ The vaccine logic will apply your vaccination bonus to your interactions with your podmates slightly before what is strictly accurate (starting 7 days after your vaccination, the sheet will retroactively apply the vaccination multiplier to current microCOVIDs from housemates). The fix for this is too complicated to be deemed worthwhile.
* Example: a housemate who gets 100microCOVIDs 6 days after your vaccination will, 8 days after your vaccination, show up as 100 * .3 * .5 * .56 = 8.6 microCOVID instead of 100 * .3 * .5 = 15 microCOVID
* Workaround: If you must avoid under-reporting at all costs, enter the date of your vaccine 1 week later than you actually received it.

`,
  },
  {
    date: new Date(2021, 1, 15),
    versionNum: '2.1',
    title: 'Manually enter person risk number',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1-IEwUHHC-V8yzA4R6cShxlev63Ykm0uK61GUL_IynmA',
    whatsNew: `
* If you know the microCOVID score of the person you’re seeing, you can enter it directly into the “Risk profile” column (instead of selecting an item from the dropdown)
`,
    instructions: `
1. In the **Pod Activity** Log sheet, press the **+** button on top column B to show the hidden formula columns. 
2. Edit cell \`E3\` to contain the following
    <pre><code>=IF(O3="","",
    IF(ISNUMBER(O3), O3,
    MAX(
      ARBITRARY_MIN_PERSON_RISK, 
      VLOOKUP(O3, PEOPLE_TABLE, 2, FALSE)
      *IF(OR(P3="", VLOOKUP(O3, PEOPLE_TABLE, 3, FALSE)),
          1 + N("Correct for non-default locations"), 
          VLOOKUP(P3, LOCATION_TABLE, 2, FALSE) /PREVALENCE_LOCAL)
      /MAX(N("Remove delay factor for past weeks"),
            IF(AND(ISDATE(L3), L3&lt;=LOCATION_DATA_DATE_LAST_UPDATED), VLOOKUP(IF(ISBLANK(P3), PREVALENCE_LOCAL_NAME, P3), LOCATION_TABLE_COMPLETE, 8, FALSE), 1),
            1)
      *IF(Q3,SYMPTOMS_NONE_NOW,1))
    ))</pre></code>
3. Drag \`E3\` down to the bottom of the column.
4. Press the **+** button above Column B again to hide the formula columns.
5. Repeat steps 1-4 in the Custom Person sheet.
6. On the **Pod Overview sheet**, change the version number to **2.1**
`,
  },
  {
    date: new Date(2021, 0, 31),
    versionNum: '2.0',
    title: 'Version 2.0 release 🎉',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1-IEwUHHC-V8yzA4R6cShxlev63Ykm0uK61GUL_IynmA',
    whatsNew: `
* [Read the full details for this release on our blog](/blog/budget)
`,
    instructions: `
**Upgrade note:** It’s not possible to migrate your spreadsheet to version 2.  The easiest option is to make a copy of the current version and begin logging your activities there. Future updates will come with migration instructions.
`,
  },
  {
    date: new Date(2021, 0, 31),
    title: 'Version 1 is being retired',
    spreadsheetURL:
      'https://docs.google.com/spreadsheets/d/1-IEwUHHC-V8yzA4R6cShxlev63Ykm0uK61GUL_IynmA',
    whatsNew: `
Now that we’re launching [version 2 of the Risk Tracker spreadsheet](/tracker), we are retiring version 1. You can find a copy of [Version 1](https://docs.google.com/spreadsheets/d/1DYIJgjG3H5rwt52NT2TX_m429snmIU-jGw1a8ZODwGQ) here if you need it for any reason.
`,
  },
  {
    date: new Date(2021, 0, 31),
    title: 'Previous changelog entries',
    whatsNew: `
Previous changelog entries can be found in the [old risk tracker changelog google doc](https://docs.google.com/document/d/1iwTFoCS8lOIWWm-ZzcMZ_mPHgA8tHVVA3yhKY23gDu8#heading=h.lvpswyvu999r)
`,
  },
]

export const lastUpdated = changes[0].date

let content = `See below for each update that has been made to the [Risk Tracker](/tracker) spreadsheet and instructions for how to migrate your copy of the spreadsheet with the latest changes. [Click here to subscribe for notifications about Risk Tracker version updates](${mailchimpSubscribe}). If you have any questions, you can email [tracker@microcovid.org](mailto:tracker@microcovid.org).\n\n`

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
    if (change.spreadsheetURL) {
      if (change.versionNum) {
        markdownContent += `[Direct link to v${change.versionNum} of the spreadsheet](${change.spreadsheetURL})\n\n`
      } else {
        markdownContent += `[Direct link to this version of the spreadsheet](${change.spreadsheetURL})\n\n`
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

export const latestRiskTrackerVersion = changes[0].versionNum
export const latestRiskTrackerReleaseDate = changes[0].date
export const latestRiskTrackerSpreadsheetURL = changes[0].spreadsheetURL

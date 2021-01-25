import budgetSetting from './img/budget-setting.png'
import editable from './img/colors-editable.png'
import expired from './img/colors-expired.png'
import formula from './img/colors-formula.png'
import overview from './img/colors-overview.png'

const title = 'Risk Tracker FAQ'
const shortTitle = 'FAQ'
const content = `
Jump to: [General](#general-risk-tracker-faq) | [Activity Modeling](#activity-modeling) | [Custom Person Modeling](#custom-person-modeling) | [Risk Budget](#risk-budget)

# General Risk Tracker FAQ

## The points for an activity I entered recently just changed... What happened? (Automatic Location Data Imports)

By default, the Risk Tracker automatically imports the latest data for each of the locations you’ve selected in the _Locations_ sheet. We update the prevalence data every few days, which may cause an activity you’ve already entered to change points. 

**Note:** We adjust activities before the date of the last import to match the prevalence that has been observed, and activities after the date of the last import to account for a ”delay factor” if COVID prevalence is increasing in your area. Because of this, it’s possible to enter the exact same activity on two different dates and see slightly different microCOVID scores.


## What do all the colors mean?


<table>
  <tr>
   <td><strong>Colors</strong>
   </td>
   <td><strong>What they indicate</strong>
   </td>
  </tr>
  <tr>
   <td>Black text, white background<br />
   <img src="${editable}" alt="Editable section" style="max-width: 500px;">
   </td>
   <td>Something you can fill in or edit.
   </td>
  </tr>
  <tr>
   <td>Gray text, white background<br />
   <img src="${formula}" alt="Formula" style="max-width: 300px;">
   </td>
   <td>Contains a formula. <em>Editing a formula may break the spreadsheet.</em>
   </td>
  </tr>
  <tr>
   <td>Gray text, gray background, strikethrough<br />
   <img src="${expired}" alt="Expired activity row" style="max-width: 500px;">
   </td>
   <td>An activity row that is older than the max days (7 or 9) and is no longer counted toward your total.
   </td>
  </tr>
  <tr>
   <td>Gray sections<br />
   <img src="${budgetSetting}" alt="Budget setting" style="max-width: 500px;">

   </td>
   <td>A setting that you can adjust if you’d like to.
   </td>
  </tr>
  <tr>
   <td>Teal & purple sections<br />
   <img src="${overview}" alt="Pod overview section" style="max-width: 500px;">
   </td>
   <td>Summary sections that give you an overview of your statistics. Contains formulas. <em>Editing a formula may break the spreadsheet.</em>
   </td>
  </tr>
</table>



# Activity Modeling


## How do the different precautions affect the risk score?

For the purposes of calculating the microCOVID risk score for an activity, we assume a default activity is **indoors, no mask, 3 feet apart, normal talking volume**. Any variation from that decreases/increases the risk. You can read the [explanation behind each of these modifiers here](/paper/5-activity-risk#modifiers-duration-masks-location-distance-volume) and the [in-depth research here](/paper/14-research-sources#activity-risk).

### Risk modifiers to me

<table>
  <tr>
   <th><strong>Type of precaution</strong>
   </th>
   <th><strong>Baseline</strong>
   </th>
   <th><strong>Risk modifier TO ME</strong>
   </th>
  </tr>
  <tr>
   <td><strong><em>Location</em></strong>
   </td>
   <td>🏠 Indoors: <strong><code>Baseline</code></strong>
   </td>
   <td>🌲 Outdoors: <strong><code>x1/20</code></strong><br />
✨ Indoors with a HEPA filter (flow rate 5x room size): <strong><code>x1/4</code></strong><br />
🚂 A train with air filtration: <strong><code>x1/4</code></strong><br />
✈️ An airplane: <strong><code>x1/4</code></strong><br />
🚙 A moving car with the windows rolled down: <strong><code>x1/4</code></strong><br />
🌞 A space with one or more sides open to the outdoors: <strong><code>x1/4</code></strong>
   </td>
  </tr>
  <tr>
   <td><strong><em>Masks</em></strong>
   </td>
   <td>💨 No mask: <strong><code>Baseline</code></strong>
   </td>
   <td>😷 My cotton mask: <strong><code>Baseline</code></strong><br />
😷 Your cotton/surgical mask: <strong><code>x1/4</code></strong><br />
⚕️ My surgical mask: <strong><code>x1/2</code></strong> <br />
⚕️ Mask w/ filter insert: <strong><code>x1/2</code></strong><br />
⚔️ KN95 or unsealed N95: <strong><code>x1/4</code></strong><br />
🛡️ <a href="https://www.youtube.com/watch?v=p8ay3kTqsuo" target="_blank" " rel="noopener">Sealed</a> N95: <strong><code>x1/10</code></strong><br />
   </td>
  </tr>
  <tr>
   <td><strong><em>Distance</em></strong>
   </td>
   <td>☕ 3 feet: <strong><code>Baseline</code></strong>
   </td>
   <td>↔️  6+ feet: <strong><code>x1/2</code></strong> <br />
🏈  10+ feet: <strong><code>x1/4</code></strong> <br />
❤️ 0 feet: <strong><code>x2</code></strong> <br />
   </td>
  </tr>
  <tr>
   <td><strong><em>Volume</em></strong>
   </td>
   <td>💬 Normal volume: <strong><code>Baseline</code></strong>
   </td>
   <td>
   🤐 Silent: <strong><code>x1/5</code></strong><br />
   ❗ Loud / Singing: <strong><code>x5</code></strong>
   </td>
  </tr>
  <tr>
   <td><strong><em>Symptoms</em></strong>
   </td>
   <td>❓ Didn’t ask before: <strong><code>Baseline</code></strong>
   </td>
   <td>
   ✅ Ask about symptoms before: <strong><code>x1/2</code></strong>
   </td>
  </tr>
</table>


### Risk modifiers to podmates

<table>
  <tr>
   <th><strong>Modification</strong>
   </th>
   <th><strong>Baseline</strong>
   </th>
   <th colspan="2" ><strong>Less risk TO PODMATES</strong>
   </th>
  </tr>
  <tr>
   <td><strong><em>Symptoms reporting</em></strong>
   </td>
   <td>❓ No reporting: <strong><code>Baseline</code></strong>
   </td>
   <td colspan="2" >📞 Contact promises to report symptoms in the 10 days after your interaction: <strong><code>1/2</code></strong>
   </td>
  </tr>
</table>


**Specific activities Q&A:** [friend using our bathroom](/paper/14-research-sources#activity-risk), [cuddling/kissing/hugging](/paper/13-q-and-a#should-i-use-an-extra-multiplier-for-cuddling-going-on-a-date), [taking a Lyft](/paper/13-q-and-a#lyftsubers), [public transit](/paper/13-q-and-a#public-transit), [flight in an airplane](/paper/13-q-and-a#airplanes), [stores & haircuts](/paper/13-q-and-a#airplanes), [protests](/paper/13-q-and-a#going-to-a-protest).


## How do I insert new rows into the Activity Log?

Because everyone is using the activity log, you will eventually need to insert new rows, here is a video that demonstrates how to do so:

🎥 [Watch video →](https://d.pr/v/FZipL8)

These steps fill the formulas into the new rows. If you do not follow these steps, the calculation totals won’t work.


## How do I log interacting with multiple different people over a period of time? (Example: an outdoor party)

If some people are circulating, you only need to account for the people who are near you. 

**Some examples:**

*   if you are at a backyard party where you are usually near 5 people at any given time, but the specific people change as you mingle, that is still just 5 nearby people on average.
*   If you see 5 different co-workers outdoors for brief interactions throughout the day, and you are near each person for 10 minutes at a time, you can either log that as “5 people for 10 minutes” or “1 person for 50 minutes.”
*   If you’re in a store, you want to model the number of people who are 3+ feet, 6+ feet and 10-15 feet away from you _on average_. You can use the tool in the _Utilities_ sheet to help you convert those 3 distances to a total number of people who are 6 feet away.

When the people you’re seeing all have the same risk profile, with the same precautions, you can enter them all as one "Custom Person" because they function together as a unit. If you're seeing people at different times or for different lengths of time each, you'll need to model them as separate Custom Person sections. 


# Custom Person Modeling

## If I am seeing a house of multiple people at once, do I need to create a custom person row for each of them?

If you are seeing them all at once, you can model all their activities as if they are one “person” under a single person section.

If you are only seeing one person in the household, it is more accurate to model that person and list the interactions they have with their housemates/podmates.


## What if I don’t want to keep updating the Custom Person activity log every time I see the person?

If you’d rather overestimate your points and not need to do as much up-keep on the Risk Tracker, you could do the following: Model the person and overestimate each of their activities. For example, on any given week they spend anywhere from 1-5 hours of social time with a single friend at a time. You could just model it as 5 hours of time and not worry about updating it each time. 

**Note:** Then you could work out an agreement with the person to notify you if their activities go beyond the range that you’ve modeled (for example: if they take a flight). It is very important that you trust that they will report any changes, since one risky activity on their part could make a huge difference in your budget. We also suggest proactively asking your contacts if they’ve had any additional activities.


## What if I am seeing someone who is using microCOVID to track their risk?

**Option A:** You can select a built-in category like “1% risk per year adherent (using microCOVID).”

**Option B:** to be even more precise, you can do the following:

1. Ask them what their current microCOVID score is. If they are using the Risk Tracker, they can find this number in the _Pod Overview_ sheet on the “Risk to other people you see outside of the house” row under the column for their name.
2. Enter their name and their score on your Risk Tracker in the _INTERNAL_PERSON_ sheet under the “Manual Entries” section.


# Risk Budget

## What’s the difference between “risk to me” and “risk to pod”?

The Risk Tracker is designed to ensure that you are only exposing your podmates to the budget you have specified. Certain features allow you to take on more risk but reduce the risk you pose to your podmates.

One main place this occurs is with the “contact will report symptoms” checkbox, which reduces the risk to the pod by 50%. 

For example, If you log an activity that is 300 points, and the person you’re seeing  agrees to report symptoms, you still incur all 300 points as a risk to yourself. However you are only exposing your pod to 150 points, since you would quarantine after the person notified you about symptoms, and you would have spent less potentially-contagious time around your podmates.


## Can I “save up” my points and use them later? Do points “roll over”?

Though you could track your budget along any time frame you want (weekly budget, monthly budget, etc), the Risk Tracker is built to consider a weekly budget timeframe.

If you want to “save up” points and use more in a future week, it’s possible to do so and still hold true to the "X% risk of getting per year" budget you've chosen. However, if you have others in your pod, you’ll be temporarily increasing the risk they pose to the people they see beyond the usual amount. For example, if you go 2 months without using any points, you could use them all in one week, which might put you at, say, 1,000 microCOVIDs. Your podmates are being exposed to 30% of that risk, which in this example would be 300 microCOVIDs. If one of them is going to see a loved one for a few days who is more vulnerable to COVID (and only has a budget of 20 microCOVIDs), your activities make it difficult for them to do so safely. It’s important to discuss this situation as a pod and come to agreements about how you’d like to handle situations like this.

One way some pods have addressed this is by allowing you to “save up” your points over time, and set a max on how many you can use in a given week (for example, your pod might agree that any person can use up to 2x your weekly budget in a given week as long as it still fits within their overall annual total.)

The Risk Tracker is not currently built to assist you with calculating your annual total points used and points remaining. You’re welcome to adapt it to that situation.


## What’s up with the 0-7 day  range and 2-9 day range? What are they for? Why the difference? 

You may notice that the _Pod Activity Log_ sheet calculates your risk in the last 0-7 days.  This is because a 0-7 day range is easiest to work with for the purposes of helping you stay within your budget. 

A 2-9 day range is when you would most likely be contagious to others if you were exposed (or when <span style="text-decoration:underline;">they</span> are most likely contagious to <span style="text-decoration:underline;">you</span>). In the _Custom People_ sheet, we total the activities in the last 2-9 days because activities in the last 0-1 days wouldn’t yet present a significant risk of transmission to you.

_A note here:_ We use a 2-9 day range because it is convenient for working with a weekly budget. This is fine when working with lower microCOVID values. But when working with higher risk scenarios (100x or more over your weekly budget), a 14-day range without symptoms would be important to ensure full safety.

`

const post = { title, shortTitle, content }
export default post

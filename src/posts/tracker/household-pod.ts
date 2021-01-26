import sharedBudgetReductions from './img/shared-budget-reductions.png'

const title = 'Using the Risk Tracker with your household/pod'
const shortTitle = 'For Your Household/Pod'
const content = `
## Pods in the context of the Risk Tracker

A **pod** is small network of trusted friends or relatives who are in regular contact with one another (many times per week) and are following a shared set of agreements to try to keep everyone safe from COVID. [^poddefinition]

**Who is in my pod?**

*   The main criteria for being in a pod together is that they are willing to follow a shared set of agreements, and track their interactions to stay within an agreed upon risk budget.
*   **Examples of people who might in your pod:**
    *   **Housemates**
    *   **Partner** who you see many times per week
    *   **A friend** who comes over for dinner with everyone in your house several nights every week.
    *   Anyone else you are seeing more than 5 hours per week (indoors, unmasked, undistanced), who you don’t want to have to log each interaction with, and who is willing to follow a shared set of agreements with you.
*   **Your pod might not include**
    *   **Co-workers:** In most work situations, it’s unlikely for everyone to agree to follow a shared set of agreements to stay within a specified risk budget. Instead, you would model what you know about their risk in the Custom Person sheet and count it as an activity in your Activity Log.
    *   **Some friends:** A friend/partner that does not interact with the pod frequently. 
    *   **Regular low risk activities:** A friend you see regularly, but the activity doesn’t ever pose much risk (ex: an outdoor, distanced, weekly picnic)

**What if I live alone?**

*   If you live alone and are using the Risk Tracker, you can think of yourself as a “pod of 1.”
*   If you live alone and are seeing someone regularly and don’t want to log every interaction with them, you might choose to include them in your pod.

**Example pod:**

*   Let’s say 4 people live in your house (you plus 3 other people). 
*   Let’s say Alice comes over to your house for dinner several nights each week. You  don’t want every person in your house to log the points for seeing Alice every time, so you choose to include her as a part of your pod.
*   Total pod size = 5


## Getting started with the Risk Tracker for pods

1. **Find your spreadsheet wizard:** Each house needs a local “spreadsheet wizard” who has taken a deep dive into how this system works. As your resident microCOVID expert, you might want to read the [white paper](/paper) so you’re prepared to help answer questions about why certain things work the way they do.
2. **Follow the steps in the [Risk Tracker Quickstart Guide](./quickstart)**.


## How the number of people in your household affects your budget

If you lived alone and were choosing a 1% budget for yourself, then we’d have a budget of 10,000 micoCOVIDs per person per year (= 192/person/week). If you have others in your pod, you automatically have a [30% chance of transmitting COVID to each other](/paper/14-research-sources#household-member) person. That means living with others reduces your “outside of the pod” budget. Each additional person you add to your pod reduces your budget. 

Here’s the formula we use:

\`\`\`
"Outside of pod" budget per housemate
= R/(1+(N-1)*30%)
\`\`\`

Where \`R\` = risk budget in microCOVIDs, \`N\` = number of housemates in the pod, and the \`30%\` number is the housemate transmission rate. [^partnernote]

**Some examples _(using a 1% annual risk budget):_**


| Number of podmates  | Annual “out of house” budget per person   (microCOVIDs)  | Weekly “out of house” budget per person (microCOVIDs)  |
| --- | ---      | ---   |
|  1  |  10,000  |  192  |
|  2  |  7,692   |  147  |
|  3  |  6,250   |  120  |
|  4  |  5,263   |  101  |
|  5  |  4,545   |  87   |
|  6  |  4,000   |  76   |
|  7  |  3,571   |  68   |


_Note:_ You don’t need to fill anything from this table into the spreadsheet. It will calculate this for you based on your current pod size.

Important: The 30% chance of transmission to housemates number is based on the fact that, on average, people tend to quarantine within their home, isolating from other housemates once they begin developing symptoms. We highly recommend you self-isolate as much as possible as soon as you notice any [symptoms](/symptoms).


## Understanding risk to me & risk to pod

The main thing most group houses are concerned about is the question: how do we negotiate the risk to one another?

**Risk to me:** Any activities I’ve done in the last 0-7 days counts against my budget for myself.

**Risk to pod:** Any activities in the last 2-9 days counts against my pod budget.


## How to track & report your risk to people outside your pod / house

Asking someone [if they have symptoms](/symptoms) before you see them cuts your risk in half (see [Research Sources](/paper/all#note-on-infectious-period-contacts-symptoms) for details).

Ask friends about symptoms **_<span style="text-decoration:underline;">right before</span>_** seeing them:

You can use this [symptoms page](/symptoms) to help guide you through asking some questions. Or you can text the link to the person you’re seeing.


**If symptoms show up...**
*   **If they have symptoms <span style="text-decoration:underline;">BEFORE</span> you see each other:** You can use the _Has prominent COVID symptoms (high fever, drive cough, lost of taste/smell) _Person Type if you want to model a way to adjust this interaction that keeps it within your budget.
*   **If they have symptoms within 7 days <span style="text-decoration:underline;">AFTER</span> you see each other:** If possible, the safest option is to quarantine within your house, and reduce your exposure to others as much as possible until you can confirm/deny whether they have COVID.


# FAQ for households & pods

### When should I add someone to our “pod” vs track each time they interact with us?

You should add someone to your pod if you know you want to collaborate with someone you see frequently to follow a shared set of agreements around COVID safety protocols, and they are willing to track all their activities to stay within a budget. A rule of thumb is that you will save points on that person’s interactions by adding them to your pod if you interact more than 5 hours per week indoors, undistanced, unmasked.


### What happens when multiple people in the house see someone at once? How do we enter that activity?

When multiple people in your pod see the same person on the same day, you all need to log the activity. Here are two approaches you can consider for how to log it.

Let’s use an example where in a pod of 4 people, 2 of the podmates have dinner with someone outside the pod.

The simplest option is to have everyone log that interaction as though it happened independently. This is very easy, because it’s just like any other interaction you would have.

If the activity is 10 points, each podmate would just log it as 10 points.

The downside is that, for a large pod, this overcalculates  the risk quite a bit. (See Option B for an explanation). If you aren’t too concerned about saving every last point in your budget, then this option might be a good choice because it’s simple. 


### If an outside-of-pod person interacts with one person in our pod, does that mean we can all see them and it’s the same thing?

Just because another pod is “connected” to your pod through one person doesn’t mean that all those people are now “in your pod.” For example, having a whole other house over for dinner is much more risky than having just one member of that house over for dinner. See this explanation in the [Q&A](/paper/13-q-and-a#so-if-my-housemate-really-wants-to-see-a-partner-in-another-house-you-believe-it-is-sometimes-better-from-a-risk-standpoint-not-to-negotiate-for-the-partners-entire-house-to-get-added-to-a-closed-bubble-with-us).  This is because each person in the transmission chain acts as a “buffer” of sorts, because there is only a 30% chance of transmission. There is a time delay in transmission, and if everyone agrees to [report symptoms](/symptoms), that one person can isolate if anyone else in their pod gets symptoms. But if you see everyone in their pod, you’re all getting exposed to all of those people at once.

Numerically, if the outside-of-pod person interacts with one person in your pod and that interaction costs C points, the podmate interacting will incur a cost of C points and the other podmates will incur 0.3 * C (or 0.15 * C if the outside-of-pod person agrees to report symptoms and the podmate will isolate if the outside-of-pod person develops symptoms). If the entire pod sees the person, they will each incur C.


### What about activities that one person does on behalf of the whole house?

If someone does something for the whole house (like grocery shopping) and you want to count it against everyone’s, you can enter it on the settings page and everyone’s budget will be reduced proportionally.

_Example:_ Let's say each member of your 4-person pod has a budget of 115 points/week. One person goes grocery shopping every week and it costs them 25 points. If you add that activity here, and everyone’s budget will go down by 13 points. The result is that each person’s budget is now 102 points/week. (You can dig into the spreadsheet formulas if you want to get into the math underlying this.)

<img src="${sharedBudgetReductions}" alt="Screenshot of shared buget reductions section of spreadsheet">


[^poddefinition]: Definition adapted from [Hackensack Meridian Health article](https://www.hackensackmeridianhealth.org/HealthU/2020/08/26/how-to-create-a-covid-bubble-and-why-you-should-consider-one/).

[^partnernote]: We are intentionally using the housemate transmission rate of 30% here. There is a slight difference if there are partners in the house, but we decided it wasn’t a significant enough difference to include in the formula.

`

const post = { title, shortTitle, content }
export default post

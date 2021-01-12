import budgetSetting from './img/budgetsetting.png'
import helpText from './img/helptext.png'
import podOverview from './img/podoverview.png'
import {
  mailchimpSubscribeUrl,
  spreadsheetUrl,
} from 'components/SpreadsheetUtil'

const title = 'Spreadsheet Quickstart Guide'
const shortTitle = 'Quickstart Guide'
const content = `
Follow these steps to set up a copy of the spreadsheet for yourself or your household/pod. Before you begin using the spreadsheet, we recommend you play around with the [microCOVID website calculator](/) to get a sense of how the model works.

## Steps to get started

1. **Copy the spreadsheet:** Open the [microCOVID template spreadsheet](${spreadsheetUrl}). When you’re ready, you can [click here to make a copy of the spreadsheet](${spreadsheetUrl}/copy).
2. **Add the names of each person to the _Pod Overview_ sheet:** Replace the example names (Alice, Bob, etc) with the names of each person in your pod. Each person you enter will reduce the budget each person gets.

    <img src="${podOverview}" alt="Pod overview" style="max-width: 600px;">

3. **Set your risk budget:** The number you choose here is the max annual risk per person that your house is willing to be exposed to. We suggest a value of 1% annual risk of contracting COVID for healthy people NOT in close contact with more vulnerable people.  You can read more about risk budgets here. You can change your risk budget here:

    <img src="${budgetSetting}" alt="Budget setting" style="max-width: 500px;">

    **Important note:** The spreadsheet is designed to ensure that you are only exposing your podmates to that total amount of risk. Certain features allow you to take on more risk but reduces the risk you pose to your podmates. [Read more about this in the FAQ](./faq).

4. **Add the name of each person in your pod to the _Pod Activity Log_ sheet.**
    1. Begin by replacing the example names (Alice, Bob, etc) with the names of people in your pod.
    2. To add additional people, type their name on any blank row in the “Podmate name” column. That row will change color and function as a new section for that person’s activities.

5. **Set your location:** Go to the _Locations_ sheet > Select your state (or country) from the dropdown > Select your region. You can change the two example locations to ones you intend to use. Put a checkmark next to the location that you want to use as your default. This data will automatically update every 3-7 days. 

6. **Adjust your shared budget reductions for grocery shopping:** The spreadsheet oferrs a way to share the points of grocery shopping across your whole pod. (You can also do shared budget reductions for other activities.) There are 3 things you need to set if you want to use this feature: 
    1. Set the “Podmate name” to the person who does the grocery shopping
    2. Set the “Grocery hours per week” number.
    3. Set the “Grocery mask type” to the type of mask the grocery shopper uses. (A better mask will give every one more points in their baseline budget).     
    _Note:_ If you don’t want to share the cost of shopping across everyone, or you get your groceries delivered, you can just set “Grocery hours per week” to 0.


🎉 You’re now ready to start logging your activities in the _Activity Log_ sheet. Try it out by filling in a row! 


## What's next

You can read more about [logging activities](./basics), [custom modeling the risk of a person you’re interacting with](./basics), [the spreadsheet FAQ](./faq) or about [using microCOVID with your household/pod](./household-pod).

**Tip:** Most of the spreadsheet column headers have a note explaining how to use them. Many common questions are answered in these notes. You can access the note by hovering over any column with a black triangle in the top right corner. For example: 

<img src="${helpText}" alt="Help text when hovering on spreadsheet columns" style="max-width: 600px;">


## Get the latest updates

[Subscribe to receives updates about the spreadsheet as we upgrade it](${mailchimpSubscribeUrl})
`

const post = { title, shortTitle, content }
export default post

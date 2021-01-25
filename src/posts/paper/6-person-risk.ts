const title = 'Person Risk'
const shortTitle = title
const content = `

**Person Risk** is the chance that the other person currently has COVID. This is based on overall prevalence in your area and their recent behaviors.

So you’ve decided to meet a friend for lunch. You know the Activity Risk is 6% per hour (for an indoor unmasked lunch) and much less if you [MODify](3-covid-transmission#mod-hangouts-masked-outdoors-distance) your hangout. But the Activity Risk _assumes_ that they currently have COVID.

What’s the chance that your friend actually has COVID? They aren’t coughing and they feel totally fine. Can you conclude they aren’t infected? Unfortunately, no. Roughly [55% of COVID transmissions](https://science.sciencemag.org/content/368/6491/eabb6936) happen when the person has _no symptoms_.[^4]

 * Not all diseases work this way. For example, [Ebola](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4358015/) is only contagious when the person is already exhibiting symptoms. However, COVID is a different disease, and one of its defining features is that it has a high rate of transmission from people _who don’t yet have symptoms_.

This means that the chance someone has COVID (which we’re calling “Person Risk”) depends on their actions and choices in the past 10 days or so, not just whether they’re actively showing symptoms.

We use three different methods of guessing someone’s chance of having COVID.

*   The **[Basic Method](7-basic-method)** is to just assume the person is “average” for their region. The chance your friend has COVID is the chance that _anyone_ in your geographic area has COVID.
*   The **[Intermediate Method](8-intermediate-method)** adds adjustments for whether the person is or isn’t an essential worker.
*   The **[Advanced Method](9-advanced-method)** is to add up the risk of each individual activity that person has done recently.

You do not need to understand exactly how these methods work to use the [calculator](/calculator), but if you want to create your own custom estimates for specific people in your life then we strongly recommend learning to use the [Advanced Method](/paper-9-advanced-method) and the associated [Risk Tracker spreadsheet](/tracker).


### Skip ahead and takeaways

If you would like to skip ahead, please first read the following takeaways that we think are the most important things conveyed in the next few sections:

* **The chance someone has COVID is very different in different geographic regions.**
  * The very same activity that is fairly safe where I live might be fairly dangerous where my parents live, because the risk that people have COVID there is higher.
* **People who interact with the public at work are at greater risk of having COVID.**
  * We estimate essential workers are 3x more likely than average to have COVID.
  * People who are not essential workers are half as likely as average to have COVID.

If you would like to understand how we use the basic, intermediate, and advanced methods to calculate Person Risk, read on.


Skip ahead to [Putting it all together](11-putting-it-all-together), or read on about the [Basic Method](7-basic-method) for more detail.

[^4]:
     Note that this figure includes both _presymptomatic_ transmissions (where the person transmitting COVID will eventually show symptoms, usually within a few days, but hasn’t yet) and _asymptomatic_ transmissions (where the person transmitting will never show symptoms). Catching COVID from someone _presymptomatic_ is much more common: this accounts for about 50% of all transmissions, as opposed to _asymptomatic_ transmissions which account for only about 5%. The COVID discourse tends to muddy this fact somewhat. Asymptomatic infections are inherently harder to measure (because you probably won’t get tested if you don’t show symptoms), and there are indeed plenty of them. However, most of them don’t infect anyone else.
`

const post = { title, shortTitle, content }
export default post

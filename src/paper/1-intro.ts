const title = 'Introduction'

const content = `

You're already familiar with some rules of thumb for avoiding COVID-19 infection: wear a mask, stay 6 feet apart, and only socialize outdoors. But *just how much* do these things help? How big a deal is it if you remove your mask when hanging out with a friend? What happens if you get closer than 6 feet? Bars and restaurants are opening, but is it safe to go inside? It’s tough to make good choices when you don’t know how large or small the risks really are.

We—the authors—were really struggling with this. We wanted a rigorous way to make decisions about COVID risk. So we did some research and crunched some numbers.  We trawled the scientific literature for data.  We spent hours estimating the COVID risk of various activities. And in this writeup, we’ll share our research (and some practical tools!) with you.


We’ll show you:

- how we measure COVID infection risk, in units of “microCOVIDs”
- how risky we think various common activities are
- how you can estimate the COVID risk of your own actions (using our handy-dandy [calculator](/calculator))
- and, most importantly, how to make decisions that balance freedom and fun with safety and health.

You’re in the target audience of this post if you are comfortable with numbers and want to think about how your personal choices affect your chance of getting COVID-19. We are not focusing on society-wide pandemic dynamics, policy responses, or suggestions for public health officials.

This is the first part of a two-part post. In the second part [TODO link], we’ll go into more detail about how we use these COVID risk estimates as part of a “risk budget” system for our communal house.

If you want to skip the intro & framing, and jump to our final estimates of COVID risk, click here. [TODO create link.]

If you want to skip the entire article and just use the calculator tool, click [here](/calculator).

## How to navigate this whitepaper

Use the "previous" and "next" links at the bottom of the page to navigate from one section to the next.

Footnotes[^demo] usually contain nerdy details for detail-loving readers, and often a link to *even more gory detail* in the Research Sources section [TODO link].


## Disclaimer
_This article (and corresponding calculator) was collaboratively written by the members and friends of Ibasho, a communal house in San Francisco. Our goal is to protect our broader community’s physical and mental health during the pandemic, by promoting balanced evidence-based decision-making by individuals in our community. We have based our numbers in this writeup on scientific research; however, none of us are epidemiologists and our model is still a guess and not an authoritative “truth”. Please continue to follow government guidance._


## Authors:

**Research and modeling:** _Catherine Olsson, Joshua Oreman_

**White paper:** _Catherine Olsson, Rhys Lindmark, Joshua Oreman, Stephanie Bachar, Sarah Dobro, Anna Tsykalova, Matt Bell, Jacob Falkovich_

**Website and calculator:** _Dominic Dagradi, Sarah Dobro, Deb Lyon_

**Feedback & assistance thanks to:** _Ajeya Cotra, David Mears, Danny Hernandez, Katja Grace, Andrew Critch, Matt Bell, Ben Shaya, Zvi Mowshowitz, Derek Foster, Jess Watson Miller, Elliot Olds, Ivan Gayton, Eugene Shvarts, and other friends who chose to remain anonymous._ (Giving feedback does not imply endorsement of, or agreement with, this post.)

---


[^demo]: This is an example footnote! Click the arrow to return to where you came from in the text:

`

const post = { title, content }
export default post

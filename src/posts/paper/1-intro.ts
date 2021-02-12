const title = 'Introduction'
const shortTitle = title
const content = `

You’re already familiar with some rules of thumb for avoiding COVID-19 infection: wear a mask, stay 6 feet apart, and only socialize outdoors. But is it riskier to go to the grocery store, or to ride in a Lyft or Uber? It’s tough to make good choices when you don’t know how large or small the risks really are.

We, the authors, were really struggling with this. We wanted a better way to make decisions about COVID risk. So we read some papers and crunched some numbers. We spent hours building a model to estimate the COVID risk of various activities. And in this writeup, we’ll share our model (and some practical tools!) with you.


We’ll show you:

- how we estimate COVID infection risk, in units of “microCOVIDs”
- how risky we think various common activities are
- how you can estimate the COVID risk of your own actions (by hand, or using our handy-dandy [calculator](/calculator))
- and, most importantly, how to make decisions that balance living your life with safety and health.

You’re in the target audience of this white paper if you are comfortable with numbers and want to think about how your personal choices affect your chance of getting COVID-19. We are not focusing on society-wide pandemic dynamics, policy responses, or suggestions for public health officials.

## How to navigate this white paper

Use the “previous” and “next” links at the top or bottom of the page to navigate from one section to the next.

Footnotes[^demo] usually contain nerdy details for detail-loving readers, and often a link to even more gory detail in the [Research Sources](14-research-sources) section.


<div class="warning">
<h2>Disclaimer</h2>
<p>We have based our numbers in this writeup on published scientific research. However, unlike a medical or scientific standard of evidence, we state our best guess based on available evidence, even when that evidence is far from conclusive. Our goal in doing so is to enable ordinary people to do back-of-the-envelope calculations to make personal decisions. For scientific data, please see the <a href="14-research-sources">Research Sources</a> that we have used in forming our guesses.</p>


<p>We have read a lot of experts' research, but we are not ourselves experts in this topic. This is not a primary source of new information about COVID. This work has not been scientifically peer-reviewed. There is still a lot of uncertainty about COVID. Do not rely on this tool for medical advice. Please continue to follow government guidance.</p>
</div>


## Authors:

This article (and corresponding calculator) was originally collaboratively written by the members and friends of Ibasho, a communal house in San Francisco. Our goal is to protect our broader community’s physical and mental health during the pandemic, by promoting balanced evidence-based decision-making by individuals in our community.

Since then, the project has grown to include like-minded individuals around the world.

**Cite us collectively as:** The microCOVID Project

**Original White Paper and Model:** Catherine Olsson, Joshua Oreman, Rhys Lindmark, Anna Tsykalova, Stephanie Bachar, Sarah Dobro, MD, Matt Bell

**Website and calculator:** Dominic Dagradi, Sarah Dobro, Ben Shaya, Deb Lyon, Jeremy Blanchard, Matt Bell, Jenny Wong, Melody Chang, Josh Oreman, Peter Gyongyosi, Michael Cohn, and the microCOVID github community.

**Ongoing Model Researchers:** Catherine Olsson, Ben Shaya, Joshua Oreman, Riley Drake, Joshua Slocum

**Risk Tracker:** Jeremy Blanchard, Catherine Olsson, Joshua Oreman, Ben Shaya 

**Social Media and Blogging:** Catherine Olsson, Ben Shaya, Matt Bell, Luke Lew, Finan Adamson

_Feedback & assistance thanks to: Ajeya Cotra, Andrew Critch, Andy Matuschak, Danny Hernandez, David Mears, Derek Foster, Elliot Olds, Eugene Shvarts, Jacob Falkovich, Jeremy Howard, Jessica Watson Miller, Ivan Gayton, Katja Grace, Matt Bell, Peter Favaloro, Peter Hurford, Zvi Mowshowitz, and other friends who chose to remain anonymous. (Giving feedback does not imply endorsement of, or agreement with, this writeup.)_

---


[^demo]: Throughout the text, you will see footnotes like this. Usually they will have some content, but this one is just a demo! You can click the arrow to return to where you came from in the text:

`

const post = { title, shortTitle, content }
export default post

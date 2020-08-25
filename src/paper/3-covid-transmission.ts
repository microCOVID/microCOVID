const title = 'Understanding COVID transmission'
const shortTitle = 'COVID transmission'

const content = `

First, let’s strengthen our intuitive model of COVID transmission.

COVID is transmitted primarily through tiny droplets produced when an infected person talks, coughs, or sneezes ([CDC FAQ](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)), many of which can [remain suspended in the air](https://docs.google.com/document/d/1Kx4Mka_nORa8LlEwziRYZxOX0J8_fFfgnt-9TBjxusc/edit) for minutes to hours. Touching contaminated surfaces or objects is _possibly_ a way that COVID spreads, but the [CDC](https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/how-covid-spreads.html) believes the _main_ way it spreads is person-to-person through respiratory droplets. Therefore, in this writeup, we focus primarily on the risk from exhaled droplets in the air.[^1]

To visualize how exhaled droplets work, we suggest a helpful metaphor from our friend [Matt Bell](https://medium.com/@llebttam_45762/summer-vacations-in-the-era-of-covid-ab5576a7b302). Think of everyone around you exhaling cigarette smoke. If someone is smoking a cigarette in a park 30 feet away from you, you might not even smell it. But in a crowded bar where indoor smoking is permitted, the air will be thick with people’s smoky exhalations.

If you inhale just a bit of “smoke” (exhaled air) from someone with COVID, you might be fine. But if you inhale lots of “smoke,” you’re likely to get COVID. If you’re wondering about the riskiness of a situation, then it’s helpful to imagine, “What if everyone here were smoking a cigarette? How much smoke would I breathe in?” If you’d be breathing in other people’s smoke, then it’s a risky situation.

![LaVision imaging technique shows how masks restrict the spread of exhaled air](https://miro.medium.com/max/864/1*zyx-Sh2FQFwRGyQWkiherg.gif)

Source: [https://www.lavision.de/en/news/2020/4302/](https://www.lavision.de/en/news/2020/4302/)

Concretely, this means it’s important to avoid situations that feature the [3 C’s](https://www.businessinsider.com/how-japan-tackled-coronavirus-without-a-lockdown-2020-5): Crowds, Closed Spaces, and Close Contact. Why? Because if anyone there has COVID, which becomes likelier as the size of the crowd increases, their “smoke” will be blown into your face. Even if you’re not standing near them, it will build up in the enclosed space, making it more likely that you’ll inhale it.

So we know what to _avoid:_ the 3 C’s. But besides staying in our homes, what should we _do_? We can choose to have “MOD” hangouts: 1-on-1 or small-group socializing that is Masked, Outdoors, and Distanced. These hangouts are MODified from normal. The COVID “smoke” gets stopped by your mask, falls to the ground before it reaches the other person, and dissipates into the air. MODified hangouts are much safer, especially when they don’t involve many people.

In the section below, we’ll try to answer questions like: How much does a mask actually help? Is it safer to be indoors with a mask, or outdoors without one? Should you stay 6 feet away or 10 feet?

In order to answer these questions with microCOVID numbers (not just “high” or “low” risk), we’ll now dive into the research. You can also skip right to the [calculator](/calculator) to start playing with numbers if you prefer.



[^1]:
     If you’re worried about surfaces, the best thing to do is to be careful not to touch your face (mouth, nose, or eyes) when out and about, unless you’ve just washed or sanitized your hands thoroughly. Getting the virus on your hands isn’t harmful in itself; it has to get to your mucous membranes in order to infect you.


`

const post = { title, shortTitle, content }
export default post

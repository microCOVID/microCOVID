const title = 'Calculating Points'

const content = `

### Combining Activity Risk and Person Risk to get microCOVIDs

We can now multiply Activity Risk by Person Risk to get the microCOVID cost of a given interaction.

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

Let’s say you would like to hang out with Reasonable Rosie (from the example above), whose Person Risk is 369 using the Advanced Method. An indoors meetup has a 6% Activity Risk per hour, so it costs you 6% per hour ⨉ 1.5 hours ⨉ 369 Person Risk = **33 microCOVIDs**.

<p class="calloutText">33 microCOVIDs = 6% per hour (Activity Risk) ⨉ 1.5 hr ⨉ 369 (Person Risk)</p>

If you both wear masks, it costs you 8x less: only **4 microCOVIDs.** And if you hang out outside instead of inside, it costs you _an additional _10x less, for just 0.4 microCOVIDs (**less than 1 microCOVID!**) \


<p class="calloutText">0.4 microCOVIDs = 6% per hour ⨉ 1.5 hr ⨉ (1/8 masks) ⨉ (1/10 outdoors) ⨉ 369 (Person Risk)</p>


Should you do these activities? It depends on how important you believe it is to avoid COVID (for your own health, and to protect others), and how important seeing Rosie is to you!



*   If you’re aiming for 1% risk per year (833 microCOVIDs per month), an indoor unmasked hangout with Reasonable Rosie is something you can do multiple times per month, and you can treat the outdoor masked hangout as totally “free.”
*   However, if you’re aiming for 0.1% risk per year (83 microCOVIDs per month), _two_ unmasked indoor hangouts with Reasonable Rosie add up to almost as much risk as you were willing to spend in an_ entire month_. To spend your microCOVIDs more efficiently, you’ll want to use protective measures like wearing a mask or only hanging out outdoors. Unless, of course, Reasonable Rosie is the only person you want to see all month.
*   And if you’re highly vulnerable and aiming for 0.01% risk per year (8.3 microCOVIDs per month), the outdoor mask walk is something you can afford, but you should limit yourself to just a few per week, and you _cannot_ hang out indoors with Reasonable Rosie _even once_ without jeopardizing a large fraction of your budget for the entire year.

Note that all these values depend on _San Francisco prevalence in July 2020_. If you’re reading this at a different place or time, we suggest you re-do the math for your own region today! (reminder: Actual Infections Last Week = Cases ⨉ Underreporting Factor ⨉ Delay Factor, and Basic Person Risk = Infections Last Week divided by Population)

`

const post = { title, content }
export default post

const title = 'Putting it all together'
const shortTitle = title
const content = `

We can now multiply Activity Risk by Person Risk to get the microCOVID cost of a given interaction.

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk</p>

## Multiple-person interactions

So far we have assumed you are interacting with just one other person (a picnic with one friend, just one other person in the restaurant, etc).

If you are interacting with multiple people (lunch with _two_ friends; being near _five_ people at a time in a grocery store), you can add the microCOVID costs together, i.e., multiply by the number of people.

<p class="calloutText">Cost = Activity Risk ⨉ Person Risk for one person ⨉ Number of people</p>

In the [calculator](/calculator) we display the Person Risk for _each_ person.


## An example of combining Activity Risk and Person Risk to get a total Cost


Let’s say you would like to spend an afternoon catching up with Reasonable Rosie (from an [earlier example](10-example-person-risk)), whose Person Risk is 381 using the Advanced Method. An indoors meetup has a 14% Activity Risk per hour, so it costs you 14% per hour ⨉ 2 hours ⨉ 381 Person Risk = **107 microCOVIDs**.

<p class="calloutText">107 microCOVIDs = 14% per hour (Activity Risk) ⨉ 2 hr ⨉ 381 (Person Risk)</p>

If you both wear surgical masks, it costs you 8x less: only **13 microCOVIDs.** And if you hang out outside instead of inside, it costs you _an additional_ 20x less, for just 0.7 microCOVIDs (**less than 1 microCOVID!**)


<p class="calloutText">0.7 microCOVIDs = 14% per hour ⨉ 2 hr ⨉ (1/8 masks) ⨉ (1/20 outdoors) ⨉ 381 (Person Risk)</p>


Should you do these activities? It depends on how important you believe it is to avoid COVID (for your own health, and to protect others), and how important seeing Rosie is to you!

*   If you’re aiming for 1% risk of COVID per year (833 microCOVIDs per month), an indoor unmasked hangout with Reasonable Rosie is something you can do multiple times per month, and you can treat the outdoor masked hangout as totally “free.”
*   However, if you’re aiming for 0.1% risk per year (83 microCOVIDs per month), _one_ unmasked indoor hangout with Reasonable Rosie is more risk than you'd be willing to spend in an _entire month_. To spend your microCOVIDs more efficiently, you’ll want to use protective measures like wearing a mask or only hanging out outdoors. Unless, of course, Reasonable Rosie is the only person you want to see all month and you don't need to do groceries.
*   And if you’re highly vulnerable and aiming for 0.01% risk per year (8.3 microCOVIDs per month), the outdoor mask walk is something you can afford to do, but you _cannot_ hang out indoors with Reasonable Rosie _even once_ without jeopardizing a large fraction of your budget for the entire year.

Now that you have seen the whole process end-to-end and several example numbers, it might be a good time to revisit [“How much is a microCOVID?”](2-riskiness#how-much-is-a-microcovid).


Remember that Reasonable Rosie is a specific example person, from a specific example place and time. Her risk of having COVID depends on her recent hypothetical behaviors. If you’re hanging out with someone at a different place or time, the Activity Risk would be the same, but the Person Risk is likely to be very different, and so the overall Cost would be very different.

`

const post = { title, shortTitle, content }
export default post

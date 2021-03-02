import maskgraph from './images/image1.png'
import faceshield from './images/image10.jpg'
import n95andcloth from './images/image11.png'
import poorfittingmasks from './images/image2.png'
import surgical from './images/image3.png'
import kn95earloop from './images/image4.jpg'
import n95 from './images/image5.png'
import exhalationvalvetape from './images/image6.png'
import p100 from './images/image7.png'
import p100tapedmoldex from './images/image8.png'
import p100taped3m from './images/image9.png'
import { ImageMeta } from 'posts/post'

const image: ImageMeta = {
  url: maskgraph, // N95 image
  width: 1334,
  height: 892,
}

const title = 'Still using a cloth mask?  Upgrade to an N95 or P100!'

const author = 'Matt Bell'
const date = 'January 28, 2021'

const summary =
  "With caseloads near record highs and new, more infectious COVID variants starting to spread, it's time to upgrade your masks to N95 or better, both to protect yourself and to slow the spread of the disease"
const content = `

It’s year 2 of the pandemic, and masks have gone from a strange new experience to a core part of public life (and a fashion accessory!).  With caseloads at record highs and a more infectious [new variant](b117) on the horizon, we felt it was time to build a concise review for which masks give you the most protection and when you want to use them.  

## What’s the really short version?

* **For anything indoors (eg shopping), you want to be wearing an N95 or better**
   * N95s need to fit properly to work, with a complete seal forming around the edge when you inhale.  If you have a beard, you will need to shave it to get the full benefit of a proper seal.
   * Unlike last year, N95s are easy to get now!  Options include [Respokare](https://n95maskco.com/collections/n95-masks) (let them air out for a week first so the smell goes away), [MSC Direct](https://www.mscdirect.com/product/details/63488605), [Grainger](https://www.grainger.com/search?searchQuery=3M+N95), and [WellBefore](https://wellbefore.com/collections/3m-niosh-n95-masks). If one of these vendors is sold out, try the others.  In general the 3M masks are better than lesser known brands.  Valved N95 masks are an option if you cover the valve with tape or wear a cloth mask over it to filter your exhalations. 
   * N95s should be thrown out if they get overly dirty or hard to breathe through.  Some sources say they should be thrown out after 8 hours of cumulative use, but they may be good for longer.
   * If you like the nice aesthetic look of a cloth mask, wear it over an N95.  
   * KN95s (the Chinese standard) vary widely in quality, and usually have ear loops instead of head straps, which reduces fit quality.  They are occasionally as good as N95s, but sometimes no better than cloth.  Here’s [one decent option](https://wellbefore.com/collections/kn95-masks/products/kn95-disposable-fda-ce?variant=32898772795521).     
* **If you’re doing something high risk (like riding in a crowded airplane or bus) you should use a modified P100 respirator and goggles**.  Good P100 options include [3M](https://www.amazon.com/3M-Facepiece-Respirator-6291-Particulate/dp/B000FTEDMM/) and the [GVS Ellipse](https://www.amazon.com/GVS-SPR457-Elipse-Respirator-Medium/dp/B013SIIBFQ/).  You’ll need to tape a piece of surgical mask or cloth over the outflow valve in the center to filter your exhalation.  For goggles, you can use ski goggles, safety goggles, or other types of eye protection.  There are also full-face P100 respirators that include eye protection such as the [Moldex full-face respirator](https://www.amazon.com/gp/product/B004IVYSDW?pf_rd_r=S1E5KA094NB7YJB389JF&pf_rd_p=5ae2c7f8-e0c6-4f35-9071-dc3240e894a8) + replaceable [P100 filters](https://www.amazon.com/Moldex-M7940-7000-Particulate-Filter/dp/B015MG3XNM/).
*   **Cloth masks provide some protection to others, but do very little to protect you**.  They’re fine for outdoor use and are the best option for heavy outdoor exercise since they’re not damaged by sweat and you can wash them for reuse.  
*   **Eye protection (goggles, face shields) is no substitute for wearing a mask**, but does provide some additional protection in high risk scenarios when paired with a good mask.

Here, let’s look at the relative risk to you of any typical activity with different mask options:

<figure>
  <img src=${maskgraph}/>
</figure>

*Source: [microCOVID calculator](/) and [microCOVID white paper](/paper/14-research-sources#masks)*

That last bar for a P100 + goggles is tiny!  It’s clear we can do much better than cloth masks.  

<hr>

# Want more?  Here’s a primer on masks  

* [How do masks protect you?](#how-do-masks-protect-you)
* [Cloth masks](#cloth-masks)
* [Surgical masks](#surgical-masks)
* [KN95 masks with ear loops](#kn95-masks-with-ear-loops)
* [Well-fitting N95 masks (with head straps)](#well-fitting-n95-masks-with-head-straps)
* [Modified P100 respirators](#modified-p100-respirators)
* [Eye protection - Goggles and face shields](#eye-protection---goggles-and-face-shields)
* [Final thoughts](#final-thoughts)

<hr>

## How do masks protect you?



#### Masks provide three benefits:
1. **Protecting others.**  If you’re infected, a mask will catch most of the virus-laden droplets that come out of your mouth and nose, especially if you’re talking or coughing.
2. **Protecting you.**  If you are wearing a mask, any virus-laden air that you breathe in will get filtered by the mask
3. **Preventing face-touching.**  Since you can spread the virus from your hands to your face, the mask prevents you from accidental face-touching when you’re out and about.

#### Three aspects of mask quality:

1. **Filtration efficiency:**  What portion of small particles in air are caught by the mask when you breathe through it?  You want that number to be as high as possible.  Cloth masks catch 25-50% of particles, while N95s catch about 95%.
2. **Fit quality:**  A mask should form a tight seal with your skin around its perimeter.  If there are gaps, then air will bypass the mask, making it much less useful.   A tight seal is generally only possible with an N95 or better.  
3. **Breathability:**  Some masks are a lot harder to breathe through than others.

Now we’re going to go through masks by type, explaining what each type is useful for:

<hr>

## Cloth masks

* **Protection of you:** Minimal to light
* **Protection of others:** Moderate to good
* **Fit quality:** Varies
* **Breathability:** Varies
* **Useful for:** Outdoor activities, especially exercising
* **Benefits:** Looks pretty, easy to pull on and off, washable
* **Downsides:** Minimal protection

<figure>
<img src=${poorfittingmasks} width="550"/>
</figure>

Cloth masks were a great stopgap solution in spring and summer 2020 when the world was struggling to produce enough PPE for healthcare workers.  However, that’s since changed, and you’re usually better off wearing a mask that brings more protection.  

Cloth masks work by simple mechanical filtration.  As a result, they tend to not be that good at filtering the air you’re inhaling.  Tighter fabrics like denim tend to filter better than simple cotton t-shirt material, but they’re also harder to breathe through.  

Some cloth masks are barely useful due to having thin fabric, poor fit, or both.  Masks in this category include bandanas, buffs, handkerchiefs, and t-shirts pulled over the nose. 

Fitted cloth masks that are cut to match the shape of the face are a bit better, especially if they contain wire inserts to conform to the shape of the nose, or have head straps that let you secure the mask around the back of your head instead of just looping around your ears.  

A handful of cloth masks come with PM2.5 filters, which are designed to more efficiently trap smaller particles.  These filters improve the performance of cloth masks to something similar to surgical masks, though it’s difficult to ensure that the air always goes through these filters.

With caseloads at record levels, **cloth masks are not a good choice for indoor use**.  However, outdoor scenarios are low enough risk that a cloth mask should be adequate unless it’s a crowded situation such as a farmers market or a protest.

However, there’s one situation where cloth masks still excel — outdoor exercise.  If you’re going to be running up a hill with other pedestrians around, a cloth mask is a great solution.  Unlike other masks, cloth masks are washable, so when you finish your run you can drop your sweaty cloth mask in the washing machine and use it again.  

#### Shopping guide:  

*   [Citizens of Humanity](https://citizensofhumanity.com/products/cotton-mask-5-pack) has great simple and inexpensive denim masks with head straps for ideal fit.  They’re extremely durable, high filtration efficiency, and still work well after ~20 washings.   
*   [Rickshaw](https://www.rickshawbags.com/face-masks) also makes stylish masks with adjustable ear loops for improved fit. 
*   [Electric Styles](https://www.electricstyles.com/collections/face-masks) makes cloth masks in a variety of patterns with removable PM2.5 filters.

<hr>

## Surgical masks

* **Protection of you:** Moderate
* **Protection of others:** Good
* **Fit quality:** Mediocre
* **Breathability:** Good
* **Useful for:** Outdoor activities
* **Benefits:** Cheap
* **Downsides:** Disposable, limited protection, can't be washed. 

<figure>
<img src=${surgical} width="267", height="275"/>
</figure>


Surgical masks are a step up from cloth masks, but they have limited relevance in a world where you can get an N95 instead.  Their main advantages are being extremely cheap, widely available, and offering a bit more protection for the wearer than cloth masks.  Consequently we’re not going to focus on them that much in this post.

<hr>

## KN95 masks with ear loops

* **Protection of you:** Moderate to Good
* **Protection of others:** Good
* **Fit quality:** Mediocre to Good
* **Breathability:** Good
* **Useful for:** Outdoor activities
* **Benefits:** Cheap
* **Downsides:** Disposable, limited protection, can’t be washed,  look out for shady KN95 vendors 

<figure>
<img src=${kn95earloop} width="270", height="270"/>
</figure>

KN95 is the Chinese standard that is “equivalent” to the N95 respirator standard that is used by medical personnel to protect against viruses.  In practice, very few KN95s meet the N95 standard.  Some of them are not even close.  As a result, unless you’re buying a KN95 from a reputable vendor, you’ll want to look it up on a certified testing site’s records to see how well it actually performs.  An N95 mask should have a filtration efficiency of 95% or more, but many of the KN95s on the list have filtration efficiencies of 90% or lower. (Here’s the [CDC’s testing site](https://www.cdc.gov/niosh/npptl/respirators/testing/NonNIOSHresults.html) where you can check the effectiveness of your KN95.)

Another challenge with KN95 masks is that most of them come with ear loops instead of head straps.  Unfortunately, ear loops don’t provide sufficient force or proper angle to get the mask to form a tight seal, which reduces the quality of the fit.  Consequently, the actual filtration efficiency is substantially lower, as air can simply flow around the sides of the mask.  The ultimate fit quality is better than a surgical mask, but worse than a proper N95.

#### Shopping guide:
*   In practice, we recommend using an N95 over a KN95 for just about every reason, but if your budget is really tight, WellBefore also sells a [decent KN95](https://wellbefore.com/collections/kn95-masks/products/kn95-disposable-fda-ce?variant=32898772795521) with adjustable head straps instead of ear loops.

<hr>

## Well-fitting N95 masks (with head straps)

* **Protection of you:** Very good
* **Protection of others:** Very good
* **Fit quality:** Good to great
* **Breathability:** Good
* **Useful for:** Any regular indoor public spaces -- shopping, transit
* **Benefits:** Good enough protection for most scenarios  
* **Downsides:** Can’t be washed

<figure>
<img src=${n95} width="296", height="329"/>
</figure>

N95 respirators are the gold standard for healthcare workers.  Back in the early days of COVID, hospitals were desperate for them so that doctors and nurses could be adequately protected as they tended to COVID patients.  Now, thanks to some very aggressive efforts by companies around the world to increase supply, it’s easy for anyone who wants an N95 respirator to get one.  As a result, you should always wear an N95 if you’re going to an indoor public space.

Why should you wear an N95 when indoors?  Because they’re much, *much* better than cloth masks.  In an average part of America right now, just going to the grocery store with a cloth mask can give you a 1 in 3,000 chance of getting COVID.  Switching to an N95 mask drops that risk by 8x, to 1 in 24,000.  Interestingly, some of the countries that have most successfully fought COVID (e.g., Taiwan) have mailed free N95s to all their residents.  

However, in order to actually get that full benefit, you need to do some things properly:


### Quality
*   Look for “NIOSH-approved” on the product.  This means that the N95 has been properly tested for filtration efficiency by a government standards organization. 

### Fit
*   You need to get an N95 mask that fits your face properly.  Even small holes around the side will drop the mask’s filtration efficiency from 95% to something like 70% ([link to study](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306645/)).  Thus it’s vital that your mask forms a tight seal around your mouth.  You may need to try a few brands until you find one that fits you and your beautiful, unique nose.  [Here’s a video guide to mask handling and seal checks](https://www.youtube.com/watch?v=U8Inww-1avg) (note that the video shows them using valved respirators, but this advice also applies to valveless respirators).  Basically, when you breathe in or out sharply, you should not feel any air sliding in around the edge of the mask. If you have a beard or other facial hair that interferes with the mask’s ability to form a seal, you DO NOT have a good fit.  While it’s still good to wear an N95, you are only getting moderately better protection than a surgical mask if you have facial hair.  We're sure your beard is sexy, but not giving your friends COVID is even sexier! 
*   The nose bridge and the bottom of the chin are where fit is most often an issue.  Any good N95 will have a wire or metal strip on the nose bridge so that it will fit your nose.
*   The mask should have straps that go around the back of your head, not just ear loops.  Head straps give you a tighter fit.

### Reusing your N95
*   You’ll need to throw out your N95 mask if it gets overly dirty or difficult to breathe through.
*   If it gets wet, its filtration efficiency will drop to around 70%, making it much less effective than an intact N95, but still better than a cloth or surgical mask.  
*   If you have a large supply of N95 masks and there are no shortages in your region, you should consider retiring each mask after 8 hours of total use.  This is the recommended lifetime stated by most manufacturers.  However, if supplies are low, it is possible to continue to use the same mask for longer than 8 hours.  While most N95 masks designed for 8 hours, and in high-particulate settings (e.g., wildfires) masks will become clogged during this time, it appears that most N95 masks can still achieve good performance over longer periods of use in everyday settings where the main goal is to filter viruses.  The [CDC specifically recommends this](https://www.cdc.gov/coronavirus/2019-ncov/hcp/ppe-strategy/decontamination-reuse-respirators.html#:~:text=The%20healthcare%20staff%20member%20can,off%E2%80%9D%20during%20storage.) when supplies are low, though it notes that filtration efficiency will decrease during extended use.  However, even an N95 that has been used many times is still likely better protection than a cloth mask.     
*   Since you’ll likely reuse the mask, be sure to treat the outer surface as potentially contaminated after you wear it, especially if you’ve been to a high risk location.  A mask that’s been sitting unused for 8 days can be considered sterilized again as nearly all viruses decay by that time.  

**Exhalation valves:** It should be noted that some N95s come with an exhalation valve.  While this makes the mask easier to breathe through, it lets you expel air from your mouth without any filtration, which isn’t safe for the people around you.  However, you don’t need to throw these masks out; you can just tape over the exhalation valve (on the outside, so other people know) and then wear it like a normal N95, or just put a surgical mask over it.

<figure>
<img src=${exhalationvalvetape} width="531"/>
</figure>

**How N95s work:** N95 (and KN95) masks work on a very different principle from cloth masks -- they have an electrostatic charge that attracts small airborne particles that pass through the mask.  Water destroys the electric charge, so getting the mask wet will make it stop working.  Separately, the mask will stop working effectively once too many particles have become caught in it.  Here’s a [cute video explanation](https://www.youtube.com/watch?v=eAdanPfQdCA).

#### Shopping guide:

*   [Respokare](https://n95maskco.com/collections/n95-masks) has good N95s.  Their seal is excellent.  However, when they arrive you have to let them air out for a week first so the smell goes away.  
*   [MSC Direct](https://www.mscdirect.com/product/details/63488605) sometimes has basic but reliable 3M N95s in boxes of 50 for amazingly low prices.  Get a big box and share with your friends!
*   [Grainger](https://www.grainger.com/search?searchQuery=3M+N95) is usually sold out of valveless N95s, but you can buy very high quality valved 3M N95s from them and then cover the valve with tape or wear a cloth mask over it to filter your exhalations.  [This one](https://www.grainger.com/product/3M-Disposable-Respirator-4JG36) is expensive but very comfortable.  [This one](https://www.grainger.com/product/3M-Disposable-Respirator-4JF99) is a cheaper but still good option.
*   [WellBefore](https://wellbefore.com/collections/3m-niosh-n95-masks) has a range of good N95s, though some are usually sold out at any given time.
*   If your budget is really tight, WellBefore also sells a [decent KN95](https://wellbefore.com/collections/kn95-masks/products/kn95-disposable-fda-ce?variant=32898772795521) with adjustable head straps.  
*   If one of these vendors is sold out, try the others.  There's always inventory available from at least one of them.  In general the 3M masks are better than lesser known brands. 

<hr>

## Modified P100 respirators

* **Protection of you:** Excellent
* **Protection of others:** Very good
* **Fit quality:** Excellent
* **Breathability:** Excellent
* **Useful for:** High risk activities such as flying, traveling in crowded vehicles, or visiting hospitals.
* **Benefits:** Best protection out there, very comfortable, can wear it for hours
* **Downsides:** Large, expensive, can’t be washed, makes your voice sound funny, people will stare at you

<figure>
<img src=${p100} width="514"/>
</figure>

P100 respirators are designed for serious professional hazardous materials work — mold remediation, asbestos removal, toxic waste cleanup, tear gas attacks.  They’re the best protection you can get.  They have rubber seals that tightly cover your face, adjustable headstraps, and, best of all, filters designed to remove 99.97% of small particles from the air.  They’re designed to be comfortable and easy to breathe through for hours on end.  They won’t fog your glasses, and the inside of the mask won’t get moist even if you’re walking around or engaging in moderate exercise.  If you want to cut your risk of catching COVID way down while living in comfort, this is your tool.  

P100s are so good at filtering air that other vectors of infection (COVID-bearing droplets landing on your eyes, touching infected surfaces) become the dominant mode of transmission because your nose, mouth, and lungs are so well protected while you have the mask on.  Thus, if you’re entering a high risk area with a P100, you should also add eye protection and be very careful around sanitizing your hands and removing contaminated surfaces (eg changing clothes and showering when you’re done).   Also note that if you have a beard or other facial hair, the P100 won’t seal properly, and may function only a bit better than a surgical mask.  However, based on [studies of the actual protection level](https://en.wikipedia.org/wiki/Respirator_assigned_protection_factors) provided by P100s in realistic workplace settings, we expect that a properly fitting P100 paired with eye protection should be able to reduce your risk of catching COVID by 93.8%.  If everyone wore one of these in public, the pandemic would probably be over in a few weeks.  

However, there are a few downsides.  P100s tend to get frustrating in environments where there is a lot of socializing.  It will make your voice sound funny, like it’s coming through a blown speaker.  You will also get some funny looks, but hey, someone has to normalize the new trend.  You’ll be the badass with a fancy mask who won’t be catching that new [B117 variant](b117)! 

### Modifying your P100 to protect others and meet requirements:

Since P100s were designed for hazardous environments as opposed to pandemics, they do not provide any filtration of exhaled air, opting instead for a simple valve to vent away the air you’ve breathed.  As a result, you’ll need to make a minor modification to the mask to protect others as well.  The simplest thing to do is to cover the exhalation valve with a piece of surgical mask.  Just cut a square of the appropriate size out, then tape it over the outside of the exhalation valve so people can see that you’ve protected them.  THIS STEP IS VERY IMPORTANT!  Without it you won’t be protecting others, and you may not be allowed to board a plane or enter a hospital without doing this.  Even then, you may have to explain your modification to the person managing the gate so they understand that the mask also protects others.

This modification is easy and takes no more than 5 minutes.  You’ll need your P100, a surgical mask, and some tape.  (If you don’t have a surgical mask, you can use a piece of cloth for this purpose, but surgical masks practically grow on trees at this point.)  Find the exhalation valve on the P100.  It should be obvious, but if not, put the mask on and feel where the air blows out of the mask when you breathe out.  Cut a piece of surgical mask that’s somewhat larger than the exhalation valve and then use the tape to attach it to the exhalation valve.  You’ll want to block as little of the exhalation valve with tape as possible since you want the surgical mask to filter this air instead of having the tape block it.  If you simply tape over the exhalation valve as you do with an N95, the mask will become very difficult to breathe through, as the air you exhale will have nowhere to go.  The inhalation filters often have one-way valves, and even if they don’t, you don’t want your moist breath degrading them.

<figure>
<img src=${p100tapedmoldex} width="527"/>
</figure>

<figure>
<img src=${p100taped3m} width="527"/>
</figure>

Aside from high-particulate scenarios such as wildfire smoke, P100 respirators can generally be used for an extended period of time spanning many cumulative full days of use. The filters only need to be replaced when they become wet, excessively dirty, or difficult to breathe through.  Some P100 filters have a stated lifetime of about 6 months once opened whether you use them or not; however it is unclear whether this applies to all P100 filters or just ones that have a VOC filtering capability.  In any case, a P100 that has been open for more than 6 months is still likely your best option if you can’t get a new one.  

#### Shopping guide:

P100 respirators are sometimes sold without filters.  Thus you will need to buy a pair of separate P100 filters for your respirator.  There’s a dizzying array of options, but fortunately, you just need the simplest one, a basic P100 particulate filter without any VOC filtering capabilities.  

Options include:
*   [Moldex full-face respirator](https://www.amazon.com/gp/product/B004IVYSDW?pf_rd_r=S1E5KA094NB7YJB389JF&pf_rd_p=5ae2c7f8-e0c6-4f35-9071-dc3240e894a8) + [P100 filters](https://www.amazon.com/Moldex-M7940-7000-Particulate-Filter/dp/B015MG3XNM/)
*   [3M half-face respirator](https://www.amazon.com/3M-Facepiece-Respirator-6291-Particulate/dp/B000FTEDMM/) (pre-assembled) 
*   [GVS Ellipse](https://www.amazon.com/GVS-SPR457-Elipse-Respirator-Medium/dp/B013SIIBFQ/) half-face respirator
*   While it’s not as good as a P100, [the O2 Respirator](https://o2industries.com/products/o2-curve-1-2?variant=36154911883424) provides about 99% protection and is very well liked by its users.  

<hr>

## Eye protection - Goggles and face shields 


<figure>
<img src=${faceshield} width="243", height="243"/>
</figure>

While people primarily contract COVID through their nose and mouth, infection via the eyes is possible as well.  As a result, for high risk scenarios, it’s worth pairing your mask with goggles, safety glasses, or a face shield.  Ocular infection happens mainly through larger droplets that travel ballistically, so a complete seal is less important than it is for the nose and mouth.  Thus, the eye protection does not need to be tight fitting.  

Note that wearing a face shield on its own without a mask is almost useless for protecting you.  Small droplets and aerosols in the air will happily flow around the face shield as you breathe air in.  

<hr>

## Final thoughts

We hope this guide has been useful to you!  Our goal is to keep you protected from COVID while allowing you to still go about many of your daily routines without living in fear.  We’ve primarily focused on safety in this guide, but there are also a lot of options for making an effective mask more visually appealing, for example by wearing a cloth mask over your N95 so you get both the good look of the cloth mask and the superior protection of the electrostatic mask.    

<figure>
<img src=${n95andcloth} width="345", height="424"/>
</figure>


If you have thoughts on this guide or other products we should mention, please message us at [info@microcovid.org](mailto:info@microcovid.org).  
`

export const post = { title, summary, content, author, date, image }
export default post

import React from 'react'
import { Link } from 'react-router-dom'

import hepaFilters from './hepa_filters.png'
import HepaCalculator from './HepaCalculator'
import { ImageMeta } from 'posts/post'

const title = 'Air Purifiers, Winter, and COVID-19'

const author = 'Ben Shaya'
const date = 'November 27, 2020'
const image: ImageMeta = {
  url: hepaFilters,
  width: 3820,
  height: 2000,
}

const summary =
  'HEPA filters can provide a 4x reduction to Covid-19 transmission. We detail how to use this to reduce the risk of gatherings in the winter.'

const content: React.FunctionComponent = () => {
  return (
    <>
      <figure>
        <img
          src={hepaFilters}
          alt="A graphic depicting an air purifier taking in air with COVID virus particles and emitting only air."
        ></img>
        <figcaption>Artwork by Melody Chang</figcaption>
      </figure>
      <p>
        Brrr. It’s getting cold outside. As the northern hemisphere heads into
        winter, we are seeing a huge uptick in COVID cases from people moving
        their activities indoors. The United States is seeing more than 2x the
        daily rates of the last peak in August.
      </p>
      <iframe
        src="https://ourworldindata.org/grapher/daily-covid-cases-deaths?time=2020-01-01..2020-11-22&country=~USA"
        loading="lazy"
        title="Daily"
      ></iframe>

      <p>
        We’ve long known that the key to having safe social interactions is to
        have them Masked, Outside, and Distanced (MODified), but Outside is by
        far the biggest factor - 20x reduction of transmission risk compared to
        4-8x reduction for Masked and 2-4x reduction for Distanced. In freezing
        temperatures, though, walks and picnics are a hard sell. So how are we
        going to make it through the winter?
      </p>

      <p>
        Enter{' '}
        <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20205633v2">
          this study on air purifiers
        </a>
        . Researchers found that running air purifiers in a classroom decreased
        the aerosol density in the room by 90%, which they predict would reduce
        the transmission of COVID by <strong>4-6x</strong>. It’s not as good as
        being outside, but if you must have people over inside, an air purifier
        make the interaction safer.
      </p>

      <p>
        We’ve added air purifiers as an option in the “Environment” question on
        the <Link to="/">calculator</Link>.
      </p>

      <p>
        If you decide to buy an air purifier for COVID purposes, here’s some
        things to keep in mind:
      </p>

      <ul>
        <li>
          Make sure the purifier has a HEPA filter - these are rated to remove
          99.97% of airborne particles.
        </li>
        <li>
          Watch out for lesser filters - products labeled as "HEPA-type,"
          "HEPA-like," "HEPA-style" or "99% HEPA" do not satisfy the HEPA
          standard!
        </li>
        <li>
          Central heat / AC systems don't work for this. These typically use
          MERV-rated filters. These are significantly less effective at removing
          small particles than HEPA-rated filters (the best MERV rating,
          MERV-16, merely removes 75% of particles.
        </li>
        <li>
          Air flow matters! In the paper, they used a flow rate equivalent to
          cleaning the whole room worth of air 5 times an hour. Purifiers will
          typically rate their flow as CADR (Clean Air Delivery Rate) in CFM
          (cubic feet per minute) or m<sup>3</sup>/h (cubic meters per hour).
          For a room with 8ft tall ceilings, this works out to a{' '}
          <strong>CFM rating of 2/3 your room’s square footage</strong> (length
          * width in feet).
        </li>
        <li>
          For example, my apartment’s living room is{' '}
          <code>
            22ft x 12ft = 264 ft<sup>3</sup>
          </code>{' '}
          . So I need <code>2/3 * 264 = 176CFM</code>.{' '}
          <a href="https://www.amazon.com/LEVOIT-Filtration-Eliminators-Core-P350/dp/B08131HFSG/">
            This purifier
          </a>{' '}
          advertises a flow rate of 141 CFM, so I would need more than one for
          my space.
        </li>
        <li>
          Of course, this is microCOVID, so we've made a little calculator to do
          this math for you:
        </li>
      </ul>
      <HepaCalculator />
      <p />

      <p>And remember, all the wisdom from the summer still applies:</p>

      <ul>
        <li>
          Limit how many people you interact with indoors. Avoid gatherings with
          more than a few people.
        </li>
        <li>
          Wear a mask when you are out of the house and especially when you are
          indoors with strangers.
        </li>
        <li>
          If you are going to spend time indoors with someone, talk to them
          first about what their COVID practices are — encourage them to wear a
          mask and minimize their number of contacts in the 10 days before the
          event.
        </li>
        <li>
          If someone you’ve been in contact with starts to have COVID-like
          symptoms, isolate yourself until you can get tested.
        </li>
      </ul>

      <p>We’ll make it through this together!</p>
    </>
  )
}

export const post = { title, summary, content, author, date, image }
export default post

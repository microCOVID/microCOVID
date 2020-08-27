import React from 'react'
import { Link } from 'react-router-dom'

export const Home = (): React.ReactElement => {
  return (
    <div id="paperPage" style={{ fontSize: '16px', lineHeight: '30px' }}>
      <h2>NOTE: Please wait until Saturday 8/29 to share this widely</h2>
      <p>
        We hear that some folks are circulating this website beyond our circle
        of beta testers. While we appreciate the publicity, we the maintainers
        are still trying to finish our workweek of our full-time jobs in peace
        and quiet, and we are NOT personally ready for hordes of attention until
        the weekend. Please wait until Saturday before sharing this link any
        further.
      </p>
      <p>
        Thank you for respecting our sanity! We can't wait to see your amazing
        publicity posts on the weekend! In the meantime feel free to check out
        our tool privately and send us any feedback :)
      </p>

      <h2>What is the microCOVID project?</h2>
      <p>
        This is a project to quantitatively estimate the COVID risk to you from
        your ordinary daily activities. We trawled the scientific literature for
        data about the likelihood of getting COVID from different situations,
        and combined the data into a model that people can use. We estimate
        COVID risk in units of microCOVIDs, where 1 microCOVID = a
        one-in-a-million chance of getting COVID.
      </p>

      <h2>Where do I start?</h2>
      <p>
        This website contains three outputs of our investigation:{' '}
        <b>
          a <Link to="/calculator">calculator</Link> that you can use to
          calculate your COVID risk, a <Link to="/paper">white paper</Link> that
          explains our estimation method, and a{' '}
          <Link to="/spreadsheet/">spreadsheet</Link> to compute your COVID risk
          in more detail and to track your risk over time.
        </b>
      </p>
      <p>
        You should start with either the{' '}
        <Link to="/calculator">calculator</Link> or the{' '}
        <Link to="/paper">white paper</Link>.
      </p>

      <h2>Thanks!</h2>
      <p>
        <b>Contact us</b>: If you have any feedback, questions, or would like to
        help out, please contact us <Link to="/contact">here</Link>.
      </p>
      <p>
        <b>Donations</b>: This is an all-volunteer effort, with no current
        funding source, nor part of any existing organization. If you found our
        work helpful and want to send along a tip or a donation, we would truly
        appreciate it. Please do so{' '}
        <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8MC4NDX6RTR6Q&item_name=microCOVID+project&currency_code=USD&source=url">
          here
        </a>
        .
      </p>
      <p>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="8MC4NDX6RTR6Q" />
          <input type="hidden" name="item_name" value="microCOVID project" />
          <input type="hidden" name="currency_code" value="USD" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            src="https://www.paypal.com/en_US/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </p>

      <p>
        <i>
          Disclaimer: This work was collaboratively created by the members and
          friends of Ibasho, a communal house in San Francisco. We have based
          our numbers in this writeup on scientific research. However, unlike a
          medical or scientific standard of evidence, we state our best guess
          based on available evidence, even when that evidence is far from
          conclusive. None of us are epidemiologists. This work has not been
          scientifically peer-reviewed. Please continue to follow government
          guidance.
        </i>
      </p>
    </div>
  )
}

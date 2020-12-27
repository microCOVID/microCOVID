import React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const calculator = <Link to="/calculator">calculator</Link>

/**
 * Returns a link to the spreadsheet.
 * @param text Display text for the link. Defaults to 'spreadsheet'
 */
function spreadsheet(text = 'spreadsheet') {
  return (
    <a href="https://docs.google.com/spreadsheets/d/1DYIJgjG3H5rwt52NT2TX_m429snmIU-jGw1a8ZODwGQ">
      {text}
    </a>
  )
}

export const SubscribeForm: React.FunctionComponent = () => {
  const mailchimpCode = `
  <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
  <style type="text/css">
    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
    /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
       We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
  </style>
  <div id="mc_embed_signup" style="background-color: transparent;">
  <form action="https://microcovid.us7.list-manage.com/subscribe/post?u=f006d55c4b00443a062279a8f&amp;id=d877d78606" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
      <div id="mc_embed_signup_scroll">
    <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <div class="mc-field-group input-group" style="display: none;">
    <ul><li><input type="checkbox" value="1" name="group[78969][1]" id="mce-group[78969]-78969-0" checked><label for="mce-group[78969]-78969-0">Spreadsheet</label></li>
    </ul>
    </div>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f006d55c4b00443a062279a8f_d877d78606" tabindex="-1" value=""></div>
      <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
      </div>
  </form>
  </div>
  `

  return (
    <>
      <h2>Subscribe for spreadsheet updates</h2>
      <p>
        We will send email updates when we make feature upgrades and bugfixes to
        the spreadsheet.
      </p>
      <div
        className="mailchimp-form"
        dangerouslySetInnerHTML={{ __html: mailchimpCode }}
      />
    </>
  )
}

export const Spreadsheet = (): React.ReactElement => {
  return (
    <div className="paperPage">
      <h1>Spreadsheet</h1>
      <p>
        The {spreadsheet()} is a tool to help you with two things that the{' '}
        {calculator} is not quite powerful enough for:
      </p>
      <p>
        <ol>
          <li>
            The first is to{' '}
            <b>
              calculate someone's{' '}
              <Link to="/paper/6-person-risk">Person Risk</Link>
            </b>{' '}
            using the <Link to="/paper/9-advanced-method">Advanced Method</Link>{' '}
            as described in the white paper. The Advanced Method consists of
            adding up the person's risk in from their behaviors in the last 2-9
            days. The spreadsheet makes it easy to add up the activities.
          </li>
          <li>
            The second is to <b>track your own microCOVIDs</b> over a longer
            period of time. You might do this for a few reasons:
            <ul>
              <li>assessing your own risk,</li>
              <li>
                communicating with others about your risk status (e.g. by
                sending them a link to a sheet listing your recent behavior)
              </li>
              <li>
                creating agreements with others in your household (or bubble or
                pod) about how many microCOVIDs you are allowed to "spend"
                outside the household in a week or a month.
              </li>
            </ul>
          </li>
        </ol>
      </p>
      <p>
        The {spreadsheet()} includes a few multipliers that we mention in the{' '}
        <Link to="/paper/13-q-and-a">Q&A</Link> section but did not include in
        the main text or in the {calculator} for simplicity, such as better
        masks. Other than that, each row on the spreadsheet does exactly the
        same thing as the {calculator}.
      </p>

      <p>
        <strong>{spreadsheet('Use the spreadsheet here →')}</strong>
      </p>

      <SubscribeForm />

      <Alert variant="info">
        <strong>Spreadsheet version 2.0 coming soon:</strong> We are looking for
        beta testers for a new version of the spreadsheet. If you are interested
        in using the microCOVID spreadsheet with your household/pod to track
        your collective COVID risk and are willing in giving us feedback on this
        updated version, please email Jeremy at{' '}
        <a href="mailto:blanchard.jeremy@gmail.com">
          blanchard.jeremy@gmail.com
        </a>
        .
      </Alert>
    </div>
  )
}

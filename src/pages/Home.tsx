import React from 'react'

export const Home = (): React.ReactElement => {
  return (
    <div>
      <h2>What is the microCOVID project?</h2>
      <p>
        This is a project to quantitatively estimate the COVID risk to you from
        your ordinary daily activities.
      </p>
      <p>
        We trawled the scientific literature for data about the likelihood of
        getting COVID from different situations, and combined the data into a
        model that people can use.
      </p>

      <p>
        We estimate COVID risk in units of microCOVIDs, where 1 microCOVID = a
        one-in-a-million chance of getting COVID.
      </p>

      <h2>Who is this for?</h2>
      <p>
        You’re already familiar with some rules of thumb for avoiding COVID-19
        infection: wear a mask, stay 6 feet apart, and only socialize outdoors.
        But you're wondering: just <i>how much</i> do these things help?
      </p>
      <p>
        You're in the target audience if you are comfortable with numbers and
        want to think about how your personal choices affect your chance of
        getting COVID.
      </p>

      <h2>Where do I start?</h2>
      <p>
        This website contains three outputs of our investigation:{' '}
        <b>
          a <a href="/calculator">calculator</a> that you can use to calculate
          your COVID risk, a <a href="/paper">white paper</a> that explains our
          estimation method, and a <a href="/spreadsheet/">spreadsheet</a> to
          compute your COVID risk in more detail and to track your risk over
          time.
        </b>
      </p>
      <p>
        You should start with either the <a href="/calculator">calculator</a> or
        the <a href="/paper">white paper</a>.
      </p>

      <h3>
        <a href="/calculator/">I. The Calculator</a>
      </h3>

      <p>
        Based on our findings, we created a calculator that you can use to
        quickly guess the risk (in microCOVIDs) of various activities. We hope
        you will use it to build your intuition about the comparative risk of
        different activities and as a harm-reduction tool to make safer choices.
      </p>

      <p>
        <i>
          Note: This calculator works best if you live in the United States and
          are not at high risk of severe complications from COVID.
        </i>
      </p>

      <h3>
        <a href="https://www.microcovid.org/paper/">II. The White Paper</a>
      </h3>

      <p> In the white paper we explain how we estimate microCOVIDs.</p>

      <p>
        To compute the risk of an interaction, we need to know three things:
        <ol>
          <li>
            the chance that this activity will transmit COVID to you,{' '}
            <i>assuming</i> 1 person at this activity currently has COVID.
          </li>
          <li>
            the chance that the other person <i>actually</i>currently has COVID.
          </li>
          <li>how many people in total you are interacting with.</li>
        </ol>
      </p>

      <p>The white paper explains how we do these calculations.</p>

      <h3>
        <a href="https://www.microcovid.org/spreadsheet/">
          III. The Spreadsheet
        </a>
      </h3>

      <p>
        After you're done exploring the calculator and the white paper, you can
        use the spreadsheet to compute your COVID risk in more detail and to
        track your risk over time. We recommend starting with either the
        calculator or the white paper before diving into this.
      </p>

      <hr />

      <p>
        We hope our work will help you live more safely during the pandemic.
      </p>
      <p>
        <b>Contact us</b>: If you have any feedback, questions, or would like to
        help out, please contact us <a href="/contact">here</a>.
      </p>
      <p>
        <b>Donations</b>: This is an all-volunteer effort, with no current
        funding source, nor part of any existing organization. If you found our
        work helpful and want to send along a tip or a donation, we would truly
        appreciate it. Please do so <a href="/contact">here</a>.
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

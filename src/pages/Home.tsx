import React from 'react'

export const Home = (): React.ReactElement => {
  return (
    <div id="paperPage" style={{ fontSize: '16px', lineHeight: '30px' }}>
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

      <h2>Thanks!</h2>
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

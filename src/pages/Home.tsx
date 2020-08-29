import React from 'react'
import { Link } from 'react-router-dom'

import Donation from '../components/Donation'

export const Home = (): React.ReactElement => {
  return (
    <div id="paperPage" style={{ fontSize: '16px', lineHeight: '30px' }}>
      <h2>NOTE: Please wait until Saturday 8/29 to share this widely</h2>
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
      <p>This website contains three outputs of our investigation: </p>
      <ul>
        <li>
          a <Link to="/calculator">calculator</Link> that you can use to
          calculate your COVID risk
        </li>
        <li>
          a <Link to="/paper">white paper</Link> that explains our estimation
          method
        </li>
        <li>
          and a <Link to="/spreadsheet/">spreadsheet</Link> to compute your
          COVID risk in more detail and to track your risk over time.
        </li>
      </ul>
      <p>
        You should start with either the{' '}
        <Link to="/calculator">calculator</Link> or the{' '}
        <Link to="/paper">white paper</Link>.
      </p>

      <p className="warning">
        <h2>Disclaimer</h2>
        In this tool we state our best estimate based on available evidence,
        even when that evidence is not conclusive. We have read a lot of
        experts' research, but we are not ourselves experts in this topic. This
        work has not been scientifically peer-reviewed. There is still a lot of
        uncertainty about COVID. Do not rely on this tool for medical advice.
        Please continue to follow government guidance.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have any feedback, questions, or would like to help out, please
        contact us <Link to="/contact">here</Link>.
      </p>
      <h3>Donations</h3>
      <p>
        We also welcome donations and tips, if you feel so moved. No pressure,
        truly. We're all volunteers and we don't currently have any funding to
        work on this project. Thank you in advance!
        <Donation />
      </p>
    </div>
  )
}

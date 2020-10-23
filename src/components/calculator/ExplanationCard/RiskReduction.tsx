import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BsChevronDown, BsChevronRight } from 'react-icons/bs'

import maskDetails from './maskDetails'

export const RiskReduction: React.FunctionComponent<{
  repeatedEvent: boolean
}> = ({ repeatedEvent }) => {
  const [showMaskDetails, setShowMaskDetails] = useState(false)

  return (
    <div className="mt-2" id="additional-precautions">
      {repeatedEvent ? (
        <>
          <h4>Here are some ways of reducing the risk of this activity:</h4>
          <em>These may or may not apply to your activity.</em>
          <ol className="mt-2">
            <li>
              <abbr title="Masked, Ourdoors, Distanced">MOD</abbr>ify your
              activities (make them Masked, Outdoors, Distanced)
            </li>
            <li>
              Wear the best mask you can get!
              <br />
              <span
                className="expandable-header"
                onClick={() => setShowMaskDetails(!showMaskDetails)}
                aria-controls="mask-details"
                aria-expanded={showMaskDetails}
              >
                {showMaskDetails ? <BsChevronDown /> : <BsChevronRight />}
                Learn more about masks
              </span>
              <Collapse in={showMaskDetails}>
                <div id="mask-details">{maskDetails}</div>
              </Collapse>
            </li>
            <li>Visit public places during less crowded hours</li>
            <li>
              Reduce shopping trips by doing one trip for multiple people, using
              delivery services, or shopping online
            </li>
          </ol>
        </>
      ) : (
        <>
          <h4>
            Here are some ways you can work with close contacts to reduce their
            risk:
          </h4>
          <ol className="mt-2">
            <li>
              Talk to them about how their choices affect your risk, as well as
              theirs
            </li>
            <li>
              Ask them to <abbr title="Masked, Ourdoors, Distanced">MOD</abbr>
              ify their activities (Masked, Outdoors, Distanced)
            </li>
            <li>
              Essential workers can wear a top quality mask (e.g., N95 or KN95)
              to work
            </li>
            <li>
              Ask them to limit undistanced socializing to as few people as
              possible
            </li>
            <li>
              Encourage close contacts to isolate and get tested at the first
              sign of COVID symptoms
            </li>
            <li>
              If they have high COVID risk and you must be inside with them:
              <ul>
                <li>Wear masks inside</li>
                <li>
                  Maximize ventilation using open windows, fans blowing in
                  outside air, and HEPA filters
                </li>
                <li>Isolate within the house by staying in different rooms.</li>
              </ul>
            </li>
          </ol>
        </>
      )}
    </div>
  )
}

export default RiskReduction

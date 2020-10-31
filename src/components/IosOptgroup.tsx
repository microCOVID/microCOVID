import React from 'react'

/**
 * Adds an empty optgroup to mobile iOS devices. This is a hack that causes them to wrap text rather than truncating.
 */
export const IosOptgroup: React.FunctionComponent = () =>
  navigator.userAgent.match(/(iPad|iPhone|iPod touch);/i) ? (
    <optgroup label=""></optgroup>
  ) : null
export default IosOptgroup

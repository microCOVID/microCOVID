const SIGFIGS = 1

/**
 * Format points for display - fixed point with a set precision.
 * This is necessary because float.toPrecision will use exponential notation for large or small numbers.
 */
export function fixedPointPrecision(val: number | null): string {
  if (!val) {
    return '0'
  }
  const orderOfMagnitude = Math.floor(Math.log10(val))
  const orderOfMangitudeToDisplay = orderOfMagnitude - SIGFIGS + 1
  const decimalsToDisplay =
    orderOfMangitudeToDisplay > 0 ? 0 : -orderOfMangitudeToDisplay
  const roundedValue = Number.parseFloat(val.toPrecision(SIGFIGS))
  const withoutCommas = roundedValue.toFixed(decimalsToDisplay)
  if (withoutCommas.indexOf('.') !== -1 || withoutCommas.length <= 3) {
    return withoutCommas
  }
  // This is a super clumsy way to do this, but it's late and it worrrks
  let withCommas = ''
  const firstChunkLen = withoutCommas.length % 3
  if (firstChunkLen !== 0) {
    withCommas = withoutCommas.slice(0, firstChunkLen) + ','
  }
  for (let i = firstChunkLen; i < withoutCommas.length; i += 3) {
    withCommas += withoutCommas.slice(i, i + 3)
    if (i + 3 < withoutCommas.length) {
      withCommas += ','
    }
  }
  return withCommas
}

/**
 * Converts |val| to a percentage (including '%') with SIGFIGS sigfigs.
 * @param val
 */
export function fixedPointPrecisionPercent(val: number | null): string {
  if (!val) {
    return '0%'
  }
  return fixedPointPrecision(val * 100) + '%'
}

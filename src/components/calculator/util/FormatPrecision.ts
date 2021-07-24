// Emits a comma if the digit at `orderOfMagnitude` should be proceeded by one.
function commaIfNeeded(
  orderOfMagnitude: number,
  thousandsSeparator: string,
): string {
  return orderOfMagnitude > 0 && orderOfMagnitude % 3 === 0
    ? thousandsSeparator
    : ''
}

/**
 * Format points for display - fixed point with a set precision.
 * This is necessary because float.toPrecision will use exponential notation for large or small numbers.
 */
export function fixedPointPrecision(
  valOrNull: number | null,
  maxNumber = 1e6,
  decimalsNearMax = false,
  thousandsSeparator = ',',
): string {
  if (!valOrNull) {
    return '0'
  }
  let val: number = valOrNull
  let output = ''
  let orderOfMagnitude = Math.floor(Math.log10(val))

  if (val > 0.9 * maxNumber) {
    // Show digits until we reach one that isn't a 9.
    // For probabilities close to 1, the sigfig we want to show is (1 - P)
    // This is supposed to be equivalent to `max - fixedPointPrecision(max-val)`, but floating point math doesn't play well with decimals.

    // Helper for finding the digit at a given 10^n's place.
    const digitAtPosition = (shift: number) => {
      // If the digit is a '9', we will continue to output values, so floor
      const digit = Math.floor((val * 10 ** -shift) % 10)
      if (digit === 9) {
        return digit
      }
      return Math.round((val * 10 ** -shift) % 10)
    }

    let keepShowingDigits = true
    let shift = orderOfMagnitude
    for (; shift >= 0; --shift) {
      if (keepShowingDigits) {
        const nextDigit = digitAtPosition(shift)
        output += keepShowingDigits ? nextDigit : 0
        keepShowingDigits = nextDigit === 9
      } else {
        output += '0'
      }
      output += commaIfNeeded(shift, thousandsSeparator)
    }
    if (!keepShowingDigits || !decimalsNearMax) {
      return output
    }
    output += '.'
    while (true) {
      const nextDigit = digitAtPosition(shift)
      output += nextDigit
      if (nextDigit !== 9) {
        return output
      }
      --shift
    }
  }

  // Round now. Values like 95 will change order of magnitude as a result of rounding.
  val = Math.round(val * 10 ** -orderOfMagnitude) * 10 ** orderOfMagnitude
  orderOfMagnitude = Math.floor(Math.log10(val))

  // First digit
  output += Math.round(val * 10 ** -orderOfMagnitude)

  if (orderOfMagnitude >= 0) {
    if (orderOfMagnitude % 3 === 0) {
      output += commaIfNeeded(orderOfMagnitude, thousandsSeparator)
    }
    for (let shift = orderOfMagnitude - 1; shift >= 0; --shift) {
      output += '0'
      output += commaIfNeeded(shift, thousandsSeparator)
    }
    return output
  }

  // orderOfMagnitude < 0
  return '0.' + '0'.repeat(-orderOfMagnitude - 1) + output
}

/**
 * Converts |val| to a percentage (including '%') with SIGFIGS sigfigs.
 * @param val
 */
export function fixedPointPrecisionPercent(
  val: number | null,
  suffix = '%',
): string {
  if (!val) {
    return '0' + suffix
  }
  if (val > 0.9999999) {
    return '100' + suffix
  } else if (0.1 < val && val < 0.9) {
    return (val * 100).toFixed() + suffix
  }
  return (
    fixedPointPrecision(
      val * 100,
      /*maxNumber=*/ 100,
      /*decimalsNearMax=*/ true,
      /*thousandsSeparator=*/ '',
    ) + suffix
  )
}

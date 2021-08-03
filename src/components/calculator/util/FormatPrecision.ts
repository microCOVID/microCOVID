import i18n from 'i18n'

/**
 * Format points for display - fixed point with a set precision.
 * By default, show 2 sigfigs for numbers greater than 1 and 1 sigfig for
 * numbers less than 1.
 */
export function fixedPointPrecision(
  valOrNull: number | null,
  options: Partial<{
    maxNumber: number
    oneSigFigThreshold: number
    numberStyle: string
    useGrouping: boolean
  }> = {},
): string {
  // largest possible number microCOVID will ever display
  const maxNumber = options.maxNumber || 1e6
  // show only 1 sigfig below this value.
  const oneSigFigThreshold = options.oneSigFigThreshold || 1
  const numberStyle = options.numberStyle || 'decimal'
  const useGrouping = options.useGrouping === undefined || options.useGrouping

  if (!valOrNull) {
    return Number(0).toLocaleString(i18n.language, { style: numberStyle })
  }
  const val: number = valOrNull
  const orderOfMagnitude = Math.floor(Math.log10(val))
  let sigFigsToShow = val >= 0.9999999 * oneSigFigThreshold ? 2 : 1
  if (val > 0.9 * maxNumber) {
    // Show digits until we reach one that isn't a 9.
    // For probabilities close to 1, the sigfig we want to show is (1 - P)
    // This is supposed to be equivalent to `max - fixedPointPrecision(max-val)`, but floating point math doesn't play well with decimals.

    // Returns true if there is a 9 at the 10^n's place.
    const nineAtPosition = (value: number, shift: number): boolean => {
      const digit = Math.floor((value * 10 ** -shift) % 10)
      return digit === 9
    }

    let shift = 0
    sigFigsToShow = 1 // Show the first non-9 digit.
    for (; shift < orderOfMagnitude; ++shift) {
      // Count the number of nines.
      if (nineAtPosition(val, orderOfMagnitude - shift)) {
        sigFigsToShow += 1
      } else {
        break
      }
    }
    while (nineAtPosition(val, orderOfMagnitude - shift)) {
      sigFigsToShow += 1
      ++shift
    }
  }
  return val.toLocaleString(i18n.language, {
    maximumSignificantDigits: sigFigsToShow,
    style: numberStyle,
    useGrouping: useGrouping,
  })
}

/**
 * Converts |val| to a percentage (including '%').
 * @param val
 */
export function formatPercent(
  val: number | null,
  options: Partial<{
    decimalPointsToShow: number
  }> = {},
): string {
  if (options.decimalPointsToShow === undefined) {
    return fixedPointPrecision(!val ? 0 : val, {
      maxNumber: 1,
      oneSigFigThreshold: 0.1,
      numberStyle: 'percent',
    })
  }
  return Number(!val ? 0 : val).toLocaleString(i18n.language, {
    style: 'percent',
    minimumFractionDigits: options.decimalPointsToShow,
    maximumFractionDigits: options.decimalPointsToShow,
  })
}

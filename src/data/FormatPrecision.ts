const SIGFIGS = 2;

/**
 * Format points for display - fixed point with a set precision.
 * This is necessary because float.toPrecision will use exponential notation for large or small numbers.
 */
export function fixedPointPrecision(val: number|null): string {
  if (!val) {
    return '0';
  }
  const orderOfMagnitude = Math.floor(Math.log10(val));
  const orderOfMangitudeToDisplay = orderOfMagnitude - SIGFIGS + 1;
  const decimalsToDisplay = orderOfMangitudeToDisplay > 0 ? 0 : - orderOfMangitudeToDisplay;  
  const roundedValue = Number.parseFloat(val.toPrecision(SIGFIGS));
  return roundedValue.toFixed(decimalsToDisplay);
}

/**
 * Converts |val| to a percentage (including '%') with SIGFIGS sigfigs.
 * @param val
 */
export function fixedPointPrecisionPercent(val: number|null): string {
  if (!val) {
    return '0%';
  }
  return fixedPointPrecision(val * 100) + '%';
}
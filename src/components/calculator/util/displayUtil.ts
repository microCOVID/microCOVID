import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from './FormatPrecision'

export function showPoints(points: number): boolean {
  return points >= 0
}

export function displayPoints(points: number): string {
  return showPoints(points) ? fixedPointPrecision(points) : '—'
}

export function displayPercent(points: number): string {
  return showPoints(points) ? fixedPointPrecisionPercent(points * 1e-6) : '—%'
}

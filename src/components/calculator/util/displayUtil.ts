import { fixedPointPrecision, formatPercent } from './FormatPrecision'

export function showPoints(points: number): boolean {
  return points >= 0
}

export function displayPoints(points: number): string {
  return showPoints(points) ? fixedPointPrecision(points) : '—'
}

export function displayPointsPercent(points: number): string {
  return showPoints(points) ? formatPercent(points * 1e-6) : '—%'
}

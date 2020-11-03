import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'

ReactGA.initialize('UA-176544991-1', {
  testMode: process.env.NODE_ENV === 'test',
})

export function PageViews(): null {
  const location = useLocation()
  ReactGA.pageview(location.pathname)
  return null
}

let lastPoints = 0
export function recordCalculatorChanged(points: number): void {
  if (points === lastPoints) return
  ReactGA.event({
    category: 'Calculator',
    action: 'Calculated value',
    value: points,
  })
  lastPoints = points // Don't record an event if nothing actually changed.
}

export function recordSavedCustom(points: number): void {
  ReactGA.event({
    category: 'Calculator',
    action: 'Saved custom scenario',
    value: points,
  })
}

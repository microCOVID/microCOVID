import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = (): null => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '') {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

import { RenderOptions, RenderResult, render } from '@testing-library/react'
import React, { ComponentType } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

export interface AllProviderProps {
  children: React.ReactElement
}

const AllProviders = ({ children }: AllProviderProps): React.ReactElement => {
  return (
    <HelmetProvider>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          {children}
        </QueryParamProvider>
      </Router>
    </HelmetProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions,
): void => {
  // Override to avoid a NotImplemented error for scrollTo()
  window.scrollTo = jest.fn()

  render(ui, { wrapper: AllProviders as ComponentType, ...options })
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/' } = {},
): RenderResult => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: Router })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

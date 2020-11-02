import { RenderOptions, RenderResult, render } from '@testing-library/react'
import React, { ComponentType } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

type AllProviderProps = {
  children: React.ReactElement
}

export const AllProviders: React.ComponentType<AllProviderProps> = ({
  children,
}): React.ReactElement => {
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

export const customRender = (
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

import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

export const AllProviders: React.FunctionComponent = ({ children }) => (
  <HelmetProvider>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        {children}
      </QueryParamProvider>
    </Router>
  </HelmetProvider>
)

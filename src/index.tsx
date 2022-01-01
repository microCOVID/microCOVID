import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'

import { App } from './App'

Sentry.init({
  dsn:
    'https://20a4fef5bf06400eac36928f803e6097@o1100628.ingest.sentry.io/6125912',
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
)

import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'

import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
)

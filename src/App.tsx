import React from 'react'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Calculator } from 'pages/Calculator'
import { Home } from 'pages/Home'
import { Post } from 'pages/Post'

import 'styles/App.scss'

export const App = (): React.ReactElement => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator</Link>
            </li>
            <li>
              <Link to="/post">Post</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/calculator">
            <Calculator />
          </Route>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

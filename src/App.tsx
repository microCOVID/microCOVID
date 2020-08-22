import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Calculator } from 'pages/Calculator'
import { Home } from 'pages/Home'
import { Paper } from 'pages/Paper'

import 'styles/App.scss'

export const App = (): React.ReactElement => {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto+Slab:wght@500&display=swap"
            rel="stylesheet"
          />
          <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
            integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
            crossOrigin="anonymous"
          ></script>
        </Helmet>

        <div className="App">
          <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light">
              <a className="navbar-brand" href="/">
                microCOVID Project
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/calculator" className="nav-link">
                      Calculator
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/paper/1-intro" className="nav-link">
                      Whitepaper
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <Switch>
              <Route path="/calculator">
                <Calculator />
              </Route>
              <Route path="/paper/:id">
                <Paper />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </HelmetProvider>
  )
}

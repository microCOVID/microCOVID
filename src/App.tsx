import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import ReactGA from 'react-ga'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import { Footer } from 'components/Footer'
import { ScrollToTop } from 'components/ScrollToTop'
import { Calculator } from 'pages/Calculator'
import { Contact } from 'pages/Contact'
import { Home } from 'pages/Home'
import { Paper } from 'pages/Paper'
import { Spreadsheet } from 'pages/Spreadsheet'

import 'styles/App.scss'

ReactGA.initialize('UA-176544991-1')
ReactGA.pageview(window.location.pathname + window.location.search)

export const App = (): React.ReactElement => {
  return (
    <HelmetProvider>
      <Router>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto+Slab:wght@500&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        <ScrollToTop />

        <Container>
          <Navbar expand="sm">
            <Navbar.Brand href="/">microCOVID Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item>
                  <NavLink
                    to="/"
                    className="nav-link"
                    exact
                    activeClassName="active"
                  >
                    Home
                  </NavLink>
                </Nav.Item>

                <Nav.Item>
                  <NavLink
                    to="/calculator"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Calculator
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/paper"
                    className="nav-link"
                    activeClassName="active"
                  >
                    White Paper
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/spreadsheet"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Spreadsheet
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/contact"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Contact Us
                  </NavLink>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/calculator">
              <Calculator />
            </Route>
            <Route path="/paper/:id">
              <Paper />
            </Route>
            <Route exact path="/paper">
              <Redirect to="/paper/1-intro" />
            </Route>
            <Route path="/spreadsheet">
              <Spreadsheet />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>

        <Footer />
      </Router>
    </HelmetProvider>
  )
}

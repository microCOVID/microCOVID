import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

import { PageViews } from 'components/Analytics'
import { Footer } from 'components/Footer'
import { ScrollToTop } from 'components/ScrollToTop'
import { About } from 'pages/About'
import { Calculator } from 'pages/Calculator'
import { Contact } from 'pages/Contact'
import { Paper, PaperTOC } from 'pages/Paper'
import { Spreadsheet } from 'pages/Spreadsheet'
import { pages } from 'paper/index'

import 'styles/App.scss'

export const App = (): React.ReactElement => {
  return (
    <HelmetProvider>
      <Router>
        <PageViews />
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto+Slab:wght@500&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        <ScrollToTop />

        <Container>
          <Navbar expand="md">
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
                    Calculator
                  </NavLink>
                </Nav.Item>

                <Nav.Item>
                  <NavLink
                    to="/about"
                    className="nav-link"
                    activeClassName="active"
                  >
                    About
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavDropdown title="White Paper" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/paper">
                      Table of Contents
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/paper/all">
                      All In One Page
                    </NavDropdown.Item>
                    {Object.keys(pages).map((pageId, pageIndex) => (
                      <NavDropdown.Item
                        href={`/paper/${pageId}`}
                        key={pageIndex}
                      >
                        {pageIndex + 1}. {pages[pageId].shortTitle}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
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
              <Redirect to={{ pathname: '/' }} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/paper/:id">
              <Paper />
            </Route>
            <Route exact path="/paper">
              <PaperTOC />
            </Route>
            <Route path="/spreadsheet">
              <Spreadsheet />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Calculator />
            </Route>
          </Switch>
        </Container>

        <Footer />
      </Router>
    </HelmetProvider>
  )
}

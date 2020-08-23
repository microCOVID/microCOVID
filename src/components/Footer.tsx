import React from 'react'
import { Container } from 'react-bootstrap'

export const Footer = (): React.ReactElement => (
  <footer className="footer">
    <Container>
      <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
        <img
          alt="Creative Commons License"
          style={{ borderWidth: 0 }}
          src="https://i.creativecommons.org/l/by/4.0/88x31.png"
        />
      </a>
      <p>
        <span property="dct:title">microCOVID Project</span> by{' '}
        <a
          href="https://microcovid.org/"
          property="cc:attributionName"
          rel="cc:attributionURL"
        >
          Ibasho and friends
        </a>
        {' is licensed under a '}
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International License
        </a>
        .
      </p>
      Permissions beyond the scope of this license may be available at{' '}
      <a
        href="https://github.com/microcovid/microcovid"
        rel="cc:morePermissions"
      >
        https://github.com/microcovid/microcovid
      </a>
    </Container>
  </footer>
)

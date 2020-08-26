import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
        <Link
          to="/paper/1-intro#authors"
          property="cc:attributionName"
          rel="cc:attributionURL"
        >
          the Ibasho community
        </Link>
        {' is licensed under a '}
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International License
        </a>
        .
      </p>
      Permissions beyond the scope of this license may be available at{' '}
      <a
        href="https://github.com/microcovid/microcovid/blob/main/LICENSE"
        rel="cc:morePermissions"
      >
        https://github.com/microcovid/microcovid
      </a>
    </Container>
  </footer>
)

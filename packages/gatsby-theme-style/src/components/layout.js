/** @jsx jsx */
import React from 'react';
import { Link } from 'gatsby';
import { css, jsx, Global } from '@emotion/core';
import useSiteMetadata from '../hooks/use-sitemetadata';
import { colors, fonts } from '../tokens';

const Layout = ({ children }) => {
  const meta = useSiteMetadata();

  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            color: ${colors.text};
            font-family: ${fonts.default};
            font-size: 18px;
            margin: 0;
            padding: 0;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: ${colors.heading};
            font-family: ${fonts.heading};
          }
        `}
      />
      <header
        css={css`
          background: ${colors.primary};
          color: ${colors.white};
        `}
      >
        <nav
          css={css`
            margin: 0 auto;
            max-width: 600px;
            padding: 1rem 0;

            a {
              color: inherit;
              margin-right: 1rem;
            }
          `}
        >
          <Link to="/">{meta.title}</Link>
          <Link to="/posts/">Posts</Link>
        </nav>
      </header>
      <main
        css={css`
          margin: 3rem auto;
          max-width: 600px;
        `}
      >
        {children}
      </main>
    </React.Fragment>
  );
};

export default Layout;

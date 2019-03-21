import React from 'react';
import { Link } from 'gatsby';
import useSiteMetadata from '../hooks/use-sitemetadata';

import './layout.css';

const Layout = ({ children }) => {
  const meta = useSiteMetadata();

  return (
    <React.Fragment>
      <header className="site-header">
        <nav>
          <Link to="/">{meta.title}</Link>
          <Link to="/posts/">Posts</Link>
        </nav>
      </header>
      <main className="site-content">{children}</main>
    </React.Fragment>
  );
};

export default Layout;

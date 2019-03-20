import React from 'react';
import { Layout } from 'gatsby-theme-style';
import { Link } from 'gatsby';

const Home = () => (
  <Layout>
    <h1>Welcome to My Blog!</h1>
    <p>
      You should <Link to="/posts/">go read it</Link>.
    </p>
  </Layout>
);

export default Home;

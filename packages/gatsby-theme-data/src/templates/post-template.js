import React from 'react';
import { graphql } from 'gatsby';
import Post from '../components/post';
import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }) {
      title
      content
      author {
        name
      }
      date
    }
  }
`;

const PostTemplate = ({ data }) => (
  <Layout>
    <Post {...data.post} />
  </Layout>
);

export default PostTemplate;

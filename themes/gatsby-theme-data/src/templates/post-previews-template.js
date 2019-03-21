import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostPreview from '../components/post-preview';

export const query = graphql`
  {
    allPost {
      nodes {
        id
        title
        content
        date
        slug
        author {
          name
        }
      }
    }
  }
`;

const PostPreviewsTemplate = ({ data }) => (
  <Layout>
    {data.allPost.nodes.map(post => (
      <PostPreview key={post.id} {...post} />
    ))}
  </Layout>
);

export default PostPreviewsTemplate;

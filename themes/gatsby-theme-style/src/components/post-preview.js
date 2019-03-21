import React from 'react';
import { Link } from 'gatsby';

const PostPreview = ({ title, date, slug, author }) => (
  <section className="post-preview">
    <h2 className="post-heading">{title}</h2>
    <p className="post-byline">
      Posted on{' '}
      <time dateTime={new Date(date).toISOString()}>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>{' '}
      by {author.name}
    </p>
    <p className="read-more">
      <Link to={`/posts${slug}`}>Read this post &rarr;</Link>
    </p>
  </section>
);

export default PostPreview;

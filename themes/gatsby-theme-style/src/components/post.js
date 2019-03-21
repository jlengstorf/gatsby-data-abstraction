import React from 'react';

const Post = ({ title, content, author, date }) => (
  <React.Fragment>
    <h1 className="post-heading">{title}</h1>
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
    <div
      className="post-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </React.Fragment>
);

export default Post;

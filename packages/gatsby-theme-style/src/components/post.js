/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const Post = ({ title, content, author, date }) => (
  <React.Fragment>
    <h1
      css={css`
        margin: 0;
      `}
    >
      {title}
    </h1>
    <p
      css={css`
        font-size: 0.875rem;
        margin-top: 0.5rem;
      `}
    >
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
      css={css`
        margin-top: 2rem;
      `}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </React.Fragment>
);

export default Post;

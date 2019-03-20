/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'gatsby';
import { colors } from '../tokens';

const PostPreview = ({ title, date, slug, author }) => (
  <section
    css={css`
      margin: 0 0 1.5rem;
      padding: 0;
      & + & {
        border-top: 1px solid ${colors.text};
        padding-top: 1rem;
      }
    `}
  >
    <h2
      css={css`
        margin: 0;
      `}
    >
      {title}
    </h2>
    <p
      css={css`
        font-size: 0.875rem;
        margin: 0.5rem 0 0;
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
    <p
      css={css`
        margin: 0.5rem 0 0;
      `}
    >
      <Link to={`/posts${slug}`}>Read this post &rarr;</Link>
    </p>
  </section>
);

export default PostPreview;

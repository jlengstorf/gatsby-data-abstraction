import React from 'react';

const PostPreview = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

export default PostPreview;

import React from 'react';
import { PostFeed } from '@widgets/post-feed';

export const PostListPage: React.FC = () => {
  return (
    <div className="py-2">
      <PostFeed />
    </div>
  );
};

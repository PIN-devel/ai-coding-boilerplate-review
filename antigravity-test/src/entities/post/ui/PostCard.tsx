import React from 'react';
import type { Post } from '../model/types';
import { Card } from '@shared/ui';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <Card
      hoverable={Boolean(onClick)}
      onClick={onClick}
      className="flex flex-col justify-between h-full group"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>작성자 #{post.userId}</span>
          <span>No. {post.id}</span>
        </div>
        <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2 capitalize">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {post.body}
        </p>
      </div>
    </Card>
  );
};

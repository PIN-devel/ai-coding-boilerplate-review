import React, { useState, useMemo } from 'react';
import { usePosts, PostCard } from '@entities/post';
import { PostSearchInput } from '@features/post-search';
import { Spinner } from '@shared/ui';

export const PostFeed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: posts, isLoading, isError, error } = usePosts();

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchTerm.trim()) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">최신 게시글</h2>
          <p className="text-sm text-slate-500">
            Native fetch와 TanStack Query로 캐싱 및 패칭된 데이터 목록입니다.
          </p>
        </div>
        <PostSearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      {isLoading && (
        <div className="py-12">
          <Spinner size="lg" />
        </div>
      )}

      {isError && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          게시글을 불러오는데 실패했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}
        </div>
      )}

      {!isLoading && !isError && filteredPosts.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          검색 조건에 맞는 게시글이 없습니다.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

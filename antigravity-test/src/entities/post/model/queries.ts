import { useQuery } from '@tanstack/react-query';
import { http } from '@shared/api';
import type { Post } from './types';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: () => http.get<Post[]>('/posts', { params: { _limit: 12 } }),
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => http.get<Post>(`/posts/${id}`),
    enabled: Number.isInteger(id) && id > 0,
    staleTime: 1000 * 60 * 5,
  });
}

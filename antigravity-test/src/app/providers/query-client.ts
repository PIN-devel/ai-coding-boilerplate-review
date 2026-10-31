import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1분 동안 신선한 상태 유지
      gcTime: 1000 * 60 * 5, // 5분 동안 비활성 쿼리 가비지 컬렉션 보존
      retry: 1, // 실패 시 1회 재시도 (운영 안정성)
      refetchOnWindowFocus: false, // 탭 전환 시 자동 재요청 방지
    },
    mutations: {
      retry: 0,
    },
  },
});

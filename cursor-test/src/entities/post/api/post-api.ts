import { http } from "@shared/api";
import { appConfig } from "@shared/config";
import type { Post } from "../model/types.ts";

export function fetchPosts() {
  return http<Post[]>(`${appConfig.apiBaseUrl}/posts?_limit=3`);
}

export const postQueries = {
  list: () => ({
    queryKey: ["posts", "list"] as const,
    queryFn: fetchPosts,
  }),
};

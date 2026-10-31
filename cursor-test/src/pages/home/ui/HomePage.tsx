import { PostList } from "@features/post-list";

export function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">홈</h1>
      <p className="text-slate-600">TanStack Query로 불러온 샘플 게시글입니다.</p>
      <PostList />
    </section>
  );
}

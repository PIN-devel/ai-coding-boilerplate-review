import { postQueries } from "@entities/post";
import { formatError } from "@shared/lib";
import { useQuery } from "@tanstack/react-query";

export function PostList() {
  const postsQuery = useQuery(postQueries.list());

  if (postsQuery.isPending) {
    return <p className="text-slate-500">게시글을 불러오는 중입니다…</p>;
  }

  if (postsQuery.isError) {
    return (
      <p role="alert" className="text-red-600">
        {formatError(postsQuery.error)}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {postsQuery.data.map((post) => (
        <li key={post.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-medium text-slate-900">{post.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

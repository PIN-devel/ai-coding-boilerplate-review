import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16 text-slate-900">
      <p className="text-sm font-semibold text-blue-700">404</p>
      <h1 className="mt-3 text-3xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <Link className="mt-6 w-fit text-blue-700 underline hover:text-blue-900" to="/">홈으로 돌아가기</Link>
    </main>
  )
}

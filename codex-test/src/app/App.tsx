import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { QueryProvider } from './providers/QueryProvider'

export function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  )
}

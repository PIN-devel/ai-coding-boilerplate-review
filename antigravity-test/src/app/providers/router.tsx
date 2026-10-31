import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@widgets/layout';
import { HomePage } from '@pages/home';
import { PostListPage } from '@pages/posts';
import { NotFoundPage } from '@pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        element: <PostListPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

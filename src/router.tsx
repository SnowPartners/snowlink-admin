import DefaultLayout from '@/components/layouts/DefaultLayout';
import LoginPage from '@/pages/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import ProfileReviewPage from './pages/ProfileReview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: 'users',
        element: <div>Users</div>,
      },
      {
        path: 'profile-review',
        element: <ProfileReviewPage />,
        children: [],
      },
    ],
  },
]);

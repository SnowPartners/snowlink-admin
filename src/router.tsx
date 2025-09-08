import DefaultLayout from '@/components/layouts/DefaultLayout';
import LoginPage from '@/pages/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import ProfileReviewPage from './pages/ProfileReview';
import ProfileReviewDetailPage from './pages/ProfileReviewDetail';
import Title from 'antd/es/typography/Title';

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
        element: <Title level={3}>스노우링크 관리자 페이지입니다.</Title>,
      },
      {
        path: 'users',
        element: <div>Users</div>,
      },
      {
        path: 'profile-review',
        element: <ProfileReviewPage />,
      },
      {
        path: 'profile-review/:tempInstructorId',
        element: <ProfileReviewDetailPage />,
      },
    ],
  },
]);

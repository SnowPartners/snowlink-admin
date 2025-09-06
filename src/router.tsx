import DefaultLayout from '@/components/layouts/DefaultLayout';
import LoginPage from '@/pages/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import ProfileReviewPage from './pages/ProfileReview';
import ProfileReviewDetailPage from './pages/ProfileReviewDetail';

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
			},
			{
				path: 'profile-review/:tempInstructorId',
				element: <ProfileReviewDetailPage />,
			},
		],
	},
]);

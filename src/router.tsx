import DefaultLayout from '@/components/layouts/DefaultLayout';
import LoginPage from '@/pages/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import ProfileReviewPage from './pages/ProfileReview';
import ProfileReviewDetailPage from './pages/ProfileReviewDetail';
import InstructorListPage from './pages/Instructors';
import InstructorDetailPage from './pages/InstructorDetail';
import OwnerListPage from './pages/Owners';
import OwnerDetailPage from './pages/OwnerDetail';
import CertificationRenewalReviewPage from './pages/CertificationRenewalReview';
import DashboardPage from './pages/Dashboard';

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
				element: <DashboardPage />,
			},
			{
				path: 'instructors',
				element: <InstructorListPage />,
			},
			{
				path: 'instructors/:instructorId',
				element: <InstructorDetailPage />,
			},
			{
				path: 'owners',
				element: <OwnerListPage />,
			},
			{
				path: 'owners/:ownerId',
				element: <OwnerDetailPage />,
			},
			{
				path: 'profile-review',
				element: <ProfileReviewPage />,
			},
			{
				path: 'profile-review/:tempInstructorId',
				element: <ProfileReviewDetailPage />,
			},
			{
				path: 'certification-renewal-review',
				element: <CertificationRenewalReviewPage />,
			},
		],
	},
]);

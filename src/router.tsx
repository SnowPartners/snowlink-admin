import DefaultLayout from '@/components/layouts/DefaultLayout';
import LoginPage from '@/pages/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import ProfileReviewPage from './pages/ProfileReview';
import ProfileReviewDetailPage from './pages/ProfileReviewDetail';
import Title from 'antd/es/typography/Title';
import InstructorListPage from './pages/Instructors';
import InstructorDetailPage from './pages/InstructorDetail';
import OwnerListPage from './pages/Owners';
import OwnerDetailPage from './pages/OwnerDetail';
import CertificationRenewalReviewPage from './pages/CertificationRenewalReview';

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

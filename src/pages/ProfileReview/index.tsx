import { getPendingReviewList } from '@/apis/profileReview';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';

interface ProfileReviewTableColumn {
	title: string;
	dataIndex: string;
	key: string;
}

interface ProfileReviewTableData {
	reviewId: string;
	name: string;
	reviewStatus: string;
	userId: string;
	profileId: string;
	reviewDate: string;
}

const columns: ProfileReviewTableColumn[] = [
	{
		title: '심사 ID',
		dataIndex: 'reviewId',
		key: 'reviewId',
	},
	{
		title: '이름',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '심사 상태',
		dataIndex: 'reviewStatus',
		key: 'reviewStatus',
	},
	{
		title: '사용자 ID',
		dataIndex: 'userId',
		key: 'userId',
	},
	{
		title: '프로필 ID',
		dataIndex: 'profileId',
		key: 'profileId',
	},
	{
		title: '심사 제출 일시',
		dataIndex: 'reviewDate',
		key: 'reviewDate',
	},
];

const ProfileReviewPage = () => {
	const { data: profileReviewList, isLoading } = useQuery({
		queryKey: [QUERY_KEYS.profileReview.getPendingReviewList],
		queryFn: getPendingReviewList,
	});

	if (!profileReviewList) return <ErrorWithRetry />;

	const tableData: ProfileReviewTableData[] = profileReviewList.data.map((item) => ({
		reviewId: item.id,
		name: item.userName,
		reviewStatus: item.status,
		userId: item.userId,
		profileId: item.tempInstructorId,
		reviewDate: item.tempInstructorCreatedAt,
	}));

	return <Table columns={columns} dataSource={tableData} loading={isLoading} />;
};

export default ProfileReviewPage;

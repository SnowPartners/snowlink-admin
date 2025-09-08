import { getPendingReviewList } from '@/apis/profileReview';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { formatDateToKorean } from '@/utils/dateFormat';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
  tempInstructorId: string;
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
    title: '임시 프로필 ID',
    dataIndex: 'tempInstructorId',
    key: 'tempInstructorId',
  },
  {
    title: '심사 제출 일시',
    dataIndex: 'reviewDate',
    key: 'reviewDate',
  },
];

const ProfileReviewPage = () => {
  const navigate = useNavigate();
  const {
    data: profileReviewList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.profileReview.getPendingReviewList],
    queryFn: getPendingReviewList,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Loading />;

  if (!profileReviewList) return <ErrorWithRetry />;

  const tableData: ProfileReviewTableData[] = profileReviewList.data.map((item) => ({
    reviewId: item.id,
    name: item.userName,
    reviewStatus: item.status,
    userId: item.userId,
    tempInstructorId: item.tempInstructorId,
    reviewDate: formatDateToKorean(item.tempInstructorUpdatedAt),
  }));

  return (
    <Flex vertical gap={16}>
      <Button type='primary' onClick={() => refetch()} icon={<ReloadOutlined />} style={{ width: 'fit-content' }}>
        새로고침
      </Button>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        rowKey={(record) => record.reviewId}
        onRow={(record) => ({
          style: { cursor: 'pointer' },
          onClick: () => {
            navigate(`/admin/profile-review/${record.tempInstructorId}`);
          },
        })}
      />
    </Flex>
  );
};

export default ProfileReviewPage;

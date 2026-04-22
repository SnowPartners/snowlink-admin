import { getPendingReviewList } from '@/apis/profileReview';
import ProfileApproveConfirmModal from '@/pages/ProfileReviewDetail/components/ProfileApproveConfirmModal';
import ProfileRejectConfirmModal from '@/pages/ProfileReviewDetail/components/ProfileRejectConfirmModal';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModalStore } from '@/stores/useModalStore';
import { formatDateToKorean } from '@/utils/dateFormat';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Space, Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

interface ProfileReviewTableData {
  reviewId: string;
  name: string;
  reviewStatus: string;
  userId: string;
  tempInstructorId: string;
  reviewDate: string;
}

const ProfileReviewPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const [searchKeyword, setSearchKeyword] = useState('');
  const {
    data: profileReviewList,
    isLoading,
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
    reviewStatus: '심사중',
    userId: item.userId,
    tempInstructorId: item.tempInstructorId,
    reviewDate: formatDateToKorean(item.tempInstructorUpdatedAt),
  }));

  const filteredData = useMemo(() => {
    const normalizedSearch = searchKeyword.trim().toLowerCase();
    return tableData.filter((item) => {
      if (!normalizedSearch) {
        return true;
      }
      return [item.reviewId, item.name, item.userId, item.tempInstructorId, item.reviewStatus]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [searchKeyword, tableData]);

  const reviewStatusCount = filteredData.length;

  const handleOpenApproveModal = (tempInstructorId: string) => {
    openModal(<ProfileApproveConfirmModal tempInstructorId={tempInstructorId} />);
  };

  const handleOpenRejectModal = (tempInstructorId: string) => {
    openModal(<ProfileRejectConfirmModal tempInstructorId={tempInstructorId} />);
  };

  const columns: ColumnsType<ProfileReviewTableData> = [
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
      render: () => (
        <Tag
          style={{ margin: 0, border: 'none', borderRadius: 999, padding: '2px 10px', fontWeight: 600, color: '#b45309', backgroundColor: '#fef3c7' }}
        >
          심사중
        </Tag>
      ),
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
    {
      title: '처리',
      key: 'actions',
      render: (_value, record) => (
        <Space>
          <Button
            type='primary'
            onClick={(event) => {
              event.stopPropagation();
              handleOpenApproveModal(record.tempInstructorId);
            }}
          >
            승인
          </Button>
          <Button
            danger
            onClick={(event) => {
              event.stopPropagation();
              handleOpenRejectModal(record.tempInstructorId);
            }}
          >
            거절
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          강사 프로필 심사
        </h2>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>프로필 심사 대기 건을 확인하고 승인 또는 거절을 진행합니다.</p>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #eff2f8',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          padding: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>심사 대기 현황</div>
          <Tag color='blue' style={{ borderRadius: 999, padding: '2px 10px', fontWeight: 600 }}>
            대기 {reviewStatusCount}건
          </Tag>
        </div>
      </div>
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #eff2f8',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #f0f2f7',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Input
            allowClear
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder='심사 ID, 이름, 사용자 ID 검색...'
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            style={{ maxWidth: 520 }}
          />
          <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 'auto' }}>총 {filteredData.length}건</span>
        </div>
        
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={isLoading}
        rowKey={(record) => record.reviewId}
        pagination={false}
        onRow={(record) => ({
          style: { cursor: 'pointer' },
          onClick: () => {
            navigate(`/admin/profile-review/${record.tempInstructorId}`);
          },
        })}
      />
      </div>
    </div>
  );
};

export default ProfileReviewPage;

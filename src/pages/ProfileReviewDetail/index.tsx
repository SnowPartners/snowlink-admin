import { getPendingReviewDetail } from '@/apis/profileReview';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { LanguageSkillMap, LessonTypeMap } from '@/constants/profileReview';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModalStore } from '@/stores/useModalStore';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Descriptions, Flex, Tooltip } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileApproveConfirmModal from './components/ProfileApproveConfirmModal';
import ProfileRejectConfirmModal from './components/ProfileRejectConfirmModal';

const ProfileReviewDetailPage = () => {
  const navigate = useNavigate();
  const { tempInstructorId } = useParams();
  const { openModal } = useModalStore();

  const { data: profileReviewDetail, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.profileReview.getPendingReviewDetail, tempInstructorId],
    queryFn: () => getPendingReviewDetail(tempInstructorId!),
    enabled: !!tempInstructorId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!profileReviewDetail) {
    return <ErrorWithRetry />;
  }

  const handleClickApprove = () => {
    openModal(<ProfileApproveConfirmModal tempInstructorId={tempInstructorId!} />);
  };

  const handleClickReject = () => {
    openModal(<ProfileRejectConfirmModal tempInstructorId={tempInstructorId!} />);
  };

  const ActionButtons = () => {
    return (
      <Flex gap={16}>
        <Button type='primary' onClick={handleClickApprove}>
          승인
        </Button>
        <Button type='primary' danger onClick={handleClickReject}>
          거절
        </Button>
      </Flex>
    );
  };

  return (
    <>
      <Flex vertical gap={16}>
        <Tooltip title='목록으로 돌아가기' placement='left'>
          <ArrowLeftOutlined
            style={{ fontSize: 24, cursor: 'pointer' }}
            onClick={() => navigate('/admin/profile-review')}
          />
        </Tooltip>
        <Descriptions title='프로필 심사 상세' extra={<ActionButtons />} column={1}>
          <Descriptions.Item label='심사 ID'>{profileReviewDetail.data.tempId}</Descriptions.Item>
          <Descriptions.Item label='강습 종목'>{LessonTypeMap[profileReviewDetail.data.lessonType]}</Descriptions.Item>
          <Descriptions.Item label='강습 스키장'>{profileReviewDetail.data.resorts.join(', ')}</Descriptions.Item>
          <Descriptions.Item label='외국어 능력'>
            {profileReviewDetail.data.languages.map((language) => LanguageSkillMap[language]).join(', ') || '-'}
          </Descriptions.Item>
          <Descriptions.Item label='경력'>{profileReviewDetail.data.experience}년</Descriptions.Item>
          <Descriptions.Item label='자격증 등급'>{profileReviewDetail.data.certificationLevel}</Descriptions.Item>
          <Descriptions.Item label='첨부한 자격증 파일'>
            <a href={profileReviewDetail.data.certificationDownloadUrl} target='_blank' rel='noopener noreferrer'>
              {profileReviewDetail.data.certificationOriginalFileName}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label='첨부한 프로필 이미지'>
            <a href={profileReviewDetail.data.profileImageDownloadUrl} target='_blank' rel='noopener noreferrer'>
              프로필 이미지
            </a>
          </Descriptions.Item>
          <Descriptions.Item label='소개'>{profileReviewDetail.data.introduction}</Descriptions.Item>
        </Descriptions>
      </Flex>
    </>
  );
};

export default ProfileReviewDetailPage;

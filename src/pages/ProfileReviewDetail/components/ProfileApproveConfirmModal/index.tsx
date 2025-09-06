import { postApproveReview } from '@/apis/profileReview';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModalStore } from '@/stores/useModalStore';
import { message, Button, Space, Modal, Flex } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { useNavigate } from 'react-router-dom';

interface ProfileApproveConfirmModalProps {
  tempInstructorId: string;
}

const ProfileApproveConfirmModal = ({ tempInstructorId }: ProfileApproveConfirmModalProps) => {
  const navigate = useNavigate();
  const { closeModal } = useModalStore();

  const profileApproveMutation = useMutation({
    mutationKey: [QUERY_KEYS.profileReview.postApproveReview],
    mutationFn: postApproveReview,
    onSuccess: () => {
      message.success('승인되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.profileReview.getPendingReviewList] });
      closeModal();
      navigate('/admin/profile-review');
    },
    onError: () => {
      message.error('승인에 실패했습니다.');
    },
  });

  const handleApproveConfirm = () => {
    profileApproveMutation.mutate(tempInstructorId);
  };

  return (
    <Modal title='프로필을 승인하시겠습니까?' open={true} onCancel={closeModal} footer={null} centered>
      <Flex vertical gap={16} style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={closeModal}>취소</Button>
          <Button type='primary' onClick={handleApproveConfirm} loading={profileApproveMutation.isPending}>
            승인
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ProfileApproveConfirmModal;

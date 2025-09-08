import { REJECT_REASON_DROPDOWN_ITEMS } from '@/constants/profileReview';
import { useModalStore } from '@/stores/useModalStore';
import { Dropdown, Flex, Button, Space, Typography, Modal, type MenuProps, App } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { postRejectReview } from '@/apis/profileReview';
import { useNavigate } from 'react-router-dom';
import type { ReviewReason } from '@/types/profile';

interface ProfileRejectConfirmModalProps {
  tempInstructorId: string;
}

const ProfileRejectConfirmModal = ({ tempInstructorId }: ProfileRejectConfirmModalProps) => {
  const navigate = useNavigate();
  const { closeModal } = useModalStore();
  const { message } = App.useApp();

  const [rejectDescription, setRejectDescription] = useState('');
  const [selectedRejectReason, setSelectedRejectReason] = useState<ReviewReason | null>(null);

  const isFormValid = selectedRejectReason;

  const profileRejectMutation = useMutation({
    mutationKey: [QUERY_KEYS.profileReview.postRejectReview],
    mutationFn: (request: { category: ReviewReason; detail: string }) => postRejectReview(tempInstructorId, request),
    onSuccess: () => {
      closeModal();
      message.success('거절되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.profileReview.getPendingReviewList] });
      navigate('/admin/profile-review');
    },
    onError: () => {
      message.error('거절에 실패했습니다.');
    },
  });

  const handleRejectConfirm = () => {
    profileRejectMutation.mutate({
      category: selectedRejectReason as ReviewReason,
      detail: rejectDescription,
    });
  };

  const dropdownItems: MenuProps['items'] = REJECT_REASON_DROPDOWN_ITEMS.map((item) => ({
    key: item.key,
    label: item.label,
    onClick: () => setSelectedRejectReason(item.key as ReviewReason),
  }));

  return (
    <Modal title='프로필을 거절하시겠습니까?' open={true} onCancel={closeModal} footer={null} centered>
      <Flex vertical gap={16} style={{ width: '100%' }}>
        <Flex vertical gap={16}>
          <Space>
            <Typography.Text strong>거절 사유:</Typography.Text>
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
              <Typography.Text style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                {selectedRejectReason
                  ? REJECT_REASON_DROPDOWN_ITEMS.find((item) => item.key === selectedRejectReason)?.label
                  : '거절 사유 선택'}
                <DownOutlined />
              </Typography.Text>
            </Dropdown>
          </Space>
          <Flex vertical gap={8}>
            <Typography.Text strong>상세 사유(선택):</Typography.Text>
            <TextArea
              placeholder='거절 사유를 입력해주세요.'
              value={rejectDescription}
              onChange={(e) => setRejectDescription(e.target.value)}
              rows={4}
            />
          </Flex>
        </Flex>

        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={closeModal}>취소</Button>
          <Button type='primary' danger onClick={handleRejectConfirm} disabled={!isFormValid}>
            거절
          </Button>
        </Space>
      </Flex>
    </Modal>
  );
};

export default ProfileRejectConfirmModal;

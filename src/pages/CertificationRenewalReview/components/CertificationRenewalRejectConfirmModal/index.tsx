import { postRejectCertificationRenewal } from '@/apis/certificationReview';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { CERTIFICATION_RENEWAL_REJECT_REASON_DROPDOWN_ITEMS } from '@/constants/profileReview';
import { useModalStore } from '@/stores/useModalStore';
import { queryClient } from '@/utils/queryClient';
import { App, Button, Dropdown, Flex, Modal, Space, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { InstructorCertificationRenewalRejectReasonCategory } from '@/types/profile';

interface CertificationRenewalRejectConfirmModalProps {
	reviewId: string;
}

const CertificationRenewalRejectConfirmModal = ({ reviewId }: CertificationRenewalRejectConfirmModalProps) => {
	const { closeModal } = useModalStore();
	const { message } = App.useApp();
	const [selectedRejectReason, setSelectedRejectReason] =
		useState<InstructorCertificationRenewalRejectReasonCategory | null>(null);
	const [rejectDetail, setRejectDetail] = useState('');

	const dropdownItems: MenuProps['items'] = CERTIFICATION_RENEWAL_REJECT_REASON_DROPDOWN_ITEMS.map((item) => ({
		key: item.key,
		label: item.label,
		onClick: () => setSelectedRejectReason(item.key as InstructorCertificationRenewalRejectReasonCategory),
	}));

	const isFormValid = !!selectedRejectReason;

	const rejectMutation = useMutation({
		mutationKey: [QUERY_KEYS.certificationReview.postRejectCertificationRenewal],
		mutationFn: () =>
			postRejectCertificationRenewal(reviewId, {
				category: selectedRejectReason as InstructorCertificationRenewalRejectReasonCategory,
				detail: rejectDetail,
			}),
		onSuccess: () => {
			message.success('자격증 갱신 요청을 거절했습니다.');
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.certificationReview.getCertificationRenewalPendingList],
			});
			closeModal();
		},
		onError: () => {
			message.error('자격증 갱신 거절에 실패했습니다.');
		},
	});

	const handleConfirm = () => {
		if (!selectedRejectReason) {
			return;
		}
		rejectMutation.mutate();
	};

	return (
		<Modal title='자격증 갱신 요청을 거절하시겠습니까?' open centered footer={null} onCancel={closeModal}>
			<Flex vertical gap={16}>
				<Flex vertical gap={16}>
					<Space>
						<Typography.Text strong>거절 사유:</Typography.Text>
						<Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
							<Typography.Text style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
								{selectedRejectReason
									? CERTIFICATION_RENEWAL_REJECT_REASON_DROPDOWN_ITEMS.find((item) => item.key === selectedRejectReason)
											?.label
									: '거절 사유 선택'}
								<DownOutlined />
							</Typography.Text>
						</Dropdown>
					</Space>
					<Flex vertical gap={8}>
						<Typography.Text strong>상세 사유(선택):</Typography.Text>
						<TextArea
							placeholder='거절 사유를 입력해주세요.'
							value={rejectDetail}
							onChange={(event) => setRejectDetail(event.target.value)}
							rows={4}
						/>
					</Flex>
				</Flex>

				<Space style={{ width: '100%', justifyContent: 'flex-end' }}>
					<Button onClick={closeModal}>취소</Button>
					<Button danger onClick={handleConfirm} loading={rejectMutation.isPending} disabled={!isFormValid}>
						거절
					</Button>
				</Space>
			</Flex>
		</Modal>
	);
};

export default CertificationRenewalRejectConfirmModal;

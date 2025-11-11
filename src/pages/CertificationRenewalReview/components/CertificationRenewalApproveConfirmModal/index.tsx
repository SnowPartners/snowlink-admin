import { postApproveCertificationRenewal } from '@/apis/certificationReview';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModalStore } from '@/stores/useModalStore';
import { queryClient } from '@/utils/queryClient';
import { App, Button, Flex, Modal, Space } from 'antd';
import { useMutation } from '@tanstack/react-query';

interface CertificationRenewalApproveConfirmModalProps {
	reviewId: string;
}

const CertificationRenewalApproveConfirmModal = ({ reviewId }: CertificationRenewalApproveConfirmModalProps) => {
	const { closeModal } = useModalStore();
	const { message } = App.useApp();

	const approveMutation = useMutation({
		mutationKey: [QUERY_KEYS.certificationReview.postApproveCertificationRenewal],
		mutationFn: () => postApproveCertificationRenewal(reviewId),
		onSuccess: () => {
			message.success('자격증 갱신 요청을 승인했습니다.');
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.certificationReview.getCertificationRenewalPendingList],
			});
			closeModal();
		},
		onError: () => {
			message.error('자격증 갱신 승인에 실패했습니다.');
		},
	});

	const handleConfirm = () => {
		approveMutation.mutate();
	};

	return (
		<Modal title='자격증 갱신 요청을 승인하시겠습니까?' open centered footer={null} onCancel={closeModal}>
			<Flex vertical gap={16}>
				<Space style={{ width: '100%', justifyContent: 'flex-end' }}>
					<Button onClick={closeModal}>취소</Button>
					<Button type='primary' onClick={handleConfirm} loading={approveMutation.isPending}>
						승인
					</Button>
				</Space>
			</Flex>
		</Modal>
	);
};

export default CertificationRenewalApproveConfirmModal;


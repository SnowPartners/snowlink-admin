import { getCertificationRenewalPendingList } from '@/apis/certificationReview';
import CertificationRenewalApproveConfirmModal from './components/CertificationRenewalApproveConfirmModal';
import CertificationRenewalRejectConfirmModal from './components/CertificationRenewalRejectConfirmModal';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModalStore } from '@/stores/useModalStore';
import { formatDateToKorean } from '@/utils/dateFormat';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface CertificationRenewalTableData {
	reviewId: string;
	instructorName: string;
	experience: string;
	resorts: string;
	currentCertificationLevel: string;
	requestedCertificationLevel: string;
	certificationOriginalFileName: string;
	certificationDownloadUrl: string;
	createdAt: string;
}

const CertificationRenewalReviewPage = () => {
	const { openModal } = useModalStore();
	const {
		data: certificationRenewalPendingList,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: [QUERY_KEYS.certificationReview.getCertificationRenewalPendingList],
		queryFn: getCertificationRenewalPendingList,
		staleTime: 5 * 60 * 1000,
	});

	if (isLoading) {
		return <Loading />;
	}

	if (!certificationRenewalPendingList) {
		return <ErrorWithRetry />;
	}

	const handleOpenApproveModal = (reviewId: string) => {
		openModal(<CertificationRenewalApproveConfirmModal reviewId={reviewId} />);
	};

	const handleOpenRejectModal = (reviewId: string) => {
		openModal(<CertificationRenewalRejectConfirmModal reviewId={reviewId} />);
	};

	const tableData: CertificationRenewalTableData[] = certificationRenewalPendingList.data.map((item) => ({
		reviewId: item.reviewId,
		instructorName: item.instructorName,
		experience: item.experience,
		resorts: item.resorts.join(', '),
		currentCertificationLevel: item.currentCertificationLevel,
		requestedCertificationLevel: item.requestedCertificationLevel,
		certificationOriginalFileName: item.certificationOriginalFileName,
		certificationDownloadUrl: item.certificationDownloadUrl,
		createdAt: formatDateToKorean(item.createdAt),
	}));

	const columns: ColumnsType<CertificationRenewalTableData> = [
		{
			title: '심사 ID',
			dataIndex: 'reviewId',
			key: 'reviewId',
		},
		{
			title: '강사 이름',
			dataIndex: 'instructorName',
			key: 'instructorName',
		},
		{
			title: '경력',
			dataIndex: 'experience',
			key: 'experience',
			render: (value: string) => (value ? (value.endsWith('년') ? value : `${value}년`) : '-'),
		},
		{
			title: '강습 스키장',
			dataIndex: 'resorts',
			key: 'resorts',
			render: (value: string) => value || '-',
		},
		{
			title: '현재 등급',
			dataIndex: 'currentCertificationLevel',
			key: 'currentCertificationLevel',
		},
		{
			title: '신청 등급',
			dataIndex: 'requestedCertificationLevel',
			key: 'requestedCertificationLevel',
			render: (value: string) => <Tag color='blue'>{value}</Tag>,
		},
		{
			title: '첨부 파일',
			dataIndex: 'certificationOriginalFileName',
			key: 'certificationOriginalFileName',
			render: (_value: string, record) =>
				record.certificationDownloadUrl ? (
					<a href={record.certificationDownloadUrl} target='_blank' rel='noopener noreferrer'>
						{record.certificationOriginalFileName}
					</a>
				) : (
					'-'
				),
		},
		{
			title: '신청 일시',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: '처리',
			key: 'actions',
			render: (_value: unknown, record) => (
				<Space>
					<Button type='primary' onClick={() => handleOpenApproveModal(record.reviewId)}>
						승인
					</Button>
					<Button danger onClick={() => handleOpenRejectModal(record.reviewId)}>
						거절
					</Button>
				</Space>
			),
		},
	];

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
			/>
		</Flex>
	);
};

export default CertificationRenewalReviewPage;


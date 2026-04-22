import { getCertificationRenewalPendingList } from '@/apis/certificationReview';
import CertificationRenewalApproveConfirmModal from './components/CertificationRenewalApproveConfirmModal';
import CertificationRenewalRejectConfirmModal from './components/CertificationRenewalRejectConfirmModal';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useModalStore } from '@/stores/useModalStore';
import { formatDateToKorean } from '@/utils/dateFormat';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';

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
	const [searchKeyword, setSearchKeyword] = useState('');
	const {
		data: certificationRenewalPendingList,
		isLoading,
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

	const filteredData = useMemo(() => {
		const normalizedSearch = searchKeyword.trim().toLowerCase();
		return tableData.filter((item) => {
			if (!normalizedSearch) {
				return true;
			}
			return [item.reviewId, item.instructorName, item.currentCertificationLevel, item.requestedCertificationLevel]
				.join(' ')
				.toLowerCase()
				.includes(normalizedSearch);
		});
	}, [searchKeyword, tableData]);

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
			render: (value: string) => <Tag color='blue' style={{ padding: '1px 10px 2px', fontWeight: 600 }}>{value}</Tag>,
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
		<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
			<div>
				<h2 style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
					자격증 갱신 심사
				</h2>
				<p style={{ fontSize: 13, color: '#9ca3af' }}>자격증 갱신 신청 건을 심사하고 승인 또는 거절을 진행합니다.</p>
			</div>
			<div
				style={{
					background: '#fff',
					borderRadius: 12,
					border: '1px solid #eff2f8',
					boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
					padding: 16,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>갱신 심사 대기 현황</div>
				<Tag color='blue' style={{ borderRadius: 999, padding: '1px 10px 2px', fontWeight: 600 }}>
					대기 {filteredData.length}건
				</Tag>
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
						placeholder='심사 ID, 강사명, 등급 검색...'
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
				/>
			</div>
		</div>
	);
};

export default CertificationRenewalReviewPage;


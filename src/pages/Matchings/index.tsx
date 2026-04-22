import { getInstructorMatchingHistory } from '@/apis/dashboard';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMatchingStatusChip, MATCHING_STATUS_CHIP_MAP } from '@/constants/matchingStatusChip';
import type { MatchingHistoryItem } from '@/types/apis/dashboard';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';

type StatusFilter =
	| 'ALL'
	| keyof typeof MATCHING_STATUS_CHIP_MAP;

type SummaryStatus = 'PAYMENT_WAIT' | 'MATCHING_WAIT' | 'LESSON_WAIT' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';

const getRowStatusKey = (item: MatchingHistoryItem): SummaryStatus => {
	const m = (item.matchingStatus ?? '').toUpperCase();
	const l = (item.lessonPostStatus ?? '').toUpperCase();

	if (m.includes('CANCEL') || l === 'CANCELED' || l === 'CANCELLED' || m.includes('REJECT')) return 'CANCELLED';
	if (m.includes('COMPLETED') || l.includes('COMPLETED') || m.includes('FINISHED') || l === 'FINISHED') return 'COMPLETED';
	if (m.includes('APPROVED') || l === 'IN_PROGRESS' || m.includes('ONGOING')) return 'APPROVED';
	if (l === 'MATCHED') return 'LESSON_WAIT';
	if (l === 'RECRUITING') return 'MATCHING_WAIT';
	if (
		(m.includes('PAYMENT') || l.includes('PAYMENT')) &&
		(m.includes('WAIT') || m.includes('PENDING') || l.includes('WAIT') || l.includes('PENDING'))
	) {
		return 'PAYMENT_WAIT';
	}
	if (m.includes('MATCHING') && (m.includes('WAIT') || m.includes('PENDING'))) return 'MATCHING_WAIT';
	if (m.includes('LESSON') && (m.includes('WAIT') || m.includes('PENDING'))) return 'LESSON_WAIT';
	if (m === 'PENDING' && l === 'PENDING') return 'LESSON_WAIT';

	return 'MATCHING_WAIT';
};

const getStatusFilterKey = (item: MatchingHistoryItem): keyof typeof MATCHING_STATUS_CHIP_MAP | '' => {
	const key = (item.matchingStatus ?? '').trim().toUpperCase();
	return key in MATCHING_STATUS_CHIP_MAP ? (key as keyof typeof MATCHING_STATUS_CHIP_MAP) : '';
};

const formatMoney = (value: number) => `${new Intl.NumberFormat('ko-KR').format(value)}원`;

const MatchingsPage = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.dashboard.getInstructorMatchingHistory],
		queryFn: getInstructorMatchingHistory,
		staleTime: 5 * 60 * 1000,
	});

	const [searchKeyword, setSearchKeyword] = useState('');
	const [resortFilter, setResortFilter] = useState<string>('ALL');
	const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

	const rows = data?.data ?? [];

	const resortOptions = useMemo(() => {
		const set = new Set(rows.map((r) => r.resort).filter(Boolean));
		return Array.from(set).sort();
	}, [rows]);

	const summary = useMemo(() => {
		const total = rows.length;
		const matchingWait = rows.filter((r) => getRowStatusKey(r) === 'MATCHING_WAIT').length;
		const lessonDone = rows.filter((r) => getRowStatusKey(r) === 'COMPLETED').length;
		const lessonCancel = rows.filter((r) => getRowStatusKey(r) === 'CANCELLED').length;
		const totalPayment = rows.reduce((sum, r) => sum + (r.paymentAmount ?? 0), 0);
		return { total, matchingWait, lessonDone, lessonCancel, totalPayment };
	}, [rows]);

	const filteredRows = useMemo(() => {
		const q = searchKeyword.trim().toLowerCase();
		return rows.filter((item) => {
			const displayId = `MJ-${String(item.matchingId).padStart(3, '0')}`;
			const haystack = [displayId, item.instructorTitle, item.resort, String(item.lessonPostId)].join(' ').toLowerCase();
			const matchSearch = !q || haystack.includes(q);
			const matchResort = resortFilter === 'ALL' || item.resort === resortFilter;
			const key = getStatusFilterKey(item);
			const matchStatus = statusFilter === 'ALL' || key === statusFilter;
			return matchSearch && matchResort && matchStatus;
		});
	}, [rows, searchKeyword, resortFilter, statusFilter]);

	if (isLoading) return <Loading />;
	if (error) return <ErrorWithRetry />;

	const statusFilterButtons: { key: StatusFilter; label: string }[] = [
		{ key: 'ALL', label: '전체' },
		...Object.entries(MATCHING_STATUS_CHIP_MAP).map(([key, value]) => ({
			key: key as keyof typeof MATCHING_STATUS_CHIP_MAP,
			label: value.text,
		})),
	];

	const columns: ColumnsType<MatchingHistoryItem> = [
		{
			title: '매칭 ID',
			key: 'displayId',
			width: 122,
			render: (_, record) => `MJ-${String(record.matchingId).padStart(3, '0')}`,
		},
		{
			title: '강습 제목',
			dataIndex: 'instructorTitle',
			key: 'instructorTitle',
			width: 120,
			ellipsis: true,
			render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
		},
		{
			title: '스키장',
			dataIndex: 'resort',
			key: 'resort',
			width: 156,
			ellipsis: true,
		},
		{
			title: '일정',
			dataIndex: 'lessonDate',
			key: 'lessonDate',
			width: 220,
			ellipsis: true,
		},
		{
			title: '결제가격',
			key: 'paymentAmount',
			width: 132,
			align: 'right',
			render: (_, record) => <span style={{ fontWeight: 600 }}>{formatMoney(record.paymentAmount ?? 0)}</span>,
		},
		{
			title: '상태',
			key: 'status',
			width: 132,
			align: 'center',
			render: (_, record) => {
				const style = getMatchingStatusChip(record.matchingStatus);
				return (
					<Tag
						style={{
							border: 'none',
							borderRadius: 999,
							margin: 0,
							padding: '1px 10px 2px',
							fontWeight: 600,
							color: style.color,
							backgroundColor: style.backgroundColor,
						}}
					>
						{style.text}
					</Tag>
				);
			},
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
			<div>
				<h2 style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>매칭 관리</h2>
				<p style={{ fontSize: 13, color: '#9ca3af' }}>현재 등록된 강습 구인 건수를 확인하고 상세 정보를 조회합니다.</p>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
				<div
					style={{
						borderRadius: 12,
						padding: '14px 16px',
						background: '#1e3a5f',
						color: '#fff',
						border: '1px solid #1e3a5f',
					}}
				>
					<div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6 }}>전체</div>
					<div style={{ fontSize: 22, fontWeight: 800 }}>
						{summary.total} <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.9 }}>건</span>
					</div>
				</div>
				<div style={{ borderRadius: 12, padding: '14px 16px', background: '#fff', border: '1px solid #eff2f8' }}>
					<div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>매칭 대기</div>
					<div style={{ fontSize: 22, fontWeight: 800, color: '#2563eb' }}>
						{summary.matchingWait} <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>건</span>
					</div>
				</div>
				<div style={{ borderRadius: 12, padding: '14px 16px', background: '#fff', border: '1px solid #eff2f8' }}>
					<div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>강습 완료</div>
					<div style={{ fontSize: 22, fontWeight: 800, color: '#059669' }}>
						{summary.lessonDone} <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>건</span>
					</div>
				</div>
				<div style={{ borderRadius: 12, padding: '14px 16px', background: '#fff', border: '1px solid #eff2f8' }}>
					<div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>강습 취소</div>
					<div style={{ fontSize: 22, fontWeight: 800, color: '#dc2626' }}>
						{summary.lessonCancel} <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500 }}>건</span>
					</div>
				</div>
				<div style={{ borderRadius: 12, padding: '14px 16px', background: '#fff', border: '1px solid #eff2f8' }}>
					<div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>총 결제 금액</div>
					<div style={{ fontSize: 22, fontWeight: 800, color: '#7c3aed' }}>{formatMoney(summary.totalPayment)}</div>
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
						flexWrap: 'wrap',
						gap: 10,
						alignItems: 'center',
					}}
				>
					<Input
						allowClear
						value={searchKeyword}
						onChange={(e) => setSearchKeyword(e.target.value)}
						placeholder='매칭 ID, 강습 제목, 스키장 검색...'
						prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
						style={{ flex: '1 1 220px', minWidth: 200, maxWidth: 400 }}
					/>
					<Select
						value={resortFilter}
						onChange={(v) => setResortFilter(v)}
						style={{ width: 160 }}
						options={[{ value: 'ALL', label: '전체 스키장' }, ...resortOptions.map((r) => ({ value: r, label: r }))]}
					/>
					<Space wrap size={8} style={{ flex: '1 1 280px' }}>
						{statusFilterButtons.map((btn) => {
							const active = statusFilter === btn.key;
							return (
								<Button
									key={btn.key}
									size='small'
									type={active ? 'primary' : 'default'}
									onClick={() => setStatusFilter(btn.key)}
									style={{
										borderRadius: 999,
										height: 24,
										paddingInline: 10,
										paddingBlock: 0,
										fontSize: 11,
										fontWeight: 700,
										display: 'inline-flex',
										alignItems: 'center',
										justifyContent: 'center',
										...(active ? {} : { borderColor: '#e5e7eb' }),
									}}
								>
									{btn.label}
								</Button>
							);
						})}
					</Space>
					<span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 'auto' }}>총 {filteredRows.length}건</span>
				</div>
				<Table
					rowKey={(r) => r.matchingId}
					columns={columns}
					dataSource={filteredRows}
					pagination={false}
					scroll={{ x: 882 }}
				/>
			</div>
		</div>
	);
};

export default MatchingsPage;

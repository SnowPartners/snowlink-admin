import Loading from '@/components/fallback/Loading';
import { useInstructorList } from './hooks/useInstructorList';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import { Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { InstructorListItem } from '@/types/apis/users';
import type { Resort } from '@/types/profile';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const InstructorListPage = () => {
	const navigate = useNavigate();
	const { instructorList, isLoading, error } = useInstructorList();
	const [searchKeyword, setSearchKeyword] = useState('');
	const [selectedResort, setSelectedResort] = useState<string | null>(null);

	if (isLoading) return <Loading />;
	if (error || !instructorList) return <ErrorWithRetry />;

	const resortCounts = useMemo(() => {
		const counts = new Map<string, number>();
		instructorList.forEach((item) => {
			item.resorts.forEach((resort) => {
				counts.set(resort, (counts.get(resort) ?? 0) + 1);
			});
		});
		return Array.from(counts.entries()).map(([resort, count]) => ({ resort, count }));
	}, [instructorList]);

	const filteredData = useMemo(() => {
		const normalizedSearch = searchKeyword.trim().toLowerCase();
		return instructorList.filter((item) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				[
					item.instructorId,
					item.name,
					item.email,
					item.lessonType,
					item.certificationLevel,
					item.resorts.join(','),
					String(item.experience),
				]
					.join(' ')
					.toLowerCase()
					.includes(normalizedSearch);
			const matchesResort = !selectedResort || item.resorts.includes(selectedResort as Resort);
			return matchesSearch && matchesResort;
		});
	}, [instructorList, searchKeyword, selectedResort]);

	const columns: ColumnsType<InstructorListItem> = [
		{
			title: '강사 ID',
			dataIndex: 'instructorId',
			key: 'instructorId',
			width: 100,
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
			width: 168,
			ellipsis: true,
		},
		{
			title: '강습 종목',
			dataIndex: 'lessonType',
			key: 'lessonType',
			width: 100,
		},
		{
			title: '강습 스키장',
			dataIndex: 'resorts',
			key: 'resorts',
			width: 132,
			ellipsis: true,
			render: (resorts: Resort[]) => resorts.join(', '),
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
			ellipsis: true,
		},
		{
			title: '경력',
			dataIndex: 'experience',
			key: 'experience',
			width: 96,
			render: (value: number) => `${value}년`,
		},
		{
			title: '자격증 레벨',
			dataIndex: 'certificationLevel',
			key: 'certificationLevel',
			width: 200,
			ellipsis: true,
		},
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
			<div>
				<h2 style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>강사 관리</h2>
				<p style={{ fontSize: 13, color: '#9ca3af' }}>등록된 강사를 조회하고 상세 정보를 확인합니다.</p>
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
				<div style={{ fontSize: 12, color: '#6b7280', fontWeight: 700, marginBottom: 12 }}>스키장별 강사 수</div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(84px, 1fr))', gap: 8 }}>
					<div
						onClick={() => setSelectedResort(null)}
						style={{
							borderRadius: 8,
							padding: '8px 10px',
							border: `1.5px solid ${selectedResort ? '#e5e7eb' : '#245bff'}`,
							background: selectedResort ? '#f9fafb' : '#245bff',
							cursor: 'pointer',
						}}
					>
						<div style={{ fontSize: 11, color: selectedResort ? '#9ca3af' : 'rgba(255,255,255,0.75)', marginBottom: 3 }}>전체</div>
						<div style={{ fontSize: 16, fontWeight: 800, color: selectedResort ? '#111827' : '#fff' }}>
							{instructorList.length}
							<span style={{ fontSize: 11, marginLeft: 2, color: selectedResort ? '#9ca3af' : 'rgba(255,255,255,0.75)' }}>명</span>
						</div>
					</div>
					{resortCounts.map(({ resort, count }) => {
						const isActive = selectedResort === resort;
						return (
							<div
								key={resort}
								onClick={() => setSelectedResort(isActive ? null : resort)}
								style={{
									borderRadius: 8,
									padding: '8px 10px',
									border: `1.5px solid ${isActive ? '#245bff' : '#e5e7eb'}`,
									background: isActive ? '#245bff' : '#f9fafb',
									cursor: 'pointer',
								}}
							>
								<div
									style={{
										fontSize: 11,
										color: isActive ? 'rgba(255,255,255,0.75)' : '#9ca3af',
										marginBottom: 3,
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{resort}
								</div>
								<div style={{ fontSize: 16, fontWeight: 800, color: isActive ? '#fff' : count > 0 ? '#245bff' : '#d1d5db' }}>
									{count}
									<span style={{ fontSize: 11, marginLeft: 2, color: isActive ? 'rgba(255,255,255,0.75)' : '#9ca3af' }}>명</span>
								</div>
							</div>
						);
					})}
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
						placeholder='강사 ID, 이름, 종목, 스키장 검색...'
						prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
						style={{ maxWidth: 520 }}
					/>
					<span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 'auto' }}>총 {filteredData.length}명</span>
				</div>
				<Table
					columns={columns}
					dataSource={filteredData}
					loading={isLoading}
					rowKey={(record) => record.instructorId}
					pagination={false}
					onRow={(record) => ({
						style: { cursor: 'pointer' },
						onClick: () => {
							navigate(`/admin/instructors/${record.instructorId}`);
						},
					})}
				/>
			</div>
		</div>
	);
};

export default InstructorListPage;

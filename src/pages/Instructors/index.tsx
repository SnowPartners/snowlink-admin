import Loading from '@/components/fallback/Loading';
import { useInstructorList } from './hooks/useInstructorList';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import { Button, Flex, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { InstructorListItem } from '@/types/apis/users';
import type { Resort } from '@/types/profile';
import { useNavigate } from 'react-router-dom';

const InstructorListPage = () => {
	const navigate = useNavigate();
	const { instructorList, isLoading, error, refetch } = useInstructorList();

	if (isLoading) return <Loading />;
	if (error || !instructorList) return <ErrorWithRetry />;

	const columns: ColumnsType<InstructorListItem> = [
		{
			title: '강사 ID',
			dataIndex: 'instructorId',
			key: 'instructorId',
		},
		{
			title: '이름',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '강습 종목',
			dataIndex: 'lessonType',
			key: 'lessonType',
		},
		{
			title: '강습 스키장',
			dataIndex: 'resorts',
			key: 'resorts',
			render: (resorts: Resort[]) => resorts.join(', '),
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: '경력',
			dataIndex: 'experience',
			key: 'experience',
		},
		{
			title: '자격증 레벨',
			dataIndex: 'certificationLevel',
			key: 'certificationLevel',
		},
		{
			title: '등록 일시',
			dataIndex: 'registeredAt',
			key: 'registeredAt',
		},
	];

	const tableData: InstructorListItem[] = instructorList.map((item) => ({
		instructorId: item.instructorId,
		name: item.name,
		email: item.email,
		experience: item.experience,
		certificationLevel: item.certificationLevel,
		resorts: item.resorts,
		lessonType: item.lessonType,
	}));

	return (
		<Flex vertical gap={16}>
			<Button type='primary' onClick={() => refetch()} icon={<ReloadOutlined />} style={{ width: 'fit-content' }}>
				새로고침
			</Button>
			<Table
				columns={columns}
				dataSource={tableData}
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
		</Flex>
	);
};

export default InstructorListPage;

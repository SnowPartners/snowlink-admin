import { useOwnerList } from './hooks/useOwnerList';

import Loading from '@/components/fallback/Loading';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';

import { Button, Flex, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { Resort } from '@/types/profile';
import type { OwnerListItem } from '@/types/apis/users';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

const OwnerListPage = () => {
	const navigate = useNavigate();
	const { ownerList, isLoading, error, refetch } = useOwnerList();

	if (isLoading) return <Loading />;
	if (error || !ownerList) return <ErrorWithRetry />;

	const columns: ColumnsType<OwnerListItem> = [
		{
			title: '업체 ID',
			dataIndex: 'ownerId',
			key: 'ownerId',
		},
		{
			title: '대표자 이름',
			dataIndex: 'representativeName',
			key: 'representativeName',
		},
		{
			title: '업체명',
			dataIndex: 'companyName',
			key: 'companyName',
		},
		{
			title: '관리 스키장',
			dataIndex: 'resorts',
			key: 'resorts',
			render: (resorts: Resort[]) => resorts.join(', '),
		},
		{
			title: '이메일',
			dataIndex: 'email',
			key: 'email',
		},
	];

	const tableData: OwnerListItem[] = ownerList.map((item) => ({
		ownerId: item.ownerId,
		representativeName: item.representativeName,
		companyName: item.companyName,
		resorts: item.resorts,
		email: item.email,
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
				rowKey={(record) => record.ownerId}
				pagination={false}
				onRow={(record) => ({
					style: { cursor: 'pointer' },
					onClick: () => {
						navigate(`/admin/owners/${record.ownerId}`);
					},
				})}
			/>
		</Flex>
	);
};

export default OwnerListPage;

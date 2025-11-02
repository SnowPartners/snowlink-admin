import { useOwnerDetail } from './hooks/useOwnerDetail';
import { useParams } from 'react-router-dom';
import Loading from '@/components/fallback/Loading';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';

import { Button, Descriptions, Flex } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { formatDateToKorean } from '@/utils/dateFormat';

const OwnerDetailPage = () => {
	const { ownerId } = useParams();
	const { ownerDetail, isLoading, error, refetch } = useOwnerDetail(ownerId!);

	if (isLoading) return <Loading />;
	if (error || !ownerDetail) return <ErrorWithRetry />;

	return (
		<Flex vertical gap={16}>
			<Button type='primary' onClick={() => refetch()} icon={<ReloadOutlined />} style={{ width: 'fit-content' }}>
				새로고침
			</Button>
			<Descriptions title='업체 상세 정보' column={1}>
				<Descriptions.Item label='업체 ID'>{ownerDetail.ownerId}</Descriptions.Item>
				<Descriptions.Item label='대표자 이름'>{ownerDetail.representativeName}</Descriptions.Item>
				<Descriptions.Item label='업체명'>{ownerDetail.companyName}</Descriptions.Item>
				<Descriptions.Item label='관리 스키장'>{ownerDetail.resorts.join(', ')}</Descriptions.Item>
				<Descriptions.Item label='이메일'>{ownerDetail.email}</Descriptions.Item>
				<Descriptions.Item label='전화번호'>{ownerDetail.companyPhone}</Descriptions.Item>
				<Descriptions.Item label='등록 일시'>{formatDateToKorean(ownerDetail.registeredAt)}</Descriptions.Item>
				<Descriptions.Item label='사업자 등록 번호'>{ownerDetail.businessRegistrationNumber}</Descriptions.Item>
				<Descriptions.Item label='사업자 등록 증명서 이미지'>
					<a href={ownerDetail.businessRegistrationFileUrl} target='_blank' rel='noopener noreferrer'>
						사업자 등록 증명서 이미지
					</a>
				</Descriptions.Item>
				<Descriptions.Item label='소개'>{ownerDetail.introduction}</Descriptions.Item>
				<Descriptions.Item label='프로필 이미지'>
					<a href={ownerDetail.profileImageUrl} target='_blank' rel='noopener noreferrer'>
						프로필 이미지
					</a>
				</Descriptions.Item>
			</Descriptions>
		</Flex>
	);
};

export default OwnerDetailPage;

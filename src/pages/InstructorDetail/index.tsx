import { useInstructorDetail } from './hooks/useInstructorDetail';
import { useParams } from 'react-router-dom';
import Loading from '@/components/fallback/Loading';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import { Button, Descriptions } from 'antd';
import { Flex } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { formatDateToKorean } from '@/utils/dateFormat';

const InstructorDetailPage = () => {
	const { instructorId } = useParams();
	const { instructorDetail, isLoading, error, refetch } = useInstructorDetail(instructorId!);

	if (isLoading) return <Loading />;
	if (error || !instructorDetail) return <ErrorWithRetry />;

	return (
		<Flex vertical gap={16}>
			<Button type='primary' onClick={() => refetch()} icon={<ReloadOutlined />} style={{ width: 'fit-content' }}>
				새로고침
			</Button>
			<Descriptions title='강사 상세 정보' column={1}>
				<Descriptions.Item label='강사 ID'>{instructorDetail.instructorId}</Descriptions.Item>
				<Descriptions.Item label='이름'>{instructorDetail.name}</Descriptions.Item>
				<Descriptions.Item label='강습 종목'>{instructorDetail.lessonType}</Descriptions.Item>
				<Descriptions.Item label='강습 스키장'>{instructorDetail.resorts.join(', ')}</Descriptions.Item>
				<Descriptions.Item label='이메일'>{instructorDetail.email}</Descriptions.Item>
				<Descriptions.Item label='경력'>{instructorDetail.experience}</Descriptions.Item>
				<Descriptions.Item label='자격증 레벨'>{instructorDetail.certificationLevel}</Descriptions.Item>
				<Descriptions.Item label='등록 일시'>{formatDateToKorean(instructorDetail.registeredAt)}</Descriptions.Item>
				<Descriptions.Item label='전화번호'>{instructorDetail.phone}</Descriptions.Item>
				<Descriptions.Item label='성별'>{instructorDetail.gender}</Descriptions.Item>
				<Descriptions.Item label='계좌번호'>{instructorDetail.accountNumber}</Descriptions.Item>
				<Descriptions.Item label='은행명'>{instructorDetail.bankName}</Descriptions.Item>
				<Descriptions.Item label='소개'>{instructorDetail.introduction}</Descriptions.Item>
				<Descriptions.Item label='프로필 이미지'>
					<a href={instructorDetail.profileImageUrl} target='_blank' rel='noopener noreferrer'>
						프로필 이미지
					</a>
				</Descriptions.Item>
			</Descriptions>
		</Flex>
	);
};

export default InstructorDetailPage;

import type { PostLoginRequest, PostLoginResponse } from '@/types/apis/auth';
import type {
	GetCertificationRenewalPendingListResponse,
	PostApproveCertificationRenewalResponse,
	PostRejectCertificationRenewalRequest,
	PostRejectCertificationRenewalResponse,
} from '@/types/apis/certificationReview';
import type { BaseResponse } from '@/types/apis/common';
import type {
	GetPendingReviewDetailResponse,
	GetPendingReviewListResponse,
	PostApproveReviewResponse,
	PostRejectReviewRequest,
	PostRejectReviewResponse,
} from '@/types/apis/profileReview';
import type {
	GetInstructorMatchingHistoryResponse,
} from '@/types/apis/dashboard';
import type {
	GetInstructorDetailResponse,
	GetInstructorListResponse,
	GetOwnerDetailResponse,
	GetOwnerListResponse,
	InstructorDetail,
	OwnerDetail,
} from '@/types/apis/users';

const MOCK_DELAY_MS = 150;

const makeResponse = <T>(data: T): BaseResponse<T> => ({
	status: 'success',
	code: 200,
	errorCode: '',
	message: 'ok',
	data,
});

const delay = async () => {
	await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
};

const owners: OwnerDetail[] = [
	{
		ownerId: 'CO-001',
		representativeName: '김민준',
		email: 'mjkim@alpine.co.kr',
		companyName: '알파인 스포츠',
		companyPhone: '02-1234-5678',
		resorts: ['용평리조트'],
		registeredAt: '2024-03-15T09:30:00+09:00',
		businessRegistrationNumber: '123-45-67890',
		introduction: '10년 경력의 전문 스키 강습 업체입니다.',
		profileImageUrl: 'https://via.placeholder.com/320x200?text=Owner+Profile',
		businessRegistrationFileUrl: 'https://via.placeholder.com/320x200?text=Business+Certificate',
	},
	{
		ownerId: 'CO-002',
		representativeName: '박지현',
		email: 'jihyun@snowboarders.kr',
		companyName: '스노우보더스',
		companyPhone: '033-456-7890',
		resorts: ['하이원리조트'],
		registeredAt: '2024-04-02T14:20:00+09:00',
		businessRegistrationNumber: '234-56-78901',
		introduction: '스노보드 전문 강습 업체입니다.',
		profileImageUrl: 'https://via.placeholder.com/320x200?text=Owner+Profile',
		businessRegistrationFileUrl: 'https://via.placeholder.com/320x200?text=Business+Certificate',
	},
	{
		ownerId: 'CO-003',
		representativeName: '이서연',
		email: 'seoyeon@whiteseason.com',
		companyName: '화이트시즌',
		companyPhone: '063-789-0123',
		resorts: ['무주덕유산리조트'],
		registeredAt: '2024-04-18T11:05:00+09:00',
		businessRegistrationNumber: '345-67-89012',
		introduction: '초보자부터 고급자까지 체계적인 강습을 제공합니다.',
		profileImageUrl: 'https://via.placeholder.com/320x200?text=Owner+Profile',
		businessRegistrationFileUrl: 'https://via.placeholder.com/320x200?text=Business+Certificate',
	},
];

const instructors: InstructorDetail[] = [
	{
		instructorId: 'IN-001',
		name: '강태양',
		resorts: ['용평리조트'],
		email: 'taeyang@gmail.com',
		lessonType: 'SKI',
		experience: 8,
		certificationLevel: 'LEVEL1',
		phone: '010-1234-5678',
		gender: 'MALE',
		accountNumber: '110-1234-567890',
		bankName: '신한은행',
		introduction: '안전하고 즐거운 강습을 제공합니다.',
		profileImageUrl: 'https://via.placeholder.com/320x200?text=Instructor+Profile',
		registeredAt: '2024-03-20T10:00:00+09:00',
	},
	{
		instructorId: 'IN-002',
		name: '윤수진',
		resorts: ['하이원리조트'],
		email: 'sujin.yun@naver.com',
		lessonType: 'SNOWBOARD',
		experience: 5,
		certificationLevel: 'LEVEL2',
		phone: '010-2345-6789',
		gender: 'FEMALE',
		accountNumber: '356-0987-654321',
		bankName: '농협은행',
		introduction: '초보자 전문 스노보드 강사입니다.',
		profileImageUrl: 'https://via.placeholder.com/320x200?text=Instructor+Profile',
		registeredAt: '2024-04-05T09:15:00+09:00',
	},
	{
		instructorId: 'IN-003',
		name: '박준혁',
		resorts: ['무주덕유산리조트'],
		email: 'junhyuk.park@kakao.com',
		lessonType: 'BOTH',
		experience: 12,
		certificationLevel: 'LEVEL1',
		phone: '010-3456-7890',
		gender: 'MALE',
		accountNumber: '221-3456-789012',
		bankName: '우리은행',
		introduction: '12년 경력의 베테랑 스키 강사입니다.',
		profileImageUrl: 'https://via.placeholder.com/320x200?text=Instructor+Profile',
		registeredAt: '2024-04-12T14:30:00+09:00',
	},
];

const pendingProfileReviews = [
	{
		id: 'PR-001',
		status: 'PENDING',
		userId: 'US-0312',
		userName: '송재원',
		tempInstructorId: 'TP-0201',
		tempInstructorCreatedAt: '2025-04-18T09:00:00+09:00',
		tempInstructorUpdatedAt: '2025-04-18T09:00:00+09:00',
	},
	{
		id: 'PR-002',
		status: 'PENDING',
		userId: 'US-0313',
		userName: '류다인',
		tempInstructorId: 'TP-0202',
		tempInstructorCreatedAt: '2025-04-18T11:30:00+09:00',
		tempInstructorUpdatedAt: '2025-04-18T11:30:00+09:00',
	},
	{
		id: 'PR-003',
		status: 'PENDING',
		userId: 'US-0320',
		userName: '임도현',
		tempInstructorId: 'TP-0210',
		tempInstructorCreatedAt: '2025-04-19T08:45:00+09:00',
		tempInstructorUpdatedAt: '2025-04-19T08:45:00+09:00',
	},
];

const profileReviewDetails: Record<string, GetPendingReviewDetailResponse['data']> = {
	'TP-0201': {
		tempId: 'TP-0201',
		certificationOriginalFileName: 'ski_level2.pdf',
		certificationDownloadUrl: 'https://example.com/mock/ski_level2.pdf',
		profileImageDownloadUrl: 'https://via.placeholder.com/320x200?text=Temp+Profile+Image',
		introduction: '열정적인 스키 강사입니다.',
		experience: '3',
		lessonType: 'SKI',
		resorts: ['용평리조트'],
		languages: ['ENGLISH_BASIC'],
		certificationLevel: 'LEVEL2',
	},
	'TP-0202': {
		tempId: 'TP-0202',
		certificationOriginalFileName: 'snowboard_level2.pdf',
		certificationDownloadUrl: 'https://example.com/mock/snowboard_level2.pdf',
		profileImageDownloadUrl: 'https://via.placeholder.com/320x200?text=Temp+Profile+Image',
		introduction: '밝고 친절한 강습을 드립니다.',
		experience: '2',
		lessonType: 'SNOWBOARD',
		resorts: ['하이원리조트'],
		languages: ['JAPANESE'],
		certificationLevel: 'LEVEL2',
	},
	'TP-0210': {
		tempId: 'TP-0210',
		certificationOriginalFileName: 'ski_career.pdf',
		certificationDownloadUrl: 'https://example.com/mock/ski_career.pdf',
		profileImageDownloadUrl: 'https://via.placeholder.com/320x200?text=Temp+Profile+Image',
		introduction: '체계적인 커리큘럼으로 가르칩니다.',
		experience: '4',
		lessonType: 'SKI',
		resorts: ['비발디파크'],
		languages: ['ENGLISH_FLUENT'],
		certificationLevel: 'LEVEL2',
	},
};

const pendingCertificationReviews: GetCertificationRenewalPendingListResponse['data'] = [
	{
		reviewId: 'LR-001',
		instructorName: '강태양',
		experience: '8',
		resorts: ['용평리조트'],
		currentCertificationLevel: 'LEVEL1',
		requestedCertificationLevel: 'LEVEL1',
		certificationDownloadUrl: 'https://example.com/mock/license_renewal_001.pdf',
		certificationOriginalFileName: 'license_renewal_001.pdf',
		createdAt: '2025-04-17T10:00:00+09:00',
	},
	{
		reviewId: 'LR-002',
		instructorName: '박준혁',
		experience: '12',
		resorts: ['무주덕유산리조트'],
		currentCertificationLevel: 'LEVEL1',
		requestedCertificationLevel: 'LEVEL1',
		certificationDownloadUrl: 'https://example.com/mock/license_renewal_002.pdf',
		certificationOriginalFileName: 'license_renewal_002.pdf',
		createdAt: '2025-04-17T14:30:00+09:00',
	},
];

const matchingHistory: GetInstructorMatchingHistoryResponse['data'] = [
	{
		matchingId: 1,
		lessonPostId: 101,
		instructorTitle: '용평 주말 초보 스키 강습',
		resort: '용평리조트',
		lessonDate: '2025-04-26 09:00~12:00',
		paymentAmount: 180000,
		lessonPostStatus: 'RECRUITING',
		matchingStatus: 'PENDING',
		subject: '스키',
		headcount: 2,
		applicantCount: 2,
	},
	{
		matchingId: 2,
		lessonPostId: 102,
		instructorTitle: '하이원 스노보드 중급반',
		resort: '하이원리조트',
		lessonDate: '2025-04-27 13:00~16:00',
		paymentAmount: 150000,
		lessonPostStatus: 'MATCHED',
		matchingStatus: 'PENDING',
		subject: '스노보드',
		headcount: 1,
		applicantCount: 2,
	},
	{
		matchingId: 3,
		lessonPostId: 103,
		instructorTitle: '무주 어린이 스키 캠프',
		resort: '무주덕유산리조트',
		lessonDate: '2025-04-28 09:00~17:00',
		paymentAmount: 320000,
		lessonPostStatus: 'MATCHED',
		matchingStatus: 'PENDING',
		subject: '스키',
		headcount: 3,
		applicantCount: 1,
	},
	{
		matchingId: 4,
		lessonPostId: 104,
		instructorTitle: '비발디 VIP 스키 레슨',
		resort: '비발디파크',
		lessonDate: '2025-05-03 10:00~13:00',
		paymentAmount: 500000,
		lessonPostStatus: 'IN_PROGRESS',
		matchingStatus: 'APPROVED',
		subject: '스키',
		headcount: 1,
		applicantCount: 1,
	},
	{
		matchingId: 5,
		lessonPostId: 105,
		instructorTitle: '오크밸리 가족 스키 체험',
		resort: '오크밸리리조트',
		lessonDate: '2025-04-20 09:00~12:00',
		paymentAmount: 240000,
		lessonPostStatus: 'FINISHED',
		matchingStatus: 'COMPLETED',
		subject: '스키',
		headcount: 2,
		applicantCount: 2,
	},
	{
		matchingId: 6,
		lessonPostId: 106,
		instructorTitle: '용평 중급 스키 심화반',
		resort: '용평리조트',
		lessonDate: '2025-04-19 13:00~16:00',
		paymentAmount: 220000,
		lessonPostStatus: 'CANCELED',
		matchingStatus: 'CANCELLED',
		subject: '스키',
		headcount: 1,
		applicantCount: 1,
	},
];

export const mockPostLogin = async (_request: PostLoginRequest): Promise<PostLoginResponse> => {
	await delay();
	return makeResponse({
		accessToken: 'mock-access-token',
		tokenType: 'Bearer',
		expiresIn: 3600,
		userInfo: {
			id: 'admin-001',
			email: 'admin@snowlink.test',
			name: '관리자',
			phone: null,
			role: 'ADMIN',
		},
	});
};

export const mockGetOwnerList = async (): Promise<GetOwnerListResponse> => {
	await delay();
	return makeResponse(
		owners.map((item) => ({
			ownerId: item.ownerId,
			representativeName: item.representativeName,
			email: item.email,
			companyName: item.companyName,
			resorts: item.resorts,
		}))
	);
};

export const mockGetOwnerDetail = async (ownerId: string): Promise<GetOwnerDetailResponse> => {
	await delay();
	const owner = owners.find((item) => item.ownerId === ownerId) ?? owners[0];
	return makeResponse(owner);
};

export const mockGetInstructorList = async (): Promise<GetInstructorListResponse> => {
	await delay();
	return makeResponse(
		instructors.map((item) => ({
			instructorId: item.instructorId,
			name: item.name,
			resorts: item.resorts,
			email: item.email,
			lessonType: item.lessonType,
			experience: item.experience,
			certificationLevel: item.certificationLevel,
		}))
	);
};

export const mockGetInstructorDetail = async (instructorId: string): Promise<GetInstructorDetailResponse> => {
	await delay();
	const instructor = instructors.find((item) => item.instructorId === instructorId) ?? instructors[0];
	return makeResponse(instructor);
};

export const mockGetPendingReviewList = async (): Promise<GetPendingReviewListResponse> => {
	await delay();
	return makeResponse(pendingProfileReviews);
};

export const mockGetPendingReviewDetail = async (tempId: string): Promise<GetPendingReviewDetailResponse> => {
	await delay();
	return makeResponse(profileReviewDetails[tempId] ?? profileReviewDetails['TP-0201']);
};

export const mockPostApproveReview = async (_tempId: string): Promise<PostApproveReviewResponse> => {
	await delay();
	return makeResponse<void>(undefined);
};

export const mockPostRejectReview = async (
	_tempId: string,
	_request: PostRejectReviewRequest
): Promise<PostRejectReviewResponse> => {
	await delay();
	return makeResponse<void>(undefined);
};

export const mockGetCertificationRenewalPendingList = async (): Promise<GetCertificationRenewalPendingListResponse> => {
	await delay();
	return makeResponse(pendingCertificationReviews);
};

export const mockPostApproveCertificationRenewal = async (_reviewId: string): Promise<PostApproveCertificationRenewalResponse> => {
	await delay();
	return makeResponse<void>(undefined);
};

export const mockPostRejectCertificationRenewal = async (
	_reviewId: string,
	_request: PostRejectCertificationRenewalRequest
): Promise<PostRejectCertificationRenewalResponse> => {
	await delay();
	return makeResponse<void>(undefined);
};

export const mockGetInstructorMatchingHistory = async (): Promise<GetInstructorMatchingHistoryResponse> => {
	await delay();
	return makeResponse(matchingHistory);
};

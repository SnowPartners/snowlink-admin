import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
	GetCertificationRenewalPendingListResponse,
	PostApproveCertificationRenewalResponse,
	PostRejectCertificationRenewalResponse,
	PostRejectCertificationRenewalRequest,
} from '@/types/apis/certificationReview';
import {
	mockGetCertificationRenewalPendingList,
	mockPostApproveCertificationRenewal,
	mockPostRejectCertificationRenewal,
} from '@/mocks/mockApi';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const getCertificationRenewalPendingList = async () => {
	if (USE_MOCK_API) {
		return mockGetCertificationRenewalPendingList();
	}
	const response = await tokenAxios.get<GetCertificationRenewalPendingListResponse>(
		ENDPOINTS.certificationReview.getCertificationRenewalPendingList
	);
	return response.data;
};

export const postApproveCertificationRenewal = async (reviewId: string) => {
	if (USE_MOCK_API) {
		return mockPostApproveCertificationRenewal(reviewId);
	}
	const response = await tokenAxios.post<PostApproveCertificationRenewalResponse>(
		ENDPOINTS.certificationReview.postApproveCertificationRenewal(reviewId)
	);
	return response.data;
};

export const postRejectCertificationRenewal = async (
	reviewId: string,
	request: PostRejectCertificationRenewalRequest
) => {
	if (USE_MOCK_API) {
		return mockPostRejectCertificationRenewal(reviewId, request);
	}
	const response = await tokenAxios.post<PostRejectCertificationRenewalResponse>(
		ENDPOINTS.certificationReview.postRejectCertificationRenewal(reviewId),
		request
	);
	return response.data;
};

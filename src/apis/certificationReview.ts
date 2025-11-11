import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
	GetCertificationRenewalPendingListResponse,
	PostApproveCertificationRenewalResponse,
	PostRejectCertificationRenewalResponse,
	PostRejectCertificationRenewalRequest,
} from '@/types/apis/certificationReview';

export const getCertificationRenewalPendingList = async () => {
	const response = await tokenAxios.get<GetCertificationRenewalPendingListResponse>(
		ENDPOINTS.certificationReview.getCertificationRenewalPendingList
	);
	return response.data;
};

export const postApproveCertificationRenewal = async (reviewId: string) => {
	const response = await tokenAxios.post<PostApproveCertificationRenewalResponse>(
		ENDPOINTS.certificationReview.postApproveCertificationRenewal(reviewId)
	);
	return response.data;
};

export const postRejectCertificationRenewal = async (
	reviewId: string,
	request: PostRejectCertificationRenewalRequest
) => {
	const response = await tokenAxios.post<PostRejectCertificationRenewalResponse>(
		ENDPOINTS.certificationReview.postRejectCertificationRenewal(reviewId),
		request
	);
	return response.data;
};

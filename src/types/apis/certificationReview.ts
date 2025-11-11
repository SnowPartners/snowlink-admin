import type { CertificationLevel, Resort, InstructorCertificationRenewalRejectReasonCategory } from '../profile';
import type { BaseResponse } from './common';

export interface CertificationRenewalPendingItem {
	reviewId: string;
	instructorName: string;
	experience: string;
	resorts: Resort[];
	currentCertificationLevel: CertificationLevel;
	requestedCertificationLevel: CertificationLevel;
	certificationDownloadUrl: string;
	certificationOriginalFileName: string;
	createdAt: string;
}

export type GetCertificationRenewalPendingListResponse = BaseResponse<CertificationRenewalPendingItem[]>;

export type PostApproveCertificationRenewalResponse = BaseResponse<void>;

export type PostRejectCertificationRenewalResponse = BaseResponse<void>;

export interface PostRejectCertificationRenewalRequest {
	category: InstructorCertificationRenewalRejectReasonCategory;
	detail: string;
}

import type { CertificationLevel, LanguageSkill, LessonType, Resort } from '../profile';
import type { BaseResponse } from './common';

export interface GetPendingReviewListResponseData {
	id: string;
	status: string;
	userId: string;
	userName: string;
	tempInstructorId: string;
	tempInstructorCreatedAt: string;
}

export type GetPendingReviewListResponse = BaseResponse<GetPendingReviewListResponseData[]>;

export interface GetPendingReviewDetailResponseData {
	tempId: string;
	certificationOriginalFileName: string;
	certificationDownloadUrl: string;
	profileImageDownloadUrl: string;
	introduction: string;
	experience: string;
	lessonType: LessonType;
	resorts: Resort[];
	languages: LanguageSkill[];
	certificationLevel: CertificationLevel;
}

export type GetPendingReviewDetailResponse = BaseResponse<GetPendingReviewDetailResponseData>;

export type PostApproveReviewResponse = BaseResponse<void>;

export type PostRejectReviewResponse = BaseResponse<void>;

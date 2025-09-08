import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
  GetPendingReviewDetailResponse,
  GetPendingReviewListResponse,
  PostApproveReviewResponse,
  PostRejectReviewRequest,
  PostRejectReviewResponse,
} from '@/types/apis/profileReview';

export const getPendingReviewList = async () => {
  const response = await tokenAxios.get<GetPendingReviewListResponse>(ENDPOINTS.profileReview.getPendingReviewList);
  return response.data;
};

export const getPendingReviewDetail = async (tempId: string) => {
  const response = await tokenAxios.get<GetPendingReviewDetailResponse>(
    ENDPOINTS.profileReview.getPendingReviewDetail(tempId)
  );
  return response.data;
};

export const postApproveReview = async (tempId: string) => {
  const response = await tokenAxios.post<PostApproveReviewResponse>(ENDPOINTS.profileReview.postApproveReview(tempId));
  return response.data;
};

export const postRejectReview = async (tempId: string, request: PostRejectReviewRequest) => {
  const response = await tokenAxios.post<PostRejectReviewResponse>(
    ENDPOINTS.profileReview.postRejectReview(tempId),
    request
  );
  return response.data;
};

import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
  GetPendingReviewDetailResponse,
  GetPendingReviewListResponse,
  PostApproveReviewResponse,
  PostRejectReviewRequest,
  PostRejectReviewResponse,
} from '@/types/apis/profileReview';
import {
  mockGetPendingReviewDetail,
  mockGetPendingReviewList,
  mockPostApproveReview,
  mockPostRejectReview,
} from '@/mocks/mockApi';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const getPendingReviewList = async () => {
  if (USE_MOCK_API) {
    return mockGetPendingReviewList();
  }
  const response = await tokenAxios.get<GetPendingReviewListResponse>(ENDPOINTS.profileReview.getPendingReviewList);
  return response.data;
};

export const getPendingReviewDetail = async (tempId: string) => {
  if (USE_MOCK_API) {
    return mockGetPendingReviewDetail(tempId);
  }
  const response = await tokenAxios.get<GetPendingReviewDetailResponse>(
    ENDPOINTS.profileReview.getPendingReviewDetail(tempId)
  );
  return response.data;
};

export const postApproveReview = async (tempId: string) => {
  if (USE_MOCK_API) {
    return mockPostApproveReview(tempId);
  }
  const response = await tokenAxios.post<PostApproveReviewResponse>(ENDPOINTS.profileReview.postApproveReview(tempId));
  return response.data;
};

export const postRejectReview = async (tempId: string, request: PostRejectReviewRequest) => {
  if (USE_MOCK_API) {
    return mockPostRejectReview(tempId, request);
  }
  const response = await tokenAxios.post<PostRejectReviewResponse>(
    ENDPOINTS.profileReview.postRejectReview(tempId),
    request
  );
  return response.data;
};

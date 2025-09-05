export const ENDPOINTS = {
  auth: {
    postLogin: '/api/linksnow/admin/auth/login',
  },
  profileReview: {
    getPendingReviewList: '/api/linksnow/admin/reviews/pending',
    getPendingReviewDetail: (tempId: string) => `/api/linksnow/admin/reviews/temp/${tempId}`,
    postApproveReview: (tempId: string) => `/api/linksnow/admin/reviews/approve/${tempId}`,
    postRejectReview: (tempId: string) => `/api/linksnow/admin/reviews/reject/${tempId}`,
  },
};

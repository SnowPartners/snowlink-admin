export const QUERY_KEYS = {
  auth: {
    postLogin: 'postLogin',
  },
  profileReview: {
    getPendingReviewList: 'getPendingReviewList',
    getPendingReviewDetail: 'getPendingReviewDetail',
    postApproveReview: 'postApproveReview',
    postRejectReview: 'postRejectReview',
  },
  users: {
    getOwnerList: 'getOwnerList',
    getOwnerDetail: 'getOwnerDetail',
    getInstructorList: 'getInstructorList',
    getInstructorDetail: 'getInstructorDetail',
  },
  certificationReview: {
    getCertificationRenewalPendingList: 'getCertificationRenewalPendingList',
    postApproveCertificationRenewal: 'postApproveCertificationRenewal',
    postRejectCertificationRenewal: 'postRejectCertificationRenewal',
  },
  dashboard: {
    getInstructorMatchingHistory: 'getInstructorMatchingHistory',
  },
};

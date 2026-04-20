import { getCertificationRenewalPendingList } from '@/apis/certificationReview';
import { getPendingReviewList } from '@/apis/profileReview';
import { getInstructorList, getOwnerList } from '@/apis/users';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Card, Col, Row, Statistic } from 'antd';
import { useQueries } from '@tanstack/react-query';

const DashboardPage = () => {
  const results = useQueries({
    queries: [
      { queryKey: [QUERY_KEYS.users.getOwnerList], queryFn: getOwnerList, staleTime: 5 * 60 * 1000 },
      { queryKey: [QUERY_KEYS.users.getInstructorList], queryFn: getInstructorList, staleTime: 5 * 60 * 1000 },
      { queryKey: [QUERY_KEYS.profileReview.getPendingReviewList], queryFn: getPendingReviewList, staleTime: 5 * 60 * 1000 },
      {
        queryKey: [QUERY_KEYS.certificationReview.getCertificationRenewalPendingList],
        queryFn: getCertificationRenewalPendingList,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const [ownersResult, instructorsResult, profileReviewResult, certificationResult] = results;

  if (results.some((result) => result.isLoading)) {
    return <Loading />;
  }

  if (results.some((result) => result.isError)) {
    return <ErrorWithRetry />;
  }

  const ownerCount = ownersResult.data?.data.length ?? 0;
  const instructorCount = instructorsResult.data?.data.length ?? 0;
  const profilePendingCount = profileReviewResult.data?.data.length ?? 0;
  const certificationPendingCount = certificationResult.data?.data.length ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>대시보드</h2>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>스노우링크 관리자 운영 현황을 한눈에 확인합니다.</p>
      </div>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }}>
            <Statistic title='업체 수' value={ownerCount} suffix='개' />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }}>
            <Statistic title='강사 수' value={instructorCount} suffix='명' />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }}>
            <Statistic title='프로필 심사 대기' value={profilePendingCount} suffix='건' />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }}>
            <Statistic title='자격증 갱신 심사 대기' value={certificationPendingCount} suffix='건' />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

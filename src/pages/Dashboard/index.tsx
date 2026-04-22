import { getInstructorMatchingHistory, getSettlementStatistics } from '@/apis/dashboard';
import { getPendingReviewList } from '@/apis/profileReview';
import { getInstructorList, getOwnerList } from '@/apis/users';
import ErrorWithRetry from '@/components/fallback/ErrorWithRetry';
import Loading from '@/components/fallback/Loading';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMatchingStatusChip } from '@/constants/matchingStatusChip';
import { Card, Col, Row, Tag } from 'antd';
import { useQueries } from '@tanstack/react-query';

const DashboardPage = () => {
  const results = useQueries({
    queries: [
      { queryKey: [QUERY_KEYS.users.getOwnerList], queryFn: getOwnerList, staleTime: 5 * 60 * 1000 },
      { queryKey: [QUERY_KEYS.users.getInstructorList], queryFn: getInstructorList, staleTime: 5 * 60 * 1000 },
      {
        queryKey: [QUERY_KEYS.dashboard.getSettlementStatistics],
        queryFn: getSettlementStatistics,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: [QUERY_KEYS.dashboard.getInstructorMatchingHistory],
        queryFn: getInstructorMatchingHistory,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: [QUERY_KEYS.profileReview.getPendingReviewList],
        queryFn: getPendingReviewList,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const [ownersResult, instructorsResult, settlementResult, matchingHistoryResult, profileReviewResult] = results;

  if (results.some((result) => result.isLoading)) {
    return <Loading />;
  }

  if (results.some((result) => result.isError)) {
    return <ErrorWithRetry />;
  }

  const formatNumber = (value: number) => new Intl.NumberFormat('ko-KR').format(value);

  const ownerCount = ownersResult.data?.data?.length ?? 0;
  const instructorCount = instructorsResult.data?.data?.length ?? 0;
  const settlementStatistics = settlementResult.data?.data;
  const matchingHistory = matchingHistoryResult.data?.data ?? [];
  const pendingProfileReviews = profileReviewResult.data?.data ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h2 style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>대시보드</h2>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af' }}>SNOLINK 플랫폼 현황을 한눈에 확인하세요.</p>
      </div>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>🏢  등록된 업체</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#2563eb', lineHeight: 1.1 }}>
              {formatNumber(ownerCount)} <span style={{ fontSize: 14, color: '#6b7280' }}>개</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>🎿  등록된 강사</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#7c3aed', lineHeight: 1.1 }}>
              {formatNumber(instructorCount)} <span style={{ fontSize: 14, color: '#6b7280' }}>명</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>📋  구인 건수</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#d97706', lineHeight: 1.1 }}>
              {formatNumber(settlementStatistics?.totalCount ?? 0)} <span style={{ fontSize: 14, color: '#6b7280' }}>건</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>✅  매칭 완료</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#059669', lineHeight: 1.1 }}>
              {formatNumber(settlementStatistics?.completedCount ?? 0)} <span style={{ fontSize: 14, color: '#6b7280' }}>건</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>💰  총 거래액</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0f766e', lineHeight: 1.1 }}>
              {formatNumber(settlementStatistics?.totalAmount ?? 0)} <span style={{ fontSize: 14, color: '#6b7280' }}>원</span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Card title='최근 매칭 현황' style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 0 }}>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {matchingHistory.slice(0, 4).map((item) => {
                const statusStyle = getMatchingStatusChip(item.matchingStatus);

                return (
                  <div key={item.matchingId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{item.instructorTitle}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>
                        {item.resort} · {item.lessonDate}
                      </div>
                    </div>
                    <Tag
                      style={{
                        border: 'none',
                        borderRadius: 999,
                        padding: '2px 10px',
                        fontWeight: 600,
                        color: statusStyle.color,
                        backgroundColor: statusStyle.backgroundColor,
                      }}
                    >
                      {statusStyle.text}
                    </Tag>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title='프로필 심사 대기' style={{ borderRadius: 12, borderColor: '#eff2f8' }} bodyStyle={{ padding: 0 }}>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {pendingProfileReviews.slice(0, 4).map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{item.userName}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>
                      {item.id} · {new Date(item.tempInstructorUpdatedAt).toLocaleString('ko-KR')}
                    </div>
                  </div>
                  <Tag
                    style={{ border: 'none', borderRadius: 999, padding: '2px 10px', fontWeight: 600, color: '#92400e', backgroundColor: '#fef3c7' }}
                  >
                    심사중
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

import type { BaseResponse } from './common';

export interface SettlementStatistics {
	yearMonth: string | null;
	totalCount: number;
	totalAmount: number;
	completedCount: number;
	pendingCount: number;
	cancelledCount: number;
}

export interface MatchingHistoryItem {
	matchingId: number;
	lessonPostId: number;
	instructorTitle: string;
	resort: string;
	lessonDate: string;
	paymentAmount: number;
	lessonPostStatus: string;
	matchingStatus: string;
	/** 강습 종목 (스키/스노보드 등). API 미제공 시 UI에서 '-' 처리 */
	subject?: string;
	/** 구인 인원 수 */
	headcount?: number;
	/** 신청 강사 수 */
	applicantCount?: number;
}

export type GetSettlementStatisticsResponse = BaseResponse<SettlementStatistics>;
export type GetInstructorMatchingHistoryResponse = BaseResponse<MatchingHistoryItem[]>;

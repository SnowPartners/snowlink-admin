import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
	GetInstructorMatchingHistoryResponse,
	GetSettlementStatisticsResponse,
} from '@/types/apis/dashboard';
import { mockGetInstructorMatchingHistory, mockGetSettlementStatistics } from '@/mocks/mockApi';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const getSettlementStatistics = async () => {
	if (USE_MOCK_API) {
		return mockGetSettlementStatistics();
	}
	const response = await tokenAxios.get<GetSettlementStatisticsResponse>(ENDPOINTS.dashboard.getSettlementStatistics);
	return response.data;
};

export const getInstructorMatchingHistory = async () => {
	if (USE_MOCK_API) {
		return mockGetInstructorMatchingHistory();
	}
	const response = await tokenAxios.get<GetInstructorMatchingHistoryResponse>(ENDPOINTS.dashboard.getInstructorMatchingHistory);
	return response.data;
};

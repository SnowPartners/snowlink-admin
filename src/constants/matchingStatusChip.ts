/**
 * 대시보드「최근 매칭 현황」과 동일한 매칭 상태 칩 (matchingStatus 기준)
 */
export const MATCHING_STATUS_CHIP_MAP: Record<string, { text: string; color: string; backgroundColor: string }> = {
	COMPLETED: { text: '매칭완료', color: '#2563eb', backgroundColor: '#dbeafe' },
	IN_PROGRESS: { text: '강습중', color: '#db2777', backgroundColor: '#fce7f3' },
	PENDING: { text: '강습대기', color: '#7c3aed', backgroundColor: '#ede9fe' },
	CANCELLED: { text: '취소됨', color: '#d97706', backgroundColor: '#fef3c7' },
};

export const getMatchingStatusChip = (matchingStatus: string) => {
	return (
		MATCHING_STATUS_CHIP_MAP[matchingStatus] ?? {
			text: matchingStatus,
			color: '#6b7280',
			backgroundColor: '#f3f4f6',
		}
	);
};

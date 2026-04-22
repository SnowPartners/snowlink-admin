/**
 * 대시보드「최근 매칭 현황」과 동일한 매칭 상태 칩 (matchingStatus 기준)
 */
export const MATCHING_STATUS_CHIP_MAP: Record<string, { text: string; color: string; backgroundColor: string }> = {
	COMPLETED: { text: '강습완료', color: '#2563eb', backgroundColor: '#dbeafe' },
	APPROVED: { text: '강습대기', color: '#d97706', backgroundColor: '#fef3c7' },
	PENDING: { text: '매칭대기', color: '#7c3aed', backgroundColor: '#ede9fe' },
	CANCELLED: { text: '강습취소', color: '#db2777', backgroundColor: '#fce7f3' },
	REJECTED: { text: '강습거절', color: '#dc2626', backgroundColor: '#fee2e2' },
};

export const getMatchingStatusChip = (matchingStatus: string) => {
	const key = (matchingStatus ?? '').trim().toUpperCase();
	return (
		MATCHING_STATUS_CHIP_MAP[key] ?? {
			text: matchingStatus?.trim() || '-',
			color: '#6b7280',
			backgroundColor: '#f3f4f6',
		}
	);
};

/**
 * ISO 8601 형식의 날짜 문자열을 한국어 형식으로 변환
 * @param isoString ISO 8601 형식의 날짜 문자열 (예: "2025-09-06T17:45:25.236822")
 * @returns 한국어 형식의 날짜 문자열 (예: "2025년 9월 6일 17시 45분 25초")
 */
export const formatDateToKorean = (isoString: string): string => {
	try {
		const date = new Date(isoString);

		// 유효하지 않은 날짜인지 확인
		if (isNaN(date.getTime())) {
			console.warn(`[formatDateToKorean] Invalid date string: ${isoString}`);
			return isoString;
		}

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
	} catch (error) {
		console.error(`[formatDateToKorean] Error formatting date: ${isoString}`, error);
		return isoString;
	}
};

/**
 * ISO 8601 형식의 날짜 문자열을 간단한 한국어 형식으로 변환 (시간 제외)
 * @param isoString ISO 8601 형식의 날짜 문자열 (예: "2025-09-06T17:45:25.236822")
 * @returns 간단한 한국어 형식의 날짜 문자열 (예: "2025년 9월 6일")
 */
export const formatDateToKoreanSimple = (isoString: string): string => {
	try {
		const date = new Date(isoString);

		if (isNaN(date.getTime())) {
			console.warn(`[formatDateToKoreanSimple] Invalid date string: ${isoString}`);
			return isoString;
		}

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}년 ${month}월 ${day}일`;
	} catch (error) {
		console.error(`[formatDateToKoreanSimple] Error formatting date: ${isoString}`, error);
		return isoString;
	}
};

/**
 * ISO 8601 형식의 날짜 문자열을 시간만 한국어 형식으로 변환
 * @param isoString ISO 8601 형식의 날짜 문자열 (예: "2025-09-06T17:45:25.236822")
 * @returns 한국어 형식의 시간 문자열 (예: "17시 45분 25초")
 */
export const formatTimeToKorean = (isoString: string): string => {
	try {
		const date = new Date(isoString);

		if (isNaN(date.getTime())) {
			console.warn(`[formatTimeToKorean] Invalid date string: ${isoString}`);
			return isoString;
		}

		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		return `${hours}시 ${minutes}분 ${seconds}초`;
	} catch (error) {
		console.error(`[formatTimeToKorean] Error formatting time: ${isoString}`, error);
		return isoString;
	}
};

/**
 * ISO 8601 형식의 날짜 문자열을 상대적 시간으로 변환합니다 (예: "2시간 전", "3일 전")
 * @param isoString ISO 8601 형식의 날짜 문자열
 * @returns 상대적 시간 문자열
 */
export const formatRelativeTime = (isoString: string): string => {
	try {
		const date = new Date(isoString);
		const now = new Date();

		if (isNaN(date.getTime())) {
			console.warn(`[formatRelativeTime] Invalid date string: ${isoString}`);
			return isoString;
		}

		const diffInMs = now.getTime() - date.getTime();
		const diffInSeconds = Math.floor(diffInMs / 1000);
		const diffInMinutes = Math.floor(diffInSeconds / 60);
		const diffInHours = Math.floor(diffInMinutes / 60);
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInSeconds < 60) {
			return '방금 전';
		} else if (diffInMinutes < 60) {
			return `${diffInMinutes}분 전`;
		} else if (diffInHours < 24) {
			return `${diffInHours}시간 전`;
		} else if (diffInDays < 7) {
			return `${diffInDays}일 전`;
		} else {
			return formatDateToKoreanSimple(isoString);
		}
	} catch (error) {
		console.error(`[formatRelativeTime] Error formatting relative time: ${isoString}`, error);
		return isoString;
	}
};

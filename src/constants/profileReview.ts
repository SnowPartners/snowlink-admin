export const LessonTypeMap = {
	SKI: '스키',
	SNOWBOARD: '스노우보드',
	BOTH: '모두 가능',
};

export const LanguageSkillMap = {
	ENGLISH_FLUENT: '영어(유창)',
	ENGLISH_BASIC: '영어(미숙)',
	JAPANESE: '일본어',
	CHINESE: '중국어',
	FRENCH: '프랑스어',
};

export const REJECT_REASON_DROPDOWN_ITEMS = [
	{ label: '자격증 파일 위조 의심', key: 'CERT_FAKE_SUSPECT' },
	{ label: '자격증과 관련 없는 파일 업로드', key: 'CERT_IRRELEVANT_FILE' },
	{ label: '자격증 파일 인식 불가', key: 'CERT_UNREADABLE' },
	{ label: '인정되지 않는 자격증', key: 'CERT_NOT_ACCEPTED' },
	{ label: '부적절한 소개 문구', key: 'INTRO_INAPPROPRIATE' },
	{ label: '강습 경력 허위 기재 의심', key: 'CAREER_FAKE_SUSPECT' },
];

export const CERTIFICATION_RENEWAL_REJECT_REASON_DROPDOWN_ITEMS = [
	{ label: '자격증 파일 위조 의심', key: 'CERT_FAKE_SUSPECT' },
	{ label: '자격증과 관련 없는 파일 업로드', key: 'CERT_IRRELEVANT_FILE' },
	{ label: '자격증 파일 인식 불가', key: 'CERT_UNREADABLE' },
	{ label: '인정되지 않는 자격증', key: 'CERT_NOT_ACCEPTED' },
	{ label: '자격증 레벨 불일치', key: 'CERT_LEVEL_MISMATCH' },
];

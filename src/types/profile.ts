export type LessonType = 'SKI' | 'SNOWBOARD' | 'BOTH';
export type LanguageSkill = 'ENGLISH_FLUENT' | 'ENGLISH_BASIC' | 'JAPANESE' | 'CHINESE' | 'FRENCH';
export type CertificationLevel = 'LEVEL1' | 'LEVEL2' | 'LEVEL3';
export type ReviewReason =
  | 'CERT_FAKE_SUSPECT' // 자격증 파일 위조 의심
  | 'CERT_IRRELEVANT_FILE' // 자격증과 관련 없는 파일 업로드
  | 'CERT_UNREADABLE' // 자격증 파일 인식 불가
  | 'CERT_NOT_ACCEPTED' // 인정되지 않는 자격증
  | 'INTRO_INAPPROPRIATE' // 부적절한 소개 문구
  | 'CAREER_FAKE_SUSPECT'; // 강습 경력 허위 기재 의심

export type Resort =
  | '곤지암리조트'
  | '지산포레스트리조트'
  | '엘리시안강촌'
  | '비발디파크'
  | '알펜시아리조트'
  | '오크밸리리조트'
  | '오투리조트'
  | '용평리조트'
  | '웰리힐리파크'
  | '하이원리조트'
  | '휘닉스평창스노우파크'
  | '무주덕유산리조트'
  | '에덴밸리리조트';

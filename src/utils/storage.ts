import { obfuscate, deobfuscate } from './obfuscation';

/**
 * sessionStorage에 데이터를 안전하게 저장합니다
 * @param key 저장할 키
 * @param data 저장할 데이터 (자동으로 JSON 직렬화됨)
 * @param useObfuscation 난독화 사용 여부 (기본값: true)
 */
export const saveToSessionStorage = <T>(key: string, data: T, useObfuscation: boolean = true): void => {
	try {
		const serialized = JSON.stringify(data);
		const finalData = useObfuscation ? obfuscate(serialized) : serialized;
		sessionStorage.setItem(key, finalData);
	} catch (error) {
		console.error(`sessionStorage 저장 실패 (키: ${key}):`, error);
	}
};

/**
 * sessionStorage에서 데이터를 안전하게 로드합니다
 * @param key 로드할 키
 * @param useObfuscation 난독화 사용 여부 (기본값: true)
 * @returns 로드된 데이터 또는 null
 */
export const loadFromSessionStorage = <T>(key: string, useObfuscation: boolean = true): T | null => {
	try {
		const stored = sessionStorage.getItem(key);
		if (!stored) return null;

		const finalData = useObfuscation ? deobfuscate(stored) : stored;
		if (!finalData) return null;

		return JSON.parse(finalData);
	} catch (error) {
		console.error(`sessionStorage 로드 실패 (키: ${key}):`, error);
		return null;
	}
};

/**
 * sessionStorage에서 특정 키의 데이터를 삭제합니다
 * @param key 삭제할 키
 */
export const removeFromSessionStorage = (key: string): void => {
	try {
		sessionStorage.removeItem(key);
	} catch (error) {
		console.error(`sessionStorage 삭제 실패 (키: ${key}):`, error);
	}
};

/**
 * localStorage에 데이터를 안전하게 저장합니다
 * @param key 저장할 키
 * @param data 저장할 데이터 (자동으로 JSON 직렬화됨)
 * @param useObfuscation 난독화 사용 여부 (기본값: true)
 */
export const saveToLocalStorage = <T>(key: string, data: T, useObfuscation: boolean = true): void => {
	try {
		const serialized = JSON.stringify(data);
		const finalData = useObfuscation ? obfuscate(serialized) : serialized;
		localStorage.setItem(key, finalData);
	} catch (error) {
		console.error(`localStorage 저장 실패 (키: ${key}):`, error);
	}
};

/**
 * localStorage에서 데이터를 안전하게 로드합니다
 * @param key 로드할 키
 * @param useObfuscation 난독화 사용 여부 (기본값: true)
 * @returns 로드된 데이터 또는 null
 */
export const loadFromLocalStorage = <T>(key: string, useObfuscation: boolean = true): T | null => {
	try {
		const stored = localStorage.getItem(key);
		if (!stored) return null;

		const finalData = useObfuscation ? deobfuscate(stored) : stored;
		if (!finalData) return null;

		return JSON.parse(finalData);
	} catch (error) {
		console.error(`localStorage 로드 실패 (키: ${key}):`, error);
		return null;
	}
};

/**
 * localStorage에서 특정 키의 데이터를 삭제합니다
 * @param key 삭제할 키
 */
export const removeFromLocalStorage = (key: string): void => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error(`localStorage 삭제 실패 (키: ${key}):`, error);
	}
};

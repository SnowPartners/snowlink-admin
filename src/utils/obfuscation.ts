const OBFUSCATION_KEY = import.meta.env.VITE_OBFUSCATION_KEY;
if (!OBFUSCATION_KEY) {
	console.warn('[obfuscation] VITE_OBFUSCATION_KEY is not set');
}

/**
 * 데이터를 난독화합니다 (XOR 암호화 + Base64 인코딩)
 * @param data 난독화할 문자열
 * @returns 난독화된 문자열
 */
export const obfuscate = (data: string): string => {
	if (!OBFUSCATION_KEY) {
		console.warn('[obfuscation] OBFUSCATION_KEY is not available, returning original data');
		return data;
	}

	let result = '';
	for (let i = 0; i < data.length; i++) {
		const charCode = data.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length);
		result += String.fromCharCode(charCode);
	}
	return btoa(result); // Base64 인코딩
};

/**
 * 난독화된 데이터를 복호화합니다 (Base64 디코딩 + XOR 복호화)
 * @param obfuscatedData 난독화된 문자열
 * @returns 복호화된 문자열
 */
export const deobfuscate = (obfuscatedData: string): string => {
	if (!OBFUSCATION_KEY) {
		console.warn('[obfuscation] OBFUSCATION_KEY is not available, returning empty string');
		return '';
	}

	try {
		const decoded = atob(obfuscatedData); // Base64 디코딩
		let result = '';
		for (let i = 0; i < decoded.length; i++) {
			const charCode = decoded.charCodeAt(i) ^ OBFUSCATION_KEY.charCodeAt(i % OBFUSCATION_KEY.length);
			result += String.fromCharCode(charCode);
		}
		return result;
	} catch (error) {
		console.error('데이터 복호화 실패:', error);
		return '';
	}
};

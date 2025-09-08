import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
if (!BASE_URL) {
	console.warn('[axios] VITE_API_URL is not set');
}

export const publicAxios = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const tokenAxios = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
	},
});

publicAxios.interceptors.request.use(
	async (config) => {
		if (import.meta.env.VITE_ENV === 'development') {
			console.log('[axios][public][request]', {
				method: config.method,
				url: config.url,
				baseURL: config.baseURL,
			});
		}
		return config;
	},
	(error) => Promise.reject(error)
);

tokenAxios.interceptors.request.use(
	async (config) => {
		const token = useAuthStore.getState().accessToken;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		if (import.meta.env.VITE_ENV === 'development') {
			console.log('[axios][token][request]', {
				method: config.method,
				url: config.url,
				baseURL: config.baseURL,
			});
		}
		return config;
	},
	(error) => Promise.reject(error)
);

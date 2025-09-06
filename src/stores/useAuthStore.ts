import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { saveToSessionStorage, loadFromSessionStorage, removeFromSessionStorage } from '@/utils/storage';

interface UserInfo {
	id: string;
	email: string;
	name: string;
	phone: string | null;
	role: string;
}

interface AuthState {
	accessToken: string | null;
	userInfo: UserInfo | null;
}

interface AuthStore extends AuthState {
	setAccessToken: (accessToken: string | null) => void;
	setUserInfo: (userInfo: UserInfo | null) => void;
	clearAuth: () => void;
}

// sessionStorage 키
const STORAGE_KEY = 'snowlink_auth_store';

// 초기 상태 로드
const initialState: AuthState = loadFromSessionStorage<AuthState>(STORAGE_KEY) || {
	accessToken: null,
	userInfo: null,
};

export const useAuthStore = create<AuthStore>()(
	immer((set, get) => ({
		...initialState,

		setAccessToken: (accessToken) =>
			set((state) => {
				state.accessToken = accessToken;
				saveToSessionStorage(STORAGE_KEY, get());
			}),

		setUserInfo: (userInfo) =>
			set((state) => {
				state.userInfo = userInfo;
				saveToSessionStorage(STORAGE_KEY, get());
			}),

		clearAuth: () =>
			set((state) => {
				state.accessToken = null;
				state.userInfo = null;
				removeFromSessionStorage(STORAGE_KEY);
			}),
	}))
);

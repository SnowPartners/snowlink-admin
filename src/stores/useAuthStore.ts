import { create } from 'zustand';

interface UserInfo {
	id: string;
	email: string;
	name: string;
	phone: string | null;
	role: string;
}

interface AuthStore {
	accessToken: string | null;
	userInfo: UserInfo | null;
	setAccessToken: (accessToken: string | null) => void;
	setUserInfo: (userInfo: UserInfo | null) => void;
	clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	accessToken: null,
	userInfo: null,
	setAccessToken: (accessToken) => set({ accessToken }),
	setUserInfo: (userInfo) => set({ userInfo }),
	clearAuth: () => set({ accessToken: null, userInfo: null }),
}));

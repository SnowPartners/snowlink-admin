import type { PostLoginRequest, PostLoginResponse } from '@/types/apis/auth';
import { ENDPOINTS } from './endpoints';
import { publicAxios } from '@/utils/axios';
import { mockPostLogin } from '@/mocks/mockApi';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const postLogin = async (request: PostLoginRequest) => {
  if (USE_MOCK_API) {
    return mockPostLogin(request);
  }
  const response = await publicAxios.post<PostLoginResponse>(ENDPOINTS.auth.postLogin, request);
  return response.data;
};

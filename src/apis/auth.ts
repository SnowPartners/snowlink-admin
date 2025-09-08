import type { PostLoginRequest, PostLoginResponse } from '@/types/apis/auth';
import { ENDPOINTS } from './endpoints';
import { publicAxios } from '@/utils/axios';

export const postLogin = async (request: PostLoginRequest) => {
  const response = await publicAxios.post<PostLoginResponse>(ENDPOINTS.auth.postLogin, request);
  return response.data;
};

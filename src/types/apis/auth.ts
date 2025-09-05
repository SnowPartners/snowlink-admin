import type { BaseResponse } from './common';

export interface PostLoginRequest {
  password: string;
}

export interface PostLoginResponseData {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userInfo: {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    role: string;
  };
}

export type PostLoginResponse = BaseResponse<PostLoginResponseData>;

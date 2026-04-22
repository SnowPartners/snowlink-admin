import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
  GetInstructorDetailResponse,
  GetInstructorListResponse,
  GetOwnerDetailResponse,
  GetOwnerListResponse,
} from '@/types/apis/users';
import {
  mockGetInstructorDetail,
  mockGetInstructorList,
  mockGetOwnerDetail,
  mockGetOwnerList,
} from '@/mocks/mockApi';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const getOwnerList = async () => {
  if (USE_MOCK_API) {
    return mockGetOwnerList();
  }
  const response = await tokenAxios.get<GetOwnerListResponse>(ENDPOINTS.users.getOwnerList);
  return response.data;
};

export const getOwnerDetail = async (ownerId: string) => {
  if (USE_MOCK_API) {
    return mockGetOwnerDetail(ownerId);
  }
  const response = await tokenAxios.get<GetOwnerDetailResponse>(ENDPOINTS.users.getOwnerDetail(ownerId));
  return response.data;
};

export const getInstructorList = async () => {
  if (USE_MOCK_API) {
    return mockGetInstructorList();
  }
  const response = await tokenAxios.get<GetInstructorListResponse>(ENDPOINTS.users.getInstructorList);
  return response.data;
};

export const getInstructorDetail = async (instructorId: string) => {
  if (USE_MOCK_API) {
    return mockGetInstructorDetail(instructorId);
  }
  const response = await tokenAxios.get<GetInstructorDetailResponse>(ENDPOINTS.users.getInstructorDetail(instructorId));
  return response.data;
};

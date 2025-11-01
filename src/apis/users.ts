import { tokenAxios } from '@/utils/axios';
import { ENDPOINTS } from './endpoints';
import type {
  GetInstructorDetailResponse,
  GetInstructorListResponse,
  GetOwnerDetailResponse,
  GetOwnerListResponse,
} from '@/types/apis/users';

export const getOwnerList = async () => {
  const response = await tokenAxios.get<GetOwnerListResponse>(ENDPOINTS.users.getOwnerList);
  return response.data;
};

export const getOwnerDetail = async (ownerId: string) => {
  const response = await tokenAxios.get<GetOwnerDetailResponse>(ENDPOINTS.users.getOwnerDetail(ownerId));
  return response.data;
};

export const getInstructorList = async () => {
  const response = await tokenAxios.get<GetInstructorListResponse>(ENDPOINTS.users.getInstructorList);
  return response.data;
};

export const getInstructorDetail = async (instructorId: string) => {
  const response = await tokenAxios.get<GetInstructorDetailResponse>(ENDPOINTS.users.getInstructorDetail(instructorId));
  return response.data;
};

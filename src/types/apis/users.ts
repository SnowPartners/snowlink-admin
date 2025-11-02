import type { CertificationLevel, LessonType, Resort } from '../profile';
import type { Gender } from '../users';
import type { BaseResponse } from './common';

export interface OwnerListItem {
  ownerId: string;
  representativeName: string;
  email: string;
  companyName: string;
  resorts: Resort[];
}

export interface OwnerDetail {
  ownerId: string;
  representativeName: string;
  email: string;
  companyName: string;
  companyPhone: string;
  resorts: Resort[];
  registeredAt: string;
  businessRegistrationNumber: string;
  introduction: string;
  profileImageUrl: string;
  businessRegistrationFileUrl: string;
}

export interface InstructorListItem {
  instructorId: string;
  name: string;
  resorts: Resort[];
  email: string;
  lessonType: LessonType;
  experience: number;
  certificationLevel: CertificationLevel;
}

export interface InstructorDetail {
  instructorId: string;
  name: string;
  resorts: Resort[];
  email: string;
  lessonType: LessonType;
  experience: number;
  certificationLevel: CertificationLevel;
  phone: string;
  gender: Gender;
  accountNumber: string;
  bankName: string;
  introduction: string;
  profileImageUrl: string;
  registeredAt: string;
}

export type GetOwnerListResponse = BaseResponse<OwnerListItem[]>;
export type GetOwnerDetailResponse = BaseResponse<OwnerDetail>;

export type GetInstructorListResponse = BaseResponse<InstructorListItem[]>;
export type GetInstructorDetailResponse = BaseResponse<InstructorDetail>;

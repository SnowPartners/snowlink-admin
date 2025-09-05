export interface BaseResponse<T> {
  status: string;
  code: number;
  errorCode: string;
  message: string;
  data: T;
}

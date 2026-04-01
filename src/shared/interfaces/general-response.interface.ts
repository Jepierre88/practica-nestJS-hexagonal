export interface GeneralResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

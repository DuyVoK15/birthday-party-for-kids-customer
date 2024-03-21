export interface UpgradeServiceDataResponse {
  id: number;
  count: number;
  pricing: number;
  active: boolean;
}
export interface ServiceDataResponse {
  id: number;
  serviceName: string;
  serviceImgUrl: string;
  serviceDescription: string;
  pricing: number;
  active: boolean;
  createAt: string;
  updateAt: string;
  deleteAt: string;
}
export interface ServiceArrayResponse {
  status: string;
  message: string;
  data: ServiceDataResponse[] | [];
}
export interface ServiceObjectResponse {
  status: string;
  message: string;
  data: ServiceDataResponse;
}

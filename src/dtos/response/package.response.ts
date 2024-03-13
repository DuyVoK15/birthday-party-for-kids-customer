export interface PackageServiceResponse {
  id: number;
  count: number;
  pricing: number;
  active: boolean;
}
export interface PackageDataResponse {
  id: number;
  packageName: string;
  packageDescription: string;
  packageImgUrl: string;
  pricing: number;
  packageServiceList: PackageServiceResponse[] | [];
  active: boolean;
}
export interface PackageResponse {
  status: string;
  message: string;
  data: PackageDataResponse[] | [];
}

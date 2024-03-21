export interface ServiceDataResponse {
  id: number;
  serviceName: string;
  serviceImgUrl: string;
  serviceDescription: string;
  pricing: number;
  packageServiceList: [];
  upgradeServiceList: [
    {
      id: number;
      count: number;
      pricing: number;
      active: boolean;
    },
  ];
  active: boolean;
}
export interface ServiceResponse {
  status: string;
  message: string;
  data: ServiceDataResponse[] | [];
}

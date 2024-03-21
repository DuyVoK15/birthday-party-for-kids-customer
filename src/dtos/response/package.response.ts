export interface PackageServiceDataResponse {
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
  packageServiceList: PackageServiceDataResponse[] | [];
  active: boolean;
}
export interface PackageArrayResponse {
  status: string;
  message: string;
  data: PackageDataResponse[] | [];
}

// Package In Venue
export interface PackageInVenueDataResponse {
  id: number;
  active: boolean;
  apackage: PackageDataResponse;
}
export interface PackageInVenueArrayResponse {
  status: string;
  message: string;
  data: PackageInVenueDataResponse[] | [];
}
export interface PackageInVenueObjectResponse {
  status: string;
  message: string;
  data: PackageInVenueDataResponse;
}

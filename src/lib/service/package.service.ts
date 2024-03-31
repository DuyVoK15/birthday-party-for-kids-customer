import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  PackageArrayResponse,
  PackageObjectResponse,
} from "@/dtos/response/package.response";
import { GetPackageRequest } from "@/dtos/request/package.request";
import { SERVICE_ENUM } from "@/enums/service";

export const packageService = {
  getAllPackage: (
    payload: GetPackageRequest,
  ): Promise<AxiosResponse<PackageArrayResponse>> => {
    const url = `/api/package/get-all-package-for-customer/${payload.venueId}?packageType=${payload.packageType}`;
    return axiosClient.get(url);
  },

  getAllPackageDecor: (
    id: number,
  ): Promise<AxiosResponse<PackageArrayResponse>> => {
    const url = `/api/package/get-all-package-for-customer/${id}?packageType=${SERVICE_ENUM.DECORATION}`;
    return axiosClient.get(url);
  },

  getAllPackageFood: (
    id: number,
  ): Promise<AxiosResponse<PackageArrayResponse>> => {
    const url = `/api/package/get-all-package-for-customer/${id}?packageType=${SERVICE_ENUM.FOOD}`;
    return axiosClient.get(url);
  },
  getPackageById: (
    id: number,
  ): Promise<AxiosResponse<PackageObjectResponse>> => {
    const url = `/api/package/get-package-for-customer/${id}`;
    return axiosClient.get(url);
  },
};

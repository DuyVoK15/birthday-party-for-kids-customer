import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { VenueCheckSlotByDateResponse } from "@/dtos/venue.dtos";
import { ThemeInVenueResponse } from "@/dtos/response/theme.response";
import { PackageInVenueArrayResponse } from "@/dtos/response/package.response";

export const venueService = {
  getAllVenue: (): Promise<AxiosResponse<VenueCheckSlotByDateResponse>> => {
    const url = `/api/venue/get-all`;
    return axiosClient.get(url);
  },
  getAllVenueCheckSlotByDate: (
    date: string | null,
  ): Promise<AxiosResponse<VenueCheckSlotByDateResponse>> => {
    const url = `/api/venue/check-slot-in-venue?date=${date}`;
    return axiosClient.get(url);
  },
  getAllThemeInVenueByVenueId: (
    id: number,
  ): Promise<AxiosResponse<ThemeInVenueResponse>> => {
    const url = `/api/venue/get-theme-by-venue/${id}`;
    return axiosClient.get(url);
  },
  getAllPackageInVenueByVenueId: (
    id: number,
  ): Promise<AxiosResponse<PackageInVenueArrayResponse>> => {
    const url = `/api/venue/get-package-by-venue/${id}`;
    return axiosClient.get(url);
  },
};

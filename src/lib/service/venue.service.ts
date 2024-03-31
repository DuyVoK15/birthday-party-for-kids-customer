import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { VenueArrayResponse } from "@/dtos/response/venue.response";
import { ThemeInVenueArrayResponse } from "@/dtos/response/theme.response";
import { PackageInVenueArrayResponse } from "@/dtos/response/package.response";

export const venueService = {
  getAllVenue: (): Promise<AxiosResponse<VenueArrayResponse>> => {
    const url = `/api/venue/get-all`;
    return axiosClient.get(url);
  },
  getAllVenueCheckSlotByDate: (
    date: string | null,
  ): Promise<AxiosResponse<VenueArrayResponse>> => {
    const url = `/api/venue/check-slot-in-venue?date=${date}`;
    return axiosClient.get(url);
  },
};

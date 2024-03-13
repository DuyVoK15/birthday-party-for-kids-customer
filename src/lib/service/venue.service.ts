import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { VenueCheckSlotByDateResponse } from "@/dtos/venue.dtos";

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
};

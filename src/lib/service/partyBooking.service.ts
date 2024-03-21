import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { BookingRequest } from "@/context/BookingContext";

export const partyBookingService = {
  createPartyBooking: (
    payload: BookingRequest,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/create`;
    return axiosClient.post(url, { ...payload });
  },
};

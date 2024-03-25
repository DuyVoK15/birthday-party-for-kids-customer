import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { BookingRequest } from "@/context/BookingContext";
import {
  PartyBookingArrayResponse,
  PartyBookingObjectResponse,
} from "@/dtos/response/partyBooking.response";

export const partyBookingService = {
  createPartyBooking: (
    payload: BookingRequest,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/create`;
    return axiosClient.post(url, { ...payload });
  },
  getAllBooking: (): Promise<AxiosResponse<PartyBookingArrayResponse>> => {
    const url = `/api/party-booking/get-all-by-user`;
    return axiosClient.get(url);
  },
  getBookingById: (
    id: number,
  ): Promise<AxiosResponse<PartyBookingObjectResponse>> => {
    const url = `/api/party-booking/get-party-booking-for-customer-id/${id}`;
    return axiosClient.get(url);
  },
  cancelBooking: (id: number): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/party-booking-cancel-for-customer/${id}`
    return axiosClient.put(url)
  }
};

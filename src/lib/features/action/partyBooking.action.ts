import { BookingRequest } from "@/context/BookingContext";
import { partyBookingService } from "@/lib/service/partyBooking.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const createPartyBooking = createAsyncThunk(
  "partyBooking/createPartyBooking",
  async (payload: BookingRequest, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.createPartyBooking(payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data)    }
  },
);

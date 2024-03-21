import { BookingRequest } from "@/context/BookingContext";
import { partyBookingService } from "@/lib/service/partyBooking.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPartyBooking = createAsyncThunk(
  "partyBooking/createPartyBooking",
  async (payload: BookingRequest, { rejectWithValue }) => {
    try {
      const response = await partyBookingService.createPartyBooking(payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

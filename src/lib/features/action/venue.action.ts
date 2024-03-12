import { venueService } from "@/lib/service/venue.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllVenueCheckSlotByDate = createAsyncThunk(
  "venue/getAllVenueCheckSlotByDate",
  async (date: string | null, { rejectWithValue }) => {
    try {
      const response = await venueService.getAllVenueCheckSlotByDate(date);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  },
);

import { PartyBookingDataResponse } from "./../../../dtos/response/partyBooking.response";
import { createSlice } from "@reduxjs/toolkit";
import {
  createPartyBooking,
  getAllBooking,
  getBookingById,
} from "../action/partyBooking.action";

interface PartyBookingState {
  bookingList: PartyBookingDataResponse[] | [];
  bookingById: PartyBookingDataResponse | null;
  loading: boolean;
}
const initialState: PartyBookingState = {
  bookingList: [],
  bookingById: null,
  loading: false,
};

export const partyBookingSlice = createSlice({
  name: "partyBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPartyBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPartyBooking.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPartyBooking.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.bookingList = action.payload.data || [];
        state.loading = false;
      })
      .addCase(getAllBooking.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getBookingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.bookingById = action.payload.data || [];
        state.loading = false;
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default partyBookingSlice.reducer;

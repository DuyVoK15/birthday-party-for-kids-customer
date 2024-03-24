import { PartyBookingDataResponse } from "./../../../dtos/response/partyBooking.response";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createPartyBooking,
  getAllBooking,
  getBookingById,
} from "../action/partyBooking.action";
import { createPaymentByBookingId } from "../action/payment.action";
import {
  createInquiryForChangePackageInVenue,
  createInquiryForChangeThemeInVenue,
} from "../action/inquiry.action";

interface PartyBookingState {
  bookingList: PartyBookingDataResponse[] | [];
  bookingById: PartyBookingDataResponse | null;
  paymentUrl: string;
  loading: boolean;
  loadingCreate: boolean;
  loadingPayment: boolean
}
const initialState: PartyBookingState = {
  bookingList: [],
  paymentUrl: "",
  bookingById: null,
  loading: false,
  loadingCreate: false,
  loadingPayment: false
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
      })
      .addCase(createPaymentByBookingId.pending, (state) => {
        state.loadingPayment = true;
      })
      .addCase(createPaymentByBookingId.fulfilled, (state, action) => {
        state.paymentUrl = action.payload;
        state.loadingPayment = false;
      })
      .addCase(createPaymentByBookingId.rejected, (state, action) => {
        state.loadingPayment = false;
      })
      .addMatcher(
        isAnyOf(
          createInquiryForChangeThemeInVenue.pending,
          createInquiryForChangePackageInVenue.pending,
        ),
        (state) => {
          state.loadingCreate = true;
        },
      )
      .addMatcher(
        isAnyOf(
          createInquiryForChangeThemeInVenue.fulfilled,
          createInquiryForChangePackageInVenue.fulfilled,
        ),
        (state) => {
          state.loadingCreate = false;
        },
      )
      .addMatcher(
        isAnyOf(
          createInquiryForChangeThemeInVenue.rejected,
          createInquiryForChangePackageInVenue.rejected,
        ),
        (state) => {
          state.loadingCreate = false;
        },
      );
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default partyBookingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createPartyBooking } from "../action/partyBooking.action";

interface PartyBookingState {
  loading: boolean;
}
const initialState: PartyBookingState = {
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
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default partyBookingSlice.reducer;

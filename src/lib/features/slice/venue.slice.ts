import { INQUIRY } from "@/dtos/inquiry.dtos";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inquiryService } from "../../service/inquiry.service";
import { getAllInquiryByAuthor } from "../action/inquiry.action";
import { VenueCheckSlotByDateResponse, VenueResponse } from "@/dtos/venue.dtos";
import { getAllVenueCheckSlotByDate } from "../action/venue.action";

interface VenueState {
  venueCheckSlotByDateResponse: VenueCheckSlotByDateResponse;
  venueCheckSlotByDateList: VenueResponse[] | [];
  loading: boolean;
}
const initialState: VenueState = {
  venueCheckSlotByDateResponse: {
    status: "",
    message: "",
    data: [],
  },
  venueCheckSlotByDateList: [],
  loading: false,
};

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenueCheckSlotByDate.pending, (state) => {
        state.loading = true;
        state.venueCheckSlotByDateList = [];
      })
      .addCase(getAllVenueCheckSlotByDate.fulfilled, (state, action) => {
        state.venueCheckSlotByDateList = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getAllVenueCheckSlotByDate.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default venueSlice.reducer;

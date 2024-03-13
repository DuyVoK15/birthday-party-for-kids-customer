import { INQUIRY } from "@/dtos/inquiry.dtos";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inquiryService } from "../../service/inquiry.service";
import { getAllInquiryByAuthor } from "../action/inquiry.action";
import { VenueCheckSlotByDateResponse, VenueResponse } from "@/dtos/venue.dtos";
import {
  getAllVenue,
  getAllVenueCheckSlotByDate,
} from "../action/venue.action";

interface VenueState {
  venueCheckSlotByDateResponse: VenueCheckSlotByDateResponse;
  venueCheckSlotByDateList: VenueResponse[] | [];
  venueList: VenueResponse[] | [];
  loading: boolean;
}
const initialState: VenueState = {
  venueCheckSlotByDateResponse: {
    status: "",
    message: "",
    data: [],
  },
  venueCheckSlotByDateList: [],
  venueList: [],
  loading: false,
};

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVenue.fulfilled, (state, action) => {
        state.venueList = action.payload?.data || [];
        state.loading = false;
      })
      .addCase(getAllVenue.rejected, (state, action) => {
        state.loading = false;
      })
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

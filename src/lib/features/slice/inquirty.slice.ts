import { INQUIRY } from "@/dtos/inquiry.dtos";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inquiryService } from "../../service/inquiry.service";
import { getAllInquiryByAuthor } from "../action/inquiry.action";

interface InquiryState {
  inquiryList: INQUIRY[] | [];
  loading: boolean;
}
const initialState: InquiryState = {
  inquiryList: [],
  loading: false,
};

export const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInquiryByAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInquiryByAuthor.fulfilled, (state, action) => {
        state.inquiryList = action.payload || [];
        state.loading = false;
      })
      .addCase(getAllInquiryByAuthor.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const selectUser = (state: RootState) => state.auth.user;
export default inquirySlice.reducer;

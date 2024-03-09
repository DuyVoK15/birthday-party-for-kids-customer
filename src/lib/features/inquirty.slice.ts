import { INQUIRY } from "@/dtos/inquiry.dtos";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { inquiryService } from "../service/inquiry.service";

interface InquiryState {
  inquiryList: INQUIRY[] | [];
  loading: boolean;
}
const initialState: InquiryState = {
  inquiryList: [],
  loading: false,
};

export const getAllInquiryByAuthor = createAsyncThunk(
  "inquiry/getAllInquiryByAuthor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await inquiryService.getAllInquiryByAuthor();
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  },
);

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

import { createSlice } from "@reduxjs/toolkit";
import { getAllPackage, getPackageById } from "../action/package.action";
import {
  PackageDataResponse,
  PackageResponse,
} from "@/dtos/response/package.response";

interface State {
  packageReponse: PackageResponse;
  packageList: PackageDataResponse[] | [];
  packageByIdList: any;
  loading: boolean;
}

const initialState: State = {
  packageReponse: {
    status: "",
    message: "",
    data: [],
  },
  packageList: [],
  packageByIdList: null,
  loading: false,
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPackage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPackage.fulfilled, (state, action) => {
        state.packageReponse = action.payload;
        state.packageList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPackage.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(getPackageById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPackageById.fulfilled, (state, action) => {
        state.packageByIdList = action.payload;
        state.loading = false;
      })
      .addCase(getPackageById.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default packageSlice.reducer;

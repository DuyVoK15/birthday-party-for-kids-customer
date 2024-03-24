import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPackage,
  getAllPackageInVenueByVenueId,
  getAllPackageInVenueNotChoose,
  getPackageById,
} from "../action/package.action";
import {
  PackageArrayResponse,
  PackageDataResponse,
  PackageInVenueDataResponse,
} from "@/dtos/response/package.response";
import { getAllThemeInVenueNotChoose } from "../action/theme.action";

interface AuthState {
  packageReponse: PackageArrayResponse;
  packageList: PackageDataResponse[] | [];
  packageById: any;
  packageInVenueList: PackageInVenueDataResponse[] | [];
  packageInVenueNotChooseList: PackageInVenueDataResponse[] | [];
  createPackage: any;
  updatePackage: any;
  loading: boolean;
}

const initialState: AuthState = {
  packageReponse: {
    status: "",
    message: "",
    data: [],
  },
  packageList: [],
  packageInVenueList: [],
  packageInVenueNotChooseList: [],
  packageById: null,
  createPackage: null,
  updatePackage: null,
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
        state.packageById = action.payload;
        state.loading = false;
      })
      .addCase(getPackageById.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(getAllPackageInVenueByVenueId.pending, (state, action) => {
        state.loading = true;
        state.packageInVenueList = [];
      })
      .addCase(getAllPackageInVenueByVenueId.fulfilled, (state, action) => {
        state.packageInVenueList = action.payload.data || [];
        state.loading = false;
      })
      .addCase(getAllPackageInVenueByVenueId.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllPackageInVenueNotChoose.pending, (state, action) => {
        state.loading = true;
        state.packageInVenueNotChooseList = [];
      })
      .addCase(getAllPackageInVenueNotChoose.fulfilled, (state, action) => {
        state.packageInVenueNotChooseList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPackageInVenueNotChoose.rejected, (state, action) => {
        state.loading = false;
      });
    //
  },
});

export default packageSlice.reducer;

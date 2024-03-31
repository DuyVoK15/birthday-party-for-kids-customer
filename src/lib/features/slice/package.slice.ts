import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPackage,
  getAllPackageDecor,
  getAllPackageFood,
  getPackageById,
} from "../action/package.action";
import {
  PackageArrayResponse,
  PackageDataResponse,
} from "@/dtos/response/package.response";
import { getAllThemeInVenueNotChoose } from "../action/theme.action";

interface AuthState {
  packageReponse: PackageArrayResponse;
  packageList: PackageDataResponse[] | [];
  packageById: any;
  packageDecorList: PackageDataResponse[] | [];
  packageFoodList: PackageDataResponse[] | [];
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
  packageDecorList: [],
  packageFoodList: [],
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
      .addCase(getAllPackageDecor.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPackageDecor.fulfilled, (state, action) => {
        state.packageDecorList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPackageDecor.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(getAllPackageFood.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPackageFood.fulfilled, (state, action) => {
        state.packageFoodList = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllPackageFood.rejected, (state, action) => {
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
      });
    //
    //
  },
});

export default packageSlice.reducer;
